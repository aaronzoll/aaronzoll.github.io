import numpy as np, manifold3d as m3, trimesh
from shapely.geometry import Polygon, MultiPolygon, Point, box
from shapely.ops import unary_union
from shapely import affinity
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties

MOD = 1.5          # gear module
PA = np.radians(20)
import os
BACK = float(os.environ.get("BACK", "0.05"))  # tooth thinning per gear at pitch circle (mm)

def to_cs(geom):
    polys = [geom] if isinstance(geom, Polygon) else list(geom.geoms)
    rings = []
    for p in polys:
        rings.append(np.array(p.exterior.coords)[:-1])
        for h in p.interiors:
            rings.append(np.array(h.coords)[:-1])
    return m3.CrossSection(rings, m3.FillRule.EvenOdd)

def ext(geom, z0, z1):
    return m3.Manifold.extrude(to_cs(geom), z1 - z0).translate([0, 0, z0])

def circ(r, c=(0, 0), n=128):
    return Point(c).buffer(r, quad_segs=n // 4)

def rot(g, deg, origin=(0, 0)):
    return affinity.rotate(g, deg, origin=origin)

def gear2d(N, phase_deg=0.0, center=(0, 0), m=MOD):
    """Rack-generated involute gear; a tooth is centered at phase_deg (world)."""
    r = m * N / 2
    ra = r + m
    blank = circ(ra, n=256)
    w0 = np.pi * m / 2 + 2 * BACK          # cutter tooth width at pitch line
    hc = 1.25 * m
    def cutter(xs):
        # trapezoid tooth pointing +y, pitch line at y = -r
        y0, y1 = -r - 1.2 * m, -r + hc
        hw = lambda y: w0 / 2 - (y + r) * np.tan(PA)
        return Polygon([(xs - hw(y0), y0), (xs + hw(y0), y0),
                        (xs + hw(y1), y1), (xs - hw(y1), y1)])
    ts = np.linspace(-3.2 * m / r, 3.2 * m / r, 121)
    gap = unary_union([rot(cutter(r * t), -np.degrees(t)) for t in ts])
    gap = gap.intersection(blank.buffer(1))
    gaps = unary_union([rot(gap, 360 * k / N) for k in range(N)])
    g = blank.difference(gaps).buffer(0)
    # gap centered at -90 deg; tooth at -90 + 180/N
    g = g.simplify(0.004)
    g = rot(g, phase_deg - (-90 + 180 / N))
    return affinity.translate(g, *center)

FONT = FontProperties(family="DejaVu Sans", weight="bold")

def text2d(s, size, halign="center", valign="center"):
    tp = TextPath((0, 0), s, size=size, prop=FONT)
    polys = [Polygon(p) for p in tp.to_polygons() if len(p) >= 3]
    g = Polygon()
    for p in polys:
        g = g.symmetric_difference(p.buffer(0))
    minx, miny, maxx, maxy = g.bounds
    dx = {"center": -(minx + maxx) / 2, "left": -minx, "right": -maxx}[halign]
    dy = {"center": -(miny + maxy) / 2, "base": 0}[valign]
    return affinity.translate(g, dx, dy)

def save(man, path):
    mesh = man.to_mesh()
    vp, tv = np.array(mesh.vert_properties)[:, :3], np.array(mesh.tri_verts)
    np.savez_compressed(path[:-4] + '.npz', v=vp.astype(np.float32), f=tv.astype(np.uint32))
    tm = trimesh.Trimesh(vp, tv, process=False)
    assert tm.is_watertight, path
    tm.export(path)
    return tm
