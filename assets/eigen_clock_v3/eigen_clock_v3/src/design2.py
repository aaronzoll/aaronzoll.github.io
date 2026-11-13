"""Eigenvector clock v2 - geometry, gear train and matrix sets (all mm, degrees)."""
import numpy as np

def pol(r, a):
    return np.array([r * np.cos(np.radians(a)), r * np.sin(np.radians(a))])

# ---------------- fixed-axis train (base frame) ----------------
CR = -38.0                      # direction of the crank ear
O = np.array([0.0, 0.0])
M_A = 1.5                       # module, layer L1 (crank chain, G1-K1)
M_B = 1.25                      # module, layer L2 (K2-J-Tc)
T = dict(G1=20, CI=52, CG=20, K1=30, K2=30, J=16, Tc=20,      # base frame
         S=14, I=14, P=14, L=14, Is=28)                         # carrier frame
M_C = 1.5                       # sun / idler / planet
M_D = 1.0                       # island lock pair
C = 42.0                        # carrier radius (planet centre)
cCI = pol(54.0, CR)             # crank idler
cCG = pol(108.0, CR)            # crank gear / knob axis
cK = pol(37.5, 140.0)
cJ = np.array([-22.16202, -3.88640])
cI = np.array([C / 2, 0.0])     # carrier frame
cP = np.array([C, 0.0])

def mesh_phase(Na, tha, ca, Nb, cb):
    """Tooth-centre angle of gear B so that it meshes gear A (tooth at tha) at the pose."""
    u = np.degrees(np.arctan2(*(np.asarray(cb) - np.asarray(ca))[::-1]))
    return u + 180 + (360 / Nb) * (0.5 - Na * (tha - u) / 360)

PH = {}
PH['G1'] = 0.0
PH['K1'] = mesh_phase(T['G1'], PH['G1'], O, T['K1'], cK)
PH['K2'] = PH['K1']
PH['J'] = mesh_phase(T['K2'], PH['K2'], cK, T['J'], cJ)
PH['Tc'] = mesh_phase(T['J'], PH['J'], cJ, T['Tc'], O)
PH['CI'] = mesh_phase(T['G1'], PH['G1'], O, T['CI'], cCI)
PH['CG'] = mesh_phase(T['CI'], PH['CI'], cCI, T['CG'], cCG)
PH['S'] = 0.0
PH['I'] = mesh_phase(T['S'], PH['S'], O, T['I'], cI)
PH['L'] = PH['I']
PH['P'] = mesh_phase(T['I'], PH['I'], cI, T['P'], cP)
PH['Is'] = mesh_phase(T['L'], PH['L'], cI, T['Is'], O)

# rates (per unit shaft angle phi), absolute
RATE = dict(G1=1, CI=-T['G1'] / T['CI'], CG=1, K=-T['G1'] / T['K1'])
RATE['J'] = -T['K2'] / T['J'] * RATE['K']
RATE['Tc'] = -T['J'] / T['Tc'] * RATE['J']          # carrier = -1
RATE['S'] = 1
RATE['I'] = RATE['Tc'] - T['S'] / T['I'] * (1 - RATE['Tc'])
RATE['P'] = RATE['Tc'] - T['I'] / T['P'] * (RATE['I'] - RATE['Tc'])
RATE['Is'] = RATE['Tc'] - T['L'] / T['Is'] * (RATE['I'] - RATE['Tc'])

# ---------------- z levels ----------------
Z = dict(floor=3.0, L1=3.6, L1t=8.6, L2=9.2, L2t=14.2, plate=14.8, platet=17.8,
         L4=18.4, L4t=23.4, L5=24.0, L5t=28.0, arm=28.6, armt=31.6,
         face=32.2, facet=35.2, ax=37.2, axt=41.2, xh=41.6, xarm=43.6, xht=46.6,
         knobt=54.6, shaftt=52.6, pint=42.2)

# ---------------- matrices ----------------
SETS = {
    'D': dict(A=[[2, 0], [0, -1]], name='DIAGONAL', name_at=45, mat_at=225),
    'S': dict(A=[[1, 2], [2, 1]], name='SYMMETRIC', name_at=90, mat_at=270),
    'N': dict(A=[[2, 1], [0, -1]], name='NON-SYMMETRIC', name_at=54, mat_at=234),
}
def pq(A):
    a, b, c, d = np.ravel(A)
    return ((a + d) + 1j * (c - b)) / 2, ((a - d) + 1j * (c + b)) / 2
for k, d in SETS.items():
    A = np.array(d['A'], float); p, q = pq(A)
    d['s'] = C / abs(q); d['e'] = C * abs(p) / abs(q)
    d['delta'] = np.degrees(np.angle(q)); d['gamma'] = np.degrees(np.angle(p) + np.angle(q))
    w, V = np.linalg.eig(A)
    d['eig'] = [(float(w[i].real), float(np.degrees(np.arctan2(V[1, i].real, V[0, i].real)) % 180)) for i in range(2)]
    sv = np.linalg.svd(A)[1]; d['rmax'], d['rmin'] = sv[0] * d['s'], sv[1] * d['s']

if __name__ == '__main__':
    print({k: round(v, 3) for k, v in RATE.items()})
    for k, d in SETS.items():
        print(k, {kk: (np.round(v, 2) if not isinstance(v, (str, list)) else v) for kk, v in d.items() if kk not in ('A',)})
