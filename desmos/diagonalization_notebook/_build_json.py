"""Generate the Desmos states for the diagonalization notebook.

Run from the repo root:  python desmos/diagonalization_notebook/_build_json.py
(writes assets/desmos/json_files/diagonalization_notebook/*.json).

Same look as the eigenvector notebook: a framed +-6 board, black standard
grid, purple eigenbasis grid, orange test vector. The page script only
writes the plain variables (s, p, I_t, ...) and reads them back.
"""
import json, math, os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join('assets', 'desmos', 'json_files', 'diagonalization_notebook')
os.makedirs(OUT, exist_ok=True)

RED, BLUE, ORANGE, GREEN, PURPLE, INK = '#c74440', '#2d70b3', '#fa7e19', '#388c46', '#6042a6', '#000000'
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

def board(st):
    st.fold('frame', 'Frame')
    st.ex('F=%d' % F, 'F')
    st.ex('K=\\left[-14,...,14\\right]', 'K')
    st.ex('x=\\left[-F,F\\right]\\left\\{-F\\le y\\le F\\right\\}', 'fx', lineWidth='4')
    st.ex('y=\\left[-F,F\\right]\\left\\{-F\\le x\\le F\\right\\}', 'fy', lineWidth='4')

def matrix(st, a, b, c, d):
    """The in-between matrix M = (1 - s) I + s [a b; c d]."""
    st.fold('mat', 'Matrix')
    for name, val in (('a', a), ('b', b), ('c', c), ('d', d)):
        st.ex('%s=%s' % (name, val), name, hidden=True)
    st.slider('s', 1, 0, 1, 0.01, 's')
    st.ex('M_{11}=1+s\\left(a-1\\right)', 'M11')
    st.ex('M_{12}=sb', 'M12')
    st.ex('M_{21}=sc', 'M21')
    st.ex('M_{22}=1+s\\left(d-1\\right)', 'M22')
    st.ex('f_{x}\\left(p,q\\right)=M_{11}p+M_{12}q', 'fxf')
    st.ex('f_{y}\\left(p,q\\right)=M_{21}p+M_{22}q', 'fyf')

def grid_lines(st, P, Q, color, eid, opacity, width='1.5', reach='14'):
    """The image under M of the curve t -> (P, Q), clipped to the board."""
    X, Y = 'f_{x}\\left(%s,%s\\right)' % (P, Q), 'f_{y}\\left(%s,%s\\right)' % (P, Q)
    st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), eid, color=color,
          lineOpacity=opacity, lineWidth=width, parametricDomain={'min': '-' + reach, 'max': reach})

def arrow(st, X, Y, color, eid, label=None, width='5'):
    """Segment from the origin to (X, Y), clipped to the board, with a tip point."""
    st.ex('\\left(t\\left(%s\\right),t\\left(%s\\right)\\right)%s' % (X, Y, clip('t\\left(%s\\right)' % X, 't\\left(%s\\right)' % Y)),
          eid + '_seg', color=color, lineWidth=width, parametricDomain={'min': '0', 'max': '1'})
    tk = dict(dragMode='NONE', pointSize='9')
    if label:
        tk.update(showLabel=True, label=label, labelSize='1.5')
    st.ex(pclip(X, Y), eid + '_tip', color=color, **tk)

def test_vector(st, n1, n2, x1, x2, lo, hi):
    """Draggable x (sliders n1, n2) and its image, labelled Ax in both graphs."""
    st.fold('vx', 'Vector x')
    st.slider(n1, x1, lo, hi, 0.1, n1.replace('_{', '').replace('}', ''))
    st.slider(n2, x2, lo, hi, 0.1, n2.replace('_{', '').replace('}', ''))
    arrow(st, 'f_{x}\\left(%s,%s\\right)' % (n1, n2), 'f_{y}\\left(%s,%s\\right)' % (n1, n2), ORANGE, 'ax', '`Ax`', width='4')
    st.ex('\\left(t%s,t%s\\right)' % (n1, n2), 'xg', color=ORANGE, lineStyle='DOTTED', lineWidth='2', lineOpacity='0.6',
          parametricDomain={'min': '0', 'max': '1'})
    st.ex('\\left(%s,%s\\right)' % (n1, n2), 'xh', color=ORANGE, pointStyle='OPEN', pointSize='15', movablePointSize='15',
          showLabel=True, label='`x`', labelSize='1.5', labelOrientation='right')


