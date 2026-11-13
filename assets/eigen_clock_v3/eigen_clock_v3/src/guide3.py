import numpy as np, matplotlib, textwrap
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import PathPatch
from matplotlib.path import Path
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.colors import to_rgb
from pose3 import *
KEY = 'S'
P0 = posed(KEY, 0.0)
NAME = {'base': 'Base', 'centre_pin': 'Centre pin (push-in)', 'crank_pin': 'Crank pin (push-in)', 'shaft_G1': 'Shaft + 20T gear',
        'layshaft_K': 'Layshaft K (two 30T gears)', 'crank_idler': 'Crank idler (52T)', 'crank_gear': 'Crank gear + axle', 'idler_J': 'Idler J (16T)',
        'carrier_hub': 'Carrier hub (20T)', 'carrier_plate': 'Carrier plate', 'sun': 'Sun (14T)', 'idler_I_lock': 'Carrier idler + lock gear',
        'planet': 'Planet (14T, D-key)', 'island_hub': 'Island hub (28T)', f'{KEY}_arm': 'Planet arm + pin', f'{KEY}_face': 'Outer face',
        f'{KEY}_disc': 'Round island', 'ear_lid': 'Ear lid', f'{KEY}_crank_knob': 'Crank knob', 'Ax_hand': 'Ax hand', 'Ax_arrow': 'Red Ax arrow',
        f'{KEY}_x_hand': 'x hand', 'centre_knob': 'Centre knob'}
BASEC = {'black': '#3b3d42', 'white': '#f4f4f0', 'purple': '#8a5cd6', 'red': '#d8262a'}
HL = ['#3a7bd5', '#e0a020', '#2aa060', '#c05030', '#1aa3a3', '#3a7bd5']
def fade(c):
    r = np.array(to_rgb(c)); return tuple(0.35 * r + 0.65 * np.array([0.93, 0.94, 0.95]))
def colr(n):
    if n.endswith('WHITE'): return BASEC['white']
    if n == 'Ax_hand': return BASEC['black']
    if n.endswith('PURPLE') or n.endswith('x_hand') or n.endswith('knob'): return BASEC['purple']
    if n in ('Ax_arrow', 'centre_pin', 'crank_pin'): return BASEC['red']
    return BASEC['black']
def add(ax, rings, fc, ec, lw, z):
    if not rings: return
    v, k = [], []
    for q in rings:
        q = np.asarray(q); v.append(np.vstack([q, q[:1]])); k += [Path.MOVETO] + [Path.LINETO] * (len(q) - 1) + [Path.CLOSEPOLY]
    ax.add_patch(PathPatch(Path(np.vstack(v), k), fc=fc, ec=ec, lw=lw, zorder=z))
SL = {}
def slices(n):
    if n not in SL:
        b = P0[n].bounding_box(); zs = list(np.arange(b[2] + 0.35, b[5], 1.2)) + [b[5] - 0.05]
        SL[n] = [(z, P0[n].slice(z).to_polygons()) for z in zs]
    return SL[n]
def top(ax, installed, new):
    items = []
    for n in installed:
        for z, r in slices(n): items.append((z, n, r))
    items.sort(key=lambda t: t[0])
    for z, n, r in items:
        isnew = n in new or n.replace('_WHITE', '').replace('_PURPLE', '') in new
        c = colr(n)
        if isnew and c == BASEC['black']: c = HL[new.index(n) % len(HL)] if n in new else c
        add(ax, r, c if isnew else fade(c), '#111' if isnew else '#a0a6ad', 0.5 if isnew else 0.15, z)
    ax.set_xlim(-104, 134); ax.set_ylim(-134, 104); ax.set_aspect('equal'); ax.axis('off')
    ax.annotate('', (0, 103), (0, 86), arrowprops=dict(arrowstyle='-|>', color='#c01818', lw=2.2), zorder=500)
    ax.text(3, 95, "12 o'clock", color='#c01818', fontsize=8, zorder=500)
def side(ax, installed, new):
    for n in installed:
        rings = P0[n].rotate([-90, 0, 0]).slice(0.0).to_polygons()
        isnew = n in new or n.replace('_WHITE', '').replace('_PURPLE', '') in new
        c = colr(n)
        if isnew and c == BASEC['black'] and n in new: c = HL[new.index(n) % len(HL)]
        add(ax, rings, c if isnew else fade(c), '#111' if isnew else '#a0a6ad', 0.4 if isnew else 0.15, 5 if isnew else 1)
    ax.set_xlim(-104, 104); ax.set_ylim(-2, 64); ax.set_aspect('equal'); ax.axis('off')
    ax.set_title('side cut through the centre (left-right)', fontsize=8, color='#555')
