const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

export function TheWord() {
  return (
    <section
      id="the-word"
      data-screen-label="02 The Word"
      className="ktk-pad"
      style={{
        position: 'relative',
        padding: '26vh 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: '#0C0A07',
      }}
    >
      <div
        data-reveal
        style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.42em', color: '#6E6350', marginBottom: 64 }}
      >
        MOVEMENT II — THE WORD
      </div>
      <div
        data-reveal
        data-delay="100"
        style={{
          fontFamily: DISPLAY,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(42px, 8.5vw, 128px)',
          color: 'rgba(195,154,87,0.5)',
          lineHeight: 1,
        }}
      >
        κατοικία
      </div>
      <div
        data-reveal
        data-delay="220"
        style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '44px 0' }}
      >
        <span style={{ display: 'block', width: 64, height: 1, background: 'rgba(195,154,87,0.35)' }} />
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#9A8C74' }}>
          RE-ENGINEERED
        </span>
        <span style={{ display: 'block', width: 64, height: 1, background: 'rgba(195,154,87,0.35)' }} />
      </div>
      <div
        data-reveal
        data-delay="320"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 500,
          fontSize: 'clamp(32px, 5.5vw, 76px)',
          letterSpacing: '0.22em',
          lineHeight: 1,
        }}
      >
        KATIKIYA
      </div>
      <p
        data-reveal
        data-delay="420"
        style={{ maxWidth: 520, fontSize: 18, lineHeight: 1.85, color: '#B7A98E', margin: '64px 0 0' }}
      >
        The Greeks had a word for the act of dwelling. We took it, and built it a nervous system. The
        oldest human idea, meeting the newest intelligence — under one roof.
      </p>
    </section>
  )
}
