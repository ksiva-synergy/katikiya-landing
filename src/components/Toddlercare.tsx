import { useState } from 'react'
import { useInteractions } from '../hooks/useInteractions'

const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

interface ToddlercareProps {
  onNavigate: (path: string) => void
}

export function Toddlercare({ onNavigate }: ToddlercareProps) {
  useInteractions()

  const [form, setForm] = useState({ name: '', city: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  // Room Simulator State
  const [rooms, setRooms] = useState([
    { id: 0, name: 'Nap & Rest Room', locked: true, mode: 'sensor' },
    { id: 1, name: 'Diapering / Restroom', locked: true, mode: 'sensor' },
    { id: 2, name: 'Toddler Classroom', locked: false, mode: 'both' },
    { id: 3, name: 'Entrance & Foyer', locked: false, mode: 'both' },
    { id: 4, name: 'Outdoor Play Yard', locked: false, mode: 'sensor' }
  ])
  const [viewingPreset, setViewingPreset] = useState(0)

  const presetLabels = ['7:00 AM – 6:30 PM', '6:30 AM – 8:00 PM', 'CLOSED — SENSORS ONLY']

  const toggleRoom = (id: number) => {
    setRooms((prevRooms) =>
      prevRooms.map((r) =>
        r.id === id && !r.locked ? { ...r, mode: r.mode === 'both' ? 'sensor' : 'both' } : r
      )
    )
  }

  const handleCohortSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const accentColor = '#EBD3A2'

  return (
    <div style={{ background: '#0C0A07', color: '#EDE4D3', minHeight: '100vh', position: 'relative' }}>
      {/* HERO */}
      <div data-screen-label="01 Hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0C0A07' }}>
        <div style={{ position: 'absolute', left: '50%', bottom: '-32vh', width: '130vw', height: '72vh', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(195,154,87,0.2) 0%, rgba(195,154,87,0.06) 42%, rgba(12,10,7,0) 70%)', animation: 'ktkGlow 11s ease-in-out infinite', pointerEvents: 'none', transform: 'translateX(-50%)' }}></div>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 48px', position: 'relative', zIndex: 2, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, cursor: 'pointer' }} onClick={() => onNavigate('/')}>
            <span style={{ fontFamily: DISPLAY, fontSize: 22, letterSpacing: '0.3em', fontWeight: 500 }}>DWELL</span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9A8C74', borderLeft: '1px solid rgba(195,154,87,0.3)', paddingLeft: 10 }}>FOR DAYCARES</span>
          </div>
          <nav style={{ display: 'flex', gap: 'clamp(16px,3vw,36px)', flexWrap: 'wrap' }}>
            <a href="#why-now" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>WHY NOW</a>
            <a href="#the-system" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>THE SYSTEM</a>
            <a href="#trust" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>TRUST &amp; COMPLIANCE</a>
            <a href="#pricing" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>PRICING</a>
          </nav>
          <a href="#founding" data-magnet style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#0C0A07', backgroundColor: accentColor, padding: '12px 20px', borderRadius: 2 }}>BOOK A WALKTHROUGH</a>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 24px 40px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.38em', color: '#9A8C74', marginBottom: 32 }}>FOR DAYCARE &amp; PLAYSCHOOL OWNERS — SOUTH INDIA</div>
          <h1 data-reveal data-delay="120" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(48px,8.5vw,116px)', lineHeight: 1.05, margin: 0, letterSpacing: '-0.01em', maxWidth: 1100 }}>
            Monitoring,<br />
            not <em style={{ fontStyle: 'italic', color: accentColor }}>surveillance.</em>
          </h1>
          <p data-reveal data-delay="260" style={{ maxWidth: 600, fontSize: 18, lineHeight: 1.75, color: '#B7A98E', margin: '38px 0 44px' }}>
            Turn the safety spotlight now on daycares into an enrollment advantage — without turning your centre into a fishbowl. Camera-free sensing where it matters most, consent-gated viewing where parents want it, and the compliance work already done.
          </p>
          <div data-reveal data-delay="380" style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#founding" data-magnet style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', color: '#0C0A07', backgroundColor: accentColor, padding: '19px 34px', borderRadius: 2, display: 'inline-block' }}>BOOK A WALKTHROUGH</a>
            <a href="#the-system" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: '#EBD3A2', borderBottom: '1px solid rgba(195,154,87,0.4)', paddingBottom: 6 }}>SEE HOW IT WORKS ↓</a>
          </div>
        </div>

        <div data-reveal data-delay="440" style={{ position: 'relative', zIndex: 2, padding: '0 0 40px', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 9, letterSpacing: '0.32em', color: '#6E6350', marginBottom: 18 }}>NOW ONBOARDING FOUNDING CENTRES ACROSS</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(20px,4vw,48px)', flexWrap: 'wrap', padding: '0 24px' }}>
            {['CHENNAI', 'BENGALURU', 'KOCHI', 'HYDERABAD', 'THIRUVANANTHAPURAM', 'VISAKHAPATNAM', 'COIMBATORE'].map((city) => (
              <span key={city} style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.16em', color: '#9FE8DC' }}>{city}</span>
            ))}
          </div>
        </div>
      </div>

      {/* WHY NOW */}
      <div id="why-now" data-screen-label="02 Why Now" style={{ position: 'relative', padding: '18vh 24px 16vh', backgroundColor: '#0C0A07' }}>
        <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 28 }}>THE MOMENT — WHY NOW</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.25, margin: '0 0 36px' }}>The rules are catching up to what parents already expect.</h2>
          <p data-reveal data-delay="200" style={{ fontSize: 17, lineHeight: 1.9, color: '#B7A98E', margin: '0 0 24px', textAlign: 'left' }}>
            A high-profile abuse case at a Bengaluru daycare this June pushed Karnataka's child rights commission to start drafting a Standard Operating Procedure that would require CCTV with live parent access at every centre in the state. Whatever the final shape of that SOP, the direction is clear — and every owner across Chennai, Bengaluru, Kochi, Hyderabad, Thiruvananthapuram, Visakhapatnam and Coimbatore already feels it.
          </p>
          <p data-reveal data-delay="260" style={{ fontSize: 17, lineHeight: 1.9, color: '#B7A98E', margin: '0 0 24px', textAlign: 'left' }}>
            Right now the choices are blunt. Generic CCTV resellers install lenses with no safety intelligence behind them. Attendance apps bolt a camera feed on as an afterthought. Neither was built for what you actually need: a way to show parents you take their trust seriously, without turning every nap room into a live broadcast your staff have to perform for all day.
          </p>
          <p data-reveal data-delay="320" style={{ fontSize: 17, lineHeight: 1.9, color: '#EBD3A2', margin: 0, textAlign: 'left', fontStyle: 'italic' }}>
            The centres that get ahead of this decide how transparency shows up in their rooms. The ones that wait have it decided for them.
          </p>
        </div>
      </div>

      {/* THE SYSTEM */}
      <div id="the-system" data-screen-label="03 The Layered System" style={{ position: 'relative', padding: '16vh 0 14vh', backgroundColor: '#120E0A', borderTop: '1px solid rgba(195,154,87,0.14)', borderBottom: '1px solid rgba(195,154,87,0.14)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>THE SYSTEM — ONE LAYERED PLATFORM</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(38px,5vw,72px)', lineHeight: 1.1, margin: '0 0 24px', maxWidth: 820 }}>
            Six signals.<br />
            <em style={{ fontStyle: 'italic', color: accentColor }}>One dashboard.</em>
          </h2>
          <p data-reveal data-delay="180" style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.8, color: '#B7A98E', margin: 0 }}>
            Cameras where they help. Sensors where they don't. You choose the mix, room by room.
          </p>
        </div>

        <div className="toddler-signals-grid" style={{ maxWidth: 1240, margin: '9vh auto 0', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)' }}>
          {/* I */}
          <div data-reveal style={{ backgroundColor: '#120E0A', padding: 36, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: 76, height: 76, marginBottom: 28 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(195,154,87,0.3)' }}></div>
              <div style={{ position: 'absolute', inset: 14, borderRadius: '50%', border: '1px solid rgba(159,232,220,0.35)' }}></div>
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#9FE8DC', transform: 'translate(-50%,-50%)', animation: 'ktkBreathe 4s ease-in-out infinite' }}></div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 12 }}>I / NAP &amp; REST</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 25, lineHeight: 1.3, marginBottom: 12 }}>Rest-area safety, without a camera in the room.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>
              Motion and breathing sensing (the same approach proven across tens of thousands of Japanese daycare classrooms) alerts staff the moment a child stops moving or settles into an unsafe position — no lens pointed at sleeping toddlers, ever.
            </p>
          </div>

          {/* II */}
          <div data-reveal data-delay="60" style={{ backgroundColor: '#120E0A', padding: 36, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: 76, height: 76, marginBottom: 28 }}>
              <div style={{ position: 'absolute', left: '50%', top: 8, width: 34, height: 22, border: '2px solid rgba(195,154,87,0.5)', borderBottom: 'none', borderRadius: '17px 17px 0 0', transform: 'translateX(-50%)' }}></div>
              <div style={{ position: 'absolute', left: '50%', top: 26, width: 52, height: 38, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.4)', borderRadius: 4, transform: 'translateX(-50%)' }}></div>
              <div style={{ position: 'absolute', left: '50%', top: 44, width: 6, height: 6, borderRadius: '50%', backgroundColor: '#EBD3A2', transform: 'translateX(-50%)' }}></div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 12 }}>II / LIVE VIEWING</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 25, lineHeight: 1.3, marginBottom: 12 }}>Parent viewing, gated by consent — on your terms.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>
              Not an always-open feed. You set the viewing hours, video is video-only with no audio, parents can't screenshot or download, every view is logged, and nothing is archived past the retention window you choose.
            </p>
          </div>

          {/* III */}
          <div data-reveal data-delay="120" style={{ backgroundColor: '#120E0A', padding: 36, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: 76, height: 76, marginBottom: 28 }}>
              <div style={{ position: 'absolute', left: 12, top: 12, width: 14, height: 14, borderRadius: '50%', backgroundColor: 'rgba(159,232,220,0.5)' }}></div>
              <div style={{ position: 'absolute', right: 12, top: 12, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgba(195,154,87,0.4)' }}></div>
              <div style={{ position: 'absolute', left: 12, bottom: 12, width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgba(195,154,87,0.3)' }}></div>
              <div style={{ position: 'absolute', right: 14, bottom: 16, width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(159,232,220,0.35)' }}></div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 12 }}>III / ENVIRONMENT</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 25, lineHeight: 1.3, marginBottom: 12 }}>Problems caught before they become incidents.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>
              Air quality (CO₂, PM2.5), temperature, water safety and door/entry sensors run quietly in the background — invisible to children and parents, but a real upgrade to your safety and liability position.
            </p>
          </div>

          {/* IV */}
          <div data-reveal style={{ backgroundColor: '#120E0A', padding: 36, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: 76, height: 76, marginBottom: 28 }}>
              <div style={{ position: 'absolute', left: 14, top: 16, width: 16, height: 16, borderRadius: '50%', backgroundColor: '#E0A450' }}></div>
              <div style={{ position: 'absolute', left: 9, top: 11, width: 26, height: 26, borderRadius: '50%', border: '1px dashed rgba(224,164,80,0.5)' }}></div>
              <div style={{ position: 'absolute', right: 14, bottom: 14, width: 14, height: 14, borderRadius: '50%', border: '1px solid rgba(195,154,87,0.4)' }}></div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 12 }}>IV / RATIO &amp; SUPERVISION</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 25, lineHeight: 1.3, marginBottom: 12 }}>The one alert that matters most, in real time.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>
              An instant alert if a room has children present but no staff member with them, plus continuous staff-to-child ratio tracking you can hand a licensing inspector without scrambling for a spreadsheet.
            </p>
          </div>

          {/* V */}
          <div data-reveal data-delay="60" style={{ backgroundColor: '#120E0A', padding: 36, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: 76, height: 76, marginBottom: 28 }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 22, height: 22, borderRadius: '50%', backgroundColor: accentColor, transform: 'translate(-50%,-50%)' }}></div>
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 22, height: 22, borderRadius: '50%', border: `1px solid ${accentColor}`, transform: 'translate(-50%,-50%)', animation: 'dwPulseRing 2.4s ease-out infinite' }}></div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 12 }}>V / PANIC BUTTON</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 25, lineHeight: 1.3, marginBottom: 12 }}>One press, precisely located, instantly escalated.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>
              Staff trigger a panic alert for a medical or security emergency and it reaches the right people — on-site leads, your emergency contacts — with the exact room attached, no fumbling for a phone number.
            </p>
          </div>

          {/* VI */}
          <div data-reveal data-delay="120" style={{ backgroundColor: '#120E0A', padding: 36, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: 76, height: 76, marginBottom: 28 }}>
              <div style={{ position: 'absolute', left: 22, top: 10, width: 32, height: 44, border: '1px solid rgba(195,154,87,0.4)', borderRadius: 2 }}></div>
              <div style={{ position: 'absolute', left: 28, top: 20, width: 20, height: 2, backgroundColor: 'rgba(195,154,87,0.35)' }}></div>
              <div style={{ position: 'absolute', left: 28, top: 28, width: 20, height: 2, backgroundColor: 'rgba(195,154,87,0.35)' }}></div>
              <div style={{ position: 'absolute', left: 28, top: 36, width: 12, height: 2, backgroundColor: 'rgba(195,154,87,0.35)' }}></div>
              <div style={{ position: 'absolute', left: 24, top: 46, width: 14, height: 8, borderLeft: '2px solid #9FE8DC', borderBottom: '2px solid #9FE8DC', transform: 'rotate(-45deg)' }}></div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 12 }}>VI / COMPLIANCE</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 25, lineHeight: 1.3, marginBottom: 12 }}>Built in, not bolted on.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>
              Consent capture, data minimization, defined retention windows, encryption and audit logs — designed around DPDPA 2023 and the 2025 Rules for children's data, so you're never explaining your setup to a worried parent or a regulator alone.
            </p>
          </div>
        </div>
      </div>

      {/* OWNER CONTROL */}
      <div data-screen-label="04 Owner Control" style={{ position: 'relative', padding: '18vh 24px', backgroundColor: '#0C0A07' }}>
        <div className="toddler-control-grid" style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(48px,7vw,100px)', alignItems: 'center' }}>
          <div>
            <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>HOW IT RUNS — YOU DECIDE</div>
            <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(34px,4vw,54px)', lineHeight: 1.18, margin: '0 0 28px' }}>Built for how your centre already runs.</h2>
            <p data-reveal data-delay="180" style={{ fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: '0 0 20px', maxWidth: 440 }}>
              Which rooms carry a camera, which stay sensor-only, and when parents can watch — every setting stays with you, not with us or with a blanket policy.
            </p>
            <p data-reveal data-delay="240" style={{ fontSize: 14, lineHeight: 1.8, color: '#6E6350', margin: 0, maxWidth: 440 }}>
              Try the room settings — nap and diapering areas stay locked to camera-free sensing by design.
            </p>
          </div>
          <div data-reveal data-delay="120" style={{ border: '1px solid rgba(195,154,87,0.2)', backgroundColor: '#120E0A', padding: 'clamp(24px,3vw,40px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', color: '#9A8C74' }}>ROOM SETTINGS</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[0, 1, 2].map((i) => (
                  <button key={i} onClick={() => setViewingPreset(i)} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', padding: '8px 12px', borderRadius: 2, cursor: 'pointer', backgroundColor: viewingPreset === i ? accentColor : 'transparent', color: viewingPreset === i ? '#0C0A07' : '#9A8C74', border: '1px solid rgba(195,154,87,0.3)', transition: 'all 0.3s' }}>
                    {i === 0 ? 'SCHOOL HOURS' : i === 1 ? 'FULL DAY' : 'VIEWING OFF'}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: '#9FE8DC', marginBottom: 24 }}>LIVE VIEWING WINDOW — {presetLabels[viewingPreset]}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)' }}>
              {rooms.map((room) => {
                // Toggling room setting simulation
                const on = room.mode === 'both' && viewingPreset !== 2; // if viewing off is selected, force camera stream display as off
                const modeLabel = room.locked
                  ? 'LOCKED — SENSOR ONLY'
                  : viewingPreset === 2
                    ? 'CLOSED — SENSORS ONLY'
                    : on
                      ? 'CAMERA + SENSORS'
                      : 'SENSORS ONLY';
                const labelColor = room.locked ? '#6E6350' : (on && viewingPreset !== 2 ? '#9FE8DC' : '#9A8C74');
                const cursor = room.locked || viewingPreset === 2 ? 'not-allowed' : 'pointer';
                const opacity = room.locked || viewingPreset === 2 ? 0.5 : 1;
                const trackColor = on && viewingPreset !== 2 ? 'rgba(159,232,220,0.28)' : 'rgba(154,140,116,0.16)';
                const knobLeft = on && viewingPreset !== 2 ? '26px' : '2px';

                return (
                  <div key={room.id} style={{ backgroundColor: '#0E0B08', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: 14, color: '#EDE4D3', marginBottom: 3 }}>{room.name}</div>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.16em', color: labelColor }}>{modeLabel}</div>
                    </div>
                    <button onClick={() => toggleRoom(room.id)} disabled={room.locked || viewingPreset === 2} style={{ width: 52, height: 28, borderRadius: 14, border: '1px solid rgba(195,154,87,0.35)', backgroundColor: trackColor, position: 'relative', cursor: cursor, opacity: opacity, flexShrink: 0, outline: 'none' }}>
                      <span style={{ position: 'absolute', top: 2, left: knobLeft, width: 22, height: 22, borderRadius: '50%', backgroundColor: '#EDE4D3', transition: 'left .25s' }}></span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* TRUST AND COMPLIANCE */}
      <div id="trust" data-screen-label="05 Trust and Compliance" style={{ position: 'relative', padding: '18vh 0', backgroundColor: '#120E0A', borderTop: '1px solid rgba(195,154,87,0.14)', borderBottom: '1px solid rgba(195,154,87,0.14)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ maxWidth: 640, marginBottom: '9vh' }}>
            <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>TRUST &amp; COMPLIANCE</div>
            <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(34px,4.4vw,58px)', lineHeight: 1.18, margin: '0 0 24px' }}>The compliance work, done before you need it.</h2>
            <p data-reveal data-delay="180" style={{ fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: 0 }}>Every promise below is plain-language and DPDPA-ready — so when a parent or a regulator asks, you already have the answer.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)' }}>
            <div data-reveal style={{ backgroundColor: '#120E0A', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9FE8DC', marginBottom: 12 }}>VERIFIABLE CONSENT</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>Every parent explicitly opts in before viewing access opens — no default-on cameras, ever.</p>
            </div>
            <div data-reveal data-delay="60" style={{ backgroundColor: '#120E0A', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9FE8DC', marginBottom: 12 }}>DATA MINIMIZATION</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>We collect what keeps children safe and nothing else — no behavioral profiling, no tracking.</p>
            </div>
            <div data-reveal data-delay="120" style={{ backgroundColor: '#120E0A', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9FE8DC', marginBottom: 12 }}>DEFINED RETENTION</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>A stated retention window, set by you — footage and sensor logs don't live anywhere forever.</p>
            </div>
            <div data-reveal style={{ backgroundColor: '#120E0A', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9FE8DC', marginBottom: 12 }}>ENCRYPTION THROUGHOUT</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>Streams and stored data are encrypted end to end, on-site and in transit.</p>
            </div>
            <div data-reveal data-delay="60" style={{ backgroundColor: '#120E0A', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9FE8DC', marginBottom: 12 }}>AUDIT LOGS</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>Every view, export and access attempt is logged and available to you, in full.</p>
            </div>
            <div data-reveal data-delay="120" style={{ backgroundColor: '#120E0A', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9FE8DC', marginBottom: 12 }}>NO ADS. NO DATA SALE.</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>A child's data is never monetized, shared, or used to target anyone, ever.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOUNDING COHORT */}
      <div id="founding" data-screen-label="06 Founding Cohort" style={{ position: 'relative', padding: '20vh 0', backgroundColor: '#0C0A07' }}>
        <div className="toddler-cohort-grid" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'clamp(48px,8vw,120px)', alignItems: 'start' }}>
          <div>
            <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>SOCIAL PROOF — HONESTLY, EARLY</div>
            <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(34px,4.4vw,58px)', lineHeight: 1.2, margin: '0 0 28px' }}>Early, and building in the open.</h2>
            <p data-reveal data-delay="180" style={{ fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: '0 0 20px', maxWidth: 460 }}>
              Dwell is now onboarding its first founding partner centres across Chennai, Bengaluru, Kochi, Hyderabad, Thiruvananthapuram, Visakhapatnam and Coimbatore. No inflated centre counts, no invented testimonials — just an open build process with the owners who join first.
            </p>
            <p data-reveal data-delay="240" style={{ fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: 0, maxWidth: 460 }}>
              Founding partners help shape the room-by-room defaults, get priority installation, and lock in founding pricing ahead of general availability.
            </p>
          </div>
          <div data-reveal data-delay="150" style={{ border: '1px solid rgba(195,154,87,0.22)', padding: 'clamp(32px,4vw,52px)', backgroundColor: '#120E0A' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.34em', color: '#C39A57', marginBottom: 20 }}>FOUNDING PARTNER COHORT</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(22px,2.2vw,30px)', lineHeight: 1.35, marginBottom: 16 }}>A handful of centres will shape how this works.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A8C74', margin: '0 0 32px' }}>Tell us a little about your centre. We'll set up a walkthrough — no obligation, no hard sell.</p>
            {!submitted ? (
              <form style={{ display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={handleCohortSubmit}>
                <input required type="text" placeholder="Centre name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ backgroundColor: 'transparent', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: MONO, fontSize: 13, letterSpacing: '0.04em', padding: '16px 18px', outline: 'none' }} className="ktk-email" />
                <input required type="text" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={{ backgroundColor: 'transparent', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: MONO, fontSize: 13, letterSpacing: '0.04em', padding: '16px 18px', outline: 'none' }} className="ktk-email" />
                <input required type="email" placeholder="your@centre.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ backgroundColor: 'transparent', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: MONO, fontSize: 13, letterSpacing: '0.04em', padding: '16px 18px', outline: 'none' }} className="ktk-email" />
                <button type="submit" data-magnet style={{ backgroundColor: accentColor, color: '#0C0A07', border: 'none', fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', padding: 18, cursor: 'pointer' }} className="ktk-request">BOOK A WALKTHROUGH</button>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 24, color: '#EDE4D3' }}>Thank you!</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>We have received the inquiry for {form.name} in {form.city}. We will reach out to {form.email} shortly.</p>
                <button onClick={() => setSubmitted(false)} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: '#C39A57', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(195,154,87,0.3)', paddingBottom: 3, cursor: 'pointer', marginTop: 12 }}>SUBMIT ANOTHER INQUIRY</button>
              </div>
            )}
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.22em', color: '#6E6350', marginTop: 20 }}>PRICING SHARED ON THE CALL. NO OBLIGATION.</div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" data-screen-label="07 Pricing" style={{ position: 'relative', padding: '18vh 24px', textAlign: 'center', backgroundColor: '#120E0A', borderTop: '1px solid rgba(195,154,87,0.14)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 28 }}>PRICING — SIMPLE BY DESIGN</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(32px,4.4vw,58px)', lineHeight: 1.2, margin: '0 0 20px' }}>One number, per child, per month.</h2>
          <p data-reveal data-delay="180" style={{ fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: '0 0 8vh', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>No enterprise quotes. No hidden tiers. Final pricing depends on your centre's rooms and room mix — we'll walk through it together.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)', textAlign: 'left' }}>
            <div data-reveal style={{ backgroundColor: '#0E0B08', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#6E6350', marginBottom: 14 }}>STRUCTURE</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 22 }}>₹ per child, per month</div>
            </div>
            <div data-reveal data-delay="60" style={{ backgroundColor: '#0E0B08', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#6E6350', marginBottom: 14 }}>INSTALLATION</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 22 }}>Included, on-site</div>
            </div>
            <div data-reveal data-delay="120" style={{ backgroundColor: '#0E0B08', padding: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#6E6350', marginBottom: 14 }}>EXACT NUMBER</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 22 }}>Shared on your walkthrough call</div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA & FOOTER */}
      <div data-screen-label="08 Final CTA and Footer" style={{ position: 'relative', padding: '20vh 24px 60px', textAlign: 'center', backgroundColor: '#0C0A07', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '-30vh', width: '110vw', height: '60vh', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(195,154,87,0.1) 0%, rgba(12,10,7,0) 65%)', transform: 'translateX(-50%)', pointerEvents: 'none' }}></div>
        <div data-reveal style={{ fontFamily: DISPLAY, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1.25, fontWeight: 400, position: 'relative', maxWidth: 760, margin: '0 auto' }}>Your centre already keeps children safe.<br />Let's help you <em style={{ fontStyle: 'italic', color: accentColor }}>show</em> it.</div>
        <div data-reveal data-delay="160" style={{ marginTop: 56 }}>
          <a href="#founding" data-magnet style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', color: '#0C0A07', backgroundColor: accentColor, padding: '20px 38px', borderRadius: 2, display: 'inline-block' }}>BOOK A WALKTHROUGH</a>
        </div>
        <div data-reveal data-delay="260" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px,4vw,56px)', marginTop: 80, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 20, letterSpacing: '0.28em' }}>DWELL</div>
          <a href="#why-now" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>WHY NOW</a>
          <a href="#the-system" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>THE SYSTEM</a>
          <a href="#trust" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>TRUST</a>
          <a href="#pricing" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>PRICING</a>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: '#4E4638', marginTop: 56 }}>Dwell is built by Katikiya. · © MMXXVI</div>
      </div>
    </div>
  )
}
