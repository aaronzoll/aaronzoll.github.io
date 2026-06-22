import math

x = 10**-6

# Calculating f(x)
u1 = math.cos(x)
print("u1 = " + str(u1))
print("K_cos(x) = " + str(x * math.tan(x)))
print()

u2 = 1 - u1
print("u2 = " + str(u2))
print("K_{1 - u1}(u1) = " + str(abs(u1)/(abs(u1 - 1))))
print()

u3 = math.sin(x)
print("u3 = " + str(u3))
print("K_sin(x) = " + str(abs(x/math.tan(x))))
print()

f = u2/u3
print("f = " + str(f))
print("K_{u2/u3} = 1")
print()
print("--------------------------------------")


# Calculating g(x)
v1 = x/2
print("v1 = " + str(v1))
print("K_{x/2}(x) = 1")
print()

v2 = math.sin(v1)
print("v2 = " + str(v2))
print("K_sin(v1) " + str(abs(v1/math.tan(v1))))
print()

v3 = v2**2
print("v3 = " + str(v3))
print("K_{x^2}(v2) = 2")
print()

v4 = 2*v3
print("v4 = " + str(v4))
print("K_{2*v3}(v3) = 1")
print()

v5 = math.sin(x)
print("v5 = " + str(v5))
print("K_sin(x) " + str(abs(x/math.tan(x))))
print()

g = v4/v5
print("g = " + str(g))
print("K_{v4/v5}(x) = 1")
print()