"""Generate the Desmos states for the eigenvector notebook.

Run from the repo root:  python desmos/eigenvector_notebook/_build_json.py
(writes assets/desmos/json_files/eigenvector_notebook/*.json).

Every figure shares the change-of-basis family's look: a framed +-6 board,
faint standard grid, red / blue columns, orange test vector. The page script
only writes the plain variables (a, b, c, d, s, ...) and reads them back.
"""
import json, os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join('assets', 'desmos', 'json_files', 'eigenvector_notebook')
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

def board(st, std_id='std'):
    st.fold('frame', 'Frame')
    st.ex('F=%d' % F, 'F')
    st.ex('K=\\left[-14,...,14\\right]', 'K')
    st.ex('x=\\left[-F,F\\right]\\left\\{-F\\le y\\le F\\right\\}', 'fx', lineWidth='4')
    st.ex('y=\\left[-F,F\\right]\\left\\{-F\\le x\\le F\\right\\}', 'fy', lineWidth='4')
    st.fold(std_id, 'Standard grid')
    st.ex('x=\\left[-F,...,F\\right]\\left\\{-F\\le y\\le F\\right\\}', 'gx', lineOpacity='0.18', lineWidth='1')
    st.ex('y=\\left[-F,...,F\\right]\\left\\{-F\\le x\\le F\\right\\}', 'gy', lineOpacity='0.18', lineWidth='1')
    st.ex('x=0\\left\\{-F\\le y\\le F\\right\\}', 'ax', lineOpacity='0.45', lineWidth='2')
    st.ex('y=0\\left\\{-F\\le x\\le F\\right\\}', 'ay', lineOpacity='0.45', lineWidth='2')

def matrix(st, a, b, c, d, morph=True):
    """Entries a, b, c, d and the in-between matrix M = (1 - s) I + s A."""
    st.fold('mat', 'Matrix')
    for name, val, eid in (('a', a, 'a'), ('b', b, 'b'), ('c', c, 'c'), ('d', d, 'd')):
        st.slider(name, val, -6, 6, 0.1, eid)
    if morph:
        st.slider('s', 1, 0, 1, 0.01, 's')
        st.ex('M_{11}=1+s\\left(a-1\\right)', 'M11')
        st.ex('M_{12}=sb', 'M12')
        st.ex('M_{21}=sc', 'M21')
        st.ex('M_{22}=1+s\\left(d-1\\right)', 'M22')
    else:
        st.ex('M_{11}=a', 'M11'); st.ex('M_{12}=b', 'M12'); st.ex('M_{21}=c', 'M21'); st.ex('M_{22}=d', 'M22')
    st.ex('f_{x}\\left(p,q\\right)=M_{11}p+M_{12}q', 'fxf')
    st.ex('f_{y}\\left(p,q\\right)=M_{21}p+M_{22}q', 'fyf')

def image_grid(st, fid='tgrid', title='Transformed grid', color=INK, opacity='0.42'):
    """The image of the integer grid: lines K e1 + t e2 and t e1 + K e2."""
    st.fold(fid, title)
    for P, Q, eid in (('K', 't', fid + '1'), ('t', 'K', fid + '2')):
        X, Y = 'f_{x}\\left(%s,%s\\right)' % (P, Q), 'f_{y}\\left(%s,%s\\right)' % (P, Q)
        st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), eid, color=color,
              lineOpacity=opacity, lineWidth='1.5', parametricDomain={'min': '-14', 'max': '14'})
    for P, Q, eid in (('0', 't', fid + 'a1'), ('t', '0', fid + 'a2')):
        X, Y = 'f_{x}\\left(%s,%s\\right)' % (P, Q), 'f_{y}\\left(%s,%s\\right)' % (P, Q)
        st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), eid, color=color,
              lineOpacity='0.8', lineWidth='2.5', parametricDomain={'min': '-14', 'max': '14'})

def arrow(st, X, Y, color, eid, label=None, width='5', style=None, tip=True, **tipkw):
    """Segment from the origin to (X, Y), clipped to the board, with a tip point."""
    kw = dict(lineWidth=width, parametricDomain={'min': '0', 'max': '1'})
    if style:
        kw['lineStyle'] = style
    st.ex('\\left(t\\left(%s\\right),t\\left(%s\\right)\\right)%s' % (X, Y, clip('t\\left(%s\\right)' % X, 't\\left(%s\\right)' % Y)),
          eid + '_seg', color=color, **kw)
    if tip:
        tk = dict(dragMode='NONE', pointSize='9')
        if label:
            tk.update(showLabel=True, label=label, labelSize='1.5')
        tk.update(tipkw)
        st.ex(pclip(X, Y), eid + '_tip', color=color, **tk)

