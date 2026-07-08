import type { Painter } from '../engine'
import { col, hexCol, type RGBA } from '../Renderer'
import { fbm } from '../noise'

function glowDot(r: any, cx: number, cy: number, radius: number, color: RGBA, blurR?: number) {
  const br = blurR ? blurR * 0.5 : radius * 2.2
  r.disc(cx, cy, br, [color[0], color[1], color[2], color[3] * 0.3])
  r.disc(cx, cy, radius, color)
}

function spacedText(r: any, str: string, x: number, y: number, font: string, color: RGBA, ls: number) {
  let cx = x
  for (const ch of str) {
    r.text(ch, cx, y, font, color)
    cx += r.measureText(ch, font) + ls
  }
  return cx
}

export const sonar: Painter = (r, c) => {
  const { w, h, t, dataLight: dl } = c
  const state = c.state as { sonarTrail?: [number, number][] }
  const cx = w * 0.55
  const cy = h * 0.52
  const rx = w * 0.08
  const ry = h * 0.1
  const rw = w * 0.84
  const rh = h * 0.8

  // faint room shell
  r.strokeRect(rx, ry, rw, rh, 1, col(195, 154, 87, 0.14))
  r.strokeRect(rx + rw * 0.05, ry + rh * 0.06, rw * 0.24, rh * 0.13, 1, col(195, 154, 87, 0.07))
  r.strokeRect(rx + rw * 0.7, ry + rh * 0.68, rw * 0.22, rh * 0.24, 1, col(195, 154, 87, 0.07))

  // polar grid centered on locate origin
  const ox = w * 0.5
  const oy = h * 0.9

  for (let k = 1; k <= 4; k++) {
    r.strokeArc(ox, oy, h * 0.22 * k, 3.49, 6.08, 1, col(195, 154, 87, 0.09))
  }
  for (let a = 3.49; a <= 6.08; a += 0.45) {
    r.segment(ox, oy, ox + Math.cos(a) * h * 0.9, oy + Math.sin(a) * h * 0.9, 1, col(195, 154, 87, 0.05))
  }

  // rotating sweep beam (radar sweep arc)
  const sweepA = 3.49 + ((t * 0.5) % (6.08 - 3.49))
  // Draw shaded wedge using radial lines
  for (let step = 0; step <= 10; step++) {
    const u = step / 10
    const angle = (sweepA - 0.5) + 0.5 * u
    const alpha = 0.1 * u
    r.segment(ox, oy, ox + Math.cos(angle) * h * 0.95, oy + Math.sin(angle) * h * 0.95, 2, hexCol(dl, alpha))
  }

  // target drifts along organic path
  const tx = cx + fbm(t * 0.06) * w * 0.3 - w * 0.15
  const ty = cy + fbm(t * 0.05 + 30) * h * 0.24 - h * 0.12

  // concentric locate rings
  const ring = (t * 0.6) % 1
  for (let k = 0; k < 3; k++) {
    const u = (ring + k / 3) % 1
    const radius = u * h * 0.32
    const alpha = Math.max(0, 0.4 * (1 - u))
    r.strokeCircle(tx, ty, radius, 1.2, hexCol(dl, alpha))
  }

  // crosshair
  r.segment(tx - 12, ty, tx - 5, ty, 1, hexCol(dl, 0.35))
  r.segment(tx + 5, ty, tx + 12, ty, 1, hexCol(dl, 0.35))
  r.segment(tx, ty - 12, tx, ty - 5, 1, hexCol(dl, 0.35))
  r.segment(tx, ty + 5, tx, ty + 12, 1, hexCol(dl, 0.35))
  glowDot(r, tx, ty, 3.2, hexCol(dl, 0.95), 20)

  // leader line to label
  const lx = tx + 46
  const ly = ty - 34
  r.segment(tx + 6, ty - 6, lx - 6, ly + 6, 1, hexCol(dl, 0.3))

  const fontTitle = `500 ${Math.round(h * 0.03)}px "IBM Plex Mono", monospace`
  spacedText(r, 'KEYS', lx, ly, fontTitle, hexCol(dl, 0.85), 1.5)

  const fontDesc = `${Math.round(h * 0.02)}px "IBM Plex Mono", monospace`
  spacedText(r, 'BOOKSHELF · SHELF 2', lx, ly + 20, fontDesc, col(154, 140, 116, 0.6), 0.6)

  // fading path trace
  if (!state.sonarTrail) state.sonarTrail = []
  state.sonarTrail.push([tx, ty])
  if (state.sonarTrail.length > 90) state.sonarTrail.shift()
  for (let i = 1; i < state.sonarTrail.length; i++) {
    const p0 = state.sonarTrail[i - 1]
    const p1 = state.sonarTrail[i]
    r.segment(p0[0], p0[1], p1[0], p1[1], 1, hexCol(dl, 0.1 * (i / state.sonarTrail.length)))
  }
}
