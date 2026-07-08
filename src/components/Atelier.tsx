import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

const stageBase: CSSProperties = {
  aspectRatio: '3 / 4',
  background:
    'radial-gradient(130% 90% at 22% 6%, rgba(237,228,211,0.07) 0%, rgba(11,9,6,0) 55%), #0B0906',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: 28,
  cursor: 'pointer',
}

const contactShadow = (width: string): CSSProperties => ({
  position: 'absolute',
  left: '50%',
  bottom: '15%',
  width,
  height: 14,
  transform: 'translateX(-50%)',
  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%)',
})

const annoLine = 'rgba(195,154,87,0.4)'
const annoText: CSSProperties = { fontFamily: MONO, fontSize: 8, letterSpacing: '0.2em', color: '#9A8C74' }

function Card({
  code,
  name,
  blurb,
  children,
  delay,
  onClick,
}: {
  code: string
  name: string
  blurb: string
  children: ReactNode
  delay?: string
  onClick?: () => void
}) {
  return (
    <div
      data-reveal
      data-delay={delay}
      onClick={onClick}
      style={{ background: '#120E0A', padding: 32, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      {children}
      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 12 }}>
        {code}
      </div>
      <div style={{ fontFamily: DISPLAY, fontSize: 26, marginBottom: 10 }}>{name}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9A8C74', margin: '0 0 28px', flex: 1 }}>{blurb}</p>
      <a
        href="#the-marque"
        className="ktk-reserve"
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: '0.28em',
          color: '#C39A57',
          borderBottom: '1px solid rgba(195,154,87,0.35)',
          paddingBottom: 6,
          alignSelf: 'flex-start',
        }}
      >
        RESERVE INTEREST →
      </a>
    </div>
  )
}

