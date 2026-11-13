"""Generate the Desmos states for the constant-coefficient notebook.

Run from the repo root:  python desmos/constant_coefficient_notebook/_build_json.py
(writes assets/desmos/json_files/constant_coefficient_notebook/*.json).

The graphs hold only placeholders. The page script (cc.js) owns the roots of
the characteristic polynomial and writes everything else: the polynomial, the
handle positions, the multiplicity circles, the basis functions and y_p.

  poly.json     the graph of p(r) on the real line, with a handle at (0, a_0)
  plane.json    the complex plane: draggable roots, conjugates, circles, and
                the exponent s of the non-homogeneous term (Figure 3 only)
  basis.json    basis functions u_k and their combination
  particular.json  b(x) and the particular solution y_p
"""
import json, os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join('assets', 'desmos', 'json_files', 'constant_coefficient_notebook')
os.makedirs(OUT, exist_ok=True)

INK, ORANGE, GRAY, PURPLE = '#000000', '#fa7e19', '#6b7c8a', '#6042a6'
MAX_REAL, MAX_PAIR, MAX_BASIS = 6, 3, 6


class State:
    def __init__(self, viewport, **graph):
        self.items, self.n = [], 0
        g = {'viewport': viewport, 'showGrid': True, 'showXAxis': True, 'showYAxis': True,
             'xAxisMinorSubdivisions': 1, 'yAxisMinorSubdivisions': 1,
             '__v12ViewportLatexStash': {k: str(v) for k, v in viewport.items()}}
        g.update(graph)
        self.graph = g
        self.folder = None

    def fold(self, fid, title):
        self.items.append({'type': 'folder', 'id': fid, 'title': title, 'collapsed': True})
        self.folder = fid

    def ex(self, latex, eid=None, color=INK, **kw):
        self.n += 1
        e = {'type': 'expression', 'id': eid or ('e%d' % self.n), 'color': color, 'latex': latex}
        if self.folder:
            e['folderId'] = self.folder
        e.update(kw)
        self.items.append(e)
        return e

    def slider(self, name, value, lo, hi, step, eid):
        return self.ex('%s=%s' % (name, value), eid, hidden=True,
                       slider={'hardMin': True, 'hardMax': True, 'min': str(lo), 'max': str(hi), 'step': str(step)})

    def dump(self, name):
        state = {'version': 11, 'randomSeed': '0', 'graph': self.graph,
                 'expressions': {'list': self.items}}
        with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
            json.dump(state, fh, indent=1)


# ── The graph of p(r) ─────────────────────────────────────────────────────
# Desmos plots in x, so the axis is labelled r. p is built from its roots,
#   F(x) = prod_k (x - h_k)^{o_k} * prod_k ((x - g_k)^2 + w_k^2)^{q_k},
# with on/off flags o_k, q_k for the slots in use, so moving a root only
# changes two numbers, and the curve and the root markers (which sit at the
# same variables) move together. The purple handle (0, a_0) shifts the curve,
# p(x) = F(x) + a_0 - F(0); the page keeps a_0 = F(0) except mid-drag.
# No grid or axis numbers: the page rescales y, and they would jump.
st = State({'xmin': -4.5, 'xmax': 4.5, 'ymin': -3, 'ymax': 3}, showGrid=False,
           xAxisNumbers=False, yAxisNumbers=False, xAxisLabel='r', yAxisLabel='p(r)')
st.fold('vars', 'Roots')
for k in range(1, MAX_REAL + 1):
    st.ex('h_{%d}=0' % k, 'h%d' % k, hidden=True)
    st.ex('o_{%d}=0' % k, 'o%d' % k, hidden=True)
for k in range(1, MAX_PAIR + 1):
    st.ex('g_{%d}=0' % k, 'g%d' % k, hidden=True)
    st.ex('w_{%d}=1' % k, 'w%d' % k, hidden=True)
    st.ex('q_{%d}=0' % k, 'q%d' % k, hidden=True)
