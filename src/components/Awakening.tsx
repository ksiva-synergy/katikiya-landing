import type { CSSProperties, ReactNode } from 'react'

const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

const figShell: CSSProperties = {
  border: '1px solid rgba(195,154,87,0.14)',
  aspectRatio: '4 / 3',
  position: 'relative',
  background: '#0E0B08',
  overflow: 'hidden',
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
  marginBottom: 20,
}

const heading: CSSProperties = {
  fontFamily: DISPLAY,
  fontWeight: 400,
  fontSize: 'clamp(30px,3vw,46px)',
  lineHeight: 1.2,
  margin: '0 0 20px',
}

const bodyCopy: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: '#B7A98E',
  margin: '0 0 26px',
  maxWidth: 440,
}

const statRow: CSSProperties = {
  display: 'flex',
  gap: 40,
  borderTop: '1px solid rgba(195,154,87,0.14)',
  paddingTop: 18,
  marginTop: 32,
}

function Stat({ live, value, unit }: { live: string; value: string; unit: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span data-live={live} style={{ fontFamily: MONO, fontSize: 20, color: '#9FE8DC' }}>
        {value}
      </span>
      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#6E6350' }}>
        {unit}
      </span>
    </div>
  )
}

function BulletItem({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 14, fontSize: 15, lineHeight: 1.65, color: '#B7A98E' }}>
      <span style={{ color: '#C39A57', flexShrink: 0 }}>—</span>
      <span>{children}</span>
    </div>
  )
}

function CopyColumn({
  index,
  label,
  title,
  text,
  bullets,
  stats,
  extra,
}: {
  index: string
  label: string
  title: ReactNode
  text: string
  bullets: string[]
  stats?: ReactNode
  extra?: ReactNode
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
      <p data-reveal data-delay="140" style={bodyCopy}>
        {text}
      </p>
      <div data-reveal data-delay="180" style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 440 }}>
        {bullets.map((b, idx) => (
          <BulletItem key={idx}>{b}</BulletItem>
        ))}
      </div>
      {stats && (
        <div data-reveal data-delay="260" style={statRow}>
          {stats}
        </div>
      )}
      {extra && <div data-reveal data-delay="260" style={{ marginTop: 24 }}>{extra}</div>}
    </div>
  )
}

