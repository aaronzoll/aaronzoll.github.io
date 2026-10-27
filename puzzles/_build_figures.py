"""Build the puzzle-set figures as inline SVG snippets in puzzles/_figures/.

Each figure is rebuilt from the TikZ in the LaTeX source. Coordinates are kept
in TikZ units (y up). Digits and words are drawn as SVG text; anything that
needs real math (fractions, subscripts, primes) is a MathJax label laid over
the SVG and sized in container units, so it scales with the figure.

Run from anywhere:  python puzzles/_build_figures.py
Pages pull the output in with {% include_relative _figures/<name>.html %}.
"""

import math
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_figures")

# Palette shared with the apps (x digits, y digits, products) and math-envs.css.
BLUE = "#2E6CB5"
BLUE_BG = "#EEF4FF"
ORANGE = "#C2671B"
GREEN = "#3C8031"
RED = "#B7312C"
INK = "#263238"
GRAY = "#78909c"
LIGHT = "#b0bec5"
FONT = 'Garamond,"EB Garamond",Georgia,serif'


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


class Fig:
    def __init__(self, name, x0, y0, x1, y1, px, alt):
        self.name, self.alt = name, alt
        self.x0, self.y0, self.x1, self.y1, self.px = x0, y0, x1, y1, px
        self.w, self.h = (x1 - x0) * px, (y1 - y0) * px
        self.els, self.labs, self.defs = [], [], []

    def X(self, x):
        return (x - self.x0) * self.px

    def Y(self, y):
        return (self.y1 - y) * self.px

    def pts(self, ps):
        return " ".join(f"{f(self.X(x))},{f(self.Y(y))}" for x, y in ps)

    @staticmethod
    def attrs(stroke=INK, width=1.2, fill="none", dash=None, extra=""):
        a = f'stroke="{stroke}" stroke-width="{width}" fill="{fill}"'
        if dash:
            a += f' stroke-dasharray="{dash}"'
        return a + extra

    def line(self, ps, **kw):
        self.els.append(f'<polyline points="{self.pts(ps)}" {self.attrs(**kw)} stroke-linejoin="round" stroke-linecap="round"/>')

    def poly(self, ps, **kw):
        self.els.append(f'<polygon points="{self.pts(ps)}" {self.attrs(**kw)} stroke-linejoin="round"/>')

    def circle(self, c, r, **kw):
        self.els.append(f'<circle cx="{f(self.X(c[0]))}" cy="{f(self.Y(c[1]))}" r="{f(r * self.px)}" {self.attrs(**kw)}/>')

    def rect(self, x, y, w, h, rx=0, **kw):
        self.els.append(f'<rect x="{f(self.X(x))}" y="{f(self.Y(y + h))}" width="{f(w * self.px)}" height="{f(h * self.px)}" rx="{f(rx * self.px)}" {self.attrs(**kw)}/>')

    def dot(self, c, r=3.2, fill=INK, stroke="none"):
        self.els.append(f'<circle cx="{f(self.X(c[0]))}" cy="{f(self.Y(c[1]))}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="1.3"/>')

    def arrow(self, a, b, **kw):
        self.line([a, b], **kw)
        ang = math.atan2(b[1] - a[1], b[0] - a[0])
        s = 7 / self.px
        tip = [b, (b[0] - s * math.cos(ang - 0.4), b[1] - s * math.sin(ang - 0.4)),
               (b[0] - s * math.cos(ang + 0.4), b[1] - s * math.sin(ang + 0.4))]
        self.poly(tip, stroke=kw.get("stroke", INK), width=1, fill=kw.get("stroke", INK))

    def text(self, c, s, size=16, fill=INK, italic=False):
        style = ' font-style="italic"' if italic else ""
        self.els.append(f'<text x="{f(self.X(c[0]))}" y="{f(self.Y(c[1]))}" font-size="{size}" fill="{fill}"{style} '
                        f'text-anchor="middle" dominant-baseline="central">{s}</text>')

    def brace(self, p, q, amp=0.12, **kw):
        """Curly brace from p to q, bulging to the left of the direction p -> q (TikZ convention)."""
        dx, dy = q[0] - p[0], q[1] - p[1]
        L = math.hypot(dx, dy)
        ux, uy = dx / L, dy / L
        nx, ny = -uy, ux

        def P(t, s):
            return (p[0] + ux * t + nx * s, p[1] + uy * t + ny * s)

        a = amp
        seq = [("M", [P(0, 0)]), ("Q", [P(0, a), P(a, a)]), ("L", [P(L / 2 - a, a)]),
               ("Q", [P(L / 2, a), P(L / 2, 2 * a)]), ("Q", [P(L / 2, a), P(L / 2 + a, a)]),
               ("L", [P(L - a, a)]), ("Q", [P(L, a), P(L, 0)])]
        d = " ".join(cmd + " " + " ".join(f"{f(self.X(x))},{f(self.Y(y))}" for x, y in ps) for cmd, ps in seq)
        self.els.append(f'<path d="{d}" {self.attrs(**kw)}/>')
        return P(L / 2, 2 * a)

    def lab(self, c, tex, anchor="center", gap=5, color=None, size=18):
        """MathJax label at TikZ point c; anchor follows TikZ (node[below right] etc.).
        size is in px at the figure's largest display width and scales down with it."""
        tx = {"left": "-100%", "right": "0%"}
        ty = {"above": "-100%", "below": "0%"}
        parts = anchor.split()
        hx = next((tx[p] for p in parts if p in tx), "-50%")
        hy = next((ty[p] for p in parts if p in ty), "-50%")
        gx = -gap if "left" in parts else gap if "right" in parts else 0
        gy = -gap if "above" in parts else gap if "below" in parts else 0
        left = 100 * self.X(c[0]) / self.w
        top = 100 * self.Y(c[1]) / self.h
        col = f"color:{color};" if color else ""
        self.labs.append(lambda maxw: (
            f'<span class="pz-lab" style="left:{left:.2f}%;top:{top:.2f}%;font-size:{100 * size / maxw:.3f}cqw;{col}'
            f'transform:translate(calc({hx} + {gx}px),calc({hy} + {gy}px))">\\({tex}\\)</span>'))

    def save(self, maxw=None):
        maxw = maxw or round(self.w)
        self.labs = [lab(maxw) for lab in self.labs]
        svg = (f'<svg viewBox="0 0 {f(self.w)} {f(self.h)}" role="img" aria-label="{self.alt}" '
               f'font-family=\'{FONT}\'>' + "".join(self.defs) + "".join(self.els) + "</svg>")
        html = (f'<figure class="pz-fig" style="max-width:{maxw}px">'
                f'<div class="pz-fig-box">{svg}{"".join(self.labs)}</div></figure>\n')
        with open(os.path.join(OUT, self.name + ".html"), "w", encoding="utf-8", newline="\n") as fh:
            fh.write(html)


