"""Data for the eigenvector clock viewer (prints/apps/eigen-clock.html).

The STLs in assets/eigen_clock_v3/eigen_clock_v3/stl/ are in print orientation:
export3.py flips a few parts upside down, then centres each object on the bed with
its bottom at z = 0. This script recovers, for every STL, the offset that puts it
back in its assembled place, and bundles the gear-train constants the viewer
needs to move the parts exactly as pose3.py does.

The assembled-pose meshes are not shipped, so regenerate them first (needs
manifold3d, shapely, trimesh, matplotlib):

    cd assets/eigen_clock_v3/eigen_clock_v3/src
    OUT=/some/tmp/world python build3.py
    python prints/_build_eigen_clock.py /some/tmp/world

Writes prints/apps/eigen-clock-data.json.
"""
import json, os, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'assets', 'eigen_clock_v3', 'eigen_clock_v3', 'src')
sys.path.insert(0, SRC)
from design3 import C, cCI, cCG, cK, cJ, cI, cP, RATE, SETS, Z   # noqa: E402

WORLD = sys.argv[1]
STL_URL = '/assets/eigen_clock_v3/eigen_clock_v3/stl/'
FLIP = {'Ax_arrow_local', 'D_x_hand', 'S_x_hand', 'N_x_hand'}
COLOR = json.load(open(os.path.join(WORLD, 'meta.json')))['color']


def verts(n):
    v = np.load(os.path.join(WORLD, n + '.npz'))['v'].astype(float)
    return v * [1, -1, -1] if n in FLIP else v


def offset(obj_parts):
    """export3.oriented(): the shift applied to every part of one printed object."""
    allv = np.vstack([verts(p) for p in obj_parts])
    lo, hi = allv.min(0), allv.max(0)
    return [round(float((lo[0] + hi[0]) / 2), 5), round(float((lo[1] + hi[1]) / 2), 5), round(float(lo[2]), 5)]


# printed file -> (world part, parts of its printed object)
files = {}
common = ['base', 'centre_pin', 'crank_pin', 'ear_lid', 'shaft_G1', 'layshaft_K', 'idler_J', 'crank_idler',
          'crank_gear', 'carrier_hub', 'carrier_plate', 'sun', 'idler_I_lock', 'planet', 'island_hub', 'centre_knob']
for n in common:
    files[n] = ('common/' + n, n, [n])
files['Ax_hand'] = ('common/Ax_hand', 'Ax_hand_local', ['Ax_hand_local'])
files['Ax_arrow'] = ('common/Ax_arrow', 'Ax_arrow_local', ['Ax_arrow_local'])
for k in 'DSN':
    face = [f'{k}_face', f'{k}_face_WHITE']
    files[f'{k}_face'] = (f'set_{k}/{k}_face', f'{k}_face', face)
    files[f'{k}_face_WHITE'] = (f'set_{k}/{k}_face_WHITE', f'{k}_face_WHITE', face)
    for p in ('disc', 'arm', 'x_hand', 'crank_knob'):
        files[f'{k}_{p}'] = (f'set_{k}/{k}_{p}', f'{k}_{p}', [f'{k}_{p}'])

parts = {}
for name, (path, world, obj) in files.items():
    parts[name] = dict(url=STL_URL + path + '.stl', flip=world in FLIP, shift=offset(obj), slot=COLOR[world])

r2 = lambda p: [round(float(p[0]), 5), round(float(p[1]), 5)]
sets = {}
for k, d in SETS.items():
    sets[k] = dict(A=d['A'], name=d['name'].title().replace('-S', '-s'), s=d['s'], e=d['e'], delta=d['delta'], gamma=d['gamma'],
                   eig=[[float(l), float(a)] for l, a in d['eig']])

data = dict(
    C=C, centres=dict(CI=r2(cCI), CG=r2(cCG), K=r2(cK), J=r2(cJ), I=r2(cI), P=r2(cP)),
    rate={k: float(v) for k, v in RATE.items()}, z={k: float(v) for k, v in Z.items()},
    sets=sets, parts=parts,
)
out = os.path.join(HERE, 'apps', 'eigen-clock-data.json')
json.dump(data, open(out, 'w'), indent=1)
print('wrote', out, len(parts), 'parts')
