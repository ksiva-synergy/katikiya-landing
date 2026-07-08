import type { CSSProperties, ReactNode } from 'react'

const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

const figShell: CSSProperties = {
  border: '1px solid rgba(195,154,87,0.18)',
  aspectRatio: '4 / 3',
  position: 'relative',
  background: '#0E0B08',
}

const canvasStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
}

const figTag: CSSProperties = {
  position: 'absolute',
  top: 14,
  left: 16,
  fontFamily: MONO,
  fontSize: 9,
  letterSpacing: '0.3em',
  color: '#6E6350',
}

const numLabel: CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 16,
  marginBottom: 28,
}

const heading: CSSProperties = {
  fontFamily: DISPLAY,
  fontWeight: 400,
  fontSize: 'clamp(26px,3.2vw,48px)',
  lineHeight: 1.2,
  margin: '0 0 24px',
}

const bodyCopy: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: '#B7A98E',
  margin: '0 0 40px',
  maxWidth: 440,
}

const statRow: CSSProperties = {
  display: 'flex',
  gap: 40,
  borderTop: '1px solid rgba(195,154,87,0.18)',
  paddingTop: 20,
}

function Stat({ live, value, unit }: { live: string; value: string; unit: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span data-live={live} style={{ fontFamily: MONO, fontSize: 20, color: '#9FE8DC' }}>
        {value}
      </span>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#6E6350' }}>
        {unit}
      </span>
    </div>
  )
}

function Copy({
  index,
  label,
  title,
  children,
  stats,
}: {
  index: string
  label: string
  title: ReactNode
  children: ReactNode
  stats: ReactNode
}) {
  return (
    <div>
      <div data-reveal style={numLabel}>
        <span style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 22, color: 'rgba(195,154,87,0.6)' }}>
          {index}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.42em', color: '#9A8C74' }}>
          {label}
        </span>
      </div>
      <h3 data-reveal data-delay="100" style={heading}>
        {title}
      </h3>
      <p data-reveal data-delay="180" style={bodyCopy}>
        {children}
      </p>
      <div data-reveal data-delay="260" style={statRow}>
        {stats}
      </div>
    </div>
  )
}

export function Awakening() {
  return (
    <section
      data-screen-label="03 The Awakening"
      style={{ position: 'relative', padding: '18vh 0 6vh', background: '#0C0A07' }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }} className="ktk-pad">
        <div
          data-reveal
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.42em', color: '#6E6350', marginBottom: 28 }}
        >
          MOVEMENT III — THE AWAKENING
        </div>
        <h2
          data-reveal
          data-delay="100"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(34px,5.5vw,84px)',
            lineHeight: 1.08,
            margin: 0,
            maxWidth: 820,
          }}
        >
          One nervous system.
          <br />
          <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>Three senses.</em>
        </h2>
      </div>

      {/* 01 — WATER */}
      <div className="ktk-grid-row ktk-pad" style={{ marginTop: '16vh' }}>
        <div data-reveal style={figShell}>
          <canvas data-viz="water" style={canvasStyle} />
          <div style={figTag}>FIG. 01 — FLOW TELEMETRY</div>
          <div
            data-anno="water"
            style={{
              position: 'absolute',
              right: 16,
              top: 14,
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: '0.3em',
              color: '#E0A450',
              opacity: 0,
              transition: 'opacity 1.4s',
            }}
          >
            ANOMALY / VALVE 3 / RESOLVED
          </div>
        </div>
        <Copy
          index="01"
          label="WATER"
          title="It feels a leak before you'd ever see one."
          stats={
            <>
              <Stat live="liters" value="414" unit="LITERS TODAY" />
              <Stat live="water" value="2.8" unit="L/MIN NOW" />
            </>
          }
        >
          Every liter that moves through the walls is felt. A pressure that drifts, a valve that weeps
          at 3 a.m. — the house notices, and closes the line before water becomes damage.
        </Copy>
      </div>

      {/* 02 — ENERGY (reversed) */}
      <div className="ktk-grid-row reversed ktk-pad">
        <div data-reveal style={figShell}>
          <canvas data-viz="energy" style={canvasStyle} />
          <div style={figTag}>FIG. 02 — METABOLISM</div>
          <div
            data-anno="energy"
            style={{
              position: 'absolute',
              left: 16,
              bottom: 14,
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: '0.3em',
              color: '#9FE8DC',
              opacity: 0,
              transition: 'opacity 1.4s',
            }}
          >
            EXPORT / 0.4 KW → GRID
          </div>
        </div>
        <Copy
          index="02"
          label="ENERGY"
          title="It knows what the sun gave, and what remains."
          stats={
            <>
              <Stat live="energy" value="3.12" unit="KW FROM SUN" />
              <Stat live="stored" value="86" unit="% HELD FOR NIGHT" />
            </>
          }
        >
          The house understands its own metabolism — what arrives from the roof, what the rooms
          consume, what the batteries hold for the night. Nothing is guessed. Everything is accounted
          for.
        </Copy>
      </div>

      {/* 03 — PRESENCE */}
      <div className="ktk-grid-row ktk-pad">
        <div data-reveal style={figShell}>
          <canvas data-viz="presence" style={canvasStyle} />
          <div style={figTag}>FIG. 03 — RHYTHM OF ROOMS</div>
          <div
            data-anno="presence"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: 'translate(10px,-160%)',
              fontFamily: MONO,
              fontSize: 8.5,
              letterSpacing: '0.2em',
              color: '#9FE8DC',
              opacity: 0.85,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            PRESENCE / KITCHEN / 07:00
          </div>
        </div>
        <Copy
          index="03"
          label="PRESENCE"
          title="It knows what normal feels like."
          stats={
            <>
              <Stat live="presence" value="3" unit="ROOMS ALIVE" />
              <Stat live="temp" value="21.4" unit="°C AMBIENT" />
            </>
          }
        >
          Which rooms are alive. Who moves where, and when. The house learns its own rhythm — so the
          moment something falls outside it, the house is the first to know.
        </Copy>
      </div>

      {/* FIG 04 — SOVEREIGNTY */}
      <div className="ktk-pad ktk-sovereignty-row">
        <div
          data-reveal
          style={{ width: 'min(420px,80%)', aspectRatio: '5 / 4', margin: '0 auto 64px', position: 'relative' }}
        >
          <canvas data-viz="walls" style={canvasStyle} />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: '0.3em',
              color: '#6E6350',
              whiteSpace: 'nowrap',
            }}
          >
            FIG. 04 — NOTHING LEAVES THE WALLS
          </div>
        </div>
        <h3
          data-reveal
          data-delay="120"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(28px,4.5vw,64px)',
            lineHeight: 1.18,
            margin: '0 0 28px',
          }}
        >
          The intelligence lives <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>here.</em>
        </h3>
        <p
          data-reveal
          data-delay="220"
          style={{ fontSize: 17, lineHeight: 1.85, color: '#B7A98E', margin: 0, maxWidth: 520, display: 'inline-block' }}
        >
          The brain is on the premises. What the house knows about you stays inside its walls —
          sovereign, private, yours. Not rented from a distant cloud.
        </p>
      </div>
    </section>
  )
}
