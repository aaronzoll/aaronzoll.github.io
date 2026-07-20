/* ===========================================================================
   sofa-math.js — generalized moving-sofa simulation core.

   Ported verbatim (algorithms unchanged) from the original self-contained
   app and sofalib.mjs. Pure math + numerics, no rendering, no DOM.
   Depends on a global COEF (js/coef.js) with the exact ODE coefficients.

   Exposes globalThis.SofaMath = { PI, rad, mu, nu, integrate, solve,
     resnorm, inRange, maskGrid, extractBoundary, buildFamily, solutionAt,
     pose, buildShape, range() }.
   =========================================================================== */
(function (root) {
  "use strict";
  var COEF = root.COEF;
  if (!COEF) throw new Error("sofa-math.js: global COEF not found (load js/coef.js first)");

  var PI = Math.PI, rad = function (d) { return d * PI / 180; };
  var mu = function (s) { return [Math.cos(s), Math.sin(s)]; };
  var nu = function (s) { return [-Math.sin(s), Math.cos(s)]; };

  /* ----- ODE right-hand side and RK4 phase integrator ----- */
  function rhs(t, st, c, phi) {
    var M = COEF[c].M(t, phi), b = COEF[c].b(t, phi);
    return [st[2], st[3], M[0][0] * st[2] + M[0][1] * st[3] + b[0], M[1][0] * st[2] + M[1][1] * st[3] + b[1]];
  }
  function integPhase(t0, t1, st, c, phi, n, path) {
    var h = (t1 - t0) / n, s = st.slice();
    for (var i = 0; i < n; i++) {
      var t = t0 + i * h; var k1 = rhs(t, s, c, phi);
      var s2 = [s[0] + h / 2 * k1[0], s[1] + h / 2 * k1[1], s[2] + h / 2 * k1[2], s[3] + h / 2 * k1[3]]; var k2 = rhs(t + h / 2, s2, c, phi);
      var s3 = [s[0] + h / 2 * k2[0], s[1] + h / 2 * k2[1], s[2] + h / 2 * k2[2], s[3] + h / 2 * k2[3]]; var k3 = rhs(t + h / 2, s3, c, phi);
      var s4 = [s[0] + h * k3[0], s[1] + h * k3[1], s[2] + h * k3[2], s[3] + h * k3[3]]; var k4 = rhs(t + h, s4, c, phi);
      s = [s[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), s[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
           s[2] + h / 6 * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]), s[3] + h / 6 * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3])];
      if (path) path.push({ t: t + h, x: s[0], y: s[1] });
    }
    return s;
  }
  var NTOT = 1100;
  function integrate(phi, u, four, storePath) {
    var bnds, cases;
    if (four) { bnds = [0, u[2], u[3], phi - u[3], phi - u[2], phi]; cases = [1, 2, 3, 4, 5]; }
    else { bnds = [0, u[2], phi / 2, phi - u[2], phi]; cases = [1, 2, 4, 5]; }
    var st = [0, 0, u[0], u[1]]; var bS = [st.slice()]; var path = storePath ? [{ t: 0, x: 0, y: 0 }] : null;
    for (var k = 0; k < cases.length; k++) {
      var t0 = bnds[k], t1 = bnds[k + 1];
      if (t1 - t0 < 1e-9) { bS.push(st.slice()); continue; }
      st = integPhase(t0, t1, st, cases[k], phi, Math.max(6, Math.round(NTOT * (t1 - t0) / phi)), path); bS.push(st.slice());
    }
    return { bStates: bS, path: path };
  }

  /* ----- boundary-value residual + damped-Newton solve ----- */
  function contactB(t, st, phi) { var w = nu(t - phi), m = mu(t - phi), d = st[2] * w[0] + st[3] * w[1]; return [st[0] - d * m[0], st[1] - d * m[1]]; }
  function residual(u, phi, four) {
    var bS = integrate(phi, u, four, false).bStates, sa, sPB, sEnd, tPB;
    if (four) { sa = bS[1]; sPB = bS[3]; sEnd = bS[5]; tPB = phi - u[3]; } else { sa = bS[1]; sPB = bS[2]; sEnd = bS[4]; tPB = phi / 2; }
    var B = contactB(tPB, sPB, phi); return [sa[0] - B[0], sa[1] - B[1], sEnd[2] - u[0], sEnd[3] + u[1]];
  }
  function solveLin(A, b) {
    var n = b.length, M = A.map(function (r, i) { return r.concat([b[i]]); });
    for (var c = 0; c < n; c++) {
      var p = c; for (var r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      var tmp = M[c]; M[c] = M[p]; M[p] = tmp; var pv = M[c][c]; for (var k = c; k <= n; k++) M[c][k] /= pv;
      for (var r2 = 0; r2 < n; r2++) { if (r2 !== c) { var f = M[r2][c]; for (var k2 = c; k2 <= n; k2++) M[r2][k2] -= f * M[c][k2]; } }
    }
    return M.map(function (r) { return r[n]; });
  }
  function nrm(R) { var m = 0; for (var i = 0; i < 4; i++) { var a = Math.abs(R[i]); if (!isFinite(a)) return Infinity; if (a > m) m = a; } return m; }
  function inRange(u, phi, four) {
    if (!(u[2] > 1e-5)) return false;
    if (four) { if (!(u[2] < u[3])) return false; if (!(u[3] < phi / 2 - 1e-6)) return false; } else { if (!(u[2] < phi / 2 - 1e-6)) return false; }
    return true;
  }
  function resnorm(u, phi, four) { return nrm(residual(u, phi, four)); }
  function solve(u0, phi, four) {
    var u = u0.slice(), nU = u.length, R = residual(u, phi, four), f = nrm(R);
    for (var it = 0; it < 80 && f > 1e-12; it++) {
      var eps = 1e-7, J = []; for (var i = 0; i < 4; i++) J.push(new Array(nU).fill(0));
      for (var j = 0; j < nU; j++) { var up = u.slice(); up[j] += eps; var Rp = residual(up, phi, four); for (var i2 = 0; i2 < 4; i2++) J[i2][j] = (Rp[i2] - R[i2]) / eps; }
      var d;
      if (nU === 4) d = solveLin(J, R.map(function (x) { return -x; }));
      else {
        var A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], g = [0, 0, 0];
        for (var a = 0; a < 3; a++) { for (var i3 = 0; i3 < 4; i3++) g[a] += J[i3][a] * R[i3]; for (var b = 0; b < 3; b++) { var sm = 0; for (var i4 = 0; i4 < 4; i4++) sm += J[i4][a] * J[i4][b]; A[a][b] = sm; } }
        d = solveLin(A, g.map(function (x) { return -x; }));
      }
      if (d.some(function (x) { return !isFinite(x); })) break;
      var lam = 1, imp = false;
      for (var ls = 0; ls < 30; ls++) {
        var un = u.map(function (v, i5) { return v + lam * d[i5]; });
        if (inRange(un, phi, four)) { var Rn = residual(un, phi, four), fn = nrm(Rn); if (fn < f * (1 - 1e-4 * lam)) { u = un; R = Rn; f = fn; imp = true; break; } } lam *= 0.5;
      }
      if (!imp) break;
    }
    return { u: u, f: f };
  }

  /* ----- occupancy mask (intersection of rotated hallways) + area ----- */
  function maskGrid(phi, u, four, N) {
    var path = integrate(phi, u, four, true).path;
    var sub = [], step = Math.max(1, Math.floor(path.length / 340));
    for (var i = 0; i < path.length; i += step) sub.push(path[i]); sub.push(path[path.length - 1]);
    var lo = [1e9, 1e9], hi = [-1e9, -1e9];
    for (var s0 = 0; s0 < sub.length; s0++) { var p = sub[s0]; lo[0] = Math.min(lo[0], p.x); lo[1] = Math.min(lo[1], p.y); hi[0] = Math.max(hi[0], p.x); hi[1] = Math.max(hi[1], p.y); }
    var sp = Math.sin(phi), cp = Math.cos(phi), pad = 1.25, mask, gx, gy, area = 0, bx0, bx1, by0, by1;
    for (var tries = 0; tries < 7; tries++) {
      bx0 = lo[0] - pad; bx1 = hi[0] + pad; by0 = lo[1] - pad; by1 = hi[1] + pad;
      gx = new Float64Array(N); gy = new Float64Array(N);
      for (var q = 0; q < N; q++) { gx[q] = bx0 + (bx1 - bx0) * q / (N - 1); gy[q] = by0 + (by1 - by0) * q / (N - 1); }
      mask = new Uint8Array(N * N).fill(1);
      for (var si = 0; si < sub.length; si++) {
        var s = sub[si], t = s.t, c = Math.cos(t), sn = Math.sin(t), xx = s.x, xy = s.y;
        for (var iy = 0; iy < N; iy++) {
          var Y = gy[iy], base = iy * N;
          for (var ix = 0; ix < N; ix++) {
            var idx = base + ix; if (!mask[idx]) continue;
            var dx = gx[ix] - xx, dy = Y - xy; var qx = c * dx + sn * dy, qy = -sn * dx + c * dy; var a1 = qy, a2 = qx * sp + qy * cp;
            if (!(a1 <= 1 && a2 <= 1 && (a1 >= 0 || a2 >= 0))) mask[idx] = 0;
          }
        }
      }
      var touch = false; for (var e = 0; e < N; e++) { if (mask[e] || mask[(N - 1) * N + e] || mask[e * N] || mask[e * N + N - 1]) { touch = true; break; } }
      var cnt = 0; for (var m2 = 0; m2 < N * N; m2++) cnt += mask[m2]; area = cnt * (gx[1] - gx[0]) * (gy[1] - gy[0]);
      if (!touch) break; pad *= 1.7;
    }
    return { mask: mask, N: N, gx: gx, gy: gy, area: area, bx0: bx0, bx1: bx1, by0: by0, by1: by1 };
  }

  /* ----- marching squares → largest boundary loop ----- */
  function extractBoundary(mask, N, gx, gy) {
    var segs = [];
    var at = function (i, j) { return mask[j * N + i] ? 1 : 0; };
    for (var j = 0; j < N - 1; j++) for (var i = 0; i < N - 1; i++) {
      var bl = at(i, j), br = at(i + 1, j), tr = at(i + 1, j + 1), tl = at(i, j + 1);
      var c = bl | (br << 1) | (tr << 2) | (tl << 3);
      var eB = 'H' + i + ',' + j, eT = 'H' + i + ',' + (j + 1), eL = 'V' + i + ',' + j, eR = 'V' + (i + 1) + ',' + j;
      switch (c) {
        case 1: segs.push([eB, eL]); break; case 2: segs.push([eB, eR]); break; case 3: segs.push([eL, eR]); break;
        case 4: segs.push([eR, eT]); break; case 5: segs.push([eB, eL]); segs.push([eR, eT]); break;
        case 6: segs.push([eB, eT]); break; case 7: segs.push([eL, eT]); break; case 8: segs.push([eL, eT]); break;
        case 9: segs.push([eB, eT]); break; case 10: segs.push([eB, eR]); segs.push([eL, eT]); break;
        case 11: segs.push([eR, eT]); break; case 12: segs.push([eL, eR]); break; case 13: segs.push([eB, eR]); break;
        case 14: segs.push([eB, eL]); break;
      }
    }
    var pos = function (key) { var t = key[0]; var parts = key.slice(1).split(','); var i = +parts[0], j = +parts[1]; return t === 'H' ? [(gx[i] + gx[i + 1]) / 2, gy[j]] : [gx[i], (gy[j] + gy[j + 1]) / 2]; };
    var adj = new Map();
    for (var q = 0; q < segs.length; q++) { var a = segs[q][0], b = segs[q][1]; (adj.get(a) || adj.set(a, []).get(a)).push(b); (adj.get(b) || adj.set(b, []).get(b)).push(a); }
    var used = new Set(), best = [];
    var keys = Array.from(adj.keys());
    for (var ki = 0; ki < keys.length; ki++) {
      var start = keys[ki]; if (used.has(start)) continue;
      var loop = [], cur = start, prev = null;
      while (cur && !used.has(cur)) {
        used.add(cur); loop.push(cur);
        var nb = adj.get(cur) || [], nxt = null;
        for (var n2 = 0; n2 < nb.length; n2++) { if (nb[n2] !== prev && !used.has(nb[n2])) { nxt = nb[n2]; break; } }
        if (!nxt) { for (var n3 = 0; n3 < nb.length; n3++) { if (nb[n3] !== prev) { nxt = nb[n3]; break; } } if (nxt && used.has(nxt)) break; }
        prev = cur; cur = nxt;
      }
      if (loop.length > best.length) best = loop;
    }
    return best.map(pos);
  }

  /* ----- solution family via continuation from the Gerver seed ----- */
  var cache = {}; var AMIN = 30, AMAX = 170, CROSS = 102;
  function buildFamily() {
    cache = {}; AMIN = 30; AMAX = 170; CROSS = 102;
    var g = solve([0.0001, 1.4205, 0.0392, 0.6815], PI - rad(90), true);
    cache[90] = { u: g.u.slice(), four: true };
    var uu = g.u.slice(), four = true;
    for (var al = 91; al <= 176; al++) {
      var phi = PI - rad(al);
      if (four) { var un = solve(uu, phi, true).u; if (un[3] < phi / 2 - 1e-3) { uu = un; } else { four = false; CROSS = al; uu = solve([un[0], un[1], un[2]], phi, false).u; } }
      else uu = solve(uu, phi, false).u;
      if (resnorm(uu, phi, four) > 1e-6 || !inRange(uu, phi, four)) { AMAX = al - 1; break; }
      cache[al] = { u: uu.slice(), four: four }; AMAX = al;
    }
    var ud = g.u.slice();
    for (var al2 = 89; al2 >= 20; al2--) {
      var phi2 = PI - rad(al2); ud = solve(ud, phi2, true).u;
      if (resnorm(ud, phi2, true) > 1e-6 || !inRange(ud, phi2, true)) { AMIN = al2 + 1; break; }
      cache[al2] = { u: ud.slice(), four: true }; AMIN = al2;
    }
    return { AMIN: AMIN, AMAX: AMAX, CROSS: CROSS };
  }
  function solutionAt(alpha) {
    var lo = Math.floor(alpha), hi = Math.ceil(alpha), cl = cache[lo], ch = cache[hi];
    if (cl && ch && cl.four === ch.four) { var w = alpha - lo; return { phi: PI - rad(alpha), four: cl.four, u: cl.u.map(function (v, i) { return v * (1 - w) + ch.u[i] * w; }) }; }
    var e = cl || ch || cache[Math.max(AMIN, Math.min(AMAX, Math.round(alpha)))];
    return { phi: PI - rad(alpha), four: e.four, u: e.u.slice() };
  }
  function range() { return { AMIN: AMIN, AMAX: AMAX, CROSS: CROSS }; }

  /* ----- kinematics: pose T_t(S)=R_{-t}(S - x(t)); straight slides before/after ----- */
  function pose(tau, st) {
    var a1 = 0.16, a2 = 0.84, phi = st.phi;
    if (tau <= a1) { var f = tau / a1; return { th: 0, vx: -st.Din * (1 - f), vy: 0 }; }
    if (tau <= a2) { var t = phi * (tau - a1) / (a2 - a1); var xy = st.xyAt(t); var th = -t, c = Math.cos(-t), s = Math.sin(-t); return { th: th, vx: c * (-xy[0]) - s * (-xy[1]), vy: s * (-xy[0]) + c * (-xy[1]) }; }
    var xy2 = st.xyAt(phi); var c2 = Math.cos(-phi), s2 = Math.sin(-phi);
    var v0x = c2 * (-xy2[0]) - s2 * (-xy2[1]), v0y = s2 * (-xy2[0]) + c2 * (-xy2[1]);
    var f2 = (tau - a2) / (1 - a2), D = st.Dout * f2, edx = Math.cos(phi), edy = -Math.sin(phi);
    return { th: -phi, vx: v0x + D * edx, vy: v0y + D * edy };
  }

  /* ----- per-alpha geometry bundle (shape, area, motion sampler, hallway minima) ----- */
  function buildShape(alpha) {
    var sol = solutionAt(alpha), phi = sol.phi, u = sol.u, four = sol.four;
    var path = integrate(phi, u, four, true).path;
    var Tarr = path.map(function (p) { return p.t; }), Xarr = path.map(function (p) { return p.x; }), Yarr = path.map(function (p) { return p.y; }), NL = Tarr.length;
    var xyAt = function (t) {
      if (t <= Tarr[0]) return [Xarr[0], Yarr[0]]; if (t >= Tarr[NL - 1]) return [Xarr[NL - 1], Yarr[NL - 1]];
      var lo = 0, hi = NL - 1; while (hi - lo > 1) { var m = (lo + hi) >> 1; if (Tarr[m] <= t) lo = m; else hi = m; }
      var w = (t - Tarr[lo]) / (Tarr[hi] - Tarr[lo]); return [Xarr[lo] + w * (Xarr[hi] - Xarr[lo]), Yarr[lo] + w * (Yarr[hi] - Yarr[lo])];
    };
    var M = maskGrid(phi, u, four, alpha > 150 ? 260 : 230);
    var poly = extractBoundary(M.mask, M.N, M.gx, M.gy), area = M.area;
    var Din = M.bx1 + 0.8, Dout = (M.bx1 - M.bx0) + 0.8;
    var st0 = { phi: phi, Din: Din, Dout: Dout, xyAt: xyAt };
    var SX0 = 1e9, SX1 = -1e9, SY0 = 1e9, SY1 = -1e9, maxExit = -1e9;
    var edx = Math.cos(phi), edy = -Math.sin(phi), samp = []; for (var i = 0; i < poly.length; i += 5) samp.push(poly[i]);
    for (var k = 0; k <= 32; k++) {
      var pz = pose(k / 32, st0), cth = Math.cos(pz.th), sth = Math.sin(pz.th);
      for (var pI = 0; pI < samp.length; pI++) {
        var pp = samp[pI]; var wx = cth * pp[0] - sth * pp[1] + pz.vx, wy = sth * pp[0] + cth * pp[1] + pz.vy;
        if (wx < SX0) SX0 = wx; if (wx > SX1) SX1 = wx; if (wy < SY0) SY0 = wy; if (wy > SY1) SY1 = wy;
        var pr = wx * edx + wy * edy; if (pr > maxExit) maxExit = pr;
      }
    }
    var minLin = Math.max(3, -SX0 + 0.5), minLout = Math.max(3, maxExit + 0.5);
    return {
      phi: phi, four: four, u: u, poly: poly, area: area, xyAt: xyAt,
      Din: Din, Dout: Dout, minLin: minLin, minLout: minLout,
      swept: { SX0: SX0, SX1: SX1, SY0: SY0, SY1: SY1, maxExit: maxExit }
    };
  }

  root.SofaMath = {
    PI: PI, rad: rad, mu: mu, nu: nu,
    integrate: integrate, solve: solve, resnorm: resnorm, inRange: inRange,
    maskGrid: maskGrid, extractBoundary: extractBoundary,
    buildFamily: buildFamily, solutionAt: solutionAt, range: range,
    pose: pose, buildShape: buildShape
  };
})(typeof window !== "undefined" ? window : globalThis);
