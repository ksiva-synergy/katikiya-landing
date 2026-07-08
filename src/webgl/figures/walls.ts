// FIG. 04 — SOVEREIGNTY: orbiting data, reflecting walls, probes that die at the
// boundary. Nothing leaves the walls.
import type { Painter } from '../engine'
import { col, hexCol } from '../Renderer'
import { fbm, smooth } from '../noise'

interface Orb {
  a: number
  sp: number
  ra: number
  rb: number
}
interface Ripple {
  x: number
  y: number
  t0: number
}

export const walls: Painter = (r, c) => {
  const { w, h, t, dataLight: dl } = c
  const state = c.state as { orb?: Orb[]; ripples?: Ripple[]; lastRip?: number }

  const x0 = w * 0.2
  const y0 = h * 0.18
  const W = w * 0.6
  const H = h * 0.62
  const cx = x0 + W / 2
  const cy = y0 + H / 2

  if (!state.orb) {
    state.orb = []
    for (let i = 0; i < 30; i++) {
      state.orb.push({
        a: Math.random() * 6.28,
        sp: 0.1 + Math.random() * 0.25,
        ra: W * (0.12 + Math.random() * 0.3),
        rb: H * (0.1 + Math.random() * 0.3),
      })
    }
    state.ripples = []
  }
  const orb = state.orb
  const ripples = state.ripples!

  // distant "cloud" nodes
  const clouds: [number, number][] = [
    [w * 0.06, h * 0.08],
    [w * 0.95, h * 0.14],
    [w * 0.9, h * 0.92],
  ]
  for (const cl of clouds) r.disc(cl[0], cl[1], 3, col(154, 140, 116, 0.3))

  // a probe reaches toward the house and dies at the wall
  const pk = Math.floor(t / 9) % 3
  const pph = t % 9
  if (pph < 3.6) {
    const cl = clouds[pk]
    const dx2 = cx - cl[0]
    const dy2 = cy - cl[1]
    const cands = [0.1]
    if (cl[0] < x0) cands.push((x0 - cl[0]) / dx2)
    else if (cl[0] > x0 + W) cands.push((x0 + W - cl[0]) / dx2)
    if (cl[1] < y0) cands.push((y0 - cl[1]) / dy2)
    else if (cl[1] > y0 + H) cands.push((y0 + H - cl[1]) / dy2)
    const s = Math.max.apply(null, cands)
    const grow = smooth(Math.min(1, pph / 1.8))
    const al = pph < 2.4 ? 0.3 : Math.max(0, 0.3 * (1 - (pph - 2.4) / 1.2))
    r.segment(cl[0], cl[1], cl[0] + dx2 * s * grow, cl[1] + dy2 * s * grow, 1, col(154, 140, 116, al))
    if (grow >= 1) {
      r.strokeCircle(cl[0] + dx2 * s, cl[1] + dy2 * s, 3 + (pph - 1.8) * 3, 1, col(154, 140, 116, al * 0.8))
    }
  }

  // warm core
  r.gradientDisc(cx, cy, H * 0.42, col(195, 154, 87, 0.22 + 0.08 * fbm(t * 0.3)), col(195, 154, 87, 0))
  r.disc(cx, cy, 4.5, col(235, 211, 162, 1))

  // orbiting data, reflected off the walls
  const eIdx = Math.floor(t / 7) % orb.length
  const eph2 = t % 7
  const bump = eph2 < 2.4 ? smooth(eph2 / 2.4) : eph2 < 4 ? 1 - smooth((eph2 - 2.4) / 1.6) : 0
  for (let i = 0; i < orb.length; i++) {
    const p = orb[i]
    const m = i === eIdx ? 1 + bump * 1.3 : 1
    let px2 = cx + Math.cos(p.a + t * p.sp) * p.ra * m + (fbm(t * 0.2 + i * 3) - 0.5) * 8
    let py2 = cy + Math.sin(p.a + t * p.sp) * p.rb * m + (fbm(t * 0.23 + i * 5 + 40) - 0.5) * 8
    let hit = false
    if (px2 < x0 + 5) {
      px2 = x0 + 5
      hit = true
    }
    if (px2 > x0 + W - 5) {
      px2 = x0 + W - 5
      hit = true
    }
    if (py2 < y0 + 5) {
      py2 = y0 + 5
      hit = true
    }
    if (py2 > y0 + H - 5) {
      py2 = y0 + H - 5
      hit = true
    }
    if (hit && i === eIdx && (state.lastRip === undefined || t - state.lastRip > 1.2)) {
      state.lastRip = t
      ripples.push({ x: px2, y: py2, t0: t })
    }
    r.disc(px2, py2, i === eIdx ? 2.8 : 2, hexCol(dl, i === eIdx ? 0.85 : 0.4))
  }

  // contact ripples along the wall
  state.ripples = ripples.filter((rp) => t - rp.t0 < 1.6)
  for (const rp of state.ripples) {
    const pr = (t - rp.t0) / 1.6
    r.strokeCircle(rp.x, rp.y, 4 + pr * 26, 1.2, hexCol(dl, 0.4 * (1 - pr)))
  }

  // the walls themselves
  const wallCol = col(237, 228, 211, 0.5)
  r.strokeRect(x0, y0, W, H, 2, wallCol)
  r.polyline([x0 - 14, y0, x0 + W / 2, y0 - h * 0.1, x0 + W + 14, y0], 2, wallCol)
}
