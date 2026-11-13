"""Eigenvector clock v3: every part in world (assembled, pose) coordinates.

Changes from v2/v2.1
- centre and crank axes ride on short push-in pins (separate parts, pressed up through the base floor)
- crank axle also bears in the ear lid (supported at both ends)
- fillets at the root of every remaining post, matching chamfers on gear bores; thicker carrier posts
- shaft keyway groove replaces the D-flat (no filler strips); sun, x hand, centre knob key into it
- v2.1 fits baked in: 0.15 mm radial on posts/shaft, ~0.05 mm on every key
- round islands (plain discs); thicker pin (4.5 mm) with root fillet; wider slot
"""
import os, json, numpy as np, manifold3d as m3
from shapely.geometry import Polygon, Point, LineString, box
from shapely.ops import unary_union
from shapely import affinity
from geom import gear2d, ext, circ, rot, text2d, save, to_cs
from design3 import *

OUT = os.environ.get('OUT', '/home/claude/eig3/world'); os.makedirs(OUT, exist_ok=True)
CLR = 0.15          # radial clearance: gear bores on posts, hubs on the shaft, sockets on pins
KEY = 0.05          # play in every key
INLAY = 0.6
EF = 0.2
zf = Z['floor']

def ext_ef(g, z0, z1):
    return ext(g.buffer(-EF), z0, z0 + 0.3) + ext(g, z0 + 0.3, z1)
def dshape(r, flat, c=(0, 0), ang=0.0):
    g = circ(r).intersection(box(-r - 1, -r - 1, flat, r + 1))
    return affinity.translate(rot(g, ang, origin=(0, 0)), *c)
def arrow2d(c, ang=90, L=4.0, W=2.8):
    tri = Polygon([(L / 2, 0), (-L / 2, W / 2), (-L / 2, -W / 2)])
    return affinity.translate(rot(tri, ang, origin=(0, 0)), *c)
def engrave(man, g2d, ztop, depth=0.6):
    return man - ext(g2d, ztop - depth, ztop + 1)
def ring(r0, r1, c=(0, 0)):
    return circ(r1, c).difference(circ(r0, c))
def G(name, c, m):
    return gear2d(T[name], PH[name], tuple(c), m)
def cone(c, r0, r1, z0, z1, steps=5):
    """stepped cone, radius r0 at z0 to r1 at z1"""
    out = None
    for i in range(steps):
        za, zb_ = z0 + (z1 - z0) * i / steps, z0 + (z1 - z0) * (i + 1) / steps
        r = r0 + (r1 - r0) * (i + 0.5) / steps
        s = ext(circ(r, tuple(c), n=96), za - 0.005, zb_ + 0.005)
        out = s if out is None else out + s
    return out
def post(c, r, z0, z1, fil=0.8):
    return ext(circ(r, tuple(c), n=96), z0 - 0.01, z1) + cone(c, r + fil, r, z0 - 0.01, z0 + fil)
def bore(c, r, z0, z1, ch=1.0):
    """bore with a bottom chamfer that clears the post fillet"""
    return ext(circ(r, tuple(c), n=96), z0 - 1, z1) + cone(c, r + ch, r, z0 - 0.01, z0 + ch)
def keyed_shaft(r=6.5):
    return circ(r, n=128).difference(box(5.1, -1.3, r + 1, 1.3))
def keyed_hole(c_r, r=6.5):
    return circ(r + c_r, n=128).difference(box(5.1 + 0.15, -1.3 + KEY, r + 2, 1.3 - KEY))

parts, color = {}, {}

# ============ base ============
Q = cCG
outline = unary_union([circ(99, n=512), Polygon(circ(22, tuple(Q)).union(circ(36, tuple(pol(68, CR)))).convex_hull)])
outline = outline.buffer(4, quad_segs=32).buffer(-4, quad_segs=32)
interior = outline.buffer(-3, quad_segs=32)
wall = outline.difference(interior)
FACE_R = 99.0
cand = [95, 205, 275, 290, 305]
PEGS = []
for a in cand:
    p = pol(97.5, a)
    c_ = Point(*p).buffer(1.4)
    if c_.intersection(wall).area > 0.99 * c_.area and len(PEGS) < 3: PEGS.append(p)
