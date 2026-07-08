// Fixed vignette + film grain over the whole dark stage — kills flatness.
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E"

export function Overlays() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 59,
          background: 'radial-gradient(120% 100% at 50% 45%, rgba(0,0,0,0) 62%, rgba(5,4,3,0.45) 100%)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 60,
          opacity: 0.045,
          mixBlendMode: 'overlay',
          backgroundSize: '180px 180px',
          backgroundImage: `url("${GRAIN}")`,
        }}
      />
    </>
  )
}
