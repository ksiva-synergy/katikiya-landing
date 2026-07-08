// FIG. 01 — PULSE: Network topology diagram.
// Shows: Gateway Router → Mesh Repeater, both with connected devices.
// Per-device live speed + data, plus summary dashboard.

import type { Painter } from '../engine'
import { col, type RGBA } from '../Renderer'
import { fbm, hashN } from '../noise'

// ─── palette helpers ─────────────────────────────────────────────────────────
const GOLD     = col(195, 154,  87, 1)

const TEAL     = col(159, 232, 220, 1)
const AMBER    = col(224, 164,  80, 1)
const MUTED    = col(154, 140, 116, 1)

const WHITE    = col(235, 211, 162, 1)

function a(c: RGBA, alpha: number): RGBA {
  return [c[0], c[1], c[2], alpha]
}

// ─── geometry helpers ─────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

interface Node {
  id: string
  label: string
  sub: string
  x: number
  y: number
  parent: number   // index into nodes array, -1 = root
  isRouter: boolean
  isRepeater: boolean
  speedMbps: number   // live, updated by tick
  dataGB: number      // live, accumulated
  color: RGBA
}

interface PacketDot {
  nodeIdx: number   // target node
  u: number         // 0→1 travel progress along edge to parent
  speed: number     // progress per second
}

interface PulseState {
  nodes?: Node[]
  packets?: PacketDot[]
  lastT?: number
}

// ─── device definitions (static layout offsets, relative to hub position) ────
const ROUTER_DEVICES: { label: string; sub: string; dy: number; dxFraction: number }[] = [
  { label: 'SMART TV 4K',    sub: 'Samsung 55"',   dy: -0.26, dxFraction: -0.22 },
  { label: 'IPHONE 16',      sub: 'iOS 18',        dy:  0.00, dxFraction: -0.24 },
  { label: 'WORK LAPTOP',    sub: 'MacBook Pro',   dy:  0.26, dxFraction: -0.22 },
]
const REPEATER_DEVICES: { label: string; sub: string; dy: number; dxFraction: number }[] = [
  { label: 'NEST SPEAKER',   sub: 'Google Home',   dy: -0.26, dxFraction:  0.22 },
  { label: 'IPAD PRO',       sub: 'iPadOS 18',     dy:  0.00, dxFraction:  0.24 },
  { label: 'YARD CAMERA',    sub: 'CP Plus 4MP',   dy:  0.26, dxFraction:  0.22 },
]

function buildNodes(w: number, h: number): Node[] {
  const cy = h * 0.47
  const routerX = w * 0.31
  const repeaterX = w * 0.69

  const nodes: Node[] = []

  // 0: Gateway Router
  nodes.push({
    id: 'router', label: 'MAIN ROUTER', sub: '5GHz • AX3000',
    x: routerX, y: cy,
    parent: -1, isRouter: true, isRepeater: false,
    speedMbps: 0, dataGB: 0, color: a(TEAL, 0.95),
  })

  // 1: Mesh Repeater
  nodes.push({
    id: 'repeater', label: 'MESH NODE', sub: 'Backhaul 5GHz',
    x: repeaterX, y: cy,
    parent: 0, isRouter: false, isRepeater: true,
    speedMbps: 0, dataGB: 0, color: a(GOLD, 0.95),
  })

  // 2-4: Router leaf devices
  for (let i = 0; i < ROUTER_DEVICES.length; i++) {
    const d = ROUTER_DEVICES[i]
    nodes.push({
      id: `rd${i}`, label: d.label, sub: d.sub,
      x: routerX + w * d.dxFraction,
      y: cy + h * d.dy,
      parent: 0, isRouter: false, isRepeater: false,
      speedMbps: 0, dataGB: 0, color: a(TEAL, 0.85),
    })
  }

  // 5-7: Repeater leaf devices
  for (let i = 0; i < REPEATER_DEVICES.length; i++) {
    const d = REPEATER_DEVICES[i]
    nodes.push({
      id: `rpd${i}`, label: d.label, sub: d.sub,
      x: repeaterX + w * d.dxFraction,
      y: cy + h * d.dy,
      parent: 1, isRouter: false, isRepeater: false,
      speedMbps: 0, dataGB: 0, color: a(AMBER, 0.85),
    })
  }

  return nodes
}