LID_PEGS = [Q + pol(20.3, CR + 52), Q + pol(20.3, CR - 52)]
R_PIN, PIN_TOP = 4.95, Z['L1'] + 13.3           # push-in pin: bearing stub radius and top
base = ext(outline, 0, zf) + ext(wall, zf - 0.01, Z['face'])
for k, w in enumerate((1.5, 1.0, 0.5)):           # stepped fillet where the wall meets the floor
    base += ext(interior.difference(interior.buffer(-w)), zf - 0.01 + 0.5 * k, zf + 0.5 * (k + 1))
for c, rb in [(O, 12.0), (Q, 10.0)]:              # sockets for the two push-in pins
    base += ext(circ(rb, tuple(c)), zf - 0.01, Z['L1']) + cone(c, rb + 2.0, rb, zf - 0.01, zf + 2.0)
    base -= ext(circ(5.05, tuple(c), n=96), -1, Z['L1'] + 1) + ext(circ(8.0, tuple(c), n=96), -1, 2.0)
for c in (cK, cCI):
    base += ext(circ(6, tuple(c)), zf - 0.01, Z['L1']) + post(c, 3.5, Z['L1'], Z['L2t'] - 0.2)
base += ext(circ(3.75, tuple(cJ)), zf - 0.01, Z['L2']) + post(cJ, 3.0, Z['L2'], Z['L2t'] - 0.2, fil=0.6)
for c in PEGS + LID_PEGS:
    base += ext(circ(1.4, tuple(c)), Z['face'] - 0.01, Z['face'] + 2.2)
base = engrave(base, arrow2d(pol(97.5, 90), 90, 4.5, 3.2), Z['face'], 0.8)
parts['base'] = base; color['base'] = 1

# ============ push-in pins (two identical) ============
for nm, c in [('centre_pin', O), ('crank_pin', Q)]:
    pn = ext(circ(7.8, tuple(c), n=96), 0.0, 2.0) + ext(circ(5.0, tuple(c), n=96), 1.99, Z['L1']) \
         + ext(circ(R_PIN, tuple(c), n=96), Z['L1'] - 0.01, PIN_TOP - 0.6) + cone(c, R_PIN, R_PIN - 0.6, PIN_TOP - 0.6, PIN_TOP, 3)
    parts[nm] = pn; color[nm] = 1

# ============ shaft + G1 (socket rides on the centre pin) ============
R_SH = 6.5
sh = ext_ef(G('G1', O, M_A), Z['L1'], Z['L1t']) + ext(circ(9), Z['L1t'] - 0.01, Z['L2']) \
     + ext(circ(R_SH, n=128), Z['L2'] - 0.01, Z['L4'] - 0.3) + ext(keyed_shaft(), Z['L4'] - 0.31, Z['shaftt'])
sh -= ext(circ(R_PIN + CLR, n=96), Z['L1'] - 1, PIN_TOP + 0.4) + cone(O, R_PIN + CLR + 0.8, R_PIN + CLR, Z['L1'] - 0.01, Z['L1'] + 0.8)
sh = engrave(sh, arrow2d((0, 11.3), 90, 3.0, 2.4), Z['L1t'], 0.6)
parts['shaft_G1'] = sh; color['shaft_G1'] = 1

# ============ layshaft K, idler J, crank idler ============
mk = ext_ef(G('K1', cK, M_A), Z['L1'], Z['L1t']) + ext(G('K2', cK, M_B), Z['L1t'] - 0.01, Z['L2t'])
parts['layshaft_K'] = mk - bore(cK, 3.5 + CLR, Z['L1'], 40); color['layshaft_K'] = 1
mj = ext_ef(G('J', cJ, M_B), Z['L2'], Z['L2t'])
parts['idler_J'] = mj - bore(cJ, 3.0 + CLR, Z['L2'], 40, ch=0.8); color['idler_J'] = 1
mci = ext_ef(G('CI', cCI, M_A), Z['L1'], Z['L1t']) + ext(circ(6, tuple(cCI)), Z['L1t'] - 0.01, Z['L2t'])
parts['crank_idler'] = mci - bore(cCI, 3.5 + CLR, Z['L1'], 40); color['crank_idler'] = 1