def columns(st, handles=True):
    st.fold('cols', 'Columns of A')
    arrow(st, 'M_{11}', 'M_{21}', RED, 'c1', '`Ae_1`')
    arrow(st, 'M_{12}', 'M_{22}', BLUE, 'c2', '`Ae_2`')
    if handles:
        # Drag targets; the page shows them only when the morph is complete.
        st.ex('\\left(a,c\\right)', 'h1', color=RED, pointStyle='OPEN', pointSize='15', movablePointSize='15', hidden=True)
        st.ex('\\left(b,d\\right)', 'h2', color=BLUE, pointStyle='OPEN', pointSize='15', movablePointSize='15', hidden=True)

def line_through(st, ux, uy, color, eid, label=None, style='DASHED', width='3', opacity='0.85'):
    X, Y = 't%s' % ux, 't%s' % uy
    st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), eid, color=color, lineStyle=style, lineWidth=width,
          lineOpacity=opacity, parametricDomain={'min': '-40', 'max': '40'})


# ── Figure 1: matrices as transformations ───────────────────────────────────
st = State(BOARD)
board(st)
matrix(st, 3, 1, 0, 2)
image_grid(st)
st.fold('sq', 'Unit square', hidden=True)
st.ex('\\operatorname{polygon}\\left(\\left(0,0\\right),\\left(M_{11},M_{21}\\right),\\left(M_{11}+M_{12},M_{21}+M_{22}\\right),\\left(M_{12},M_{22}\\right)\\right)',
      'sqp', color=GREEN, fillOpacity='0.25', lineWidth='2')
st.fold('null', 'Null space', hidden=True)
st.ex('n_{1}=0', 'n1', hidden=True)
st.ex('n_{2}=0', 'n2', hidden=True)
line_through(st, 'n_{1}', 'n_{2}', GREEN, 'nl')
st.fold('vx', 'Vector x')
st.slider('x_{1}', 1, -6, 6, 0.1, 'x1')
st.slider('x_{2}', 1, -6, 6, 0.1, 'x2')
arrow(st, 'f_{x}\\left(x_{1},x_{2}\\right)', 'f_{y}\\left(x_{1},x_{2}\\right)', ORANGE, 'ax', '`Ax`', width='4')
st.ex('\\left(tx_{1},tx_{2}\\right)', 'xg', color=ORANGE, lineStyle='DOTTED', lineWidth='2', lineOpacity='0.6',
      parametricDomain={'min': '0', 'max': '1'})
st.ex('\\left(x_{1},x_{2}\\right)', 'xh', color=ORANGE, pointStyle='OPEN', pointSize='15', movablePointSize='15',
      showLabel=True, label='`x`', labelSize='1.5', labelOrientation='right')
columns(st)
st.dump('transformation.json')


# ── Figure 2: staying on the span ───────────────────────────────────────────
st = State(BOARD)
board(st)
matrix(st, 3, 1, 0, 2)
image_grid(st)
st.fold('cols', 'Columns of A', hidden=True)
arrow(st, 'M_{11}', 'M_{21}', RED, 'c1', '`Ae_1`', width='3')
arrow(st, 'M_{12}', 'M_{22}', BLUE, 'c2', '`Ae_2`', width='3')
for k, color in ((1, GREEN), (2, PURPLE)):
    st.fold('eig%d' % k, 'Eigenline %d' % k, hidden=True)
    st.ex('u_{%dx}=1' % k, 'u%dx' % k, hidden=True)
    st.ex('u_{%dy}=0' % k, 'u%dy' % k, hidden=True)
    line_through(st, 'u_{%dx}' % k, 'u_{%dy}' % k, color, 'el%d' % k, width='2.5', opacity='0.7')
    X, Y = 'f_{x}\\left(Ku_{%dx},Ku_{%dy}\\right)' % (k, k), 'f_{y}\\left(Ku_{%dx},Ku_{%dy}\\right)' % (k, k)
    st.ex(pclip(X, Y), 'ed%d' % k, color=color, pointSize='7', dragMode='NONE')
st.fold('vv', 'Vector v')
st.slider('v_{1}', 1, -6, 6, 0.1, 'v1')
st.slider('v_{2}', 2, -6, 6, 0.1, 'v2')
line_through(st, 'v_{1}', 'v_{2}', ORANGE, 'span', style='DASHED', width='2.5', opacity='0.75')
arrow(st, 'f_{x}\\left(v_{1},v_{2}\\right)', 'f_{y}\\left(v_{1},v_{2}\\right)', ORANGE, 'av', '`Av`', width='5')
st.ex('\\left(v_{1},v_{2}\\right)', 'vh', color=ORANGE, pointStyle='OPEN', pointSize='15', movablePointSize='15',
      showLabel=True, label='`v`', labelSize='1.5', labelOrientation='right')
