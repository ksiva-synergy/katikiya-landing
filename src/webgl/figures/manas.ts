import type { Painter } from '../engine'
import { col, type RGBA } from '../Renderer'
import { fbm } from '../noise'

function glowDot(r: any, cx: number, cy: number, radius: number, color: RGBA, blurR?: number) {
  const br = blurR ? blurR * 0.5 : radius * 2.2
  r.disc(cx, cy, br, [color[0], color[1], color[2], color[3] * 0.3])
  r.disc(cx, cy, radius, color)
}

function qbez(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, u: number): [number, number] {
  const mt = 1 - u
  return [
    mt * mt * x0 + 2 * mt * u * x1 + u * u * x2,
    mt * mt * y0 + 2 * mt * u * y1 + u * u * y2
  ]
}

export const manas: Painter = (r, c) => {
  const { w, h, t } = c
  const cx = w / 2
  const cy = h / 2

  const sources = [
    { l: 'PULSE', x: w * 0.08, y: h * 0.18 },
    { l: 'SONAR', x: w * 0.92, y: h * 0.14 },
    { l: 'VISION', x: w * 0.06, y: h * 0.82 },
    { l: 'FLOW', x: w * 0.94, y: h * 0.78 },
    { l: 'PRESENCE', x: w * 0.5, y: h * 0.94 }
  ]

  // layered central aura (3 soft passes for painterly depth)
  for (let k = 0; k < 3; k++) {
    const rr = h * (0.14 + k * 0.1)
    const alpha = 0.16 - k * 0.045 + 0.03 * Math.sin(t * 0.5 + k)
    r.gradientDisc(cx, cy, rr, col(235, 199, 132, alpha), col(235, 199, 132, 0))
  }

  // slow orbiting motes around the core
  for (let m = 0; m < 6; m++) {
    const a = t * 0.15 + m * 1.05
    const rr = h * (0.1 + 0.02 * Math.sin(t * 0.4 + m))
    glowDot(r, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.7, 1.2, col(235, 211, 162, 0.5), 6)
  }

  for (let s = 0; s < sources.length; s++) {
    const src = sources[s]
    const dx = cx - src.x
    const dy = cy - src.y
    const bend = (fbm(s * 5 + t * 0.05) - 0.5) * h * 0.22
    const perpX = -dy
    const perpY = dx
    const plen = Math.hypot(perpX, perpY) || 1
    const ctrlX = (src.x + cx) / 2 + (perpX / plen) * bend
    const ctrlY = (src.y + cy) / 2 + (perpY / plen) * bend

    // faint guide curve
    const tendrilPts: number[] = []
    const steps = 16
    for (let step = 0; step <= steps; step++) {
      const u = step / steps
      const pp = qbez(src.x, src.y, ctrlX, ctrlY, cx, cy, u)
      tendrilPts.push(pp[0], pp[1])
    }
    const tendrilAlpha = 0.045 + 0.02 * Math.sin(t * 0.7 + s)
    r.polyline(tendrilPts, 1, col(195, 154, 87, tendrilAlpha))

    // particles flowing inward along the curve, additive glow
    for (let p = 0; p < 3; p++) {
      const u0 = (t * (0.12 + s * 0.015) + p * 0.34) % 1
      const u = u0 * u0 * (0.5 + 0.5 * u0)
      const pp = qbez(src.x, src.y, ctrlX, ctrlY, cx, cy, u)
      const size = 1.4 + u * 1.6
      const alpha = 0.18 + u * 0.55
      glowDot(r, pp[0], pp[1], size, col(235, 211, 162, alpha), 7)
    }

    // source label glyph
    const fontGlyph = `500 ${Math.round(h * 0.024)}px "IBM Plex Mono", monospace`
    r.text(src.l[0], src.x - 3, src.y + 4, fontGlyph, col(154, 140, 116, 0.4))
  }

  glowDot(r, cx, cy, 3.4, col(235, 211, 162, 0.95), 22)
}