# ── Figure 1 and the exploration: one transformation, two grids ─────────────
# Both graphs live in the same plane and show the same x and Ax; only the grid
# (and the basis vectors drawn) differ. The basis vectors are variables
# u_1 = (u_{1x}, u_{1y}), u_2 = (u_{2x}, u_{2y}), as are the matrix entries,
# so the page can load any example. The defaults are Figure 1's
# A = [3/2 1/2; 3/4 5/4] = P D P^{-1}, with v1 = (1, 1) (lambda = 2) and
# v2 = (2, -3) (lambda = 3/4).
def basis_figure(name, title, color, b1, b2, labels):
    st = State(BOARD)
    board(st)
    matrix(st, 1.5, 0.5, 0.75, 1.25)
    for eid, val in (('u1x', b1[0]), ('u1y', b1[1]), ('u2x', b2[0]), ('u2y', b2[1])):
        st.ex('u_{%s}=%s' % (eid[1:], val), eid, hidden=True)
    B = lambda p, q: ('u_{1x}%s+u_{2x}%s' % (p, q), 'u_{1y}%s+u_{2y}%s' % (p, q))
    st.fold('still', 'Untransformed grid')
    for P, Q, eid in (('K', 't', 'g0a'), ('t', 'K', 'g0b')):
        X, Y = B(P, Q)
        st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), eid, color=color, lineOpacity='0.12', lineWidth='1',
              parametricDomain={'min': '-14', 'max': '14'})
    st.fold('grid', title)
    for P, Q, eid in (('K', 't', 'g1'), ('t', 'K', 'g2')):
        grid_lines(st, *B(P, Q), color=color, eid=eid, opacity='0.42')
    for P, Q, eid in (('\\cdot0', 't', 'ga1'), ('t', '\\cdot0', 'ga2')):
        grid_lines(st, *B(P, Q), color=color, eid=eid, opacity='0.85', width='2.5')
    st.fold('basis', 'Basis vectors')
    for k, lab in ((1, labels[0]), (2, labels[1])):
        u = ('u_{%dx}' % k, 'u_{%dy}' % k)
        arrow(st, 'f_{x}\\left(%s,%s\\right)' % u, 'f_{y}\\left(%s,%s\\right)' % u, color, 'b%d' % k, '`A%s`' % lab, width='4')
    test_vector(st, 'p_{1}', 'p_{2}', 3, -2, -6, 6)
    st.dump(name)

basis_figure('standard.json', 'Transformed standard grid', INK, (1, 0), (0, 1), ('e_1', 'e_2'))
basis_figure('eigenbasis.json', 'Transformed eigenbasis grid', PURPLE, (1, 1), (2, -3), ('v_1', 'v_2'))


# ── Figure 2: Fibonacci iterates F^k x ─────────────────────────────────────
# The iterates grow like phi^k, so this graph uses Desmos's own axes and grid,
# which re-space themselves as the page zooms the view out.
PHI = (1 + math.sqrt(5)) / 2
PSI = (1 - math.sqrt(5)) / 2
st = State({'xmin': -1.5, 'xmax': 3.5, 'ymin': -0.75, 'ymax': 3.25},
           showGrid=True, showXAxis=True, showYAxis=True,
           xAxisMinorSubdivisions=1, yAxisMinorSubdivisions=1)
st.fold('eig', 'Eigenlines')
st.ex('y=%.12fx' % PHI, 'el1', color=GREEN, lineStyle='DASHED', lineWidth='2.5', lineOpacity='0.75')
st.ex('y=%.12fx' % PSI, 'el2', color=PURPLE, lineStyle='DASHED', lineWidth='2.5', lineOpacity='0.75')
st.fold('evec', 'Eigenvectors')
for k, (lam, color) in enumerate(((PHI, GREEN), (PSI, PURPLE)), 1):
    st.ex('\\left(t,%.12ft\\right)' % lam, 'w%d_seg' % k, color=color, lineWidth='4',
          parametricDomain={'min': '0', 'max': '1'})
    st.ex('\\left(1,%.12f\\right)' % lam, 'w%d_tip' % k, color=color, pointSize='9', dragMode='NONE',
          showLabel=True, label='`v_{\\phi}`' if k == 1 else '`v_{\\psi}`', labelSize='1.4',
          labelOrientation='right' if k == 1 else 'below')
st.fold('lim', 'Limit point', hidden=True)
st.ex('\\left(%.12f,%.12f\\right)' % (1 / math.sqrt(5), PHI / math.sqrt(5)), 'limp', color=GREEN,
      pointStyle='OPEN', pointSize='16', dragMode='NONE',
      showLabel=True, label='`\\frac{1}{\\sqrt{5}}v_{\\phi}`', labelSize='1.3', labelOrientation='above_left')
st.fold('iter', 'Iterates')
st.ex('I_{t}=\\left[\\left(0,1\\right)\\right]', 'It', hidden=True)
st.ex('\\left(tI_{t}.x,tI_{t}.y\\right)', 'irays', color=ORANGE, lineStyle='DASHED', lineWidth='1.5',
      lineOpacity='0.4', parametricDomain={'min': '0', 'max': '1'})
st.ex('I_{t}', 'ipts', color=ORANGE, pointSize='8', dragMode='NONE', lines=True, lineStyle='DOTTED', lineWidth='2')
st.ex('I_{t}\\left[1\\right]', 'ix', color=ORANGE, pointStyle='OPEN', pointSize='15', dragMode='NONE',
      showLabel=True, label='`x`', labelSize='1.5', labelOrientation='left')
st.ex('I_{t}\\left[\\operatorname{length}\\left(I_{t}\\right)\\right]', 'ilast', color=ORANGE, pointSize='13', dragMode='NONE',
      showLabel=True, label='', labelSize='1.5', labelOrientation='right')
st.dump('fibonacci.json')
print('ok')
