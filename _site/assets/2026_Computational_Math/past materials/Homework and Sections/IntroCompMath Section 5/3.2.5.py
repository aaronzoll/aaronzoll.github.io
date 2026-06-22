import random
import numpy as np

m = 6
n = 3
A = np.array([[random.random() for _ in range(m)] for _ in range(n)])
A_pinv = np.linalg.pinv(A)
print(A @ A_pinv)
print(A_pinv @ A)