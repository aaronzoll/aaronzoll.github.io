# Eigenvector Clock v3

The design is the same as v2, rebuilt for strength. This is a full reprint, and v2 parts don't fit v3.

## What's new

**Strength**
- **Push-in pins replace the printed centre and crank posts.** Two identical pins (`centre_pin`, `crank_pin`) press up through holes in the base floor. Their heads sit flush in recesses underneath.
  - Each is 10 mm thick and stands about 13 mm proud. That's roughly 25× stronger in bending than the old 7 mm × 42 mm post.
  - A broken pin can be reprinted without reprinting the base.
- **Sockets instead of tubes.** The shaft and the crank gear each have a socket in their bottom that rides on the pin.
- **Crank supported at both ends.** The crank axle is now solid (14 mm) and also turns in a bearing hole in the ear lid.
- **Fillets and thicker posts.** Every remaining post has a fillet at its root, with a matching chamfer on the gear bore. The planet post is 8 mm (was 6) and the idler post 7 mm (was 6). The base has a fillet where the wall meets the floor.
- **Thicker pin.** The red arrow's pin is 4.5 mm (was 4.0) with a root fillet. The face cut-out is 1 mm wider to match.

**Fit and accuracy**
- **Keyway instead of a flat.** The shaft has a keyway groove instead of a flat side, so the hubs ride on a round shaft and no filler strips are needed. The sun, x hand and centre knob key into the groove.
- **v2.1 fits built in.** Bores have 0.15 mm radial clearance and every key has about 0.05 mm of play.
- **Round islands.** Each set's inner face piece is a plain black disc with its letter lightly engraved. A disc looks the same at any angle, so the island's leftover rock can't be seen.

**Not included: a defective matrix.** The mechanism builds Az = pz + q z̄, with the |q| term on the carrier. The arm then has length C|p|/|q|. It only clears the centre stack if |p| < |q|, which is the same as det A < 0. A defective 2×2 matrix has a repeated real eigenvalue λ, so det A = λ² ≥ 0. For [2 1; 0 2] the arm would be 4.1 times the carrier radius and would sweep through the centre. It cannot be built on this gear train.

## Filament slots

| Slot | Filament | Used for |
|---|---|---|
| 1 | Black matte PLA | base, pins, gears, faces, discs, Ax hand, arms, ear lid |
| 2 | White PLA | text, ticks, eigen-lines |
| 3 | Purple PLA | x hands, knobs, unit circle |
| 4 | Red matte PLA | Ax arrow |

## Plates (`eigen_clock_v3.3mf`)

1. **Base.** The longest print.
2. **Gears, pins, carrier.** All gears, both pins, the carrier plate, the Ax hand, the ear lid and the three arms.
3. **Face D + disc D.** The disc prints in its assembled place, inside the cut-out.
4. **Face S + disc S.**
5. **Face N + disc N.**
6. **Hands, knobs and red arrow.**

The same parts are in `stl/`, already in print orientation.

Print order: plate 2 first, then the base. Assemble the gear train (guide steps 1–11) and check it before printing the faces.

Settings:
- 0.2 mm layers, 4 walls on gears and pins, 15% infill.
- No supports.
- Elephant-foot compensation 0; the relief is built in.

## Assembly

See `assembly_guide.pdf`: 16 steps plus a swap page.

The pins come first. Press each pin up through the base from underneath until its head is flush. It should be a firm push. If it's too tight, sand the shank lightly; if it's loose, a single wrap of tape on the shank fixes it.

## Swapping sets

Each set is five lettered pieces: outer face, round disc, planet arm, x hand and crank knob.

1. Remove the centre knob, then the x hand.
2. Lift off the Ax hand. The red arrow stays in its track.
3. Lift off the disc and the outer face.
4. Pull off the crank knob.
5. Lift the arm off the planet.
6. Fit the new set in reverse order.

Every piece is keyed and fits only one way, so nothing needs re-timing.

## Verified in software

- The pin follows s·Ax exactly, and the x hand points along x, for all three sets.
- No collisions between any parts, checked every 5° through a full turn for all three sets.
- No supports needed in the print orientations.
