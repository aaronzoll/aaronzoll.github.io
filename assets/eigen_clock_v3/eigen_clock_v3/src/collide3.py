import itertools, sys, numpy as np
from pose3 import *
same_body = lambda a, b: a.split('_WHITE')[0].split('_PURPLE')[0] == b.split('_WHITE')[0].split('_PURPLE')[0]
worst = {}
step = float(sys.argv[1]) if len(sys.argv) > 1 else 5
for key in SETS:
    for phi in np.arange(0, 360, step):
        P = posed(key, phi)
        bb = {k: np.array(v.bounding_box()) for k, v in P.items()}
        for a, b in itertools.combinations(P, 2):
            if same_body(a, b): continue
            A, B = bb[a], bb[b]
            if np.any(A[:3] > B[3:]) or np.any(B[:3] > A[3:]): continue
            v = (P[a] ^ P[b]).volume()
            if v > 0.01:
                k = (key, a, b); worst[k] = max(worst.get(k, 0), v)
for k, v in sorted(worst.items()): print(k, round(v, 3))
print('collisions:', len(worst))
