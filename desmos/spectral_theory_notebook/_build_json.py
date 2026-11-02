"""Generate the Desmos states for the spectral theory notebook.

Run from the repo root:  python desmos/spectral_theory_notebook/_build_json.py
(writes assets/desmos/json_files/spectral_theory_notebook/*.json).

Same look as the diagonalization notebook: a framed +-6 board, purple
eigenbasis grid, orange test vector, plus a green circle. Unlike there, the
matrix M = [a b; c d] is written outright by the page script (spectral.js),
which walks it through the three factors of P D P^{-1} one at a time.
"""
import json, os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join('assets', 'desmos', 'json_files', 'spectral_theory_notebook')
os.makedirs(OUT, exist_ok=True)

ORANGE, GREEN, PURPLE, INK = '#fa7e19', '#388c46', '#6042a6', '#000000'
F = 6

class State:
    def __init__(self, viewport, **graph):
        self.items, self.n = [], 0
        g = {'viewport': viewport, 'showGrid': False, 'showXAxis': False, 'showYAxis': False,
             '__v12ViewportLatexStash': {k: str(v) for k, v in viewport.items()}}
        g.update(graph)
        self.graph = g
        self.folder = None

    def fold(self, fid, title, hidden=False):
        f = {'type': 'folder', 'id': fid, 'title': title, 'collapsed': True}
        if hidden:
            f['hidden'] = True
        self.items.append(f)
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


BOARD = {'xmin': -7.4, 'xmax': 7.4, 'ymin': -7, 'ymax': 7}

def clip(X, Y):
    return '\\left\\{\\left|%s\\right|\\le F\\right\\}\\left\\{\\left|%s\\right|\\le F\\right\\}' % (X, Y)

def pclip(X, Y):
    """A point that disappears outside the board."""
    return ('\\left(\\left\\{\\left|%s\\right|\\le F:%s\\right\\},\\left\\{\\left|%s\\right|\\le F:%s\\right\\}\\right)'
            % (X, X, Y, Y))

def arrow(st, X, Y, color, eid, label=None, width='5'):
    """Segment from the origin to (X, Y), clipped to the board, with a tip point."""
    st.ex('\\left(t\\left(%s\\right),t\\left(%s\\right)\\right)%s' % (X, Y, clip('t\\left(%s\\right)' % X, 't\\left(%s\\right)' % Y)),
          eid + '_seg', color=color, lineWidth=width, parametricDomain={'min': '0', 'max': '1'})
    tk = dict(dragMode='NONE', pointSize='9')
    if label:
        tk.update(showLabel=True, label=label, labelSize='1.5')
    st.ex(pclip(X, Y), eid + '_tip', color=color, **tk)

def fx(P, Q):
    return 'f_{x}\\left(%s,%s\\right)' % (P, Q)

def fy(P, Q):
    return 'f_{y}\\left(%s,%s\\right)' % (P, Q)


