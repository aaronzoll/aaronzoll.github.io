"""Print-orient every part, write the STL folder, pack plates, and write a multi-plate Bambu Studio 3MF."""
import numpy as np, trimesh, json, os, shutil, uuid, zipfile, io
from shapely.geometry import Polygon, MultiPoint, box
from shapely.ops import unary_union
from shapely import affinity

W = '/home/claude/eig3/world'
OUTD = '/home/claude/eig3/pkg/eigen_clock_v3'
FLIP = {'Ax_arrow_local', 'D_x_hand', 'S_x_hand', 'N_x_hand'}
SLOT_NAME = {1: 'black', 2: 'white', 3: 'purple', 4: 'red'}
meta = json.load(open(f'{W}/meta.json')); COLOR = meta['color']

def mesh(n, d=None):
    z = np.load(f'{d or W}/{n}.npz'); return trimesh.Trimesh(z['v'].astype(float), z['f'], process=False)

# objects: name -> list of parts (world part names). Parts of one object keep their relative placement.
OBJ = {
    'base': ['base'], 'centre_pin': ['centre_pin'], 'crank_pin': ['crank_pin'], 'ear_lid': ['ear_lid'], 'shaft_G1': ['shaft_G1'],
    'layshaft_K': ['layshaft_K'], 'idler_J': ['idler_J'], 'crank_idler': ['crank_idler'], 'crank_gear': ['crank_gear'],
    'carrier_hub': ['carrier_hub'], 'carrier_plate': ['carrier_plate'], 'sun': ['sun'], 'idler_I_lock': ['idler_I_lock'],
    'planet': ['planet'], 'island_hub': ['island_hub'], 'Ax_hand': ['Ax_hand_local'], 'Ax_arrow': ['Ax_arrow_local'], 'centre_knob': ['centre_knob'],
}
for k in 'DSN':
    OBJ[f'{k}_face'] = [f'{k}_face', f'{k}_face_WHITE', f'{k}_face_PURPLE']
    OBJ[f'{k}_disc'] = [f'{k}_disc']
    OBJ[f'{k}_arm'] = [f'{k}_arm']; OBJ[f'{k}_x_hand'] = [f'{k}_x_hand']; OBJ[f'{k}_crank_knob'] = [f'{k}_crank_knob']
for o in OBJ: OBJ[o] = [p for p in OBJ[o] if os.path.exists(f'{W}/{p}.npz')]

def oriented(o, keep_xy=False):
    """meshes of an object's parts in print orientation; object bottom at z=0; centred unless keep_xy"""
    ms = [mesh(p) for p in OBJ[o]]
    flip = any(p in FLIP for p in OBJ[o])
    if flip:
        for m in ms: m.apply_transform(trimesh.transformations.rotation_matrix(np.pi, [1, 0, 0]))
    allv = np.vstack([m.vertices for m in ms])
    lo, hi = allv.min(0), allv.max(0)
    sh = np.array([0.0, 0.0, -lo[2]]) if keep_xy else np.array([-(lo[0] + hi[0]) / 2, -(lo[1] + hi[1]) / 2, -lo[2]])
    for m in ms: m.apply_translation(sh)
    return ms, sh

