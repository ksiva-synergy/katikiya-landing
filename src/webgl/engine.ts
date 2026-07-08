// The ambient engine. One requestAnimationFrame loop drives every WebGL figure
// and the live telemetry read-outs, exactly as the original single-file design
// did — including the shared day/charge state that couples the energy figure to
// the telemetry ticker, cursor tracking, scroll parallax and reduced-motion.

import { Renderer } from './Renderer'
import { fbm } from './noise'
import { painters } from './figures'

export interface SharedState {
  day?: number
  chg?: number
}

export interface FigureCtx {
  w: number
  h: number
  t: number
  mx: number
  my: number
  par: number
  scale: number
  dataLight: string
  density: number
  state: Record<string, unknown>
  shared: SharedState
  getAnno: (name: string) => HTMLElement | null
}

export type Painter = (r: Renderer, c: FigureCtx) => void

export interface EngineOptions {
  ambientMotion: boolean
  particleDensity: number
  dataLight: string
}

interface FigureEntry {
  id: string
  canvas: HTMLCanvasElement
  renderer: Renderer
  painter: Painter
  state: Record<string, unknown>
  mx: number
  my: number
}

const DEFAULTS: EngineOptions = {
  ambientMotion: true,
  particleDensity: 1,
  dataLight: '#9FE8DC',
}

export class Engine {
  private opts: EngineOptions
  private figures: FigureEntry[] = []
  private cleanups: Array<() => void> = []
  private shared: SharedState = {}
  private raf = 0
  private last = 0
  private reduced: boolean
  private scale: number

  private lives: HTMLElement[] = []
  private tele: Record<string, number> = {
    water: 2.8,
    energy: 3.12,
    presence: 3,
    liters: 414,
    stored: 86,
    temp: 21.4,
  }
  private nextT: Record<string, number> = {}

  constructor(opts?: Partial<EngineOptions>) {
    this.opts = { ...DEFAULTS, ...opts }
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.scale = Math.min(2, window.devicePixelRatio || 1)
  }

  setOptions(opts: Partial<EngineOptions>) {
    this.opts = { ...this.opts, ...opts }
  }

  private getAnno = (name: string): HTMLElement | null =>
    document.querySelector<HTMLElement>(`[data-anno="${name}"]`)

  mount(root: ParentNode = document) {
    // Register every figure canvas.
    root.querySelectorAll<HTMLCanvasElement>('canvas[data-viz]').forEach((canvas) => {
      const id = canvas.getAttribute('data-viz')!
      const painter = painters[id]
      if (!painter) return
      let renderer: Renderer
      try {
        renderer = new Renderer(canvas)
      } catch (err) {
        console.error('WebGL init failed for figure', id, err)
        return
      }
      const entry: FigureEntry = {
        id,
        canvas,
        renderer,
        painter,
        state: {},
        mx: -9999,
        my: -9999,
      }
      const fit = () => {
        const r = canvas.getBoundingClientRect()
        canvas.width = Math.max(2, Math.round(r.width * this.scale))
        canvas.height = Math.max(2, Math.round(r.height * this.scale))
      }
      const pm = (ev: PointerEvent) => {
        const r = canvas.getBoundingClientRect()
        entry.mx = (ev.clientX - r.left) * this.scale
        entry.my = (ev.clientY - r.top) * this.scale
      }
      const pl = () => {
        entry.mx = -9999
        entry.my = -9999
      }
      fit()
      window.addEventListener('resize', fit)
      canvas.addEventListener('pointermove', pm)
      canvas.addEventListener('pointerleave', pl)
      this.cleanups.push(() => {
        window.removeEventListener('resize', fit)
        canvas.removeEventListener('pointermove', pm)
        canvas.removeEventListener('pointerleave', pl)
        renderer.dispose()
      })
      this.figures.push(entry)
    })

    this.lives = Array.from(root.querySelectorAll<HTMLElement>('[data-live]'))

    if (this.reduced) {
      // Static, elegant fallback: paint a single frame, tick once.
      this.paintAll(1.3)
      this.tick(1.3)
      return
    }
    this.raf = requestAnimationFrame(this.loop)
  }

  private paintAll(t: number) {
    for (const f of this.figures) {
      const r = f.canvas.getBoundingClientRect()
      if (r.bottom < -100 || r.top > window.innerHeight + 100) continue
      if (f.canvas.width < 2) continue
      const par = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      const ctx: FigureCtx = {
        w: f.canvas.width,
        h: f.canvas.height,
        t,
        mx: f.mx,
        my: f.my,
        par,
        scale: this.scale,
        dataLight: this.opts.dataLight,
        density: this.opts.particleDensity,
        state: f.state,
        shared: this.shared,
        getAnno: this.getAnno,
      }
      f.renderer.begin()
      f.painter(f.renderer, ctx)
      f.renderer.end()
    }
  }

  private tick(t: number) {
    const dl = this.opts.dataLight
    const tele = this.tele
    for (const k of Object.keys(tele)) {
      if (t < (this.nextT[k] || 0)) continue
      this.nextT[k] = t + 0.25 + Math.random() * 1.7
      if (k === 'liters') {
        if (Math.random() < 0.65) tele.liters += Math.round(Math.random() * 3)
        continue
      }
      if (k === 'presence') {
        tele.presence = 2 + Math.round(fbm(t * 0.02) * 2.4)
        continue
      }
      const tg =
        k === 'water'
          ? 1.6 + fbm(t * 0.05) * 2.4
          : k === 'energy'
            ? Math.max(0.05, (this.shared.day === undefined ? 0.8 : this.shared.day) * 4.4 + (fbm(t * 0.1) - 0.5))
            : k === 'stored'
              ? (this.shared.chg === undefined ? 0.7 : this.shared.chg) * 100
              : 21.2 + fbm(t * 0.01) * 0.9
      tele[k] += (tg - tele[k]) * (0.2 + Math.random() * 0.3) + (Math.random() - 0.5) * 0.05
    }
    for (const el of this.lives) {
      const k = el.getAttribute('data-live')!
      el.style.color = dl
      if (k === 'water') el.textContent = Math.max(0, tele.water).toFixed(1)
      else if (k === 'energy') el.textContent = Math.max(0, tele.energy).toFixed(2)
      else if (k === 'presence') el.textContent = String(tele.presence)
      else if (k === 'liters') el.textContent = String(tele.liters)
      else if (k === 'stored') el.textContent = String(Math.round(tele.stored))
      else if (k === 'temp') el.textContent = tele.temp.toFixed(1)
    }
  }

  private loop = (now: number) => {
    this.raf = requestAnimationFrame(this.loop)
    if (!this.opts.ambientMotion) return
    const t = now / 1000
    this.paintAll(t)
    if (now - this.last > 120) {
      this.last = now
      this.tick(t)
    }
  }

  unmount() {
    cancelAnimationFrame(this.raf)
    this.cleanups.forEach((f) => f())
    this.cleanups = []
    this.figures = []
    this.lives = []
  }
}
