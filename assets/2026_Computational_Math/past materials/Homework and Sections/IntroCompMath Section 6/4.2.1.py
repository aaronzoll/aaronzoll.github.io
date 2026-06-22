import math
import matplotlib.pyplot as plt

def g_a(x):
    return 1 + x - x**2/9

def g_b(x):
    return math.pi + math.sin(x)/4

def g_c(x):
    return x + 1 - math.tan(x/4)

x_a = [1]
x_b = [1]
x_c = [1]
for i in range(25):
    x_a.append(g_a(x_a[i]))
    x_b.append(g_b(x_b[i]))
    x_c.append(g_c(x_c[i]))
k = [i for i in range(26)]

e_a = [abs(x - 3) for x in x_a]
e_b = [abs(x - math.pi) for x in x_b]
e_c = [abs(x - math.pi) for x in x_c]

plt.plot(k, e_a, label='a')
plt.plot(k, e_b, label='b')
plt.plot(k, e_c, label='c')
plt.yscale('log')
plt.legend()
plt.title('Fixed Point Iteration Error Convergence')
plt.show()

print(e_a[-1]/e_a[-2])
print(e_b[-1]/e_b[-2])
print(e_c[-1]/e_c[-2])