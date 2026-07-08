// FIG. 02 — ENERGY: breathing sun, day/dusk cycle, accumulation, export.
import type { Painter } from '../engine'
import { col, hexCol } from '../Renderer'
import { fbm } from '../noise'

export const energy: Painter = (r, c) => {
  const { w, h, t, par, dataLight: dl } = c
  const state = c.state as { chg?: number }

  const cyc = (t % 80) / 80
  const day = 0.15 + 0.85 * (0.5 + 0.5 * Math.cos(cyc * 6.2832))
  c.shared.day = day

  const sx = w * 0.18
  const sy = h * 0.26 + par * 22
  const hx = w * 0.78
  const hy = h * 0.7 - par * 8
  const sr = h * (0.26 + 0.06 * fbm(t * 0.1)) * (0.55 + day * 0.6)

  // sun field
  r.gradientDisc(sx, sy, sr, col(235, 199, 132, 0.34 * day + 0.04), col(235, 199, 132, 0))

  // concentric ripple rings
  for (let k = 0; k < 3; k++) {
    const rr = ((t * 9 + k * 34) % 100) + 8
    r.strokeCircle(sx, sy, rr, 1, col(195, 154, 87, Math.max(0, (0.2 - (rr / 100) * 0.2) * day)))
  }

  // sun -> house path
  const bez = (u: number): [number, number] => {
    const cx = w * 0.5
    const cy = h * 0.16
    return [
      (1 - u) * (1 - u) * sx + 2 * (1 - u) * u * cx + u * u * hx,
      (1 - u) * (1 - u) * sy + 2 * (1 - u) * u * cy + u * u * hy,
    ]
  }
  const path: number[] = []
  for (let u = 0; u <= 1.001; u += 0.02) {
    const p = bez(u)
    path.push(p[0], p[1])
  }
  r.polyline(path, 1.5, col(195, 154, 87, 0.05 + day * 0.08))

  // charge accumulation
  if (state.chg === undefined) state.chg = 0.62
  state.chg = Math.min(1, Math.max(0.12, state.chg + (day - 0.45) * 0.0006))
  c.shared.chg = state.chg

  // streaming particles absorbed into the house
  const n = Math.max(2, Math.round(14 * day * c.density))
  for (let i = 0; i < n; i++) {
    const u0 = (t * 0.11 + i / n + fbm(i * 3.1) * 0.2) % 1
    const u = u0 * u0 * (0.4 + 0.6 * u0)
    const p = bez(u)
    r.disc(p[0], p[1], 2.6 + u * 1.6, col(235, 199, 132, (0.25 + u * 0.55) * day))
  }

  // export-to-grid reverse flow
  const eph = t % 26
  const exOn = day > 0.55 && eph > 6 && eph < 12
  if (exOn) {
    for (let i = 0; i < 4; i++) {
      const u = 1 - (((eph - 6) / 6 + i * 0.22) % 1)
      const p = bez(u)
      r.disc(p[0], p[1] + 10, 2.2, hexCol(dl, 0.7))
    }
  }
  const annoEnergy = c.getAnno('energy')
  if (annoEnergy) annoEnergy.style.opacity = exOn ? '1' : '0'

  // house glow + outline
  const hg = 0.14 + state.chg * 0.2 + (1 - day) * 0.14
  r.gradientDisc(hx, hy, h * 0.24, col(235, 199, 132, hg), col(235, 199, 132, 0))
  const houseCol = col(237, 228, 211, Math.min(0.7, 0.3 + hg))
  r.strokeRect(hx - 26, hy - 18, 52, 36, 1.6, houseCol)
  r.polyline([hx - 34, hy - 18, hx, hy - 42, hx + 34, hy - 18], 1.6, houseCol)

  // battery gauge
  const bx = hx + 56
  const by = hy - 44
  const bh = 88
  const gaugeCol = col(195, 154, 87, 0.3)
  r.strokeRect(bx, by, 10, bh, 1, gaugeCol)
  for (let k = 1; k < 4; k++) {
    r.segment(bx + 10, by + (bh * k) / 4, bx + 14, by + (bh * k) / 4, 1, gaugeCol)
  }
  r.fillRect(bx + 2, by + 2 + (bh - 4) * (1 - state.chg), 6, (bh - 4) * state.chg, hexCol(dl, 0.55))
}
