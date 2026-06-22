import math

def k(x):
    a = -1/(x - math.sqrt(x**2 - 1))
    b = 1 - (2*x)/(2*math.sqrt(x**2 - 1))
    c = -math.log(x - math.sqrt(x**2 - 1))
    return abs(x * a * b/c)


y = [-4*i for i in range(1,5)]
x = [math.cosh(i) for i in y]

k_x = [k(i) for i in x]
print(k_x)

f_approx = [-math.log(i - math.sqrt(i**2 - 1)) for i in x]
print(f_approx)

g_approx = [2*math.log(math.sqrt((i+1)/2) + math.sqrt((i-1)/2)) for i in x]
print(g_approx)