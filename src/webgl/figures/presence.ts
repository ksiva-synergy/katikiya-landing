// FIG. 03 — PRESENCE: architectural floorplan, migrating warm glows.
import type { Painter } from '../engine'
import { col, hexCol } from '../Renderer'
import { fbm, hashN, smooth } from '../noise'

interface Room {
  n: string
  cx: number
  cy: number
  dx: number
}
interface Agent {
  from: number
  to: number
  t0: number
  trail: [number, number][]
}

const HALF_PI = Math.PI / 2
const TWO_PI = Math.PI * 2

export const presence: Painter = (r, c) => {
  const { w, h, t, par, scale, dataLight: dl } = c
  const state = c.state as { agents?: Agent[] }

  const x0 = w * 0.1
  const y0 = h * 0.12 + par * 12
  const W = w * 0.8
  const H = h * 0.74
  const hallT = y0 + H * 0.44
  const hallB = y0 + H * 0.6
  const hallY = (hallT + hallB) / 2
  const gap = W * 0.06

  const rooms: Room[] = [
    { n: 'KITCHEN', cx: x0 + W * 0.165, cy: (y0 + hallT) / 2, dx: x0 + W * 0.165 },
    { n: 'LIVING', cx: x0 + W * 0.48, cy: (y0 + hallT) / 2, dx: x0 + W * 0.48 },
    { n: 'STUDY', cx: x0 + W * 0.83, cy: (y0 + hallT) / 2, dx: x0 + W * 0.83 },
    { n: 'BEDROOM', cx: x0 + W * 0.24, cy: (hallB + y0 + H) / 2, dx: x0 + W * 0.24 },
    { n: 'BATH', cx: x0 + W * 0.76, cy: (hallB + y0 + H) / 2, dx: x0 + W * 0.76 },
  ]

  // shell
  r.strokeRect(x0, y0, W, H, 1.6, col(195, 154, 87, 0.42))

  // interior walls with door gaps
  const innerWall = col(195, 154, 87, 0.24)
  const wallLine = (y: number, doors: number[]) => {
    let xc = x0
    for (const d of doors.slice().sort((a, b) => a - b)) {
      r.segment(xc, y, d - gap / 2, y, 1, innerWall)
      xc = d + gap / 2
    }
    r.segment(xc, y, x0 + W, y, 1, innerWall)
  }
  wallLine(hallT, [rooms[0].dx, rooms[1].dx, rooms[2].dx])
  wallLine(hallB, [rooms[3].dx, rooms[4].dx])
  r.segment(x0 + W * 0.33, y0, x0 + W * 0.33, hallT, 1, innerWall)
  r.segment(x0 + W * 0.66, y0, x0 + W * 0.66, hallT, 1, innerWall)
  r.segment(x0 + W * 0.5, hallB, x0 + W * 0.5, y0 + H, 1, innerWall)

  // door swings
  const door = (wx: number, wy: number, up: boolean) => {
    const L = gap
    // canvas arc() sweeps clockwise; up:false wraps past 2π (a 270° swing)
    const a0 = Math.PI
    const a1 = up ? Math.PI + HALF_PI : HALF_PI + TWO_PI
    r.strokeArc(wx, wy, L, a0, a1, 1, col(195, 154, 87, 0.16))
    r.segment(wx, wy, wx, wy + (up ? -L : L), 1, col(195, 154, 87, 0.3))
  }
  door(rooms[0].dx + gap / 2, hallT, true)
  door(rooms[1].dx + gap / 2, hallT, true)
  door(rooms[2].dx + gap / 2, hallT, true)
  door(rooms[3].dx - gap / 2, hallB, false)
  door(rooms[4].dx - gap / 2, hallB, false)

  // room labels
  const font = `500 ${Math.round(h * 0.026)}px "IBM Plex Mono", monospace`
  const labelCol = col(154, 140, 116, 0.45)
  for (const room of rooms) {
    const tw = r.measureText(room.n, font)
    r.text(room.n, room.cx - tw / 2, room.cy - H * 0.13, font, labelCol)
  }

  // migrating presence agents
  if (!state.agents) {
    state.agents = [0, 2, 3].map((rm, i) => ({ from: rm, to: rm, t0: -10 + i * 3, trail: [] }))
  }
  const agents = state.agents
  const clockMin = Math.floor((7 * 60 + t * 3.4) % 1440)
  const annoPres = c.getAnno('presence')

  for (let i = 0; i < agents.length; i++) {
    const A = agents[i]
    const dwell = 5 + fbm(i * 7 + Math.floor(t / 9)) * 6
    const travel = 3.2
    const el = t - A.t0
    let px: number
    let py: number
    if (el < travel && A.from !== A.to) {
      const F = rooms[A.from]
      const T = rooms[A.to]
      const pathPts: [number, number][] = [
        [F.cx, F.cy],
        [F.dx, F.cy],
        [F.dx, hallY],
        [T.dx, hallY],
        [T.dx, T.cy],
        [T.cx, T.cy],
      ]
      const u = smooth(Math.min(1, el / travel)) * (pathPts.length - 1)
      const si = Math.min(pathPts.length - 2, Math.floor(u))
      const fu = u - si
      px = pathPts[si][0] + (pathPts[si + 1][0] - pathPts[si][0]) * fu
      py = pathPts[si][1] + (pathPts[si + 1][1] - pathPts[si][1]) * fu
    } else {
      if (el > travel + dwell) {
        A.from = A.to
        let nx = Math.floor(hashN(i * 13 + Math.floor(t)) * rooms.length)
        if (nx === A.from) nx = (nx + 1) % rooms.length
        A.to = nx
        A.t0 = t
      }
      const R = rooms[A.to]
      px = R.cx + (fbm(t * 0.14 + i * 31) - 0.5) * W * 0.1
      py = R.cy + (fbm(t * 0.12 + i * 47 + 9) - 0.5) * H * 0.16
    }
    A.trail.push([px, py])
    if (A.trail.length > 46) A.trail.shift()
    for (let k = 0; k < A.trail.length; k += 3) {
      r.disc(A.trail[k][0], A.trail[k][1], 1.4, col(235, 199, 132, 0.16 * (k / A.trail.length)))
    }
    const R2 = h * 0.13
    r.gradientDisc(
      px,
      py,
      R2,
      col(235, 199, 132, 0.2 + 0.08 * fbm(t * 0.4 + i)),
      col(235, 199, 132, 0),
    )
    r.disc(px, py, 2.6, hexCol(dl, 0.9))
    if (i === 0 && annoPres) {
      annoPres.style.left = px / scale + 'px'
      annoPres.style.top = py / scale + 'px'
      annoPres.textContent =
        'PRESENCE / ' +
        rooms[A.to].n +
        ' / ' +
        String(Math.floor(clockMin / 60)).padStart(2, '0') +
        ':' +
        String(clockMin % 60).padStart(2, '0')
    }
  }
}
