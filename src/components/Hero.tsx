const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

function LiveStat({
  delay,
  label,
  live,
  value,
  unit,
}: {
  delay: string
  label: string
  live: string
  value: string
  unit: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#9FE8DC',
          animation: `ktkBreathe ${delay} ease-in-out infinite`,
          alignSelf: 'center',
        }}
      />
      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', color: '#9A8C74' }}>
        {label}
      </span>
      <span data-live={live} style={{ fontFamily: MONO, fontSize: 13, color: '#9FE8DC' }}>
        {value}
      </span>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: '#6E6350' }}>
        {unit}
      </span>
    </div>
  )
}

export function Hero() {
  return (
    <section
      data-screen-label="01 Arrival"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#0C0A07',
      }}
    >
      {/* warm floor glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-32vh',
          width: '130vw',
          height: '72vh',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(195,154,87,0.22) 0%, rgba(195,154,87,0.07) 42%, rgba(12,10,7,0) 70%)',
          animation: 'ktkGlow 11s ease-in-out infinite',
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '24vh',
          height: 1,
          background:
            'linear-gradient(90deg, rgba(195,154,87,0) 0%, rgba(195,154,87,0.35) 50%, rgba(195,154,87,0) 100%)',
          pointerEvents: 'none',
        }}
      />

      <header
        className="ktk-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '36px 48px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ fontFamily: DISPLAY, fontSize: 20, letterSpacing: '0.34em', fontWeight: 500 }}>
          KATIKIYA
        </div>
        <div
          className="ktk-header-est"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', color: '#9A8C74' }}
        >
          EST. MMXXVI — THE INTELLIGENT DWELLING
        </div>
      </header>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          data-reveal
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.42em',
            color: '#9A8C74',
            marginBottom: 36,
          }}
        >
          A HOME THAT KNOWS ITSELF
        </div>
        <h1
          data-reveal
          data-delay="120"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(44px, 10vw, 156px)',
            lineHeight: 1.0,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          The home,
          <br />
          <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>awakened.</em>
        </h1>
        <p
          data-reveal
          data-delay="280"
          style={{
            maxWidth: 460,
            fontSize: 17,
            lineHeight: 1.7,
            color: '#B7A98E',
            margin: 'clamp(28px, 5vh, 42px) 0 clamp(36px, 6vh, 56px)',
          }}
        >
          Your home has been asleep. We are building the part that wakes it up.
        </p>
        <a
          href="#the-word"
          data-magnet
          data-reveal
          data-delay="420"
          className="ktk-begin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 104,
            height: 104,
            borderRadius: '50%',
            border: '1px solid rgba(195,154,87,0.45)',
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.34em',
            color: '#EBD3A2',
          }}
        >
          BEGIN
        </a>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(28px,6vw,88px)',
          padding: '0 24px 44px',
          position: 'relative',
          zIndex: 2,
          flexWrap: 'wrap',
        }}
      >
        <LiveStat delay="3.2s" label="WATER" live="water" value="2.8" unit="L/MIN" />
        <LiveStat delay="2.6s .6s" label="ENERGY" live="energy" value="3.12" unit="KW SOLAR" />
        <LiveStat delay="3.8s 1.1s" label="PRESENCE" live="presence" value="3" unit="ROOMS ALIVE" />
      </div>
    </section>
  )
}
