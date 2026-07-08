import type { Painter } from '../engine'
import { col, hexCol, type RGBA } from '../Renderer'
import { fbm, hashN } from '../noise'

interface PNode {
  a: number
  r0: number
  depth: number
  size: number
  bend: number
}

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

export const pulse: Painter = (r, c) => {
  const { w, h, t, par, dataLight: dl } = c
  const state = c.state as { pNodes?: PNode[] }
  const cx = w / 2
  const cy = h * 0.52 + par * 10

  if (!state.pNodes) {
    state.pNodes = []
    for (let i = 0; i < 17; i++) {
      const a = (i / 17) * 6.28 + hashN(i) * 0.6
      state.pNodes.push({
        a,
        r0: 0.2 + hashN(i * 7) * 0.28,
        depth: hashN(i * 13),
        size: 1.6 + hashN(i * 5) * 2.2,
        bend: (hashN(i * 9) - 0.5) * 0.5,
      })
    }
  }

  // ambient vignette field
  r.gradientDisc(cx, cy, Math.max(w, h) * 0.55, col(195, 154, 87, 0.05), col(195, 154, 87, 0))

  // slow rotating coverage rings
  for (let k = 1; k <= 3; k++) {
    const rr = h * 0.1 * k + Math.sin(t * 0.35 + k) * 3
    const a0 = t * 0.05 + k
    const a1 = t * 0.05 + k + 5.6
    r.strokeArc(cx, cy, rr, a0, a1, 1, col(195, 154, 87, 0.09 - k * 0.02))
  }

  // hub core
  r.gradientDisc(cx, cy, h * 0.17, hexCol(dl, 0.22 + 0.06 * Math.sin(t * 0.8)), hexCol(dl, 0))
  glowDot(r, cx, cy, 4, hexCol(dl, 0.95), 16)

  const offIdx = Math.floor(t / 8) % state.pNodes.length
  const offPh = t % 8

  // sort by depth so far nodes draw first (parallax layering)
  const order = state.pNodes.map((_, i) => i).sort((a, b) => state.pNodes![a].depth - state.pNodes![b].depth)

  for (const i of order) {
    const n = state.pNodes[i]
    const rr = w * (n.r0 + fbm(i * 3.1 + t * 0.04) * 0.1)
    const x = cx + Math.cos(n.a + t * 0.015) * rr
    const y = cy + Math.sin(n.a + t * 0.015) * rr * (h / w) * 0.9
    const isOff = i === offIdx && offPh > 3 && offPh < 6
    const depthScale = 0.55 + n.depth * 0.7

    // curved tendril via quad control point offset perpendicular
    const mx = (cx + x) / 2
    const my = (cy + y) / 2
    const dx = x - cx
    const dy = y - cy
    const len = Math.hypot(dx, dy) || 1
    const perp = { x: -dy / len, y: dx / len }
    const bendAmt = n.bend * len * 0.18 * (0.7 + 0.3 * Math.sin(t * 0.3 + i))
    const ctrlX = mx + perp.x * bendAmt
    const ctrlY = my + perp.y * bendAmt

    // generate points for the Bezier tendril curve
    const tendrilPts: number[] = []
    const steps = 16
    for (let s = 0; s <= steps; s++) {
      const u = s / steps
      const pp = qbez(cx, cy, ctrlX, ctrlY, x, y, u)
      tendrilPts.push(pp[0], pp[1])
    }
    const tendrilCol = isOff
      ? col(206, 110, 86, 0.22)
      : hexCol(dl, (0.045 + 0.02 * Math.sin(t * 0.6 + i)) * depthScale)
    r.polyline(tendrilPts, 1, tendrilCol)

    // traveling pulse along curve
    const pu = (t * 0.22 + i * 0.19) % 1
    const pp = qbez(cx, cy, ctrlX, ctrlY, x, y, pu)
    glowDot(r, pp[0], pp[1], 1.3 * depthScale, hexCol(dl, 0.5 * (1 - pu) * depthScale), 5)

    // node itself
    const nodeColor = isOff
      ? col(212, 120, 92, 0.85)
      : hexCol(dl, (0.45 + 0.2 * Math.sin(t * 1.1 + i * 2)) * depthScale + 0.25)
    glowDot(r, x, y, n.size * depthScale, nodeColor, n.size * 2.4 * depthScale)

    if (isOff) {
      const radius = n.size + 7 + (offPh - 3) * 3
      const alpha = 0.32 * (1 - (offPh - 3) / 3)
      r.strokeCircle(x, y, radius, 1, col(212, 120, 92, alpha))
    }
  }
}
