const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

interface BeyondHomeProps {
  onNavigate: (path: string) => void
}

export function BeyondHome({ onNavigate }: BeyondHomeProps) {
  return (
    <section
      data-screen-label="05 Beyond the Home"
      style={{ position: 'relative', padding: '20vh 24px', textAlign: 'center', background: '#0C0A07' }}
    >
      <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.42em', color: '#6E6350', marginBottom: 44 }}>
        MOVEMENT V — BEYOND THE HOME
      </div>
      <h2
        data-reveal
        data-delay="100"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: 'clamp(26px,4.5vw,60px)',
          lineHeight: 1.25,
          margin: '0 auto 64px',
          maxWidth: 900,
        }}
      >
        The same awareness, extended to the places that protect people —{' '}
        <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>
          where the youngest learn, and the oldest are cared for.
        </em>
      </h2>

      {/* Grid of Solutions */}
      <div
        style={{
          maxWidth: 1040,
          margin: '0 auto 72px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          textAlign: 'left',
        }}
      >
        {/* Eldercare Card */}
        <div
          data-reveal
          data-delay="180"
          onClick={() => onNavigate('/eldercare')}
          className="ktk-instrument"
          style={{
            background: '#120E0A',
            padding: '48px 40px',
            border: '1px solid rgba(195,154,87,0.15)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 280,
            transition: 'border-color 0.4s, background 0.4s',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#9FE8DC', marginBottom: 16 }}>
              DWELL FOR CARE HOMES
            </div>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 400, margin: '0 0 16px', color: '#EDE4D3' }}>
              Elder Care
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>
              Ambient radar sensing that detects falls and tracks vitals through the air — protecting bathrooms and bedrooms without cameras or wearables.
            </p>
          </div>
          <div style={{ marginTop: 32 }}>
            <span
              className="ktk-reserve"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: '0.28em',
                color: '#C39A57',
                borderBottom: '1px solid rgba(195,154,87,0.35)',
                paddingBottom: 6,
              }}
            >
              EXPLORE SOLUTION →
            </span>
          </div>
        </div>

        {/* Toddlercare Card */}
        <div
          data-reveal
          data-delay="260"
          onClick={() => onNavigate('/toddlercare')}
          className="ktk-instrument"
          style={{
            background: '#120E0A',
            padding: '48px 40px',
            border: '1px solid rgba(195,154,87,0.15)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 280,
            transition: 'border-color 0.4s, background 0.4s',
          }}
        >
          <div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#9FE8DC', marginBottom: 16 }}>
              DWELL FOR DAYCARES
            </div>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 32, fontWeight: 400, margin: '0 0 16px', color: '#EDE4D3' }}>
              Toddler Care
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>
              Consent-gated live streams and camera-free sleep safety monitoring. Meet new SOP regulations while fully respecting teacher and child privacy.
            </p>
          </div>
          <div style={{ marginTop: 32 }}>
            <span
              className="ktk-reserve"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: '0.28em',
                color: '#C39A57',
                borderBottom: '1px solid rgba(195,154,87,0.35)',
                paddingBottom: 6,
              }}
            >
              EXPLORE SOLUTION →
            </span>
          </div>
        </div>
      </div>

      <div data-reveal data-delay="340" style={{ marginTop: 32 }}>
        <a
          href="mailto:private@katikiya.com"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '0.32em',
            color: '#9A8C74',
            borderBottom: '1px solid rgba(195,154,87,0.2)',
            paddingBottom: 6,
          }}
          className="ktk-reserve"
        >
          PRIVATE INQUIRIES →
        </a>
      </div>
    </section>
  )
}