def note(ax, xy, txt, at):
    ax.annotate(txt, xy, at, fontsize=8.5, zorder=600, arrowprops=dict(arrowstyle='->', lw=1.0, color='#111'),
                bbox=dict(boxstyle='round,pad=0.25', fc='white', ec='#bbb', lw=0.5))
F, I = f'{KEY}_face', f'{KEY}_disc'
PINP = np.array(META['layout'][KEY]['pin'])
STEPS = [
 ('Push-in pins', ['base', 'centre_pin', 'crank_pin'], "Turn the base over. Press the two identical pins up through the holes at the centre and in the crank ear until their heads sit flush in the recesses underneath. Turn the base back over: each pin now stands about 13 mm proud of its boss. The arrow on the wall top marks 12 o'clock. If a pin is too tight, sand the shank lightly; it should need a firm push, not a hammer.",
  [((0, 97.5), "12 o'clock mark", (-75, 92)), ((0, 0), 'centre pin', (-60, 25)), (tuple(cCG), 'crank pin', (60, -110)), (tuple(cK), 'layshaft post', (-95, 55)), (tuple(cJ), 'stepped post (J)', (-95, -25)), (tuple(cCI), 'crank-idler post', (10, -70))]),
 ('Shaft', ['shaft_G1'], "Lower the shaft over the centre pin, gear down, until the gear rests on the boss. Turn it so the small arrow on the gear points to 12 o'clock; the keyway groove then faces 3 o'clock. Keep it there until the island hub is on.",
  [((0, 11.3), "arrow to 12 o'clock", (-90, 40)), ((5.8, 0), "keyway faces 3 o'clock", (20, 40))]),
 ('Layshaft K', ['layshaft_K'], 'Drop the layshaft on its post, bigger gear down. Any orientation; it meshes the shaft gear.', [(tuple(cK), 'big gear down', (-95, 70))]),
 ('Crank idler and crank gear', ['crank_idler', 'crank_gear'], "Put the 52-tooth crank idler on its post (hub up, any orientation). Lower the crank gear over the crank pin, axle up, with its arrow pointing to 12 o'clock. Check: turning the shaft turns the crank the same way.",
  [(tuple(cCI), '52T idler, hub up', (20, 20)), (tuple(cCG + [0, 11]), "crank arrow to 12 o'clock", (50, -20))]),
 ('Idler J', ['idler_J'], 'Lower the 16-tooth idler J onto the stepped post and rotate it gently until it drops onto the step, meshing the upper gear of K.', [(tuple(cJ), 'idler J on the step', (-95, -45))]),
 ('Carrier hub', ['carrier_hub'], "Lower the carrier hub over the shaft with its arrow at 12 o'clock (its flat faces 3 o'clock). It meshes idler J. If it will not drop in, recheck the shaft arrow rather than forcing it.",
  [((0, 10), "arrow to 12 o'clock", (-80, 45))]),
 ('Carrier plate', ['carrier_plate'], "Press the plate onto the hub's flat-sided tube (fits one way): big arrow to 12 o'clock, the two posts toward 3 o'clock. Check: turning the shaft turns the plate the opposite way at the same speed.",
  [((0, 22.5), "arrow to 12 o'clock", (-85, 60)), ((42, 0), "planet post (3 o'clock)", (45, 45)), ((21, 0), 'idler post', (5, -50))]),
 ('Sun', ['sun'], "Slide the sun down the shaft, collar up. The tab in its bore rides in the shaft's keyway, so it only fits one way.", [((0, 0), 'collar up', (-70, -45))]),
 ('Carrier idler + lock gear', ['idler_I_lock'], 'Put the two-level idler on the inner carrier post, small gear on top. Any orientation; it meshes the sun.', [((21, 0), 'small gear on top', (10, -55))]),
 ('Planet', ['planet'], "Put the planet on the outer post with the flat of its key facing outward (3 o'clock). This sets the arm timing.", [((47.6, 0), 'flat faces outward', (40, 40))]),
 ('Island hub', ['island_hub'], "Lower the island hub over the shaft, flat facing 3 o'clock; it meshes the small idler gear. Check: turn the shaft a full turn. The island hub must stay still while the planet turns with the shaft.",
  [((8.6, 0), "flat faces 3 o'clock", (25, 45))]),
 ('Planet arm (S shown)', [f'{KEY}_arm'], 'Press the arm onto the planet key (fits one way), pin up. Each set has its own arm, lettered D, S or N.', [(tuple(PINP), 'pin, pointing up', (-10, 70))]),
 ('Outer face and round island', [F, f'{F}_WHITE', f'{F}_PURPLE', I], "Set the outer face on the three wall pegs (fits one way) with the pin poking up through the cut-out. Press the round island (lettered on top) onto the hub's flat key until it sits flat.",
  [((0, 97.5), 'peg pattern is unique', (-90, 80)), ((0, 0), 'round island on its key', (-85, -50))]),
 ('Ear lid and crank knob', ['ear_lid', f'{KEY}_crank_knob'], "Press the ear lid onto its two pegs; the crank axle passes through its bearing hole. Press the crank knob onto the axle's flat. The knob's arrow stays parallel to x.", [(tuple(cCG), 'crank knob', (50, -120))]),
 ('Ax hand and red arrow', ['Ax_hand', 'Ax_arrow'], 'Slide the red arrow into the track under the Ax hand from its open tip, point outward. Lower the hand over the island boss and guide the pin up into the arrow (slide the arrow along the track until it drops onto the pin).',
  [(tuple(PINP), 'pin inside the red arrow', (-20, 75))]),
 ('x hand and centre knob', [f'{KEY}_x_hand', 'centre_knob'], "Press the x hand onto the top of the shaft (its tab finds the keyway), then the centre knob. Check (S set): x points to 12 o'clock and the red arrow sits at 21·(2, 1) mm. Turn the crank: when the arrow sits on the line of x, x is an eigenvector.",
  [((0, 21), "x to 12 o'clock", (-85, 40)), (tuple(PINP), 'Ax at 21·(2, 1)', (40, 60))]),
]
inst = []
import io, contextlib
from PIL import Image
PAGES = []
class _R:
    def savefig(self, fig):
        b = io.BytesIO(); fig.savefig(b, format='png', dpi=150); b.seek(0); PAGES.append(Image.open(b).convert('RGB'))