# ── Figure 1: the three factors, side by side ──────────────────────────────
# Both graphs draw the image under M of the eigenbasis grid (basis u_1, u_2),
# a circle of radius r, and a draggable x. The page sets M to each partial
# product in turn, so the grid lands on the faint standard grid after the
# first factor and ends where A (or B) sends it.
def factor_figure(name, b1, b2, labels):
    st = State(BOARD)
    st.fold('frame', 'Frame')
    st.ex('F=%d' % F, 'F')
    st.ex('K=\\left[-14,...,14\\right]', 'K')
    st.ex('x=\\left[-F,F\\right]\\left\\{-F\\le y\\le F\\right\\}', 'fx', lineWidth='4')
    st.ex('y=\\left[-F,F\\right]\\left\\{-F\\le x\\le F\\right\\}', 'fy', lineWidth='4')

    st.fold('mat', 'Matrix')
    for n, val in (('a', 1), ('b', 0), ('c', 0), ('d', 1)):
        st.ex('%s=%s' % (n, val), n, hidden=True)
    st.ex('f_{x}\\left(p,q\\right)=ap+bq', 'fxf')
    st.ex('f_{y}\\left(p,q\\right)=cp+dq', 'fyf')
    for eid, val in (('u1x', b1[0]), ('u1y', b1[1]), ('u2x', b2[0]), ('u2y', b2[1])):
        st.ex('u_{%s}=%s' % (eid[1:], val), eid, hidden=True)

    st.fold('std', 'Standard grid')
    for P, Q, eid in (('K', 't', 's1'), ('t', 'K', 's2')):
        st.ex('\\left(%s,%s\\right)%s' % (P, Q, clip(P, Q)), eid, color=INK, lineOpacity='0.13', lineWidth='1',
              parametricDomain={'min': '-14', 'max': '14'})

    B = lambda p, q: ('u_{1x}%s+u_{2x}%s' % (p, q), 'u_{1y}%s+u_{2y}%s' % (p, q))
    st.fold('grid', 'Eigenbasis grid')
    for P, Q, eid, op, w in (('K', 't', 'g1', '0.42', '1.5'), ('t', 'K', 'g2', '0.42', '1.5'),
                             ('\\cdot0', 't', 'ga1', '0.85', '2.5'), ('t', '\\cdot0', 'ga2', '0.85', '2.5')):
        X, Y = B(P, Q)
        st.ex('\\left(%s,%s\\right)%s' % (fx(X, Y), fy(X, Y), clip(fx(X, Y), fy(X, Y))), eid, color=PURPLE,
              lineOpacity=op, lineWidth=w, parametricDomain={'min': '-14', 'max': '14'})

    st.fold('circ', 'Circle')
    st.ex('r=2', 'r', hidden=True)
    X, Y = 'r\\cos t', 'r\\sin t'
    st.ex('\\left(%s,%s\\right)%s' % (fx(X, Y), fy(X, Y), clip(fx(X, Y), fy(X, Y))), 'circle', color=GREEN,
          lineWidth='3', parametricDomain={'min': '0', 'max': '2\\pi'})

    st.fold('basis', 'Eigenvectors')
    for k, lab in ((1, labels[0]), (2, labels[1])):
        u = ('u_{%dx}' % k, 'u_{%dy}' % k)
        arrow(st, fx(*u), fy(*u), PURPLE, 'b%d' % k, '`%s`' % lab, width='4')

    st.fold('vx', 'Vector x')
    st.slider('p_{1}', 3, -6, 6, 0.1, 'p1')
    st.slider('p_{2}', -2, -6, 6, 0.1, 'p2')
    arrow(st, fx('p_{1}', 'p_{2}'), fy('p_{1}', 'p_{2}'), ORANGE, 'ax', '`x`', width='4')
    st.ex('\\left(tp_{1},tp_{2}\\right)', 'xg', color=ORANGE, lineStyle='DOTTED', lineWidth='2', lineOpacity='0.6',
          parametricDomain={'min': '0', 'max': '1'})
    st.ex('\\left(p_{1},p_{2}\\right)', 'xh', color=ORANGE, pointStyle='OPEN', pointSize='15', movablePointSize='15')
    st.dump(name)

R = 0.5 ** 0.5
factor_figure('orthogonal.json', (R, R), (-R, R), ('u_1', 'u_2'))
factor_figure('general.json', (1, 1), (-2, 3), ('v_1', 'v_2'))


# ── Figure 2: the spectral decomposition A x = l_1 P_1 x + l_2 P_2 x ───────
# u_1 = (cos q, sin q) and u_2 = (-sin q, cos q), with eigenvalues l_1, l_2
# (the page sets q, l_1, l_2 from its sliders). x is dropped perpendicularly
# onto each eigenline (Q_1, Q_2), each piece is scaled by its eigenvalue
# (L_1, L_2), and the parallelogram on L_1, L_2 closes at A x.
RED, BLUE, GRAY = '#c74440', '#2d70b3', '#7a7a7a'

def segment(st, A, B, color, eid, **kw):
    """Segment from point A to point B (Desmos point expressions), clipped."""
    X = '%s.x+t\\left(%s.x-%s.x\\right)' % (A, B, A)
    Y = '%s.y+t\\left(%s.y-%s.y\\right)' % (A, B, A)
    st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), eid, color=color,
          parametricDomain={'min': '0', 'max': '1'}, **kw)

