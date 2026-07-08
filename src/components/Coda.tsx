const DISPLAY = "'Bodoni Moda', 'GFS Didot', serif"
const MONO = "'IBM Plex Mono', monospace"

const footLink = {
  fontFamily: MONO,
  fontSize: 10,
  letterSpacing: '0.28em',
  color: '#9A8C74',
} as const

export function Coda() {
  return (
    <footer
      data-screen-label="07 Coda"
      style={{ position: 'relative', padding: '22vh 24px 60px', textAlign: 'center', background: '#0C0A07', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '-30vh',
          width: '110vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(195,154,87,0.1) 0%, rgba(12,10,7,0) 65%)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      />
      <div data-reveal style={{ fontFamily: DISPLAY, fontSize: 'clamp(32px,6vw,88px)', letterSpacing: '0.24em', fontWeight: 500, position: 'relative' }}>
        KATIKIYA
      </div>
      <div data-reveal data-delay="120" style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 18, color: 'rgba(195,154,87,0.55)', marginTop: 18 }}>
        κατοικία — to dwell
      </div>
      <p data-reveal data-delay="220" style={{ fontSize: 15, color: '#9A8C74', margin: '56px auto 0', maxWidth: 380, lineHeight: 1.8 }}>
        It notices. It remembers. It responds.
        <br />
        Your home is waiting to be introduced.
      </p>
      <div data-reveal data-delay="300" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px,4vw,56px)', marginTop: 72, flexWrap: 'wrap' }}>
        <a href="#the-word" style={footLink}>
          THE WORD
        </a>
        <a href="#the-marque" style={footLink}>
          THE CIRCLE
        </a>
        <a href="mailto:private@katikiya.com" style={footLink}>
          INQUIRIES
        </a>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#4E4638', marginTop: 80 }}>
        © MMXXVI KATIKIYA — THE INTELLIGENT DWELLING
      </div>
    </footer>
  )
}
