const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

export function BeyondHome() {
  return (
    <section
      data-screen-label="05 Beyond the Home"
      style={{ position: 'relative', padding: '26vh 24px', textAlign: 'center', background: '#0C0A07' }}
    >
      <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.42em', color: '#6E6350', marginBottom: 56 }}>
        MOVEMENT V — BEYOND THE HOME
      </div>
      <h2
        data-reveal
        data-delay="100"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: 'clamp(26px,4.5vw,64px)',
          lineHeight: 1.25,
          margin: '0 auto',
          maxWidth: 840,
        }}
      >
        The same awareness, extended to the places that protect people —{' '}
        <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>
          where the youngest learn, and the oldest are cared for.
        </em>
      </h2>
      <div data-reveal data-delay="220" style={{ marginTop: 64 }}>
        <a
          href="mailto:private@katikiya.com"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '0.32em',
            color: '#C39A57',
            borderBottom: '1px solid rgba(195,154,87,0.35)',
            paddingBottom: 6,
          }}
        >
          PRIVATE INQUIRIES →
        </a>
      </div>
    </section>
  )
}