# ============ crank gear + solid axle (socket on crank pin; bears in the ear lid) ============
R_CA, F_CA = 7.0, 5.5
ZD0, ZD1 = Z['facet'] - 0.8, Z['facet'] + 6.2
mcg = ext_ef(G('CG', cCG, M_A), Z['L1'], Z['L1t']) + ext(circ(R_CA, tuple(cCG)), Z['L1t'] - 0.01, ZD0) \
      + ext(dshape(R_CA, F_CA, cCG), ZD0 - 0.01, ZD1)
mcg -= ext(circ(R_PIN + CLR, tuple(cCG), n=96), Z['L1'] - 1, PIN_TOP + 0.4) + cone(cCG, R_PIN + CLR + 0.8, R_PIN + CLR, Z['L1'] - 0.01, Z['L1'] + 0.8)
mcg = engrave(mcg, arrow2d(tuple(cCG + [0, 11.0]), 90, 3.0, 2.4), Z['L1t'], 0.6)
parts['crank_gear'] = mcg; color['crank_gear'] = 1

# ============ carrier hub + plate ============
mtc = ext_ef(G('Tc', O, M_B), Z['L2'], Z['L2t']) + ext(circ(11), Z['L2t'] - 0.01, Z['plate']) \
      + ext(dshape(9.0 + 0.1, 8.0 + 0.1), Z['plate'] - 0.01, Z['L4'])
mtc -= ext(circ(R_SH + CLR, n=128), 0, 60)
parts['carrier_hub'] = engrave(mtc, arrow2d((0, 10.0), 90, 2.4, 2.0), Z['plate'], 0.5); color['carrier_hub'] = 1
plate = circ(60.0, n=360).difference(dshape(9.0 + 0.15, 8.0 + 0.15))
for a in (60, 120, 180, 240, 300):
    plate = plate.difference(circ(9.5, tuple(pol(37, a))))
mcp = ext_ef(plate, Z['plate'], Z['platet'])
mcp += ext(circ(5.5, tuple(cI)), Z['platet'] - 0.01, Z['L4']) + post(cI, 3.5, Z['L4'], Z['L5t'])
mcp += ext(circ(6.0, tuple(cP)), Z['platet'] - 0.01, Z['L4']) + post(cP, 4.0, Z['L4'], Z['armt'] - 0.2)
for c, rb in [(cI, 5.5), (cP, 6.0)]:
    mcp += cone(c, rb + 1.5, rb, Z['platet'] - 0.01, Z['platet'] + 0.55, 3)     # fillet where the boss meets the plate
parts['carrier_plate'] = engrave(mcp, arrow2d((0, 22.5), 90, 5, 3.6), Z['platet'], 0.8); color['carrier_plate'] = 1

# ============ sun, carrier idler + lock, planet, island hub ============
ms = ext_ef(G('S', O, M_C), Z['L4'], Z['L4t']) + ext(circ(8), Z['L4t'] - 0.01, Z['L5'])
parts['sun'] = ms - ext(keyed_hole(KEY), 0, 60); color['sun'] = 1
mi = ext_ef(G('I', cI, M_C), Z['L4'], Z['L4t']) + ext(G('L', cI, M_D), Z['L4t'] - 0.01, Z['L5t'])
parts['idler_I_lock'] = mi - bore(cI, 3.5 + CLR, Z['L4'], 60); color['idler_I_lock'] = 1
R_PK, F_PK = 7.0, 5.6
mp = ext_ef(G('P', cP, M_C), Z['L4'], Z['L4t']) + ext(circ(8.5, tuple(cP)), Z['L4t'] - 0.01, Z['arm']) \
     + ext(dshape(R_PK, F_PK, cP), Z['arm'] - 0.01, Z['armt'] - 0.2)
parts['planet'] = mp - bore(cP, 4.0 + CLR, Z['L4'], 60); color['planet'] = 1
R_IF, F_IF = 8.65, 7.45
ZK = Z['face'] + 2.0
mis = ext_ef(G('Is', O, M_D), Z['L5'], Z['L5t']) + ext(circ(8.5), Z['L5t'] - 0.01, Z['face']) + ext(dshape(R_IF, F_IF), Z['face'] - 0.01, ZK)
parts['island_hub'] = mis - ext(circ(R_SH + CLR, n=128), 0, 70); color['island_hub'] = 1

