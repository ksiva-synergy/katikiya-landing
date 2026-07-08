import type { Painter } from '../engine'
import { col, type RGBA } from '../Renderer'
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

export const vision: Painter = (r, c) => {
  const { w, h, t } = c
  const cols = 3
  const rows = 2
  const pad = 3
  const cw = (w - pad * (cols + 1)) / cols
  const ch = (h - pad * (rows + 1)) / rows
  const labels = ['FRONT DOOR', 'GARDEN', 'GARAGE', 'DRIVEWAY', 'HALL', 'TERRACE']
  const bracket = 12

  for (let row = 0; row < rows; row++) {
    for (let colIdx = 0; colIdx < cols; colIdx++) {
      const i = row * cols + colIdx
      const x = pad + colIdx * (cw + pad)
      const y = pad + row * (ch + pad)

      // Base tile color (simulating depth gradient)
      const flick = 0.02 * fbm(t * 3 + i * 11)
      const baseAlpha = 0.96 + flick
      r.fillRect(x, y, cw, ch, col(22, 18, 13, baseAlpha))

      // Vignette disc
      r.gradientDisc(x + cw / 2, y + ch / 2, Math.max(cw, ch) * 0.7, col(0, 0, 0, 0), col(0, 0, 0, 0.5))

      // Faint horizon line
      r.segment(x + cw * 0.1, y + ch * 0.62, x + cw * 0.9, y + ch * 0.58, 1, col(195, 154, 87, 0.06))

      // Scan band line
      const sl = ((t * 14 + i * 53) % (ch + 60)) - 30
      const scanY = y + sl
      if (scanY > y && scanY < y + ch) {
        r.fillRect(x, Math.max(y, scanY - 14), cw, Math.min(y + ch - scanY, 28), col(195, 154, 87, 0.03))
      }

      // Camera UI corner brackets
      const cornerPts = [
        [x + 6, y + 6 + bracket, x + 6, y + 6, x + 6 + bracket, y + 6],
        [x + cw - 6, y + 6 + bracket, x + cw - 6, y + 6, x + cw - 6 - bracket, y + 6],
        [x + 6, y + ch - 6 - bracket, x + 6, y + ch - 6, x + 6 + bracket, y + ch - 6],
        [x + cw - 6, y + ch - 6 - bracket, x + cw - 6, y + ch - 6, x + cw - 6 - bracket, y + ch - 6],
      ]
      for (const pts of cornerPts) {
        r.polyline(pts, 1.2, col(195, 154, 87, 0.4))
      }

      // REC indicator
      const blink = Math.sin(t * 2 + i * 1.7) > 0.1
      if (blink) {
        glowDot(r, x + cw - 16, y + 15, 2.6, col(214, 90, 74, 0.85), 10)
      }

      // Labels
      const fontLabel = `500 ${Math.round(h * 0.024)}px "IBM Plex Mono", monospace`
      spacedText(r, labels[i] || '', x + 18, y + ch - 30, fontLabel, col(196, 182, 158, 0.6), 1.2)

      // Timestamp clock feed
      const clockMin = Math.floor((19 * 60 + t * 2.4 + i * 3) % 1440)
      const tsStr = String(Math.floor(clockMin / 60)).padStart(2, '0') + ':' + String(clockMin % 60).padStart(2, '0')
      const fontTime = `${Math.round(h * 0.019)}px "IBM Plex Mono", monospace`
      r.text(tsStr, x + 18, y + ch - 12, fontTime, col(154, 140, 116, 0.4))

      // LOCAL badge
      const fontLocal = `${Math.round(h * 0.017)}px "IBM Plex Mono", monospace`
      r.strokeRect(x + cw - 50, y + ch - 24, 38, 14, 1, col(195, 154, 87, 0.3))
      spacedText(r, 'LOCAL', x + cw - 46, y + ch - 14, fontLocal, col(195, 154, 87, 0.6), 1)
    }
  }

  // Mullions
  for (let cIdx = 1; cIdx < cols; cIdx++) {
    const mx = cIdx * (cw + pad) - pad / 2
    r.fillRect(mx, 0, pad, h, col(0, 0, 0, 0.6))
  }
  for (let rIdx = 1; rIdx < rows; rIdx++) {
    const my = rIdx * (ch + pad) - pad / 2
    r.fillRect(0, my, w, pad, col(0, 0, 0, 0.6))
  }
}