# ── Problem 1: the rational forest ──────────────────────────────────────────

def forest(F, top=1.3):
    """Trees at rationals p/q (q <= 7) in [0, top]^2, smaller dots for larger q."""
    seen = set()
    for q in range(1, 8):
        for a in range(0, int(top * q) + 1):
            for b in range(0, int(top * q) + 1):
                key = (a * 420 // q, b * 420 // q)
                if key in seen:
                    continue
                seen.add(key)
                F.dot((a / q, b / q), r=max(0.9, 2.4 / math.sqrt(q)), fill=LIGHT)
    F.arrow((-0.05, 0), (1.38, 0), stroke=GRAY, width=1)
    F.arrow((0, -0.05), (0, 1.38), stroke=GRAY, width=1)
    F.lab((1.38, 0), "x", "right", gap=3)
    F.lab((0, 1.38), "y", "above", gap=3)


def ends(F):
    F.dot((0, 0), 3.4)
    F.dot((1, 1), 3.4)
    F.lab((0, 0), "(0,0)", "below left", gap=3)
    F.lab((1, 1), "(1,1)", "above right", gap=3)


C = math.sqrt(2) / 2  # the irrational c of the solution


def forest_statement():
    F = Fig("forest-diagonal", -0.3, -0.2, 1.55, 1.55, 190, "Rational trees with the blocked diagonal from (0,0) to (1,1)")
    forest(F)
    F.line([(0, 0), (1, 1)], stroke=RED, width=1.8, dash="6 5")
    F.circle((0.5, 0.5), 0.035, stroke=RED, width=1.6)
    ends(F)
    F.save(300)


def forest_segments():
    F = Fig("forest-segments", -0.3, -0.2, 1.55, 1.55, 190, "Two-segment path through (c, 1-c)")
    forest(F)
    F.line([(0, 0), (C, 1 - C), (1, 1)], stroke=BLUE, width=3)
    F.dot((C, 1 - C), 3.4, fill=BLUE)
    F.lab((C, 1 - C), "(c,1-c)", "below right", gap=3, color=BLUE)
    ends(F)
    F.save(300)


def forest_arc():
    F = Fig("forest-arc", -0.3, -0.55, 1.6, 1.55, 190, "One circular arc from (0,0) to (1,1) centered at (c, 1-c)")
    forest(F)
    r = math.hypot(C, 1 - C)
    ctr = (C, 1 - C)
    circ = [(ctr[0] + r * math.cos(t), ctr[1] + r * math.sin(t)) for t in [2 * math.pi * k / 180 for k in range(181)]]
    F.line(circ, stroke=GRAY, width=1.2, dash="5 4")
    arc = [(ctr[0] + r * math.cos(math.radians(a)), ctr[1] + r * math.sin(math.radians(a)))
           for a in [202.5 - 135 * k / 90 for k in range(91)]]
    F.line(arc, stroke=BLUE, width=3)
    F.dot(ctr, 2.8, fill=BLUE)
    F.lab(ctr, "(c,1-c)", "below right", gap=3, color=BLUE)
    ends(F)
    F.save(300)


# Orthographic view of the unit sphere used by the TikZ source: the images of
# e1, e2, e3 (radius 2.2), recovered from the plotted A, B and Q.
EX, EY, EZ = (-1.374, -0.453), (1.718, -0.362), (0.0, 2.122)
R_SPH = 2.2
_r1 = [EX[0] / R_SPH, EY[0] / R_SPH, EZ[0] / R_SPH]
_r2 = [EX[1] / R_SPH, EY[1] / R_SPH, EZ[1] / R_SPH]
VIEW = (_r1[1] * _r2[2] - _r1[2] * _r2[1], _r1[2] * _r2[0] - _r1[0] * _r2[2], _r1[0] * _r2[1] - _r1[1] * _r2[0])


def proj(p):
    return (p[0] * EX[0] + p[1] * EY[0] + p[2] * EZ[0], p[0] * EX[1] + p[1] * EY[1] + p[2] * EZ[1])


def front(p):
    return sum(a * b for a, b in zip(p, VIEW)) >= 0


def unit(v):
    n = math.sqrt(sum(a * a for a in v))
    return tuple(a / n for a in v)


def draw_curve3(F, pts3, front_kw, back_kw):
    """Split a curve on the sphere into visible (front) and hidden (back) runs."""
    run, vis = [], None
    for p in pts3:
        v = front(p)
        if vis is not None and v != vis:
            run.append(proj(p))
            F.line(run, **(front_kw if vis else back_kw))
            run = []
        run.append(proj(p))
        vis = v
    F.line(run, **(front_kw if vis else back_kw))


def great_circle(u, v, n=240):
    return [tuple(math.cos(t) * a + math.sin(t) * b for a, b in zip(u, v)) for t in [2 * math.pi * k / n for k in range(n + 1)]]


def slerp(a, b, n=60):
    th = math.acos(sum(x * y for x, y in zip(a, b)))
    return [tuple((math.sin((1 - t) * th) * x + math.sin(t * th) * y) / math.sin(th) for x, y in zip(a, b))
            for t in [k / n for k in range(n + 1)]]


A3, B3 = (1, 0, 0), (0, 1, 0)


def sphere_points(F):
    F.dot(proj(A3), 3.4)
    F.dot(proj(B3), 3.4)
    F.lab(proj(A3), "A", "below left", gap=2)
    F.lab(proj(B3), "B", "below right", gap=2)
    p = proj((0.6, 0.8, 0))
    F.dot(p, 3.4, fill=RED)
    F.lab(p, r"\left(\tfrac35,\tfrac45,0\right)", "below", gap=4, color=RED)
    for q, t in [((-1, 0, 0), "-A"), ((0, -1, 0), "-B")]:
        F.dot(proj(q), 3.2, fill="#fff", stroke=RED)
        F.lab(proj(q), t, "above", gap=4, color=RED)


def sphere_statement():
    F = Fig("sphere-equator", -2.6, -2.45, 2.6, 2.45, 62, "Unit sphere with the equator through A and B")
    F.circle((0, 0), R_SPH, stroke=INK, width=1.2)
    draw_curve3(F, great_circle(A3, B3), dict(stroke=INK, width=2), dict(stroke=LIGHT, width=1.2, dash="5 4"))
    sphere_points(F)
    F.save(320)


def sphere_solution():
    F = Fig("sphere-two-arcs", -2.6, -2.45, 2.6, 2.45, 62, "Two great-circle arcs from A to Q to B")
    F.circle((0, 0), R_SPH, stroke=INK, width=1.2)
    soft = dict(stroke=LIGHT, width=1.2), dict(stroke=LIGHT, width=1.2, dash="5 4")
    draw_curve3(F, great_circle(A3, B3), *soft)
    Q = (0.5, 0.5, C)
    s2 = 1 / math.sqrt(3)
    # z = sqrt2 y (through A and Q) and z = sqrt2 x (through B and Q)
    mid = dict(stroke=GRAY, width=1.2), dict(stroke=GRAY, width=1.2, dash="5 4")
    draw_curve3(F, great_circle(A3, (0, s2, math.sqrt(2) * s2)), *mid)
    draw_curve3(F, great_circle(B3, (s2, 0, math.sqrt(2) * s2)), *mid)
    F.line([proj(p) for p in slerp(A3, Q)], stroke=BLUE, width=3)
    F.line([proj(p) for p in slerp(Q, B3)], stroke=BLUE, width=3)
    sphere_points(F)
    F.dot(proj(Q), 3.4, fill=BLUE)
    F.lab(proj(Q), "Q", "above", gap=4, color=BLUE)
    F.save(320)


# ── Problem 2: random triangles ─────────────────────────────────────────────

def four_triangles():
    F = Fig("circle-four-triangles", -2.55, -2.4, 2.55, 2.35, 66, "Two diameters and a third point give four triangles")
    r = 1.8

    def at(a):
        return (r * math.cos(math.radians(a)), r * math.sin(math.radians(a)))

    P1, P2, P3, M1, M2 = at(20), at(110), at(250), at(200), at(290)
    F.circle((0, 0), r, stroke=INK, width=1.2)
    F.poly([P1, P2, P3], stroke="none", width=0, fill=BLUE_BG)
    F.line([P1, M1], stroke=GRAY, width=1.1, dash="5 4")
    F.line([P2, M2], stroke=GRAY, width=1.1, dash="5 4")
    F.line([M1, P2, P3], stroke=LIGHT, width=1.1)
    F.line([P1, M2, P3], stroke=LIGHT, width=1.1)
    F.poly([M1, M2, P3], stroke=LIGHT, width=1.1)
    F.poly([P1, P2, P3], stroke=BLUE, width=2)
    F.dot((0, 0), 3)
    F.lab((0, 0), "O", "below right", gap=3)
    for p, t, a in [(P1, "P_1", "right"), (P2, "P_2", "above"), (P3, "P_3", "below left")]:
        F.dot(p, 3.4)
        F.lab(p, t, a, gap=4)
    for p, t, a in [(M1, "-P_1", "left"), (M2, "-P_2", "below right")]:
        F.dot(p, 3.2, fill="#fff", stroke=INK)
        F.lab(p, t, a, gap=4)
    F.save(330)


# ── Problem 3: long dominoes ────────────────────────────────────────────────

def mutilated_board():
    F = Fig("mutilated-chessboard", -0.2, -0.2, 8.2, 8.2, 30, "Chessboard with two opposite corners removed and two dominoes")
    for i in range(1, 9):
        for j in range(1, 9):
            if (i + j) % 2 == 0 and (i, j) not in [(1, 1), (8, 8)]:
                F.rect(j - 1, 8 - i, 1, 1, stroke="none", width=0, fill="#b8bfc4")
    for k in range(9):
        F.line([(k, 0), (k, 8)], stroke=LIGHT, width=0.8)
        F.line([(0, k), (8, k)], stroke=LIGHT, width=0.8)
    F.rect(0, 7, 1, 1, stroke="none", width=0, fill="#fff")
    F.rect(7, 0, 1, 1, stroke="none", width=0, fill="#fff")
    F.poly([(1, 8), (8, 8), (8, 1), (7, 1), (7, 0), (0, 0), (0, 7), (1, 7)], stroke=INK, width=1.8)
    for x, y in [(0, 7), (7, 0)]:
        F.line([(x + 0.18, y + 0.18), (x + 0.82, y + 0.82)], stroke=RED, width=2)
        F.line([(x + 0.18, y + 0.82), (x + 0.82, y + 0.18)], stroke=RED, width=2)
    F.rect(2.12, 4.12, 1.76, 0.76, rx=0.1, stroke=BLUE, width=1.5, fill="rgba(46,108,181,0.45)")
    F.rect(5.12, 1.12, 0.76, 1.76, rx=0.1, stroke=BLUE, width=1.5, fill="rgba(46,108,181,0.45)")
    F.save(250)


def board_blocks():
    F = Fig("board-blocks", -1.15, -0.85, 5.3, 5.2, 52, "The n by n board cut into a qL by n strip, an r by qL block and an r by r corner")
    F.rect(0, 1.3, 5, 3.7, stroke="none", width=0, fill="#EEF4FF")
    F.rect(0, 0, 3.7, 1.3, stroke="none", width=0, fill="#dbe7f7")
    F.rect(3.7, 0, 1.3, 1.3, stroke="none", width=0, fill="#f6d9d8")
    F.rect(0, 0, 5, 5, stroke=INK, width=1.8)
    F.line([(0, 1.3), (5, 1.3)], stroke=INK, width=1.1)
    F.line([(3.7, 0), (3.7, 1.3)], stroke=INK, width=1.1)
    F.line([(5, 1.3), (3.7, 0)], stroke=GRAY, width=1.1)
    F.lab((2.5, 3.15), r"qL \times n")
    F.lab((1.85, 0.65), r"r \times qL")
    for p, q, t, a in [((-0.15, 1.3), (-0.15, 5), "qL", "left"), ((-0.15, 0), (-0.15, 1.3), "r", "left")]:
        tip = F.brace(p, q, amp=0.1, stroke=INK, width=1.1)
        F.lab(tip, t, a, gap=3)
    for p, q, t in [((3.7, -0.15), (0, -0.15), "qL"), ((5, -0.15), (3.7, -0.15), "r")]:
        tip = F.brace(p, q, amp=0.1, stroke=INK, width=1.1)
        F.lab(tip, t, "below", gap=2)
    F.save(330)


# ── Problem 4: four ways to multiply ────────────────────────────────────────

def long_mult():
    F = Fig("mult-long", -0.4, -0.25, 4.6, 2.85, 46, "Long multiplication of 47 by 26")
    xs = [0, 0.55, 1.1, 1.65]

    def row(y, digits, color):
        for k, d in enumerate(digits):
            if d:
                F.text((xs[k], y), d, 19, color)

    row(2.55, ["", "", "4", "7"], BLUE)
    row(2.0, ["", "", "2", "6"], ORANGE)
    F.text((xs[0], 2.0), "×", 19)
    F.line([(-0.25, 1.68), (1.9, 1.68)], width=1.1)
    row(1.35, ["", "2", "8", "2"], GREEN)
    row(0.8, ["", "9", "4", ""], GREEN)
    F.line([(-0.25, 0.48), (1.9, 0.48)], width=1.1)
    row(0.15, ["1", "2", "2", "2"], INK)
    for y, d in [(1.35, "6"), (0.8, "2")]:
        F.els.append(f'<text x="{f(F.X(2.2))}" y="{f(F.Y(y))}" font-size="14" dominant-baseline="central">'
                     f'<tspan fill="{BLUE}">47</tspan> × <tspan fill="{ORANGE}">{d}</tspan></text>')
    F.save(230)


def lattice():
    F = Fig("mult-lattice", -0.75, -0.7, 2.6, 2.6, 62, "Lattice multiplication of 47 by 26")
    F.defs.append(f'<clipPath id="lat-clip"><rect x="{f(F.X(0))}" y="{f(F.Y(2))}" width="{f(2 * F.px)}" height="{f(2 * F.px)}"/></clipPath>')
    bands = "".join(
        f'<polygon points="{F.pts([(k, 0), (k + 1, 0), (k + 4, 3), (k + 3, 3)])}" fill="#eceff1"/>' for k in (-1, 1))
    F.els.append(f'<g clip-path="url(#lat-clip)">{bands}</g>')
    for k in range(3):
        F.line([(k, 0), (k, 2)], width=1.1)
        F.line([(0, k), (2, k)], width=1.1)
    for c in range(2):
        for r in range(2):
            F.line([(c + 1, 2 - r), (c, 1 - r)], width=1)
    for a, b in [((1, 0), (0.6, -0.4)), ((0, 0), (-0.4, -0.4)), ((0, 1), (-0.4, 0.6))]:
        F.line([a, b], width=1, dash="4 3")
    F.text((0.5, 2.3), "4", 19, BLUE)
    F.text((1.5, 2.3), "7", 19, BLUE)
    F.text((2.3, 1.5), "2", 19, ORANGE)
    F.text((2.3, 0.5), "6", 19, ORANGE)
    for c, r, t, u in [(0, 0, "0", "8"), (1, 0, "1", "4"), (0, 1, "2", "4"), (1, 1, "4", "2")]:
        F.text((c + 0.3, 1.7 - r), t, 16, GREEN)
        F.text((c + 0.7, 1.3 - r), u, 16, GREEN)
    for p, d in [((-0.35, 1.3), "1"), ((-0.35, 0.3), "2"), ((0.3, -0.35), "2"), ((1.3, -0.35), "2")]:
        F.text(p, d, 18)
    F.save(210)


def blocks(name, alt, karatsuba):
    F = Fig(name, -1.35 if karatsuba else -0.6, -0.2, 3.25, 3.55 if karatsuba else 3.0, 58, alt)
    if karatsuba:
        F.rect(1.5, 1.2, 1.5, 1.2, stroke="none", width=0, fill="#eceff1")
        F.rect(0, 0, 1.5, 1.2, stroke="none", width=0, fill="#eceff1")
    F.rect(0, 0, 3, 2.4, width=1.2)
    F.line([(1.5, 0), (1.5, 2.4)], width=1.1)
    F.line([(0, 1.2), (3, 1.2)], width=1.1)
    F.text((0.75, 2.7), "4", 19, BLUE)
    F.text((2.25, 2.7), "7", 19, BLUE)
    F.text((-0.3, 1.8), "2", 19, ORANGE)
    F.text((-0.3, 0.6), "6", 19, ORANGE)
    if karatsuba:
        tip = F.brace((0, 3.0), (3, 3.0), amp=0.1, stroke=INK, width=1.1)
        F.els.append(f'<text x="{f(F.X(tip[0]))}" y="{f(F.Y(tip[1] + 0.2))}" font-size="17" text-anchor="middle">'
                     f'<tspan fill="{BLUE}">4 + 7 = 11</tspan></text>')
        tip = F.brace((-0.6, 0), (-0.6, 2.4), amp=0.1, stroke=INK, width=1.1)
        F.text((tip[0] - 0.25, tip[1]), "8", 19, ORANGE)
        F.text((0.75, 1.8), "8", 19, GREEN)
        F.text((2.25, 0.6), "42", 19, GREEN)
    else:
        for x, y, v, t in [(0.75, 1.8, "8", "x_1 y_1"), (2.25, 1.8, "14", "x_0 y_1"),
                           (0.75, 0.6, "24", "x_1 y_0"), (2.25, 0.6, "42", "x_0 y_0")]:
            F.text((x, y + 0.14), v, 19, GREEN)
            F.lab((x, y - 0.3), t, color=GRAY, size=14)
    F.save(round(F.w))


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    forest_statement()
    forest_segments()
    forest_arc()
    sphere_statement()
    sphere_solution()
    four_triangles()
    mutilated_board()
    board_blocks()
    long_mult()
    lattice()
    blocks("mult-split", "Divide and conquer: 47 times 26 as four blocks", False)
    blocks("mult-karatsuba", "Karatsuba: the corner blocks and the whole rectangle", True)
    print("wrote", sorted(os.listdir(OUT)))