with contextlib.nullcontext(_R()) as pdf:
    fig = plt.figure(figsize=(11, 8.5))
    fig.text(0.05, 0.93, 'Eigenvector Clock v3 - assembly guide', fontsize=20, weight='bold')
    fig.text(0.05, 0.885, "Assemble with the base flat, viewed from above. Set the shaft arrow to 12 o'clock first; every later arrow and flat refers to that pose.", fontsize=10)
    ax = fig.add_axes([0.05, 0.05, 0.9, 0.78])
    lift = 0
    order = ['base', 'centre_pin', 'crank_pin', 'shaft_G1', 'layshaft_K', 'crank_idler', 'crank_gear', 'idler_J', 'carrier_hub', 'carrier_plate', 'sun', 'idler_I_lock', 'planet', 'island_hub', f'{KEY}_arm', F, I, 'ear_lid', f'{KEY}_crank_knob', 'Ax_hand', 'Ax_arrow', f'{KEY}_x_hand', 'centre_knob']
    lifts = {n: 9.5 * i for i, n in enumerate(order)}
    labs = []
    for n in order:
        rings = P0[n].translate([0, 0, lifts[n]]).rotate([-90, 0, 0]).slice(0.0).to_polygons()
        add(ax, rings, colr(n), '#111', 0.3, 1)
        if n != 'base':
            b = P0[n].bounding_box(); labs.append([(b[2] + b[5]) / 2 + lifts[n], NAME.get(n, n), (b[2] + b[5]) / 2 + lifts[n]])
    labs.sort(key=lambda t: t[0])
    for i in range(1, len(labs)):
        labs[i][0] = max(labs[i][0], labs[i - 1][0] + 8.0)
    for y, t, y0 in labs:
        ax.text(140, y, t, fontsize=8, va='center'); ax.plot([108, 138], [y0, y], color='#bbb', lw=0.5)
    ax.set_xlim(-104, 230); ax.set_ylim(-2, 300); ax.set_aspect('equal'); ax.axis('off')
    ax.set_title('Exploded side cut, bottom to top in assembly order (set S shown)', fontsize=10)
    pdf.savefig(fig); plt.close(fig)
    for i, (t, new, txt, notes) in enumerate(STEPS):
        new = [n for n in new if n in P0]
        inst += new
        fig = plt.figure(figsize=(11, 8.5))
        fig.text(0.04, 0.945, f'Step {i + 1}.  {t}', fontsize=17, weight='bold')
        fig.text(0.04, 0.905, '\n'.join(textwrap.wrap(txt, 150)), fontsize=10, va='top')
        ax = fig.add_axes([0.0, 0.02, 0.62, 0.82]); top(ax, inst, new)
        for xy, s, at in notes: note(ax, xy, s, at)
        ax2 = fig.add_axes([0.6, 0.30, 0.39, 0.36]); side(ax2, inst, new)
        if any('filler' in n for n in new):
            axz = fig.add_axes([0.36, 0.52, 0.25, 0.3]); top(axz, inst, new)
            axz.set_xlim(-14, 14); axz.set_ylim(-14, 14); axz.set_title('top view, zoomed on the shaft', fontsize=8, color='#555')
            for t in list(axz.texts): t.remove()
            for a in list(axz.patches):
                pass
            axs = fig.add_axes([0.62, 0.04, 0.35, 0.24]); side(axs, inst, new)
            axs.set_xlim(-25, 25); axs.set_ylim(0, 54); axs.set_title('side cut, zoomed on the shaft (strip in colour)', fontsize=8, color='#555')
        fig.text(0.62, 0.22, 'Coloured = parts added in this step\nGrey = already installed', fontsize=9, color='#444')
        pdf.savefig(fig); plt.close(fig)
    fig = plt.figure(figsize=(11, 8.5))
    fig.text(0.04, 0.94, 'Swapping matrix sets (D, S, N)', fontsize=17, weight='bold')
    fig.text(0.04, 0.89, '\n'.join([
        'Each set is five printed pieces, all lettered: outer face, round island, planet arm, x hand, crank knob. Everything else stays in the clock.',
        '1. Pull off the centre knob, then the x hand.   2. Lift the Ax hand (the red arrow stays in its track).   3. Lift the island and the outer face.',
        '4. Pull the crank knob.   5. Lift the planet arm off the planet key.   6. Put on the new arm, outer face, island, Ax hand (pin into the arrow),',
        '   x hand, centre knob and crank knob, all with the same letter. Every piece is keyed, so the gears can be at any angle: no re-timing.']), fontsize=10.5, va='top')
    ax = fig.add_axes([0.05, 0.03, 0.9, 0.7])
    swap = [f'{KEY}_arm', F, I, f'{KEY}_crank_knob', 'Ax_hand', 'Ax_arrow', f'{KEY}_x_hand', 'centre_knob']
    lifts = {f'{KEY}_arm': 24, F: 44, I: 44, f'{KEY}_crank_knob': 60, 'Ax_hand': 66, 'Ax_arrow': 66, f'{KEY}_x_hand': 84, 'centre_knob': 98}
    for n in order:
        dz = lifts.get(n, 0)
        rings = P0[n].translate([0, 0, dz]).rotate([-90, 0, 0]).slice(0.0).to_polygons()
        c = colr(n) if n in swap else fade(colr(n))
        add(ax, rings, c, '#111' if n in swap else '#a0a6ad', 0.3, 2 if n in swap else 1)
    for n, lab in [(f'{KEY}_arm', 'planet arm (set)'), (F, 'outer face + island (set)'), ('Ax_hand', 'Ax hand + red arrow (shared)'), (f'{KEY}_x_hand', 'x hand (set)'), ('centre_knob', 'centre knob (shared)')]:
        b = P0[n].bounding_box(); ax.text(108, (b[2] + b[5]) / 2 + lifts[n], lab, fontsize=9, va='center')
    ax.set_xlim(-104, 190); ax.set_ylim(-2, 160); ax.set_aspect('equal'); ax.axis('off')
    pdf.savefig(fig); plt.close(fig)
PAGES[0].save('/home/claude/eig3/pkg/eigen_clock_v3/assembly_guide.pdf', save_all=True, append_images=PAGES[1:], resolution=150)
print('guide ok')