real = ''.join('\\left(1+o_{%d}\\left(x-h_{%d}-1\\right)\\right)' % (k, k) for k in range(1, MAX_REAL + 1))
pair = ''.join('\\left(1+q_{%d}\\left(\\left(x-g_{%d}\\right)^{2}+w_{%d}^{2}-1\\right)\\right)' % (k, k, k) for k in range(1, MAX_PAIR + 1))
st.fold('poly', 'Characteristic polynomial')
st.ex('F\\left(x\\right)=' + real + pair, 'F', hidden=True)
st.slider('a_{0}', 1, -100000, 100000, 0.1, 'a0')
st.ex('p\\left(x\\right)=F\\left(x\\right)+a_{0}-F\\left(0\\right)', 'p', color=INK, lineWidth='3')
st.ex('\\left(0,a_{0}\\right)', 'A0', color=PURPLE, pointSize='12', movablePointSize='12',
      showLabel=True, label='`a_0`', labelOrientation='right', labelSize='1.2')
st.fold('real', 'Real roots')
for k in range(1, MAX_REAL + 1):
    st.ex('\\left(h_{%d},0\\right)' % k, 'M%d' % k, hidden=True, pointSize='11', dragMode='NONE',
          showLabel=False, label='', labelOrientation='below', labelSize='1.1')
# A pair on the axis (w = 0) is a double real root.
for k in range(1, MAX_PAIR + 1):
    st.ex('\\left(g_{%d},0\\right)' % k, 'N%d' % k, hidden=True, pointSize='11', dragMode='NONE',
          showLabel=False, label='', labelOrientation='below', labelSize='1.1')
st.dump('poly.json')


# ── The complex plane ─────────────────────────────────────────────────────
# Real roots are (h_k, 0), so Desmos only lets them slide along the axis.
# Each complex pair is one draggable point (g_k, w_k) with a mirrored,
# undraggable conjugate (g_k, -w_k). Multiplicity is drawn as concentric
# circles from the lists C_x, C_y, C_r, which the page rewrites.
st = State({'xmin': -4.5, 'xmax': 4.5, 'ymin': -4, 'ymax': 4},
           xAxisLabel='Re', yAxisLabel='Im', xAxisStep=1, yAxisStep=1)
# Rings are tied to each handle's own variables, so they move with the point
# while it is dragged, with no round trip through the page script. The page
# only rewrites the radius lists Q_k / P_k when a multiplicity changes (the
# first handle of a repeated root carries all of its rings; the rest get []).
RING = dict(color=INK, lineWidth='1.5', lineOpacity='0.55', parametricDomain={'min': '0', 'max': '2\\pi'})
st.fold('circ', 'Multiplicity circles')
for k in range(1, MAX_REAL + 1):
    st.ex('Q_{%d}=\\left[\\right]' % k, 'Q%d' % k, hidden=True)
    st.ex('\\left(h_{%d}+Q_{%d}\\cos t,Q_{%d}\\sin t\\right)' % (k, k, k), 'QR%d' % k, **RING)
for k in range(1, MAX_PAIR + 1):
    st.ex('P_{%d}=\\left[\\right]' % k, 'P%d' % k, hidden=True)
    st.ex('\\left(g_{%d}+P_{%d}\\cos t,w_{%d}+P_{%d}\\sin t\\right)' % (k, k, k, k), 'PU%d' % k, **RING)
    st.ex('\\left(g_{%d}+P_{%d}\\cos t,-w_{%d}+P_{%d}\\sin t\\right)' % (k, k, k, k), 'PL%d' % k, **RING)
st.fold("sexp", "Exponent s of b(x)")
st.slider('f_{a}', 0, -4, 4, 0.1, 'fa')
st.slider('f_{b}', 2, -4, 4, 0.1, 'fb')
st.ex('\\left(f_{a},-f_{b}\\right)', 'S2', color=ORANGE, hidden=True, dragMode='NONE',
      pointStyle='OPEN', pointSize='14', pointOpacity='0.55')
st.ex('\\left(f_{a},f_{b}\\right)', 'S', color=ORANGE, hidden=True, pointStyle='OPEN',
      pointSize='18', movablePointSize='18', showLabel=False, label='`s`', labelOrientation='above_right', labelSize='1.3')
st.fold('conj', 'Conjugates')
for k in range(1, MAX_PAIR + 1):
    st.ex('\\left(g_{%d},-w_{%d}\\right)' % (k, k), 'W%d' % k, hidden=True, dragMode='NONE',
          pointSize='11', pointOpacity='0.6', showLabel=False, label='', labelOrientation='below_right', labelSize='1.1')
