import numpy as np


def forwardsub(L, b):
    """
     forwardsub(L,b)

    Solve the lower-triangular linear system with matrix L and right-hand side
    vector b.
    """

    n = len(b)
    x = np.zeros(n)
    for i in range(n):
        s = L[i,:i] @ x[:i]
        x[i] = (b[i] - s) / L[i, i]
    return x


def backsub(U, b):
    """
    backsub(U,b)

    Solve the upper-triangular linear system with matrix U and right-hand side
    vector b.
    """
    n = len(b)
    x = np.zeros(n)
    for i in range(n-1, -1, -1):
        s = U[i, i+1:] @ x[i+1:]
        x[i] = (b[i] - s) / U[i, i]
    return x


A1 = np.array([[-2, 0, 0], [1, -1, 0], [3, 2, 1]])
b1 = np.array([-4, 2, 1])
print(forwardsub(A1, b1))

A2 = np.array([[4, 0, 0, 0], [1, -2, 0, 0], [-1, 4, 4, 0], [2, -5, 5, 1]])
b2 = np.array([-4, 1, -3, 5])
print(forwardsub(A2, b2))

A3 = np.array([[3, 2, 1], [0, 1, -1], [0, 0, 2]])
b3 = np.array([1, 2, -4])
print(backsub(A3, b3))