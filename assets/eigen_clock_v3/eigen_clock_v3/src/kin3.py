import numpy as np
from shapely.geometry import Polygon
from pose3 import *
for key, d in SETS.items():
    A = np.array(d['A'], float); err = 0; aerr = 0
    for phi in np.arange(0, 360, 7.5):
        P = posed(key, phi)
        ring = P[f'{key}_arm'].slice(Z["pint"] - 2.0).to_polygons()
        pin = np.array(Polygon(ring[0]).centroid.coords[0])
        th = np.radians(phi + d['delta'])
        ideal = d['s'] * (A @ [np.cos(th), np.sin(th)])
        err = max(err, np.linalg.norm(pin - ideal))
        # x hand direction from the purple part: farthest point of slice
        xs = np.asarray(P[f'{key}_x_hand'].slice(Z["xht"] - 1.0).to_polygons()[0])
        tip = xs[np.argmax(np.hypot(xs[:, 0], xs[:, 1]))]
        aerr = max(aerr, abs(((np.degrees(np.arctan2(tip[1], tip[0])) - np.degrees(th) + 180) % 360) - 180))
        # crank knob arrow parallel to x: check crank gear rotation equals phi (by construction)
    print(f'{key}: max |pin - s·Ax| = {err:.4f} mm,  x-hand direction error {aerr:.3f}°')