st.fold('roots', 'Roots')
for k in range(1, MAX_REAL + 1):
    st.slider('h_{%d}' % k, 0, -4, 4, 0.1, 'h%d' % k)
    st.ex('\\left(h_{%d},0\\right)' % k, 'R%d' % k, hidden=True, pointSize='12', movablePointSize='12',
          showLabel=False, label='', labelOrientation='above', labelSize='1.1')
for k in range(1, MAX_PAIR + 1):
    st.slider('g_{%d}' % k, 0, -4, 4, 0.1, 'g%d' % k)
    st.slider('w_{%d}' % k, 1, -4, 4, 0.1, 'w%d' % k)
    st.ex('\\left(g_{%d},w_{%d}\\right)' % (k, k), 'Z%d' % k, hidden=True, pointSize='12', movablePointSize='12',
          showLabel=False, label='', labelOrientation='above_right', labelSize='1.1')
st.dump('plane.json')


# ── Basis functions and their combination ─────────────────────────────────
st = State({'xmin': -1.5, 'xmax': 7.5, 'ymin': -4, 'ymax': 4})
st.fold('basis', 'Basis functions')
for k in range(1, MAX_BASIS + 1):
    st.ex('u_{%d}\\left(x\\right)=0' % k, 'u%d' % k, hidden=True, lineWidth='2.5', lineOpacity='0.8')
st.fold('comb', 'Combination')
st.ex('y=0', 'Y', color=INK, lineWidth='4')
st.dump('basis.json')


# ── Non-homogeneous term and particular solution────────────────────────
st = State({'xmin': -1, 'xmax': 9, 'ymin': -4, 'ymax': 4})
st.fold("rhs", "Non-homogeneous term and particular solution")
st.ex('y=0', 'b', color=GRAY, lineStyle='DASHED', lineWidth='2.5')
st.ex('y=0', 'yp', color=ORANGE, lineWidth='4')
st.dump('particular.json')
# ── Bernoulli's compound interest (static, opening story) ─────────────────
# $1 at 100% a year, compounded n times a year: after j payouts (at time
# j/n) the balance is (1 + 1/n)^j. Each n is drawn as its points only, in a
# color running from red (n = 1) toward the orange of the continuous limit
# e^x, which stays a curve. The point at x = 1 carries the label.
st = State({'xmin': -0.06, 'xmax': 1.55, 'ymin': 0.8, 'ymax': 3.0}, showGrid=False, squareAxes=False,
           xAxisStep=0.25, yAxisStep=0.5, yAxisLabel='dollars')
STEPS = [(1, 'yearly: $2', '10'), (2, 'every 6 months: $2.25', '9'), (4, 'quarterly: $2.44', '8'),
         (12, 'monthly: $2.61', '6.5'), (52, '', '4.5')]
RED_RGB, ORANGE_RGB = (0xc7, 0x44, 0x40), (0xfa, 0x7e, 0x19)
# The curve is drawn first and half transparent, so the payout points (fully
# opaque, and never quite orange) stay visible where they touch it.
st.fold('limit', 'Continuously')
st.ex('y=e^{x}\\left\\{0\\le x\\le1\\right\\}', 'cont', color=ORANGE, lineWidth='3', lineOpacity='0.5')
st.ex('\\left(1,e\\right)', 'Pe', color=ORANGE, pointSize='10', dragMode='NONE')
st.fold('steps', 'Compounded n times a year')
for i, (n, lab, size) in enumerate(STEPS):
    t = 0.6 * i / (len(STEPS) - 1)
    col = '#%02x%02x%02x' % tuple(round(a + t * (b - a)) for a, b in zip(RED_RGB, ORANGE_RGB))
    st.ex('\\left(\\frac{j}{%d},\\left(1+\\frac{1}{%d}\\right)^{j}\\right)\\operatorname{for}j=\\left[0...%d\\right]' % (n, n, n),
          'n%d' % n, color=col, pointSize=size, dragMode='NONE')
    st.ex('\\left(1,\\left(1+\\frac{1}{%d}\\right)^{%d}\\right)' % (n, n), 'P%d' % n, color=col, pointSize=size,
          dragMode='NONE', showLabel=bool(lab), label=lab, labelOrientation='right', labelSize='0.95')
st.dump('story.json')
print('ok')
