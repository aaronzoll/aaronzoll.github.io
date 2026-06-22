import numpy as np
import matplotlib.pyplot as plt

def vander(x, p):
    return np.array([[x_i**j for j in range(p)] for x_i in x])


m = 400
t = np.linspace(-1, 1, m+1)
p = 5 # degree p-1 is the approximation we are using

A = vander(t, p)
print(A)

Q, R = np.linalg.qr(A)
print(Q)

for i in range(p):
    plt.plot(t, Q[:,i], label='x^' + str(i))
plt.title('Q for a Vandermonde Matrix')
plt.xlabel('t')
plt.legend()
plt.show()