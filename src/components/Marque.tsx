const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

export function Marque() {
  return (
    <section
      id="the-marque"
      data-screen-label="06 The Marque"
      style={{
        position: 'relative',
        padding: '20vh 0',
        background: '#120E0A',
        borderTop: '1px solid rgba(195,154,87,0.14)',
      }}
    >
      <div
        className="ktk-pad"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))',
          gap: 'clamp(48px,8vw,140px)',
          alignItems: 'start',
        }}
      >
        <div>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.42em', color: '#6E6350', marginBottom: 28 }}>
            MOVEMENT VI — THE MARQUE
          </div>
          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(38px,4.5vw,68px)', lineHeight: 1.15, margin: '0 0 32px' }}
          >
            Built by hands that understand buildings.
          </h2>
          <p data-reveal data-delay="200" style={{ fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: 0, maxWidth: 460 }}>
            Katikaya comes from construction and hardware — from people who have poured foundations and
            pulled cable through walls. We did not guess at what a home is. We have built them. Now we are
            building the part that has always been missing: the part that knows.
          </p>
        </div>

        <div
          data-reveal
          data-delay="150"
          style={{ border: '1px solid rgba(195,154,87,0.22)', padding: 'clamp(32px,4vw,56px)', background: '#0E0B08' }}
        >
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.36em', color: '#C39A57', marginBottom: 20 }}>
            THE FOUNDING CIRCLE
          </div>
          <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(24px,2.4vw,34px)', lineHeight: 1.3, marginBottom: 16 }}>
            A hundred homes will wake first.
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: '0 0 36px' }}>
            Members of the circle shape the platform, receive Collection I before anyone, and are named in
            the record of the marque.
          </p>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@address.com"
              className="ktk-email"
              style={{
                background: 'transparent',
                border: '1px solid rgba(195,154,87,0.3)',
                color: '#EDE4D3',
                fontFamily: MONO,
                fontSize: 13,
                letterSpacing: '0.06em',
                padding: '16px 18px',
                outline: 'none',
              }}
            />
            <button
              data-magnet
              type="submit"
              className="ktk-request"
              style={{
                background: '#C39A57',
                color: '#0C0A07',
                border: 'none',
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: '0.32em',
                padding: 18,
                cursor: 'pointer',
              }}
            >
              REQUEST A PLACE
            </button>
          </form>
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#6E6350', marginTop: 20 }}>
            BY INVITATION AND REQUEST. NOT A NEWSLETTER.
          </div>
        </div>
      </div>
    </section>
  )
}