st = State(BOARD)
st.fold('frame', 'Frame')
st.ex('F=%d' % F, 'F')
st.ex('x=\\left[-F,F\\right]\\left\\{-F\\le y\\le F\\right\\}', 'fx', lineWidth='4')
st.ex('y=\\left[-F,F\\right]\\left\\{-F\\le x\\le F\\right\\}', 'fy', lineWidth='4')
st.fold('spec', 'Spectrum')
st.ex('q=%.12f' % (3.141592653589793 / 4), 'q', hidden=True)
st.ex('l_{1}=2', 'l1', hidden=True)
st.ex('l_{2}=0.75', 'l2', hidden=True)
# Point-valued definitions would plot as dots, so they are all hidden.
st.ex('U_{1}=\\left(\\cos q,\\sin q\\right)', 'U1', hidden=True)
st.ex('U_{2}=\\left(-\\sin q,\\cos q\\right)', 'U2', hidden=True)
st.fold('vx', 'Vector x')
st.slider('p_{1}', -1, -6, 6, 0.1, 'p1')
st.slider('p_{2}', 4, -6, 6, 0.1, 'p2')
st.ex('X=\\left(p_{1},p_{2}\\right)', 'X', hidden=True)
st.fold('pieces', 'Projections')
for k in (1, 2):
    st.ex('Q_{%d}=\\left(X.xU_{%d}.x+X.yU_{%d}.y\\right)U_{%d}' % (k, k, k, k), 'Q%d' % k, hidden=True)
    st.ex('L_{%d}=l_{%d}Q_{%d}' % (k, k, k), 'L%d' % k, hidden=True)
st.ex('Y=L_{1}+L_{2}', 'Y', hidden=True)
st.ex('O=\\left(0,0\\right)', 'O', hidden=True)

st.fold('lines', 'Eigenlines')
for k in (1, 2):
    X, Y = 't U_{%d}.x' % k, 't U_{%d}.y' % k
    st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), 'el%d' % k, color=PURPLE, lineStyle='DASHED',
          lineWidth='2', lineOpacity='0.55', parametricDomain={'min': '-20', 'max': '20'})
st.fold('drops', 'Perpendiculars and parallelogram')
for k in (1, 2):
    segment(st, 'X', 'Q_{%d}' % k, GRAY, 'd%d' % k, lineStyle='DASHED', lineWidth='1.5', lineOpacity='0.8')
    segment(st, 'L_{%d}' % k, 'Y', GRAY, 'pg%d' % k, lineStyle='DASHED', lineWidth='1.5', lineOpacity='0.8')
st.fold('arrows', 'Arrows')
for k in (1, 2):
    segment(st, 'O', 'L_{%d}' % k, BLUE, 'Ls%d' % k, lineStyle='DOTTED', lineWidth='3.5')
    st.ex(pclip('L_{%d}.x' % k, 'L_{%d}.y' % k), 'Lt%d' % k, color=BLUE, dragMode='NONE', pointSize='8',
          showLabel=True, label='`\\lambda_{%d}P_{%d}x`' % (k, k), labelSize='1.2')
    segment(st, 'O', 'Q_{%d}' % k, BLUE, 'Qs%d' % k, lineWidth='4')
    st.ex(pclip('Q_{%d}.x' % k, 'Q_{%d}.y' % k), 'Qt%d' % k, color=BLUE, dragMode='NONE', pointSize='8',
          showLabel=True, label='`P_{%d}x`' % k, labelSize='1.2')
    arrow(st, 'U_{%d}.x' % k, 'U_{%d}.y' % k, PURPLE, 'u%d' % k, '`u_%d`' % k, width='4')
arrow(st, 'Y.x', 'Y.y', RED, 'ax', '`Ax`', width='4')
segment(st, 'O', 'X', ORANGE, 'xs', lineWidth='4')
st.ex('\\left(p_{1},p_{2}\\right)', 'xh', color=ORANGE, pointStyle='OPEN', pointSize='15', movablePointSize='15',
      showLabel=True, label='`x`', labelSize='1.5', labelOrientation='right')
st.dump('decomposition.json')
print('ok')