function WaterInstrument({ active, onClick }: { active: boolean; onClick?: () => void }) {
  return (
    <div className={`ktk-instrument ${active ? 'active' : ''}`} data-instrument="water" style={stageBase} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      <div
        data-glow
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '80%',
          aspectRatio: '1',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(159,232,220,0.10) 0%, rgba(0,0,0,0) 60%)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-56%)', animation: 'ktkIdle 26s ease-in-out infinite' }}>
        <div
          style={{
            width: 92,
            height: 212,
            borderRadius: 46,
            background: 'linear-gradient(105deg, #2A241C 0%, #16120D 38%, #0A0806 72%, #1B160F 100%)',
            boxShadow:
              'inset 2px 6px 12px rgba(237,228,211,0.10), inset -6px -8px 18px rgba(0,0,0,0.7), 0 34px 54px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, borderRadius: 46, boxShadow: 'inset 1.5px 0 0 rgba(235,211,162,0.32), inset 0 1.5px 0 rgba(235,211,162,0.2)' }} />
          <div
            style={{
              position: 'absolute',
              left: -4,
              right: -4,
              top: '50%',
              height: 26,
              transform: 'translateY(-50%)',
              borderRadius: 13,
              background: 'linear-gradient(180deg, #E4C88E 0%, #A97F3F 34%, #6E4E22 56%, #C39A57 100%)',
              boxShadow: '0 3px 7px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,244,214,0.55)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '46%',
                height: 3,
                transform: 'translateY(-50%)',
                background: 'linear-gradient(90deg, rgba(159,232,220,0) 0%, rgba(159,232,220,0.85) 50%, rgba(159,232,220,0) 100%)',
                borderRadius: 2,
                animation: 'ktkSweep 8s cubic-bezier(.45,0,.55,1) infinite',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 26,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: '#9FE8DC',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 8px rgba(159,232,220,0.7)',
              animation: 'ktkBreathe 5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      <div style={contactShadow('64%')} />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '3%',
          width: '24%',
          height: '11%',
          transform: 'translateX(-50%) scaleY(-1)',
          background: 'linear-gradient(180deg, rgba(237,228,211,0.06) 0%, rgba(0,0,0,0) 75%)',
          borderRadius: 46,
          filter: 'blur(5px)',
        }}
      />
      <div data-anno-el style={{ position: 'absolute', left: '16%', top: '17%', right: '14%', bottom: '24%', opacity: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: annoLine }} />
        <div style={{ position: 'absolute', left: -4, top: 0, width: 9, height: 1, background: annoLine }} />
        <div style={{ position: 'absolute', left: -4, bottom: 0, width: 9, height: 1, background: annoLine }} />
        <div style={{ position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)', writingMode: 'vertical-rl', ...annoText }}>
          212 MM
        </div>
        <div style={{ position: 'absolute', right: '-2%', top: '44%', width: '16%', height: 1, background: annoLine }} />
        <div style={{ position: 'absolute', right: '-4%', top: '47%', textAlign: 'right', lineHeight: 2, ...annoText }}>
          FLOW CORE
          <br />
          <span style={{ color: '#6E6350' }}>BRASS COLLAR / NO LENS</span>
        </div>
      </div>
    </div>
  )
}

function EnergyInstrument({ active, onClick }: { active: boolean; onClick?: () => void }) {
  return (
    <div className={`ktk-instrument ${active ? 'active' : ''}`} data-instrument="energy" style={stageBase} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      <div
        data-glow
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '85%',
          aspectRatio: '1',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(224,164,80,0.11) 0%, rgba(0,0,0,0) 60%)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-56%)', animation: 'ktkIdle 32s ease-in-out infinite' }}>
        <div style={{ width: 190, height: 110, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 30,
              width: 182,
              height: 66,
              transform: 'translateX(-50%)',
              borderRadius: '0 0 91px 91px / 0 0 36px 36px',
              background:
                'repeating-linear-gradient(90deg, rgba(237,228,211,0.055) 0px, rgba(237,228,211,0.055) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 6px), linear-gradient(105deg, #241D14 0%, #120E09 45%, #090705 82%)',
              boxShadow: 'inset 1.5px 0 0 rgba(235,211,162,0.2), 0 32px 48px rgba(0,0,0,0.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: 182,
              height: 60,
              transform: 'translateX(-50%)',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at 34% 28%, #2C2118 0%, #14100B 58%, #0A0806 100%)',
              boxShadow: 'inset 1px 2px 3px rgba(235,211,162,0.18)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 150, height: 150, transform: 'translate(-50%,-50%) scaleY(0.34)' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, rgba(224,164,80,0.85) 0deg 52deg, rgba(224,164,80,0) 62deg 360deg)',
                  WebkitMask: 'radial-gradient(circle, transparent 60%, black 63%, black 74%, transparent 77%)',
                  mask: 'radial-gradient(circle, transparent 60%, black 63%, black 74%, transparent 77%)',
                  animation: 'ktkArc 36s linear infinite',
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 7,
                height: 7,
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: '#E0A450',
                boxShadow: '0 0 12px rgba(224,164,80,0.8)',
                animation: 'ktkBreathe 6s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
      <div style={contactShadow('70%')} />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '4%',
          width: '46%',
          height: '9%',
          transform: 'translateX(-50%) scaleY(-1)',
          background: 'linear-gradient(180deg, rgba(237,228,211,0.05) 0%, rgba(0,0,0,0) 75%)',
          borderRadius: '50%',
          filter: 'blur(5px)',
        }}
      />
      <div data-anno-el style={{ position: 'absolute', left: '14%', top: '30%', right: '14%', bottom: '30%', opacity: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-6%', height: 1, background: annoLine }} />
        <div style={{ position: 'absolute', left: 0, bottom: '-6%', marginBottom: -4, width: 1, height: 9, background: annoLine }} />
        <div style={{ position: 'absolute', right: 0, bottom: '-6%', marginBottom: -4, width: 1, height: 9, background: annoLine }} />
        <div style={{ position: 'absolute', left: '50%', bottom: '-16%', transform: 'translateX(-50%)', ...annoText }}>Ø 182 MM</div>
        <div style={{ position: 'absolute', right: '-2%', top: '2%', width: '14%', height: 1, background: annoLine }} />
        <div style={{ position: 'absolute', right: '-4%', top: '5%', textAlign: 'right', lineHeight: 2, ...annoText }}>
          CHARGE DIAL
          <br />
          <span style={{ color: '#6E6350' }}>RADIAL FIN ARRAY</span>
        </div>
      </div>
    </div>
  )
}

function PresenceInstrument({ active, onClick }: { active: boolean; onClick?: () => void }) {
  return (
    <div className={`ktk-instrument ${active ? 'active' : ''}`} data-instrument="presence" style={stageBase} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
      <div
        data-glow
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          width: '75%',
          aspectRatio: '1',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(159,232,220,0.09) 0%, rgba(0,0,0,0) 60%)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-56%)', animation: 'ktkIdle 28s ease-in-out infinite' }}>
        <div
          style={{
            width: 152,
            height: 82,
            borderRadius: '152px 152px 8px 8px',
            background: 'radial-gradient(130% 170% at 32% 16%, #2B241B 0%, #15100B 55%, #0A0806 100%)',
            boxShadow:
              'inset 1.5px 2px 3px rgba(235,211,162,0.16), inset -4px -4px 12px rgba(0,0,0,0.65), 0 30px 48px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, borderRadius: '152px 152px 8px 8px', boxShadow: 'inset 1px 1px 0 rgba(235,211,162,0.26)' }} />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              width: 48,
              height: 48,
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(159,232,220,0.45) 0%, rgba(159,232,220,0) 64%)',
              animation: 'ktkBreathe 7s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      <div style={contactShadow('58%')} />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '5%',
          width: '38%',
          height: '8%',
          transform: 'translateX(-50%) scaleY(-1)',
          background: 'linear-gradient(180deg, rgba(237,228,211,0.05) 0%, rgba(0,0,0,0) 75%)',
          borderRadius: '50%',
          filter: 'blur(5px)',
        }}
      />
      <div data-anno-el style={{ position: 'absolute', left: '16%', top: '32%', right: '16%', bottom: '32%', opacity: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-8%', height: 1, background: annoLine }} />
        <div style={{ position: 'absolute', left: 0, bottom: '-8%', marginBottom: -4, width: 1, height: 9, background: annoLine }} />
        <div style={{ position: 'absolute', right: 0, bottom: '-8%', marginBottom: -4, width: 1, height: 9, background: annoLine }} />
        <div style={{ position: 'absolute', left: '50%', bottom: '-19%', transform: 'translateX(-50%)', ...annoText }}>Ø 152 MM</div>
        <div style={{ position: 'absolute', right: '-2%', top: '6%', width: '14%', height: 1, background: annoLine }} />
        <div style={{ position: 'absolute', right: '-4%', top: '9%', textAlign: 'right', lineHeight: 2, ...annoText }}>
          PRESENCE DOME
          <br />
          <span style={{ color: '#6E6350' }}>NO LENS / NO MIC</span>
        </div>
      </div>
    </div>
  )
}

