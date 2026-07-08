// FIG. 01 — WATER: streaming particle flow, pressure pulses, anomaly event.
import type { Painter } from '../engine'
import { col, hexCol } from '../Renderer'
import { fbm, hashN } from '../noise'

interface WParticle {
  x: number
  row: number
  sp: number
}

export const water: Painter = (r, c) => {
  const { w, h, t, mx, my, par, dataLight: dl, density: dens } = c
  const state = c.state as { wpW?: WParticle[] }
  const rows = 5
  const Y = (row: number, x: number) =>
    h * (0.16 + row * 0.17) +
    (fbm(x * 0.0035 + row * 9.1 + t * 0.06) - 0.5) * h * 0.13 +
    par * (8 + row * 5)

  const seg = Math.floor(t / 11)
  const ph = t % 11
  const evRow = Math.floor(hashN(seg) * rows)
  const evOn = ph < 2.4
  const px = (ph / 2.4) * (w + 200) - 100

  const aph = t % 23
  const aRow = Math.floor(hashN(Math.floor(t / 23) + 5) * rows)
  const aFlick = aph > 13 && aph < 15
  const annoWater = c.getAnno('water')
  if (annoWater) annoWater.style.opacity = aph > 14.4 && aph < 18.6 ? '1' : '0'

  // streamlines
  for (let i = 0; i < rows; i++) {
    const pts: number[] = []
    for (let x = 0; x <= w; x += 14) pts.push(x, Y(i, x))
    const flick = aFlick && i === aRow && Math.sin(t * 26) > -0.3
    r.polyline(pts, 1.5, flick ? col(224, 164, 80, 0.32) : hexCol(dl, 0.045))
  }

  // particles
  const N = Math.round(420 * dens)
  if (!state.wpW || state.wpW.length !== N) {
    state.wpW = []
    for (let i = 0; i < N; i++)
      state.wpW.push({ x: Math.random() * w, row: i % rows, sp: 0.5 + Math.random() })
  }
  for (const p of state.wpW) {
    let v = p.sp * (26 + fbm(p.row * 3.3 + t * 0.11) * 40)
    if (evOn && p.row === evRow && p.x > px && p.x < px + w * 0.25) v *= 2.6
    p.x += v / 60
    if (p.x > w + 12) p.x = -12
    let y = Y(p.row, p.x)
    const dx = p.x - mx
    const dy = y - my
    const d2 = dx * dx + dy * dy
    if (d2 < 22500) {
      const d = Math.sqrt(d2) || 1
      y += (dy / d) * ((150 - d) / 150) * 9
    }
    const a = 0.14 + fbm(p.x * 0.01 + p.row * 7 + t * 0.3) * 0.42
    const amber = aFlick && p.row === aRow
    r.fillRect(p.x, y - 1, 2.4, 2.4, amber ? col(224, 164, 80, a) : hexCol(dl, a))
    r.fillRect(p.x - 7, Y(p.row, p.x - 7) - 1, 2, 2, hexCol(dl, a * 0.38))
    r.fillRect(p.x - 14, Y(p.row, p.x - 14) - 1, 1.6, 1.6, hexCol(dl, a * 0.15))
  }

  // pressure pulse glow
  if (evOn) {
    const y = Y(evRow, px)
    r.gradientDisc(px, y, 60, hexCol(dl, 0.5 * (1 - ph / 2.4)), hexCol(dl, 0))
  }
}