export function Awakening() {
  return (
    <section
      data-screen-label="03 The Six Senses"
      style={{ position: 'relative', padding: '18vh 0 6vh', background: '#0C0A07' }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }} className="ktk-pad">
        <div
          data-reveal
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.42em', color: '#6E6350', marginBottom: 28 }}
        >
          MOVEMENT III — THE SIX SENSES
        </div>
        <h2
          data-reveal
          data-delay="100"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(44px,5.5vw,84px)',
            lineHeight: 1.08,
            margin: 0,
            maxWidth: 820,
          }}
        >
          Six senses.
          <br />
          <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>One awareness.</em>
        </h2>
        <p
          data-reveal
          data-delay="200"
          style={{
            maxWidth: 520,
            fontSize: 16,
            lineHeight: 1.8,
            color: '#B7A98E',
            margin: '32px 0 0',
          }}
        >
          Five ways of perceiving, and one mind that understands. Your home perceives. It understands. It acts.
        </p>
      </div>

      {/* SENSE 01: PULSE */}
      <div className="ktk-grid-row ktk-pad" style={{ marginTop: '14vh' }}>
        <div data-reveal style={figShell}>
          <canvas data-viz="pulse" style={canvasStyle} />
          <div style={figTag}>SENSE 01 — NETWORK AWARENESS</div>
        </div>
        <CopyColumn
          index="01"
          label="PULSE"
          title="Your home's nervous system."
          text="Every device in the house, felt as one living signal — so a weak connection is noticed the way a body notices a strain."
          bullets={[
            'Sees every device on your Wi-Fi — discovered, named, and watched automatically.',
            'Knows when anything drops offline, weakens, or misbehaves — before you notice.',
            'Maps your Wi-Fi coverage room by room and finds the dead zones.',
          ]}
          stats={
            <>
              <Stat live="devices" value="24" unit="DEVICES ONLINE" />
              <Stat live="signal" value="92" unit="% COVERAGE" />
            </>
          }
        />
      </div>

      {/* SENSE 02: SONAR */}
      <div className="ktk-grid-row reversed ktk-pad">
        <div data-reveal style={{ ...figShell, border: '1px solid rgba(195,154,87,0.3)' }}>
          <canvas data-viz="sonar" style={canvasStyle} />
          <div style={figTag}>SENSE 02 — PRECISION LOCATE</div>
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 16,
              fontFamily: MONO,
              fontSize: 8,
              letterSpacing: '0.24em',
              color: '#0C0A07',
              background: '#C39A57',
              padding: '3px 8px',
            }}
          >
            FLAGSHIP
          </div>
        </div>
        <CopyColumn
          index="02"
          label="SONAR"
          title={
            <>
              Find anything. <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>Exactly.</em>
            </>
          }
          text="Not a beep somewhere in the room. A point on a map — the shelf, the drawer, the exact place you left it."
          bullets={[
            'Other trackers tell you your keys are "somewhere at home." Sonar guides you to the exact shelf.',
            'Works with any phone — not locked to iPhone or Galaxy like AirTag or SmartTag.',
            'Movement history: see where an item traveled and when it was last moved.',
          ]}
        />
      </div>

      {/* SENSE 03: VISION */}
      <div className="ktk-grid-row ktk-pad">
        <div data-reveal style={figShell}>
          <canvas data-viz="vision" style={canvasStyle} />
          <div style={figTag}>SENSE 03 — UNIFIED FEED</div>
        </div>
        <CopyColumn
          index="03"
          label="VISION"
          title="Every camera. One screen."
          text="The eyes of the house, gathered under one roof — never handed to someone else's server."
          bullets={[
            'Brings all your cameras into one place — Tapo, CP Plus, Hikvision, Trueview, Stellar and more.',
            'No more juggling five different apps for five different cameras.',
            'Local-first: your footage stays in your home, not someone else\'s cloud.',
          ]}
          extra={
            <span
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: '0.24em',
                color: '#6E6350',
                border: '1px solid rgba(195,154,87,0.2)',
                padding: '6px 10px',
              }}
            >
              RING, NEST & MORE — COMING SOON
            </span>
          }
        />
      </div>

      {/* SENSE 04: FLOW */}
      <div className="ktk-grid-row reversed ktk-pad">
        <div data-reveal style={figShell}>
          <canvas data-viz="water" style={canvasStyle} />
          <div style={figTag}>SENSE 04 — RESOURCE TELEMETRY</div>
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
        <CopyColumn
          index="04"
          label="FLOW"
          title="Every drop, every watt."
          text="A pressure that drifts, a valve that weeps at 3 a.m. — the house notices, and closes the line before water becomes damage."
          bullets={[
            'Real-time water usage and leak detection for the whole house.',
            'Solar generation versus consumption at a glance.',
            'Catch waste before the bill does.',
          ]}
          stats={
            <>
              <Stat live="liters" value="414" unit="LITERS TODAY" />
              <Stat live="energy" value="3.12" unit="KW FROM SUN" />
            </>
          }
        />
      </div>

      {/* SENSE 05: PRESENCE */}
      <div className="ktk-grid-row ktk-pad">
        <div data-reveal style={figShell}>
          <canvas data-viz="presence" style={canvasStyle} />
          <div style={figTag}>SENSE 05 — AMBIENT AWARENESS</div>
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
        <CopyColumn
          index="05"
          label="PRESENCE"
          title="Awareness without surveillance."
          text="It knows what normal feels like — which rooms are alive, who moves where — so it notices the moment something isn't."
          bullets={[
            'Room-level awareness of people, pets, and activity — no cameras needed in private spaces.',
            'Air quality, temperature, and environment — always measured, never guessed.',
            'Privacy-first ambient sensing. Perception without intrusion.',
          ]}
          stats={
            <>
              <Stat live="presence" value="3" unit="ROOMS ALIVE" />
              <Stat live="temp" value="28.4" unit="°C AMBIENT" />
            </>
          }
        />
      </div>

      {/* SENSE 06: MANAS (THE SIXTH SENSE) */}
      <div style={{ maxWidth: 1000, margin: '22vh auto 10vh', padding: '0 48px' }} className="ktk-pad">
        <div
          data-reveal
          style={{
            position: 'relative',
            padding: 'clamp(40px, 6vw, 80px)',
            background: 'radial-gradient(90% 80% at 50% 60%, rgba(195,154,87,0.06) 0%, rgba(12,10,7,0) 70%), #0C0A07',
            animation: 'ktkManasGlow 12s ease-in-out infinite',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <canvas data-viz="manas" style={canvasStyle} />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 22, color: 'rgba(195,154,87,0.8)' }}>
                06
              </span>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.42em', color: '#EBD3A2' }}>
                MANAS
              </span>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: '#9A8C74', marginLeft: 4 }}>
                SANSKRIT: MIND
              </span>
            </div>
            <h3
              data-reveal
              data-delay="100"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 'clamp(36px,4.5vw,64px)',
                lineHeight: 1.15,
                margin: '0 0 24px',
              }}
            >
              The sixth sense.
            </h3>
            <p
              data-reveal
              data-delay="180"
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: '#B7A98E',
                margin: '0 0 32px',
                maxWidth: 600,
              }}
            >
              The intelligence that fuses the other five senses into intuition. Manas learns your home's normal
              patterns and flags what's unusual — a door opening at an odd hour, water flowing when nobody's home,
              a device behaving strangely.
            </p>
            <p
              data-reveal
              data-delay="240"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(22px,2.5vw,32px)',
                lineHeight: 1.35,
                color: '#EBD3A2',
                margin: 0,
                maxWidth: 520,
                fontStyle: 'italic',
              }}
            >
              It doesn't just report. It anticipates.
            </p>
            <div
              data-reveal
              data-delay="320"
              style={{ display: 'flex', gap: 6, marginTop: 36, flexWrap: 'wrap', alignItems: 'center' }}
            >
              {['PULSE', 'SONAR', 'VISION', 'FLOW', 'PRESENCE'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    color: '#6E6350',
                    border: '1px solid rgba(195,154,87,0.18)',
                    padding: '6px 10px',
                  }}
                >
                  {tag}
                </span>
              ))}
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.22em', color: '#C39A57', padding: '6px' }}>
                →
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  color: '#EBD3A2',
                  border: '1px solid rgba(195,154,87,0.45)',
                  padding: '6px 10px',
                  background: 'rgba(195,154,87,0.08)',
                }}
              >
                MANAS
              </span>
            </div>
          </div>
        </div>
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
            NOTHING LEAVES THE WALLS
          </div>
        </div>
        <h3
          data-reveal
          data-delay="120"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 'clamp(36px,4.5vw,64px)',
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
