import { useEffect } from 'react'
import { Engine, type EngineOptions } from '../webgl/engine'

// Boots the WebGL ambient engine once the section markup (canvases, live
// read-outs, annotations) is in the DOM. Waits for the web fonts so that the
// figure text labels are rasterised with the correct metrics.
export function useEngine(opts?: Partial<EngineOptions>) {
  useEffect(() => {
    let engine: Engine | null = new Engine(opts)
    let cancelled = false

    const start = () => {
      if (cancelled || !engine) return
      engine.mount(document)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start).catch(start)
    } else {
      start()
    }

    return () => {
      cancelled = true
      engine?.unmount()
      engine = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
