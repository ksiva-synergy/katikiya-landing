# Katikaya — The home, awakened.

A flagship single-scroll experience for **Katikaya**, an intelligent-living
brand. Built in **React + TypeScript (Vite)** with all four ambient "figures"
rendered in **WebGL**.

The site is the product demo: it senses and responds the way a Katikaya home
does — continuous ambient motion, scroll-driven narrative reveals, magnetic
CTAs, and live telemetry that ticks like real instruments.

## The seven movements

1. **Arrival / Hero** — cinematic statement with a live instrument strip
2. **The Word** — the κατοικία founding-myth moment
3. **The Awakening** — four live figures (Water · Energy · Presence · Sovereignty)
4. **The Atelier** — Collection I, three code-rendered instrument sculptures
5. **Beyond the Home** — a restrained B2B teaser
6. **The Marque** — founder story + the Founding Circle
7. **Coda** — the wordmark, the origin word, an invitation

## WebGL figures

Every figure is a generative, noise-driven WebGL piece. The renderer
(`src/webgl/Renderer.ts`) is a small immediate-mode WebGL2 layer that batches
solid primitives into single draw calls and provides radial-gradient glows and
glyph-texture text — so the crisp "engineering annotation" look is preserved
while every pixel is rasterised by the GPU.

- **Fig. 01 — Water** — a streaming particle flow with pressure pulses and an
  `ANOMALY / VALVE 3 / RESOLVED` leak-detection event
- **Fig. 02 — Energy** — a breathing sun, an 80s day→dusk cycle, accumulating
  house glow, a live battery gauge and `EXPORT → GRID` reverse flow
- **Fig. 03 — Presence** — an architectural floorplan with migrating warm glows
  and a live `PRESENCE / ROOM / HH:MM` tag (no cameras)
- **Fig. 04 — Sovereignty** — data orbiting within the walls, reflected at the
  boundary, with outside probes that die at the wall

One `requestAnimationFrame` loop (`src/webgl/engine.ts`) drives all figures and
the telemetry read-outs, tracks the cursor and scroll parallax, and honours
`prefers-reduced-motion` with an elegant static fallback.

## Develop

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.tsx                 # composes the seven movements
  components/             # Hero, TheWord, Awakening, Atelier, BeyondHome, Marque, Coda, Overlays
  hooks/
    useInteractions.ts    # scroll reveals + magnetic cursor
    useEngine.ts          # boots the WebGL engine after fonts load
  webgl/
    Renderer.ts           # immediate-mode WebGL2 primitive renderer
    engine.ts             # rAF loop, telemetry, cursor/parallax, reduced-motion
    noise.ts              # deterministic value noise (hashN / vnoise / fbm / smooth)
    figures/              # water · energy · presence · walls painters
```

## Design origin

This site was implemented from a Claude Design handoff bundle. The original
design brief and iteration transcript live in [`chats/`](./chats), and the
exported HTML/CSS/JS prototypes in [`project/`](./project), kept for reference.

Type: Bodoni Moda (display) · Instrument Sans (body) · IBM Plex Mono (technical).
Palette: bronze-black stage, brass/champagne accent, cyan reserved for live data.

Product stills in the Atelier are code-rendered concept objects — swap in real
photography when it exists.
