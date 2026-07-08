// A small immediate-mode WebGL2 renderer.
//
// The four Katikiya "figures" were originally drawn with the Canvas-2D API.
// This renderer exposes the same handful of primitives — filled rects, discs,
// polylines, stroked rects/circles/arcs, radial-gradient glows and text — but
// every one of them is rasterised by WebGL. Consecutive solid primitives are
// batched into a single buffer and flushed in one draw call; gradient glows and
// text (which need their own shader / texture) flush the solid batch first so
// that draw order is preserved exactly as it was on the 2-D canvas.

export type RGBA = readonly [number, number, number, number] // r,g,b in 0..255, a in 0..1

export const col = (r: number, g: number, b: number, a = 1): RGBA => [r, g, b, a]

export const hexCol = (hex: string, a = 1): RGBA => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b, a]
}

const FLOATS_PER_VERT = 6 // x, y, r, g, b, a

const SOLID_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
layout(location=1) in vec4 aColor;
uniform vec2 uRes;
out vec4 vColor;
void main(){
  vec2 clip = (aPos / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vColor = aColor;
}`

const SOLID_FS = `#version 300 es
precision highp float;
in vec4 vColor;
out vec4 frag;
void main(){ frag = vec4(vColor.rgb * vColor.a, vColor.a); }`

const GRAD_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 aQuad;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRadius;
out vec2 vLocal;
void main(){
  vec2 pos = uCenter + aQuad * uRadius;
  vec2 clip = (pos / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vLocal = aQuad;
}`

const GRAD_FS = `#version 300 es
precision highp float;
in vec2 vLocal;
uniform vec4 uInner;
uniform vec4 uOuter;
out vec4 frag;
void main(){
  float t = clamp(length(vLocal), 0.0, 1.0);
  vec4 c = mix(uInner, uOuter, t);
  frag = vec4(c.rgb * c.a, c.a);
}`

const TEXT_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
layout(location=1) in vec2 aUv;
uniform vec2 uRes;
out vec2 vUv;
void main(){
  vec2 clip = (aPos / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vUv = aUv;
}`

const TEXT_FS = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
out vec4 frag;
void main(){ frag = texture(uTex, vUv); }`

interface TextTexture {
  tex: WebGLTexture
  w: number
  h: number
  top: number // pixels from texture top down to the alphabetic baseline
}

export class Renderer {
  readonly gl: WebGL2RenderingContext
  private canvas: HTMLCanvasElement

  private solidProg: WebGLProgram
  private gradProg: WebGLProgram
  private textProg: WebGLProgram

  private solidVao: WebGLVertexArrayObject
  private solidVbo: WebGLBuffer
  private quadVao: WebGLVertexArrayObject
  private textVao: WebGLVertexArrayObject
  private textVbo: WebGLBuffer

  private uSolidRes: WebGLUniformLocation
  private uGradRes: WebGLUniformLocation
  private uGradCenter: WebGLUniformLocation
  private uGradRadius: WebGLUniformLocation
  private uGradInner: WebGLUniformLocation
  private uGradOuter: WebGLUniformLocation
  private uTextRes: WebGLUniformLocation

  private data: Float32Array
  private count = 0 // vertices in the current solid batch
  private textCache = new Map<string, TextTexture>()
  private textCanvas: HTMLCanvasElement
  private textCtx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const gl = canvas.getContext('webgl2', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: true,
    })
    if (!gl) throw new Error('WebGL2 not supported')
    this.gl = gl

    this.solidProg = this.link(SOLID_VS, SOLID_FS)
    this.gradProg = this.link(GRAD_VS, GRAD_FS)
    this.textProg = this.link(TEXT_VS, TEXT_FS)

    this.uSolidRes = gl.getUniformLocation(this.solidProg, 'uRes')!
    this.uGradRes = gl.getUniformLocation(this.gradProg, 'uRes')!
    this.uGradCenter = gl.getUniformLocation(this.gradProg, 'uCenter')!
    this.uGradRadius = gl.getUniformLocation(this.gradProg, 'uRadius')!
    this.uGradInner = gl.getUniformLocation(this.gradProg, 'uInner')!
    this.uGradOuter = gl.getUniformLocation(this.gradProg, 'uOuter')!
    this.uTextRes = gl.getUniformLocation(this.textProg, 'uRes')!

    // Solid batch buffer
    this.data = new Float32Array(4096 * FLOATS_PER_VERT)
    this.solidVao = gl.createVertexArray()!
    this.solidVbo = gl.createBuffer()!
    gl.bindVertexArray(this.solidVao)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.solidVbo)
    gl.bufferData(gl.ARRAY_BUFFER, this.data.byteLength, gl.DYNAMIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, FLOATS_PER_VERT * 4, 0)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, FLOATS_PER_VERT * 4, 2 * 4)

    // Unit quad for gradient glows
    this.quadVao = gl.createVertexArray()!
    const quadVbo = gl.createBuffer()!
    gl.bindVertexArray(this.quadVao)
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVbo)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    // Text quad buffer (pos.xy, uv.xy) x 6 verts
    this.textVao = gl.createVertexArray()!
    this.textVbo = gl.createBuffer()!
    gl.bindVertexArray(this.textVao)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textVbo)
    gl.bufferData(gl.ARRAY_BUFFER, 6 * 4 * 4, gl.DYNAMIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 4 * 4, 0)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 4 * 4, 2 * 4)

    gl.bindVertexArray(null)

    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    // premultiplied-alpha over compositing
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    this.textCanvas = document.createElement('canvas')
    this.textCtx = this.textCanvas.getContext('2d')!
  }

  private link(vs: string, fs: string): WebGLProgram {
    const gl = this.gl
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error('shader: ' + gl.getShaderInfoLog(sh))
      }
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error('program: ' + gl.getProgramInfoLog(prog))
    }
    return prog
  }

  get width() {
    return this.canvas.width
  }
  get height() {
    return this.canvas.height
  }

  // Start a frame: size the viewport and clear to transparent so the panel
  // background shows through (mirrors ctx.clearRect over a coloured container).
  begin() {
    const gl = this.gl
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    this.count = 0
  }

  end() {
    this.flushSolid()
  }

  private ensure(verts: number) {
    const need = (this.count + verts) * FLOATS_PER_VERT
    if (need <= this.data.length) return
    let cap = this.data.length
    while (cap < need) cap *= 2
    const bigger = new Float32Array(cap)
    bigger.set(this.data)
    this.data = bigger
    const gl = this.gl
    gl.bindVertexArray(this.solidVao)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.solidVbo)
    gl.bufferData(gl.ARRAY_BUFFER, this.data.byteLength, gl.DYNAMIC_DRAW)
  }

  private vert(x: number, y: number, c: RGBA) {
    const o = this.count * FLOATS_PER_VERT
    const d = this.data
    d[o] = x
    d[o + 1] = y
    d[o + 2] = c[0] / 255
    d[o + 3] = c[1] / 255
    d[o + 4] = c[2] / 255
    d[o + 5] = c[3]
    this.count++
  }

  private tri(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    c: RGBA,
  ) {
    this.ensure(3)
    this.vert(x1, y1, c)
    this.vert(x2, y2, c)
    this.vert(x3, y3, c)
  }

  private flushSolid() {
    if (this.count === 0) return
    const gl = this.gl
    gl.useProgram(this.solidProg)
    gl.uniform2f(this.uSolidRes, this.canvas.width, this.canvas.height)
    gl.bindVertexArray(this.solidVao)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.solidVbo)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.data.subarray(0, this.count * FLOATS_PER_VERT))
    gl.drawArrays(gl.TRIANGLES, 0, this.count)
    this.count = 0
  }

  // ---- solid primitives (batched) ----

  fillRect(x: number, y: number, w: number, h: number, c: RGBA) {
    this.tri(x, y, x + w, y, x, y + h, c)
    this.tri(x + w, y, x + w, y + h, x, y + h, c)
  }

  // Filled disc, tessellated as a fan.
  disc(cx: number, cy: number, r: number, c: RGBA, segs = 24) {
    let px = cx + r
    let py = cy
    for (let i = 1; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2
      const nx = cx + Math.cos(a) * r
      const ny = cy + Math.sin(a) * r
      this.tri(cx, cy, px, py, nx, ny, c)
      px = nx
      py = ny
    }
  }

  // Single straight segment expanded to a quad of the given width.
  segment(x0: number, y0: number, x1: number, y1: number, w: number, c: RGBA) {
    let dx = x1 - x0
    let dy = y1 - y0
    const len = Math.hypot(dx, dy) || 1
    dx /= len
    dy /= len
    const nx = -dy * (w / 2)
    const ny = dx * (w / 2)
    this.tri(x0 + nx, y0 + ny, x0 - nx, y0 - ny, x1 + nx, y1 + ny, c)
    this.tri(x1 + nx, y1 + ny, x0 - nx, y0 - ny, x1 - nx, y1 - ny, c)
  }

  // Polyline from a flat [x0,y0,x1,y1,...] list.
  polyline(pts: number[], w: number, c: RGBA, closed = false) {
    for (let i = 0; i + 3 < pts.length; i += 2) {
      this.segment(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], w, c)
    }
    if (closed && pts.length >= 4) {
      this.segment(pts[pts.length - 2], pts[pts.length - 1], pts[0], pts[1], w, c)
    }
  }

  strokeRect(x: number, y: number, w: number, h: number, lw: number, c: RGBA) {
    this.polyline([x, y, x + w, y, x + w, y + h, x, y + h], lw, c, true)
  }

  strokeArc(
    cx: number,
    cy: number,
    r: number,
    a0: number,
    a1: number,
    lw: number,
    c: RGBA,
    segs = 40,
  ) {
    const pts: number[] = []
    for (let i = 0; i <= segs; i++) {
      const a = a0 + (a1 - a0) * (i / segs)
      pts.push(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
    }
    this.polyline(pts, lw, c)
  }

  strokeCircle(cx: number, cy: number, r: number, lw: number, c: RGBA, segs = 48) {
    this.strokeArc(cx, cy, r, 0, Math.PI * 2, lw, c, segs)
  }

  // ---- radial gradient glow (own shader, flushes the solid batch first) ----
  gradientDisc(cx: number, cy: number, r: number, inner: RGBA, outer: RGBA) {
    this.flushSolid()
    const gl = this.gl
    gl.useProgram(this.gradProg)
    gl.uniform2f(this.uGradRes, this.canvas.width, this.canvas.height)
    gl.uniform2f(this.uGradCenter, cx, cy)
    gl.uniform1f(this.uGradRadius, r)
    gl.uniform4f(this.uGradInner, inner[0] / 255, inner[1] / 255, inner[2] / 255, inner[3])
    gl.uniform4f(this.uGradOuter, outer[0] / 255, outer[1] / 255, outer[2] / 255, outer[3])
    gl.bindVertexArray(this.quadVao)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  // ---- text via cached glyph texture ----
  private getText(text: string, font: string, color: RGBA): TextTexture {
    const key = text + '|' + font + '|' + color.join(',')
    const cached = this.textCache.get(key)
    if (cached) return cached
    const ctx = this.textCtx
    ctx.font = font
    const metrics = ctx.measureText(text)
    const pad = 4
    const w = Math.max(2, Math.ceil(metrics.width) + pad * 2)
    const asc = Math.ceil(metrics.actualBoundingBoxAscent || parseInt(font) || 10)
    const desc = Math.ceil(metrics.actualBoundingBoxDescent || 4)
    const h = asc + desc + pad * 2
    this.textCanvas.width = w
    this.textCanvas.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.font = font
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`
    ctx.fillText(text, pad, pad + asc)

    const gl = this.gl
    const tex = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textCanvas)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    const record: TextTexture = { tex, w, h, top: pad + asc }
    this.textCache.set(key, record)
    return record
  }

  // Draws text with an alphabetic baseline at (x, y) — same contract as
  // ctx.fillText, including the internal padding offset.
  text(str: string, x: number, y: number, font: string, color: RGBA) {
    if (!str) return
    const t = this.getText(str, font, color)
    this.flushSolid()
    const pad = 4
    // Place the quad so the texture's baseline row (t.top from its top edge)
    // lands exactly on y, and the glyph's left edge on x.
    const x0 = x - pad
    const y0 = y - t.top
    const x1 = x0 + t.w
    const y1 = y0 + t.h
    const gl = this.gl
    gl.useProgram(this.textProg)
    gl.uniform2f(this.uTextRes, this.canvas.width, this.canvas.height)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, t.tex)
    gl.uniform1i(gl.getUniformLocation(this.textProg, 'uTex'), 0)
    // prettier-ignore
    const verts = new Float32Array([
      x0, y0, 0, 0,
      x1, y0, 1, 0,
      x0, y1, 0, 1,
      x0, y1, 0, 1,
      x1, y0, 1, 0,
      x1, y1, 1, 1,
    ])
    gl.bindVertexArray(this.textVao)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textVbo)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, verts)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  // Measures text width in device pixels (for centring labels).
  measureText(text: string, font: string): number {
    this.textCtx.font = font
    return this.textCtx.measureText(text).width
  }

  dispose() {
    const gl = this.gl
    this.textCache.forEach((t) => gl.deleteTexture(t.tex))
    this.textCache.clear()
    gl.deleteProgram(this.solidProg)
    gl.deleteProgram(this.gradProg)
    gl.deleteProgram(this.textProg)
  }
}
