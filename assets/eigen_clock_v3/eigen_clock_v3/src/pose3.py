import os, numpy as np, manifold3d as m3, json
from design3 import *
WORLD = os.environ.get('WORLD', '/home/claude/eig3/world')
META = json.load(open(WORLD + '/meta.json'))
_cache = {}
def load(n):
    if n not in _cache:
        z = np.load(f'{WORLD}/{n}.npz'); mm = m3.Manifold(m3.Mesh(z['v'], z['f'])); assert mm.volume() > 0, n; _cache[n] = mm
    return _cache[n]
def has(n): return os.path.exists(f'{WORLD}/{n}.npz')
def R(m, deg, c=(0, 0)):
    return m.translate([-c[0], -c[1], 0]).rotate([0, 0, deg]).translate([c[0], c[1], 0])
def pin_at(key, phi):
    d = SETS[key]; return pol(C, -phi) + pol(d['e'], d['gamma'] + phi)
def posed(key, phi):
    rel = lambda r: (r - RATE['Tc']) * phi
    out = {}
    for n in ['base', 'centre_pin', 'crank_pin', 'ear_lid', 'island_hub', f'{key}_face', f'{key}_face_WHITE', f'{key}_face_PURPLE', f'{key}_disc']:
        if has(n): out[n] = load(n)
    for n in ['shaft_G1', 'sun', 'centre_knob', f'{key}_x_hand']:
        out[n] = R(load(n), phi)
    out['layshaft_K'] = R(load('layshaft_K'), RATE['K'] * phi, cK)
    out['idler_J'] = R(load('idler_J'), RATE['J'] * phi, cJ)
    out['crank_idler'] = R(load('crank_idler'), RATE['CI'] * phi, cCI)
    out['crank_gear'] = R(load('crank_gear'), phi, cCG)
    out[f'{key}_crank_knob'] = R(load(f'{key}_crank_knob'), phi, cCG)
    out['carrier_hub'] = R(load('carrier_hub'), -phi)
    out['carrier_plate'] = R(load('carrier_plate'), -phi)
    out['idler_I_lock'] = R(R(load('idler_I_lock'), rel(RATE['I']), cI), -phi)
    out['planet'] = R(R(load('planet'), rel(RATE['P']), cP), -phi)
    out[f'{key}_arm'] = R(R(load(f'{key}_arm'), rel(RATE['P']), cP), -phi)
    p = pin_at(key, phi); ang = np.degrees(np.arctan2(p[1], p[0])); r = np.hypot(*p)
    out['Ax_hand'] = R(load('Ax_hand_local'), ang)
    out['Ax_arrow'] = R(load('Ax_arrow_local').translate([r, 0, 0]), ang)
    return out