function buildPackets(nodes: Node[]): PacketDot[] {
  const packets: PacketDot[] = []
  for (let i = 1; i < nodes.length; i++) {
    // 2-3 packets per edge
    const count = 2 + (i % 2)
    for (let k = 0; k < count; k++) {
      packets.push({
        nodeIdx: i,
        u: (k / count) + hashN(i * 11 + k * 7) * 0.3,
        speed: 0.08 + hashN(i * 5 + k * 3) * 0.12,
      })
    }
  }
  return packets
}

function glowDot(r: any, cx: number, cy: number, radius: number, color: RGBA) {
  r.disc(cx, cy, radius * 2.8, [color[0], color[1], color[2], color[3] * 0.18])
  r.disc(cx, cy, radius * 1.4, [color[0], color[1], color[2], color[3] * 0.5])
  r.disc(cx, cy, radius, color)
}

function drawEdge(r: any, x0: number, y0: number, x1: number, y1: number, lineColor: RGBA) {
  r.segment(x0, y0, x1, y1, 1, lineColor)
}

function drawNodeIcon(r: any, x: number, y: number, radius: number, color: RGBA, isRouter: boolean, isRepeater: boolean) {
  // outer ring
  r.strokeCircle(x, y, radius, 1.2, a(color, 0.35))
  // inner filled disc
  r.disc(x, y, radius * 0.55, a(color, 0.15))
  // center bright dot
  glowDot(r, x, y, isRouter ? 5 : isRepeater ? 4 : 3, color)
}

