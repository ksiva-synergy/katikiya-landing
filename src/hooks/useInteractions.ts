import { useEffect } from 'react'

const EASE = 'cubic-bezier(.16,1,.3,1)'

// Scroll reveals + magnetic cursor — a direct port of the original design's
// componentDidMount behaviour, driven off [data-reveal] / [data-magnet].
export function useInteractions() {
  useEffect(() => {
    const cleanups: Array<() => void> = []

    // Reveals: below-fold elements descend into place on scroll entry.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'none'
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
      const d = el.getAttribute('data-delay') || '0'
      el.style.opacity = '0'
      el.style.transform = 'translateY(44px)'
      el.style.transition = `opacity 1.6s ${EASE} ${d}ms, transform 1.6s ${EASE} ${d}ms`
      io.observe(el)
    })
    cleanups.push(() => io.disconnect())

    // Magnetic elements anticipate the cursor.
    document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
      const move = (ev: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const dx = ev.clientX - (r.left + r.width / 2)
        const dy = ev.clientY - (r.top + r.height / 2)
        el.style.transform = `translate(${(dx * 0.16).toFixed(1)}px,${(dy * 0.16).toFixed(1)}px)`
      }
      const out = () => {
        el.style.transform = 'translate(0,0)'
      }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', out)
      cleanups.push(() => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', out)
      })
    })

    return () => cleanups.forEach((f) => f())
  }, [])
}