# ============ Ax hand (black) with dovetail track, and red arrow ============
AXL, W_AX, X0 = 72.0, 9.0, 15.0
zb, zt = Z['ax'], Z['axt']
hand = circ(13).union(box(0, -W_AX, AXL, W_AX)).difference(circ(8.5 + 0.2))
max_ = ext(hand, zb, zt)
prof = Polygon([(-5.9, zb - 1), (5.9, zb - 1), (5.9, zb), (3.6, zb + 2.3), (3.6, zt + 1), (-3.6, zt + 1), (-3.6, zb + 2.3), (-5.9, zb)])
tr = m3.Manifold.extrude(to_cs(prof), AXL + 1 - X0).rotate([90, 0, 0]).rotate([0, 0, 90])
b = tr.bounding_box(); tr = tr.translate([X0 - b[0], -(b[1] + b[4]) / 2, 0])
parts['Ax_hand_local'] = max_ - tr; color['Ax_hand_local'] = 1
R_PINA = 2.25
arrow = Polygon([(12.5, 0), (-7.5, 7.2), (-3.5, 0), (-7.5, -7.2)])
cap = ext(arrow, zt, zt + 2.0) + ext(box(-4.5, -3.3, 4.5, 3.3), zb + 2.0 - 0.01, zt + 0.01)
foot = Polygon([(-3.3, zb + 2.0), (3.3, zb + 2.0), (5.2, zb + 0.1), (-5.2, zb + 0.1)])
footm = m3.Manifold.extrude(to_cs(foot), 9.0).rotate([90, 0, 0]).rotate([0, 0, 90])
fb = footm.bounding_box(); cap += footm.translate([-(fb[0] + fb[3]) / 2, -(fb[1] + fb[4]) / 2, 0])
cap -= ext(circ(R_PINA + 0.25, n=48), zb, Z['pint'] + 0.4)
parts['Ax_arrow_local'] = cap; color['Ax_arrow_local'] = 4

# ============ centre knob, ear lid ============
knob2d = circ(9).difference(unary_union([circ(0.9, tuple(pol(9, k * 360 / 18))) for k in range(18)]))
mk2 = ext(knob2d, Z['xht'], Z['knobt']) - ext(keyed_hole(0.03), Z['xht'] - 1, Z['shaftt'] + 0.2)
parts['centre_knob'] = engrave(mk2, text2d('x', 8.5), Z['knobt'], 0.8); color['centre_knob'] = 3
lid = outline.difference(circ(FACE_R, n=720)).buffer(-0.3).buffer(0.3)
lid = max([g for g in getattr(lid, 'geoms', [lid])], key=lambda g: g.area)
lid = lid.difference(circ(R_CA + 0.25, tuple(cCG), n=96))        # top bearing for the crank axle
for c in LID_PEGS: lid = lid.difference(circ(1.6, tuple(c)))
parts['ear_lid'] = ext(lid, Z['face'], Z['facet']); color['ear_lid'] = 1

# ============ per-set parts ============
def matrix_block(A, size=7.6, colgap=3.6, rowgap=8.4):
    dh = text2d('0', size).bounds; dh = dh[3] - dh[1]
    minus = text2d('−', size); mw = minus.bounds[2] - minus.bounds[0]; gap_m = 0.5
    cols = []
    for j in range(2):
        ents = [A[i][j] for i in range(2)]; digs = [text2d(str(abs(int(v))), size) for v in ents]
        dw = max(g.bounds[2] - g.bounds[0] for g in digs); neg = any(v < 0 for v in ents)
        cols.append(dict(ents=ents, digs=digs, w=dw + (mw + gap_m if neg else 0)))
    total = cols[0]['w'] + colgap + cols[1]['w']; gs = []; x = -total / 2
    for col in cols:
        right = x + col['w']
        for i, (v, g) in enumerate(zip(col['ents'], col['digs'])):
            y = rowgap / 2 if i == 0 else -rowgap / 2; gb = g.bounds
            gg = affinity.translate(g, right - gb[2], y - (gb[1] + gb[3]) / 2); gs.append(gg)
            if v < 0:
                mb = minus.bounds; gs.append(affinity.translate(minus, gg.bounds[0] - gap_m - mb[2], y - (mb[1] + mb[3]) / 2))
        x = right + colgap
    H = rowgap + dh + 3.2; bw = 1.0; lip = 1.5; xl, xr = -total / 2 - 1.8, total / 2 + 1.8
    gs += [box(xl - bw, -H / 2, xl, H / 2), box(xl - bw, H / 2 - bw, xl + lip, H / 2), box(xl - bw, -H / 2, xl + lip, -H / 2 + bw),
           box(xr, -H / 2, xr + bw, H / 2), box(xr - lip, H / 2 - bw, xr + bw, H / 2), box(xr - lip, -H / 2, xr + bw, -H / 2 + bw)]
    eq = text2d('A =', size); eb = eq.bounds; gs.append(affinity.translate(eq, xl - bw - 2.2 - eb[2], -(eb[1] + eb[3]) / 2))
    g = unary_union(gs); b = g.bounds
    return affinity.translate(g, -(b[0] + b[2]) / 2, -(b[1] + b[3]) / 2)