def footprint(ms):
    pts = np.vstack([m.vertices[:, :2] for m in ms])
    return MultiPoint(pts[::max(1, len(pts) // 4000)]).convex_hull

# ---------------- plates ----------------
PLATES = [
    ('Base', ['base']),
    ('Gears, pins, carrier', ['carrier_plate', 'crank_idler', 'layshaft_K', 'shaft_G1', 'crank_gear', 'island_hub', 'carrier_hub',
                              'idler_J', 'sun', 'idler_I_lock', 'planet', 'Ax_hand', 'ear_lid', 'centre_pin', 'crank_pin', 'D_arm', 'S_arm', 'N_arm']),
    ('Face D (diagonal)', ['D_face', 'D_disc']),
    ('Face S (symmetric)', ['S_face', 'S_disc']),
    ('Face N (non-symmetric)', ['N_face', 'N_disc']),
    ('Hands, knobs, arrow', ['D_x_hand', 'S_x_hand', 'N_x_hand', 'D_crank_knob', 'S_crank_knob', 'N_crank_knob', 'centre_knob', 'Ax_arrow']),
]
BED = 256.0; MARGIN = 8.0; GAP = 6.0
def pack(objs):
    """greedy placement by footprint; returns {obj: (dx, dy)} offsets in bed coords, plus a fixed pair for faces"""
    if len(objs) == 2 and objs[0].endswith('_face'):
        # print the island in its assembled place inside the face cut-out
        msf, shf = oriented(objs[0], keep_xy=True); msi, shi = oriented(objs[1], keep_xy=True)
        allv = np.vstack([m.vertices for m in msf]); c = (allv.min(0) + allv.max(0)) / 2
        off = np.array([BED / 2 - c[0], BED / 2 - c[1]])
        return {objs[0]: (msf, off), objs[1]: (msi, off)}
    items = []
    for o in objs:
        ms, _ = oriented(o)
        fp = footprint(ms)
        # try a few rotations for long parts
        best = None
        for ang in (0, 90, 45, -45, 30, -30, 60, -60):
            f2 = affinity.rotate(fp, ang, origin=(0, 0))
            b = f2.bounds; a = (b[2] - b[0]) * (b[3] - b[1])
            if best is None or a < best[0] - 1: best = (a, ang, f2)
        items.append((o, ms, best[1], best[2]))
    items.sort(key=lambda t: -t[3].area)
    placed, out = [], {}
    for o, ms, ang, fp in items:
        done = False
        b = fp.bounds
        for y in np.arange(MARGIN - b[1], BED - MARGIN - b[3] + 1e-9, 2.0):
            for x in np.arange(MARGIN - b[0], BED - MARGIN - b[2] + 1e-9, 2.0):
                f2 = affinity.translate(fp, x, y)
                if all(f2.distance(p) >= GAP for p in placed):
                    placed.append(f2); done = True; break
            if done: break
        if not done: raise RuntimeError(f'could not place {o}')
        R = trimesh.transformations.rotation_matrix(np.radians(ang), [0, 0, 1])
        for m in ms: m.apply_transform(R)
        out[o] = (ms, np.array([x, y]))
    # centre the whole group on the bed
    allp = unary_union(placed).bounds
    shift = np.array([BED / 2 - (allp[0] + allp[2]) / 2, BED / 2 - (allp[1] + allp[3]) / 2])
    return {o: (ms, off + shift) for o, (ms, off) in out.items()}

LAYOUT = [pack(objs) for _, objs in PLATES]

# ---------------- STL folder ----------------
if os.path.exists(OUTD): shutil.rmtree(OUTD)
os.makedirs(f'{OUTD}/stl/common'); [os.makedirs(f'{OUTD}/stl/set_{k}') for k in 'DSN']
for o, parts in OBJ.items():
    ms, _ = oriented(o)
    sub = f'set_{o[0]}' if o[:2] in ('D_', 'S_', 'N_') else 'common'
    for p, m in zip(parts, ms):
        tag = {2: '_WHITE', 3: '_PURPLE', 4: '_RED'}.get(COLOR[p], '') if len(parts) > 1 else ''
        nm = o + (tag if tag else ('' if p == parts[0] else '_' + p))
        m.export(f'{OUTD}/stl/{sub}/{nm}.stl')

# ---------------- 3MF (Bambu Studio project) ----------------
def cols_for(n):
    v = np.sqrt(n); r = round(v); return int(r + 1 if v > r else r)
NCOL = cols_for(len(PLATES)); STRIDE = BED * 1.2
def plate_origin(i):
    return np.array([(i % NCOL) * STRIDE, -(i // NCOL) * STRIDE])

def mesh_xml(m, oid):
    v = m.vertices; f = m.faces
    vs = '\n'.join(f'     <vertex x="{a:.4f}" y="{b:.4f}" z="{c:.4f}"/>' for a, b, c in v)
    ts = '\n'.join(f'     <triangle v1="{a}" v2="{b}" v3="{c}"/>' for a, b, c in f)
    return (f'  <object id="{oid}" p:UUID="{uuid.uuid4()}" type="model">\n   <mesh>\n    <vertices>\n{vs}\n    </vertices>\n'
            f'    <triangles>\n{ts}\n    </triangles>\n   </mesh>\n  </object>\n')

files = {}; main_objs = []; build_items = []; cfg_objs = []; plate_cfg = []; rels = []
next_id = 1; ident = 100
for pi, (pname, objs) in enumerate(PLATES):
    po = plate_origin(pi); inst = []
    for o in objs:
        ms, off = LAYOUT[pi][o]
        sub_ids = []; body = ''
        for m in ms:
            body += mesh_xml(m, next_id); sub_ids.append(next_id); next_id += 1
        path = f'/3D/Objects/{o}.model'
        files[path[1:]] = ('<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xml:lang="en-US" '
                           'xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" '
                           'xmlns:BambuStudio="http://schemas.bambulab.com/package/2021" '
                           'xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06" requiredextensions="p">\n'
                           ' <metadata name="BambuStudio:3mfVersion">1</metadata>\n <resources>\n' + body + ' </resources>\n <build/>\n</model>\n')
        rels.append(path)
        mid = next_id; next_id += 1
        comps = ''.join(f'    <component p:path="{path}" objectid="{sid}" p:UUID="{uuid.uuid4()}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>\n' for sid in sub_ids)
        main_objs.append(f'  <object id="{mid}" p:UUID="{uuid.uuid4()}" type="model">\n   <components>\n{comps}   </components>\n  </object>\n')
        tx, ty = po + off
        build_items.append(f'  <item objectid="{mid}" p:UUID="{uuid.uuid4()}" transform="1 0 0 0 1 0 0 0 1 {tx:.4f} {ty:.4f} 0" printable="1"/>\n')
        parts_cfg = ''
        for sid, p in zip(sub_ids, OBJ[o]):
            parts_cfg += (f'    <part id="{sid}" subtype="normal_part">\n     <metadata key="name" value="{p}"/>\n'
                          f'     <metadata key="matrix" value="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1"/>\n'
                          f'     <metadata key="extruder" value="{COLOR[p]}"/>\n    </part>\n')
        cfg_objs.append(f'  <object id="{mid}">\n   <metadata key="name" value="{o}"/>\n   <metadata key="extruder" value="{COLOR[OBJ[o][0]]}"/>\n{parts_cfg}  </object>\n')
        inst.append(f'   <model_instance>\n    <metadata key="object_id" value="{mid}"/>\n    <metadata key="instance_id" value="0"/>\n'
                    f'    <metadata key="identify_id" value="{ident}"/>\n   </model_instance>\n'); ident += 1
    plate_cfg.append(f'  <plate>\n   <metadata key="plater_id" value="{pi + 1}"/>\n   <metadata key="plater_name" value="{pname}"/>\n'
                     f'   <metadata key="locked" value="false"/>\n' + ''.join(inst) + '  </plate>\n')

files['3D/3dmodel.model'] = ('<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xml:lang="en-US" '
    'xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:BambuStudio="http://schemas.bambulab.com/package/2021" '
    'xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06" requiredextensions="p">\n'
    ' <metadata name="Application">BambuStudio-01.10.02.76</metadata>\n <metadata name="BambuStudio:3mfVersion">1</metadata>\n'
    ' <metadata name="Title">Eigenvector Clock v2</metadata>\n <resources>\n' + ''.join(main_objs) +
    ' </resources>\n <build p:UUID="' + str(uuid.uuid4()) + '">\n' + ''.join(build_items) + ' </build>\n</model>\n')
files['3D/_rels/3dmodel.model.rels'] = ('<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n' +
    ''.join(f' <Relationship Target="{p}" Id="rel-{i + 1}" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>\n' for i, p in enumerate(rels)) +
    '</Relationships>\n')
files['_rels/.rels'] = ('<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n'
    ' <Relationship Target="/3D/3dmodel.model" Id="rel-1" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>\n</Relationships>\n')
files['[Content_Types].xml'] = ('<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n'
    ' <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n'
    ' <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>\n'
    ' <Default Extension="png" ContentType="image/png"/>\n <Default Extension="config" ContentType="text/xml"/>\n</Types>\n')
files['Metadata/model_settings.config'] = '<?xml version="1.0" encoding="UTF-8"?>\n<config>\n' + ''.join(cfg_objs) + ''.join(plate_cfg) + '</config>\n'
with zipfile.ZipFile(f'{OUTD}/eigen_clock_v2.3mf', 'w', zipfile.ZIP_DEFLATED) as z:
    for k in ['[Content_Types].xml', '_rels/.rels', '3D/3dmodel.model', '3D/_rels/3dmodel.model.rels', 'Metadata/model_settings.config']:
        z.writestr(k, files[k])
    for k, v in files.items():
        if k.startswith('3D/Objects/'): z.writestr(k, v)

# plate preview data for rendering
prev = []
for pi, (pname, objs) in enumerate(PLATES):
    for o in objs:
        ms, off = LAYOUT[pi][o]
        for p, m in zip(OBJ[o], ms):
            prev.append(dict(plate=pi, name=pname, obj=o, part=p, slot=COLOR[p], v=(m.vertices[:, :2] + off).tolist() if False else None))
json.dump(dict(plates=[p for p, _ in PLATES], ncol=NCOL), open('/home/claude/eig3/plates.json', 'w'))
import pickle
pickle.dump({(pi, o): ([m.vertices + [*LAYOUT[pi][o][1], 0] for m in LAYOUT[pi][o][0]], [m.faces for m in LAYOUT[pi][o][0]], [COLOR[p] for p in OBJ[o]])
             for pi, (_, objs) in enumerate(PLATES) for o in objs}, open('/home/claude/eig3/plates.pkl', 'wb'))
print('plates', len(PLATES), 'cols', NCOL, '3mf size', os.path.getsize(f'{OUTD}/eigen_clock_v2.3mf') // 1024, 'kB')
