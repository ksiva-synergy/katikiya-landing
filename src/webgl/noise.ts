// Deterministic value noise — a faithful port of the original design's
// noise field so every drift, wobble and event timing matches exactly.

export const hashN = (n: number): number => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

export const vnoise = (x: number): number => {
  const i = Math.floor(x)
  const f = x - i
  const u = f * f * (3 - 2 * f)
  return hashN(i) * (1 - u) + hashN(i + 1) * u
}

export const fbm = (x: number): number =>
  vnoise(x) * 0.55 + vnoise(x * 2.17 + 71.3) * 0.3 + vnoise(x * 4.97 + 13.7) * 0.15

export const smooth = (p: number): number => p * p * (3 - 2 * p)