def ellipse_poly(A, s, n=720):
    t = np.linspace(0, 2 * np.pi, n, endpoint=False)
    return Polygon((s * (np.array(A, float) @ np.vstack([np.cos(t), np.sin(t)]))).T)
def fit_radius(g, a, forbid, rmax):
    ok = [r for r in np.arange(10, rmax, 0.25) if affinity.translate(g, *pol(r, a)).disjoint(forbid) and Point(0, 0).buffer(rmax).contains(affinity.translate(g, *pol(r, a)))]
    if not ok: raise RuntimeError('no room for label at %s' % a)
    runs, cur = [], [ok[0]]
    for r in ok[1:]:
        if r - cur[-1] < 0.3: cur.append(r)
        else: runs.append(cur); cur = [r]
    runs.append(cur); run = max(runs, key=len)
    return affinity.translate(g, *pol((run[0] + run[-1]) / 2, a))

SLOT = 3.75
LAYOUT = {}
for key, d in SETS.items():
    A, s = d['A'], d['s']
    ell = ellipse_poly(A, s)
    outer = circ(FACE_R, n=720).difference(ell.buffer(SLOT, quad_segs=32))
    for c in PEGS: outer = outer.difference(circ(1.6, tuple(c)))
    forbid = ell.buffer(SLOT + 2.5); BAND = 90.5
    white, eig_dirs = [], []
    for lam, a0 in d['eig']:
        for a in (a0, a0 + 180):
            a %= 360; eig_dirs.append(a)
            lab = fit_radius(text2d('λ = ' + str(int(round(lam))).replace('-', '−'), 7.6), a, forbid, BAND)
            white.append(lab); lb = lab.buffer(1.8); r = 13.5
            while r < 92:
                seg = LineString([pol(r, a), pol(min(r + 3.2, 92), a)]).buffer(0.6, cap_style=2)
                if seg.disjoint(lb) and Point(0, 0).buffer(BAND).contains(seg): white.append(seg)
                r += 5.2
            white.append(LineString([pol(90.0, a), pol(97.6, a)]).buffer(0.8, cap_style=2))
    for t in range(0, 360, 10):
        if any(abs(((t - a + 180) % 360) - 180) < 1.0 for a in eig_dirs): continue
        major = t % 30 == 0
        white.append(LineString([pol(92.6 if major else 94.6, t), pol(97.6, t)]).buffer(0.55 if major else 0.42, cap_style=2))
    white.append(fit_radius(text2d(d['name'], 9.0), d['name_at'], forbid, BAND))
    white.append(fit_radius(matrix_block(A), d['mat_at'], forbid, BAND))
    white = unary_union(white)
    purple = ring(s - 0.7, s + 0.7)
    white = white.difference(purple.buffer(0.35))
    keep = outer.buffer(-0.7)
    for c in PEGS: keep = keep.difference(circ(2.4, tuple(c)))
    wi, pu = white.intersection(keep).buffer(0), purple.intersection(keep).buffer(0)
    top = Z['facet']
    body = ext(outer, Z['face'], top)
    rec = [g for g in (wi, pu) if not g.is_empty]
    if rec: body -= ext(unary_union(rec), top - INLAY, top + 1)
    parts[f'{key}_face'] = body; color[f'{key}_face'] = 1
    if not wi.is_empty: parts[f'{key}_face_WHITE'] = ext(wi, top - INLAY, top); color[f'{key}_face_WHITE'] = 2
    if not pu.is_empty: parts[f'{key}_face_PURPLE'] = ext(pu, top - INLAY, top); color[f'{key}_face_PURPLE'] = 3
    # round island (plain disc)
    R_D = d['rmin'] - 4.0
    bd = ext(circ(R_D, n=360), Z['face'], top) - ext(dshape(R_IF + KEY, F_IF + KEY), Z['face'] - 1, ZK + 0.2)
    bd += ext(circ(11), top - 0.01, Z['ax']) + ext(circ(8.5), Z['ax'] - 0.01, Z['axt'] - 0.2)
    bd -= ext(circ(R_SH + 0.2, n=128), 0, 70)
    bd = engrave(bd, affinity.translate(text2d(key, 4.0), *pol((R_D + 11) / 2, 270)), top, 0.4)
    parts[f'{key}_disc'] = bd; color[f'{key}_disc'] = 1
    # planet arm + pin
    pin = cP + pol(d['e'], d['gamma'])
    arm = unary_union([circ(11, tuple(cP)), LineString([tuple(cP), tuple(pin)]).buffer(3.5), circ(4.75, tuple(pin))])
    arm = arm.difference(dshape(R_PK + KEY, F_PK + KEY, cP))
    ma = ext_ef(arm, Z['arm'], Z['armt']) + ext(circ(R_PINA, tuple(pin), n=48), Z['armt'] - 0.01, Z['pint']) \
         + cone(pin, R_PINA + 0.8, R_PINA, Z['armt'] - 0.01, Z['armt'] + 0.8, 4)
    ma = engrave(ma, affinity.translate(text2d(key, 5.0), *(cP + pol(8.0, d['gamma'] + 180))), Z['armt'], 0.6)
    parts[f'{key}_arm'] = ma; color[f'{key}_arm'] = 1
    # x hand (purple)
    sx = d['s']
    hnd = rot(unary_union([circ(8), box(0, -2.3, sx - 7, 2.3), Polygon([(sx - 8, -4.8), (sx, 0), (sx - 8, 4.8)])]), d['delta'], origin=(0, 0))
    mx = ext(circ(8), Z['xh'], Z['xht']) + ext(hnd, Z['xarm'], Z['xht'])
    parts[f'{key}_x_hand'] = mx - ext(keyed_hole(KEY), 0, 70); color[f'{key}_x_hand'] = 3
    # crank knob (purple), arrow parallel to x
    kn = circ(10.5, tuple(cCG)).difference(unary_union([circ(1.0, tuple(cCG + pol(10.5, k * 360 / 22))) for k in range(22)]))
    mkn = ext(kn, Z['facet'] + 0.6, Z['facet'] + 9.6) - ext(dshape(R_CA + KEY, F_CA + KEY, cCG), Z['facet'], ZD1 + 0.2)
    arr = unary_union([box(-5.5, -1.1, 2.5, 1.1), Polygon([(1.5, -3.4), (6.5, 0), (1.5, 3.4)])])
    mkn = engrave(mkn, affinity.translate(rot(arr, d['delta'], origin=(0, 0)), *cCG), Z['facet'] + 9.6, 0.8)
    mkn = engrave(mkn, affinity.translate(text2d(key, 3.4), *(cCG + pol(6.2, d['delta'] - 90))), Z['facet'] + 9.6, 0.6)
    parts[f'{key}_crank_knob'] = mkn; color[f'{key}_crank_knob'] = 3
    LAYOUT[key] = dict(pin=pin.tolist(), R_D=R_D)

for k, v in parts.items():
    save(v, f'{OUT}/{k}.stl')
json.dump(dict(color=color, layout=LAYOUT, pegs=[list(p) for p in PEGS]), open(f'{OUT}/meta.json', 'w'), indent=1)
print('built', len(parts), 'face pegs at', [round(float(np.degrees(np.arctan2(p[1], p[0]))) % 360) for p in PEGS])
