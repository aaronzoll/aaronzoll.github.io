import numpy as np
import matplotlib.pyplot as plt
import math

import numpy.linalg

r = 1
s = [1]
pi_2 = math.pi/2
e = [abs(s[0] - pi_2)]
for k in range(1, 20):
    r = r * k/(2*k + 1)
    s_k = s[k-1] + r
    s.append(s_k)
    e.append(abs(s_k - pi_2))

plt.scatter(range(1, 21), e)
plt.yscale('log')


# We start with e_k ~ ab^k
# Reformulating to solve as a linear least squares:
# We have ln(e_k) = ln(a) + (k ln(b))
# Let A be the matrix where we insert a row for each data point (value of k)
A = np.array([[1, k] for k in range(1, 21)])
x, _, _, _ = numpy.linalg.lstsq(A, np.log(e))

k_ = np.linspace(1, 21, 200)
plt.plot(k_, np.exp(x[0] + k_ * x[1]))
plt.show()