export const pulse: Painter = (r, c) => {
  const { w, h, t, par } = c
  const state = c.state as PulseState

  // ── Init ──────────────────────────────────────────────────────────────────
  if (!state.nodes) {
    state.nodes = buildNodes(w, h)
    state.packets = buildPackets(state.nodes)
    state.lastT = t

    // seed initial data
    const baseSpeed = [120, 95, 78, 62, 45, 38, 30]
    const baseData  = [8.4, 5.1, 3.7, 2.2, 1.8, 1.3, 0.9]
    for (let i = 1; i < state.nodes.length; i++) {
      state.nodes[i].speedMbps = baseSpeed[i - 1] ?? 30
      state.nodes[i].dataGB    = baseData[i - 1]  ?? 1.0
    }
  }

  const nodes   = state.nodes
  const packets = state.packets!
  const dt      = Math.min(t - (state.lastT ?? t), 0.1)
  state.lastT   = t

  // rebuild if canvas resized significantly
  if (Math.abs(nodes[0].x - w * 0.31) > w * 0.05) {
    const fresh = buildNodes(w, h)
    for (let i = 0; i < nodes.length; i++) {
      fresh[i].speedMbps = nodes[i].speedMbps
      fresh[i].dataGB    = nodes[i].dataGB
    }
    state.nodes = fresh
  }

  const cy = h * 0.47 + par * 8

  // ── Tick live stats every ~1.5s ───────────────────────────────────────────
  const tickPhase = Math.floor(t * 0.67)
  if (!('lastTick' in state) || (state as any).lastTick !== tickPhase) {
    (state as any).lastTick = tickPhase
    for (let i = 1; i < nodes.length; i++) {
      const n = nodes[i]
      const base = [120, 95, 78, 62, 45, 38, 30][i - 1] ?? 30
      n.speedMbps = Math.max(1, base + (fbm(t * 0.08 + i * 3.7) - 0.5) * base * 0.35)
      n.dataGB += n.speedMbps / 1000 * 1.5 / 3600 * 60  // approx GB increment
    }
  }

  // ── Animate packet dots ───────────────────────────────────────────────────
  for (const p of packets) {
    p.u = (p.u + p.speed * dt) % 1
  }

  // ── Background vignette ───────────────────────────────────────────────────
  r.gradientDisc(w / 2, cy, Math.max(w, h) * 0.55, a(GOLD, 0.04), a(GOLD, 0))

  // ── Router wireless rings (animated) ──────────────────────────────────────
  const router = nodes[0]
  for (let k = 1; k <= 4; k++) {
    const phase = (t * 0.4 + k * 0.8) % 4
    const rRing = h * 0.055 * k * (1 + phase * 0.04)
    const alpha = Math.max(0, 0.16 - k * 0.03) * (1 - phase / 4)
    r.strokeCircle(router.x, router.y + par * 8, rRing, 1, a(TEAL, alpha))
  }

  // ── Repeater wireless rings ───────────────────────────────────────────────
  const repeater = nodes[1]
  for (let k = 1; k <= 3; k++) {
    const phase = (t * 0.35 + k * 0.9) % 3
    const rRing = h * 0.05 * k * (1 + phase * 0.03)
    const alpha = Math.max(0, 0.13 - k * 0.03) * (1 - phase / 3)
    r.strokeCircle(repeater.x, repeater.y + par * 8, rRing, 1, a(GOLD, alpha))
  }

  // ── Draw edges ────────────────────────────────────────────────────────────
  for (let i = 1; i < nodes.length; i++) {
    const n = nodes[i]
    const p = nodes[n.parent]
    const nx = n.x
    const ny = n.y + par * 8
    const px = p.x
    const py = p.y + par * 8

    const isBackhaul = i === 1
    const edgeColor = isBackhaul
      ? a(GOLD, 0.45)
      : n.parent === 0 ? a(TEAL, 0.25) : a(AMBER, 0.22)

    if (isBackhaul) {
      // thicker backhaul
      r.segment(px, py, nx, ny, 2, edgeColor)
    } else {
      drawEdge(r, px, py, nx, ny, edgeColor)
    }
  }

  // ── Packet dots along edges ───────────────────────────────────────────────
  for (const p of packets) {
    const n = nodes[p.nodeIdx]
    const par2 = nodes[n.parent]
    const nx = n.x
    const ny = n.y + par * 8
    const px2 = par2.x
    const py2 = par2.y + par * 8

    const dotX = lerp(px2, nx, p.u)
    const dotY = lerp(py2, ny, p.u)
    const isBackhaul = p.nodeIdx === 1
    const dotColor = isBackhaul ? GOLD : n.parent === 0 ? TEAL : AMBER
    const dotSize = isBackhaul ? 2.5 : 1.8
    glowDot(r, dotX, dotY, dotSize, a(dotColor, 0.9))
  }

  // ── Draw nodes ────────────────────────────────────────────────────────────
  const fontLabel = `600 ${Math.round(Math.max(8, h * 0.028))}px "IBM Plex Mono", monospace`
  const fontSub   = `400 ${Math.round(Math.max(7, h * 0.020))}px "IBM Plex Mono", monospace`
  const fontStat  = `500 ${Math.round(Math.max(7, h * 0.022))}px "IBM Plex Mono", monospace`

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    const nx = n.x
    const ny = n.y + par * 8
    const radius = n.isRouter ? 18 : n.isRepeater ? 14 : 9

    drawNodeIcon(r, nx, ny, radius, n.color, n.isRouter, n.isRepeater)

    // Labels & stats for leaf devices
    if (!n.isRouter && !n.isRepeater) {
      const onLeft  = n.parent === 0  // router devices go left
      const labelX  = onLeft ? nx - radius - 8 : nx + radius + 8
      const align   = onLeft ? 'right' : 'left'

      // Label (device name)
      const labelW = r.measureText(n.label, fontLabel)
      const lx = align === 'right' ? labelX - labelW : labelX
      r.text(n.label, lx, ny - 7, fontLabel, a(WHITE, 0.85))

      // Sub label (device type)
      const subW = r.measureText(n.sub, fontSub)
      const sx = align === 'right' ? labelX - subW : labelX
      r.text(n.sub, sx, ny + 7, fontSub, a(MUTED, 0.55))

      // Speed stat
      const speedStr = `${n.speedMbps.toFixed(0)} Mbps`
      const speedW   = r.measureText(speedStr, fontStat)
      const spx = align === 'right' ? labelX - speedW : labelX
      const statCol  = n.parent === 0 ? a(TEAL, 0.9) : a(AMBER, 0.9)
      r.text(speedStr, spx, ny + 20, fontStat, statCol)

      // Data stat
      const dataStr = `${n.dataGB.toFixed(2)} GB`
      const dataW   = r.measureText(dataStr, fontStat)
      const dpx = align === 'right' ? labelX - dataW : labelX
      r.text(dataStr, dpx, ny + 32, fontStat, a(MUTED, 0.5))
    }

    // Label for router
    if (n.isRouter) {
      const labelW = r.measureText(n.label, fontLabel)
      r.text(n.label, nx - labelW / 2, ny + radius + 16, fontLabel, a(TEAL, 0.9))
      const subW = r.measureText(n.sub, fontSub)
      r.text(n.sub, nx - subW / 2, ny + radius + 30, fontSub, a(MUTED, 0.5))
    }

    // Label for repeater
    if (n.isRepeater) {
      const labelW = r.measureText(n.label, fontLabel)
      r.text(n.label, nx - labelW / 2, ny + radius + 16, fontLabel, a(GOLD, 0.9))
      const subW = r.measureText(n.sub, fontSub)
      r.text(n.sub, nx - subW / 2, ny + radius + 30, fontSub, a(MUTED, 0.5))
    }
  }

  // ── Bottom dashboard ──────────────────────────────────────────────────────
  const dashY = h * 0.92
  const fontDash = `500 ${Math.round(Math.max(7, h * 0.021))}px "IBM Plex Mono", monospace`
  const fontDashVal = `600 ${Math.round(Math.max(7, h * 0.024))}px "IBM Plex Mono", monospace`

  // separator line
  r.segment(w * 0.06, dashY - 8, w * 0.94, dashY - 8, 1, a(GOLD, 0.12))

  // total data consumed
  const totalData = nodes.slice(1).reduce((s, n) => s + n.dataGB, 0)
  const totalStr  = `${totalData.toFixed(2)} GB`
  const totalLabel = 'TOTAL DATA'
  r.text(totalLabel, w * 0.07, dashY + 5,  fontDash,    a(MUTED, 0.55))
  r.text(totalStr,   w * 0.07, dashY + 18, fontDashVal, a(TEAL,  0.9))

  // device count
  const devCount = String(nodes.length - 2)   // subtract router + repeater
  const devLabel = 'DEVICES ONLINE'
  const midX = w * 0.42
  r.text(devLabel, midX, dashY + 5,  fontDash,    a(MUTED, 0.55))
  r.text(devCount + ' / 6', midX, dashY + 18, fontDashVal, a(GOLD,  0.85))

  // average speed
  const speeds    = nodes.slice(2)
  const avgSpeed  = speeds.reduce((s, n) => s + n.speedMbps, 0) / Math.max(1, speeds.length)
  const avgStr    = `${avgSpeed.toFixed(0)} Mbps`
  const avgLabel  = 'AVG SPEED'
  const avgLabelW = r.measureText(avgLabel, fontDash)
  const avgValW   = r.measureText(avgStr,   fontDashVal)
  const rightEdge = w * 0.93
  r.text(avgLabel, rightEdge - avgLabelW, dashY + 5,  fontDash,    a(MUTED, 0.55))
  r.text(avgStr,   rightEdge - avgValW,   dashY + 18, fontDashVal, a(AMBER, 0.9))

  // status pill
  const statusStr = '● GATEWAY ONLINE'
  const statusW   = r.measureText(statusStr, fontDash)
  r.text(statusStr, w / 2 - statusW / 2, h * 0.06, fontDash, a(TEAL, 0.6))
}