st.dump('span.json')


# ── Figure 3, left: the grid under A - lambda I ────────────────────────────
st = State(BOARD)
board(st)
st.fold('mat', 'Matrix')
for name, val in (('a', 2), ('b', 2), ('c', 1), ('d', 3)):
    st.slider(name, val, -6, 6, 0.1, name)
st.slider('l', 0, -20, 20, 0.01, 'l')
st.ex('M_{11}=a-l', 'M11'); st.ex('M_{12}=b', 'M12'); st.ex('M_{21}=c', 'M21'); st.ex('M_{22}=d-l', 'M22')
st.ex('f_{x}\\left(p,q\\right)=M_{11}p+M_{12}q', 'fxf')
st.ex('f_{y}\\left(p,q\\right)=M_{21}p+M_{22}q', 'fyf')
image_grid(st)
st.fold('sq', 'Unit square')
st.ex('\\operatorname{polygon}\\left(\\left(0,0\\right),\\left(M_{11},M_{21}\\right),\\left(M_{11}+M_{12},M_{21}+M_{22}\\right),\\left(M_{12},M_{22}\\right)\\right)',
      'sqp', color=GREEN, fillOpacity='0.25', lineWidth='2')
st.fold('cols', 'Columns')
arrow(st, 'M_{11}', 'M_{21}', RED, 'c1', None, width='4')
arrow(st, 'M_{12}', 'M_{22}', BLUE, 'c2', None, width='4')
st.fold('null', 'Null space', hidden=True)
st.ex('n_{1}=0', 'n1', hidden=True)
st.ex('n_{2}=0', 'n2', hidden=True)
line_through(st, 'n_{1}', 'n_{2}', GREEN, 'nl', width='3.5', opacity='0.9')
st.ex(pclip('Kn_{1}', 'Kn_{2}'), 'nd', color=GREEN, pointSize='7', dragMode='NONE')
st.dump('shifted.json')


# ── Figure 3, right: the characteristic polynomial ─────────────────────────
st = State({'xmin': -2, 'xmax': 7, 'ymin': -4, 'ymax': 8},
           showGrid=True, showXAxis=True, showYAxis=True, xAxisLabel='λ',
           xAxisMinorSubdivisions=1, yAxisMinorSubdivisions=1)
st.fold('mat', 'Matrix')
for name, val in (('a', 2), ('b', 2), ('c', 1), ('d', 3)):
    st.slider(name, val, -6, 6, 0.1, name)
st.slider('l', 0, -20, 20, 0.01, 'l')
st.fold('poly', 'Characteristic polynomial')
st.ex('p\\left(x\\right)=\\left(a-x\\right)\\left(d-x\\right)-bc', 'p', color=INK, lineWidth='3')
st.ex('r_{l}=\\frac{\\operatorname{round}\\left(10p\\left(l\\right)\\right)}{10}', 'rl')
st.ex('x=l\\left\\{\\min\\left(0,p\\left(l\\right)\\right)\\le y\\le\\max\\left(0,p\\left(l\\right)\\right)\\right\\}', 'lv',
      color=ORANGE, lineStyle='DASHED', lineWidth='2.5')
st.ex('\\left(l,p\\left(l\\right)\\right)', 'lp', color=ORANGE, pointSize='11', dragMode='NONE',
      showLabel=True, label='`${r_{l}}`', labelSize='1.3', labelOrientation='right')
st.ex('\\left(l,0\\right)', 'lh', color=ORANGE, pointStyle='OPEN', pointSize='15', movablePointSize='15')
st.fold('roots', 'Roots')
st.ex('R=\\left[\\right]', 'R', hidden=True)
st.ex('\\left(R,0\\right)', 'rp', color=GREEN, pointSize='10', dragMode='NONE')
st.dump('charpoly.json')


# ── Figure 4: the eigenbasis ────────────────────────────────────────────────
st = State(BOARD)
board(st)
matrix(st, 3, 1, 0, 2)
image_grid(st, 'tgrid', 'Transformed standard grid', INK, '0.22')
st.fold('basis', 'Eigenbasis')
st.ex('u_{1x}=1', 'u1x', hidden=True); st.ex('u_{1y}=0', 'u1y', hidden=True)
st.ex('u_{2x}=-1', 'u2x', hidden=True); st.ex('u_{2y}=1', 'u2y', hidden=True)
st.fold('egrid', 'Eigenbasis grid')
for P, Q, color, eid in (('Ku_{2x}+tu_{1x}', 'Ku_{2y}+tu_{1y}', GREEN, 'eg1'),
                         ('Ku_{1x}+tu_{2x}', 'Ku_{1y}+tu_{2y}', PURPLE, 'eg2')):
    X, Y = 'f_{x}\\left(%s,%s\\right)' % (P, Q), 'f_{y}\\left(%s,%s\\right)' % (P, Q)
    st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), eid, color=color, lineOpacity='0.5', lineWidth='1.5',
          parametricDomain={'min': '-14', 'max': '14'})
