import numpy as np
import matplotlib.pyplot as plt
import math


def vander(x):
    return np.array([[x_i**j for j in range(len(x))] for x_i in x])


def poly1d(c, t):
    return sum([c[i] * t**i for i in range(len(c))])


population = np.array([[252.120, 281.711, 309.011, 331.003],
                        [873.278, 1056.576, 1234.281, 1380.004],
                        [37.960, 38.557, 38.330, 37.847]])

time = np.arange(1990, 2030, 10)
t = time - 1990
print(t)

# Columns represent 1, t, t^2, ...
A = vander(t)
print(A)

# The coefficients for the cubic polynomial fitting each of (t_i, p_i)
c_usa = np.linalg.solve(A, population[0, :])
print(c_usa)

# Sanity checks - this evaluates the polynomial c_0 + c_1 t + c_2 t^2 + c_3 t^3 at each of the points we know
print([poly1d(c_usa, 10*i) for i in range(len(t))])
print('USA Population in 2005: ' + str(poly1d(c_usa, 2005 - 1990)) + " million")


# Using the derivative and quadratic formula to solve for the maximum of Poland's Population
c_poland = np.linalg.solve(A, population[2, :])
a = 3*c_poland[3]
b = 2*c_poland[2]
c = c_poland[1]
print("Poland population maximum at: " + str(1990 + (-b - math.sqrt(b**2 - 4*a*c))/(2*a)))


# Plot the results for India
c_india = np.linalg.solve(A, population[1, :])
plt.scatter(t, population[1, :])
t_higher_res = np.linspace(0, 30, 300)
plt.plot(t_higher_res, [poly1d(c_india, t_) for t_ in t_higher_res])
plt.xlabel("year")
plt.ylabel("population (millions)")
plt.title("Population of India")
plt.show()