export function Atelier() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      data-screen-label="04 The Atelier"
      style={{
        position: 'relative',
        padding: '20vh 0',
        background: '#120E0A',
        borderTop: '1px solid rgba(195,154,87,0.14)',
        borderBottom: '1px solid rgba(195,154,87,0.14)',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }} className="ktk-pad">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: '12vh',
          }}
        >
          <div>
            <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.42em', color: '#6E6350', marginBottom: 28 }}>
              MOVEMENT IV — THE ATELIER
            </div>
            <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(34px,5.5vw,84px)', lineHeight: 1.08, margin: 0 }}>
              Collection I
            </h2>
          </div>
          <div data-reveal data-delay="200" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', color: '#9A8C74', lineHeight: 2, textAlign: 'right' }}>
            THREE INSTRUMENTS.
            <br />
            MADE IN SMALL NUMBERS.
          </div>
        </div>

        <div className="ktk-atelier-grid">
          <Card
            code="I / FLOW"
            name="The Flow Sense"
            blurb="Your home feels every drop and every watt."
            onClick={() => handleToggle('water')}
          >
            <WaterInstrument active={activeId === 'water'} onClick={() => handleToggle('water')} />
          </Card>
          <Card
            code="II / SONAR"
            name="The Sonar Sense"
            blurb="Precision location for everything you own."
            delay="120"
            onClick={() => handleToggle('energy')}
          >
            <EnergyInstrument active={activeId === 'energy'} onClick={() => handleToggle('energy')} />
          </Card>
          <Card
            code="III / PRESENCE"
            name="The Presence Sense"
            blurb="The rhythm of the rooms, kept without cameras."
            delay="240"
            onClick={() => handleToggle('presence')}
          >
            <PresenceInstrument active={activeId === 'presence'} onClick={() => handleToggle('presence')} />
          </Card>
        </div>

        <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', color: '#6E6350', marginTop: 32, textAlign: 'center' }}>
          NO CHECKOUT. NO CART. THE COLLECTION OPENS TO THE FOUNDING CIRCLE FIRST.
        </div>
      </div>
    </section>
  )
}