st.fold('evec', 'Eigenvectors')
arrow(st, 'f_{x}\\left(u_{1x},u_{1y}\\right)', 'f_{y}\\left(u_{1x},u_{1y}\\right)', GREEN, 'w1', '`Av_1`')
arrow(st, 'f_{x}\\left(u_{2x},u_{2y}\\right)', 'f_{y}\\left(u_{2x},u_{2y}\\right)', PURPLE, 'w2', '`Av_2`')
st.fold('iter', 'Powers of A applied to x')
st.slider('p_{1}', 1, -6, 6, 0.1, 'p1')
st.slider('p_{2}', 1, -6, 6, 0.1, 'p2')
st.ex('I_{t}=\\left[\\left(1,1\\right)\\right]', 'It', hidden=True)
# Directions of the iterates: once A^k x leaves the board, its ray still shows where it points.
st.ex('N_{t}=\\sqrt{I_{t}.x^{2}+I_{t}.y^{2}}', 'Nt', hidden=True)
st.ex('R_{t}=\\left(\\frac{I_{t}.x}{N_{t}},\\frac{I_{t}.y}{N_{t}}\\right)', 'Rt', hidden=True)
X, Y = 'tR_{t}.x', 'tR_{t}.y'
st.ex('\\left(%s,%s\\right)%s' % (X, Y, clip(X, Y)), 'irays', color=ORANGE, lineStyle='DASHED', lineWidth='1.5',
      lineOpacity='0.45', parametricDomain={'min': '0', 'max': '40'})
st.ex(pclip('I_{t}.x', 'I_{t}.y'), 'ipts', color=ORANGE, pointSize='8', dragMode='NONE',
      lines=True, lineStyle='DOTTED', lineWidth='2')
st.ex('\\left(p_{1},p_{2}\\right)', 'ph', color=ORANGE, pointStyle='OPEN', pointSize='15', movablePointSize='15',
      showLabel=True, label='`x`', labelSize='1.5', labelOrientation='right')
st.dump('eigenbasis.json')
# ── When the pattern breaks: a ring of vectors under a fixed matrix ────────
# Five directions, chosen so that no two lie on a common line and a quarter
# turn never lands one on another's span (a symmetric ring would hide the
# rotation). Those A keeps on their span are green, the rest orange; the
# open dots mark where each vector started.
def ring(name, a, b, c, d):
    st = State(BOARD)
    board(st)
    matrix(st, a, b, c, d)
    image_grid(st, opacity='0.3')
    st.fold('ring', 'Ring of vectors')
    st.ex('k_{u}=\\left[0,30,60,115,145\\right]', 'ku', hidden=True)
    st.ex('U=\\left(4\\cos\\left(\\frac{\\pi k_{u}}{180}\\right),4\\sin\\left(\\frac{\\pi k_{u}}{180}\\right)\\right)', 'U',
          color=ORANGE, pointStyle='OPEN', pointSize='9', dragMode='NONE')
    st.ex('q_{c}=U.x\\left(cU.x+dU.y\\right)-U.y\\left(aU.x+bU.y\\right)', 'qc', hidden=True)
    st.ex('S_{t}=U\\left[\\left|q_{c}\\right|<0.001\\right]', 'St', hidden=True)
    st.ex('O_{t}=U\\left[\\left|q_{c}\\right|\\ge0.001\\right]', 'Ot', hidden=True)
    for L, color, width, eid in (('O_{t}', ORANGE, '2.5', 'off'), ('S_{t}', GREEN, '4', 'on')):
        line_through(st, L + '.x', L + '.y', color, eid + '_span', width='1.5', opacity='0.35')
        X, Y = 'f_{x}\\left(%s.x,%s.y\\right)' % (L, L), 'f_{y}\\left(%s.x,%s.y\\right)' % (L, L)
        arrow(st, X, Y, color, eid, width=width, pointSize='6')
    st.dump(name)

ring('breaks_rotation.json', 0, -1, 1, 0)
ring('breaks_shear.json', 1, 1, 0, 1)
print('ok')
