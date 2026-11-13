"""Eigenvector clock v3 - same train as v2, raised 5.4 mm to fit push-in pins and sockets."""
from design2 import *          # gear counts, centres, phases, rates, matrix sets (D, S, N)
import design2 as _d2
DZ = 5.4
Z = {k: (v if k == 'floor' else v + DZ) for k, v in _d2.Z.items()}
