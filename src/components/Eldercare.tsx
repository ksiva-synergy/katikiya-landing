import { useState } from 'react'
import { useInteractions } from '../hooks/useInteractions'

const DISPLAY = "'Bodoni Moda', serif"
const MONO = "'IBM Plex Mono', monospace"

interface EldercareProps {
  onNavigate: (path: string) => void
}

export function Eldercare({ onNavigate }: EldercareProps) {
  useInteractions()

  const [form, setForm] = useState({ name: '', facility: '', city: '', beds: '', contact: '' })
  const [submitted, setSubmitted] = useState(false)

  const setField = (key: keyof typeof form) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const features = [
    { num: 'I', title: 'Contactless fall detection', desc: 'Radar senses a fall in the bathroom or bedroom the instant it happens — no camera, no wearable required.', stat: 'Up to 80% of falls happen in the bathroom or bedroom', tag: 'Industry benchmark', tagColor: '#9FE8DC' },
    { num: 'II', title: 'Contactless vital-signs monitoring', desc: 'Breathing and heart rate tracked through the air, flagging deterioration hours before it becomes an emergency.', stat: 'Hours of advance warning before a critical event', tag: 'Peer-reviewed study', tagColor: '#EBD3A2' },
    { num: 'III', title: 'Safe wandering support', desc: 'Gentle geofencing for residents with dementia — freedom within safe boundaries, not a locked door.', stat: 'Unsupervised exits caught without confinement', tag: 'How Dwell works', tagColor: '#9A8C74' },
    { num: 'IV', title: 'Early decline detection', desc: 'Subtle shifts in movement and routine can flag infections like UTIs days before symptoms are obvious.', stat: 'Days of early warning from activity patterns', tag: 'Peer-reviewed study', tagColor: '#EBD3A2' },
    { num: 'V', title: 'Smart nurse-call coordination', desc: 'Alerts are triaged and routed to the right staff member, cutting the noise that leads to alarm fatigue.', stat: 'Meaningfully fewer false alarms per shift', tag: 'Industry benchmark', tagColor: '#9FE8DC' },
    { num: 'VI', title: 'Environmental monitoring', desc: 'The same sensor network watching air quality and humidity also tracks water and energy use across the facility.', stat: 'One platform, comfort and utility savings together', tag: 'How Dwell works', tagColor: '#9A8C74' },
    { num: 'VII', title: 'Medication management', desc: 'Dose reminders and confirmation, with real-time visibility for family members who ask.', stat: 'Zero missed doses, visible to family', tag: 'How Dwell works', tagColor: '#9A8C74' },
    { num: 'VIII', title: 'Social & cognitive engagement', desc: "Wellbeing isn't just safety — activity nudges and engagement tracking round out the picture of a good day.", stat: 'The wellbeing half of the safety story', tag: 'How Dwell works', tagColor: '#9A8C74' },
  ]

  const privacyPoints = [
    { tag: '01', title: 'No cameras in private rooms, ever', desc: 'Not a policy setting — a hardware fact. Bathrooms and bedrooms are never captured as images or video, full stop.' },
    { tag: '02', title: 'Data processed close to the source', desc: "Sensing happens on-site wherever possible, so raw signals aren't shipped further than they need to be." },
    { tag: '03', title: 'The facility owns the data', desc: 'Dwell is a custodian, not an owner. Your records stay yours, exportable and deletable on your terms.' },
    { tag: '04', title: 'Role-based access', desc: 'Staff see what they need to respond. Family sees wellbeing summaries. No one sees more than their role requires.' },
    { tag: '05', title: 'A finite retention window', desc: 'Data is kept only for a stated, limited period — a real deadline, not a vague industry norm.' },
    { tag: '06', title: 'Consent that can be withdrawn', desc: 'Residents and families opt in, and can opt out, at any time — no penalty, no friction.' },
  ]

  const audiences = [
    { label: 'FOR RESIDENTS', points: ['Privacy in the rooms that matter most', 'Freedom to move without a lens overhead', "Faster help, exactly when it's needed"] },
    { label: 'FOR FAMILIES', points: ['Peace of mind without a camera feed to watch', 'Wellbeing updates, not surveillance footage', "Confidence their parent is truly looked after"] },
    { label: 'FOR STAFF', points: ['Fewer false alarms, less alarm fatigue', 'Response-time data that backs their work', 'More time on care, less time on checks'] },
  ]

  return (
    <div style={{ background: '#0C0A07', color: '#EDE4D3', minHeight: '100vh', position: 'relative' }}>
      {/* 01 HERO */}
      <div data-screen-label="01 Hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0C0A07' }}>
        <div style={{ position: 'absolute', left: '50%', bottom: '-32vh', width: '130vw', height: '72vh', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(195,154,87,0.2) 0%, rgba(195,154,87,0.06) 42%, rgba(12,10,7,0) 70%)', animation: 'ktkGlow 11s ease-in-out infinite', pointerEvents: 'none', transform: 'translateX(-50%)' }}></div>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 48px', position: 'relative', zIndex: 2, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, cursor: 'pointer' }} onClick={() => onNavigate('/')}>
            <span style={{ fontFamily: DISPLAY, fontSize: 22, letterSpacing: '0.3em', fontWeight: 500 }}>DWELL</span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9A8C74', borderLeft: '1px solid rgba(195,154,87,0.3)', paddingLeft: 10 }}>FOR CARE HOMES</span>
          </div>
          <nav style={{ display: 'flex', gap: 'clamp(16px,3vw,36px)', flexWrap: 'wrap' }}>
            <a href="#approach" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>APPROACH</a>
            <a href="#features" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>FEATURES</a>
            <a href="#privacy" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>PRIVACY</a>
            <a href="#contact" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>CONTACT</a>
          </nav>
          <a href="#contact" data-magnet style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', color: '#0C0A07', backgroundColor: '#EBD3A2', padding: '12px 20px', borderRadius: 2 }}>TALK TO US</a>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '60px 24px 40px', position: 'relative', zIndex: 2 }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.36em', color: '#9A8C74', marginBottom: 32 }}>FOR ASSISTED-LIVING & CARE-HOME OPERATORS — SOUTH INDIA</div>
          <h1 data-reveal data-delay="120" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(48px,8.5vw,112px)', lineHeight: 1.05, margin: 0, letterSpacing: '-0.01em', maxWidth: 1100 }}>
            Safety, not<br />
            <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>surveillance.</em>
          </h1>
          <p data-reveal data-delay="260" style={{ maxWidth: 600, fontSize: 18, lineHeight: 1.75, color: '#B7A98E', margin: '38px 0 44px' }}>
            Dwell replaces cameras and panic buttons with ambient sensing that protects residents everywhere they live — including the bathroom and bedroom, where cameras can't and shouldn't go.
          </p>
          <div data-reveal data-delay="380" style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#contact" data-magnet style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.26em', color: '#0C0A07', backgroundColor: '#EBD3A2', padding: '19px 34px', borderRadius: 2, display: 'inline-block' }}>TALK TO US ABOUT YOUR FACILITY</a>
            <a href="#approach" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.22em', color: '#EBD3A2', borderBottom: '1px solid rgba(195,154,87,0.4)', paddingBottom: 6 }}>SEE HOW IT WORKS ↓</a>
          </div>
        </div>

        <div data-reveal data-delay="440" style={{ position: 'relative', zIndex: 2, padding: '0 24px 48px', display: 'flex', justifyContent: 'center', gap: 'clamp(20px,4vw,52px)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#9FE8DC', animation: 'ktkBreathe 3.2s ease-in-out infinite' }}></span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>CAMERAS</span>
            <span style={{ fontFamily: MONO, fontSize: 13, color: '#9FE8DC' }}>ZERO</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#9FE8DC', animation: 'ktkBreathe 2.6s ease-in-out infinite 0.5s' }}></span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>WEARABLES</span>
            <span style={{ fontFamily: MONO, fontSize: 13, color: '#9FE8DC' }}>NONE TO FORGET</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#9FE8DC', animation: 'ktkBreathe 3.8s ease-in-out infinite 1s' }}></span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', color: '#9A8C74' }}>PRIVATE ROOMS</span>
            <span style={{ fontFamily: MONO, fontSize: 13, color: '#9FE8DC' }}>COVERED</span>
          </div>
        </div>
      </div>

      {/* 02 THE PROBLEM */}
      <div id="why-now" data-screen-label="02 The Problem" style={{ position: 'relative', padding: '18vh 24px', backgroundColor: '#0C0A07' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 28 }}>MOVEMENT II — THE PROBLEM</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(32px,4.4vw,58px)', lineHeight: 1.2, margin: '0 0 36px' }}>CCTV and a panic button aren't a safety plan.</h2>
          <p data-reveal data-delay="200" style={{ fontSize: 17, lineHeight: 1.85, color: '#B7A98E', margin: '0 0 60px' }}>Most facilities in Bengaluru, Chennai and Hyderabad already have both. Neither one catches the moment that matters most.</p>
        </div>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)' }}>
          <div data-reveal style={{ backgroundColor: '#120E0A', padding: 36 }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 16 }}>I / PANIC BUTTONS</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>Only work if a resident is conscious, mobile, and remembers to press it. A fall rarely leaves them able to do any of the three.</p>
          </div>
          <div data-reveal data-delay="80" style={{ backgroundColor: '#120E0A', padding: 36 }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 16 }}>II / CCTV</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#9A8C74', margin: 0 }}>Covers common areas, not bathrooms or bedrooms. And a lens in a private space costs dignity — and staff trust — every day it runs.</p>
          </div>
        </div>
      </div>

      {/* 03 APPROACH */}
      <div id="approach" data-screen-label="03 Approach" style={{ position: 'relative', padding: '18vh 0', backgroundColor: '#120E0A', borderTop: '1px solid rgba(195,154,87,0.14)', borderBottom: '1px solid rgba(195,154,87,0.14)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>MOVEMENT III — SAFETY WITHOUT SURVEILLANCE</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(34px,4.6vw,64px)', lineHeight: 1.18, margin: '0 0 24px', maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
            Sensing that works through the air, <em style={{ fontStyle: 'italic', color: '#EBD3A2' }}>not through a lens.</em>
          </h2>
          <p data-reveal data-delay="200" style={{ maxWidth: 640, fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: '0 auto' }}>
            Ambient radar reads movement, breathing and falls the way a caregiver would notice them — quietly, constantly, without ever capturing an image. It works in total darkness, through steam, behind a closed bathroom door.
          </p>
        </div>

        <div className="elder-approach-grid" style={{ maxWidth: 1100, margin: '10vh auto 0', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div data-reveal style={{ backgroundColor: '#0E0B08', padding: 44, border: '1px solid rgba(195,154,87,0.14)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', color: '#6E6350', marginBottom: 24 }}>TYPICAL MONITORING</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#9A8C74', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✕</span>Camera footage, common areas only</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#9A8C74', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✕</span>Blind to bathrooms and bedrooms</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#9A8C74', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✕</span>Residents feel watched, staff feel surveilled</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#9A8C74', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>✕</span>Alerts only after someone notices the feed</div>
            </div>
          </div>
          <div data-reveal data-delay="80" style={{ backgroundColor: '#1B140C', padding: 44, border: '1px solid rgba(195,154,87,0.22)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', color: '#EBD3A2', marginBottom: 24 }}>DWELL</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#EDE4D3', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#9FE8DC' }}>✓</span>Radar sensing, every room including private ones</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#EDE4D3', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#9FE8DC' }}>✓</span>Built for the bathroom and bedroom first</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#EDE4D3', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#9FE8DC' }}>✓</span>No lens, no image, no video — ever</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#EDE4D3', paddingLeft: 24, position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#9FE8DC' }}>✓</span>Real-time alerts the moment something changes</div>
            </div>
          </div>
        </div>
      </div>

      {/* 04 FEATURES */}
      <div id="features" data-screen-label="04 Features" style={{ position: 'relative', padding: '18vh 0', backgroundColor: '#0C0A07' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>MOVEMENT IV — ONE PLATFORM, EVERY HOUR</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(36px,4.8vw,68px)', lineHeight: 1.1, margin: '0 0 12vh', maxWidth: 760 }}>What Dwell covers, room by room.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)' }}>
            {features.map((f, i) => (
              <div key={i} data-reveal data-delay={String(i * 40)} style={{ backgroundColor: '#120E0A', padding: 30, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 260 }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', color: '#6E6350' }}>{f.num}</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 21, lineHeight: 1.25, color: '#EDE4D3' }}>{f.title}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#9A8C74', margin: 0, flex: 1 }}>{f.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(195,154,87,0.14)' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#B7A98E' }}>{f.stat}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: f.tagColor, textTransform: 'uppercase' }}>{f.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 05 PRIVACY */}
      <div id="privacy" data-screen-label="05 Privacy" style={{ position: 'relative', padding: '18vh 0', backgroundColor: '#120E0A', borderTop: '1px solid rgba(195,154,87,0.14)', borderBottom: '1px solid rgba(195,154,87,0.14)' }}>
        <div className="elder-privacy-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>MOVEMENT V — PRIVACY &amp; TRUST</div>
            <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(32px,4.2vw,54px)', lineHeight: 1.2, margin: '0 0 24px' }}>Built so no one has to trust us blindly.</h2>
            <p data-reveal data-delay="180" style={{ fontSize: 16, lineHeight: 1.85, color: '#B7A98E', margin: '0 0 28px' }}>Privacy isn't a settings menu we bolted on. It's the reason ambient sensing exists in the first place.</p>
            <div data-reveal data-delay="240" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9FE8DC', border: '1px solid rgba(159,232,220,0.3)', padding: '10px 16px' }}>DPDPA 2023 — BUILT FOR IT, NOT JUST COMPLIANT WITH IT</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)' }}>
            {privacyPoints.map((p, i) => (
              <div key={i} data-reveal data-delay={String(i * 50)} style={{ backgroundColor: '#0E0B08', padding: 28 }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.24em', color: '#9FE8DC', marginBottom: 14 }}>{p.tag}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#EDE4D3', marginBottom: 8 }}>{p.title}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#9A8C74', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 06 THREE COLUMNS */}
      <div data-screen-label="06 Who It Serves" style={{ position: 'relative', padding: '18vh 24px', backgroundColor: '#0C0A07' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24, textAlign: 'center' }}>MOVEMENT VI — EVERYONE IN THE BUILDING</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(30px,4vw,50px)', margin: '0 0 10vh', textAlign: 'center' }}>Everyone in the building benefits.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, backgroundColor: 'rgba(195,154,87,0.14)', border: '1px solid rgba(195,154,87,0.14)' }}>
            {audiences.map((a, i) => (
              <div key={i} data-reveal data-delay={String(i * 80)} style={{ backgroundColor: '#120E0A', padding: 36 }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', color: '#EBD3A2', marginBottom: 20 }}>{a.label}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {a.points.map((pt, j) => (
                    <div key={j} style={{ fontSize: 14.5, lineHeight: 1.55, color: '#B7A98E', paddingLeft: 18, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#C39A57' }}>—</span>
                      {pt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 07 WHY NOW */}
      <div data-screen-label="07 Market Context" style={{ position: 'relative', padding: '16vh 24px', backgroundColor: '#120E0A', borderTop: '1px solid rgba(195,154,87,0.14)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>MOVEMENT VII — WHY NOW</div>
          <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.3, margin: '0 0 24px' }}>
            South India's senior living sector is growing fast — and most facilities are still running on CCTV and a wall-mounted button.
          </h2>
          <p data-reveal data-delay="200" style={{ fontSize: 16, lineHeight: 1.8, color: '#B7A98E', margin: 0 }}>
            Operators who move first on ambient monitoring won't just catch more falls sooner — they'll have an easier story to tell every family walking through the door.
          </p>
        </div>
      </div>

      {/* 08 CTA / CONTACT */}
      <div id="contact" data-screen-label="08 Contact" style={{ position: 'relative', padding: '18vh 24px', backgroundColor: '#0C0A07' }}>
        <div className="elder-contact-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
          <div>
            <div data-reveal style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.4em', color: '#6E6350', marginBottom: 24 }}>MOVEMENT VIII — LET'S TALK</div>
            <h2 data-reveal data-delay="100" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.2, margin: '0 0 24px' }}>Let's talk about your facility.</h2>
            <p data-reveal data-delay="180" style={{ fontSize: 16, lineHeight: 1.8, color: '#B7A98E', margin: 0 }}>Tell us a little about your facility and a member of our team will reach out to walk through fit, pricing and pilot options.</p>
          </div>
          {!submitted ? (
            <form data-reveal data-delay="150" style={{ border: '1px solid rgba(195,154,87,0.22)', backgroundColor: '#120E0A', padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: 18 }} onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: '#9A8C74' }}>YOUR NAME</label>
                  <input required value={form.name} onChange={(e) => setField('name')(e.target.value)} style={{ backgroundColor: 'transparent', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: "'Instrument Sans',sans-serif", fontSize: 15, padding: '13px 14px', outline: 'none' }} className="ktk-email" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: '#9A8C74' }}>FACILITY NAME</label>
                  <input required value={form.facility} onChange={(e) => setField('facility')(e.target.value)} style={{ backgroundColor: 'transparent', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: "'Instrument Sans',sans-serif", fontSize: 15, padding: '13px 14px', outline: 'none' }} className="ktk-email" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: '#9A8C74' }}>CITY</label>
                  <select required value={form.city} onChange={(e) => setField('city')(e.target.value)} style={{ backgroundColor: '#0C0A07', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: "'Instrument Sans',sans-serif", fontSize: 15, padding: '13px 14px', outline: 'none' }}>
                    <option value="">Select city</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: '#9A8C74' }}>NUMBER OF RESIDENTS</label>
                  <input value={form.beds} onChange={(e) => setField('beds')(e.target.value)} placeholder="e.g. 60" style={{ backgroundColor: 'transparent', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: "'Instrument Sans',sans-serif", fontSize: 15, padding: '13px 14px', outline: 'none' }} className="ktk-email" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: '#9A8C74' }}>PHONE OR EMAIL</label>
                <input required value={form.contact} onChange={(e) => setField('contact')(e.target.value)} style={{ backgroundColor: 'transparent', border: '1px solid rgba(195,154,87,0.3)', color: '#EDE4D3', fontFamily: "'Instrument Sans',sans-serif", fontSize: 15, padding: '13px 14px', outline: 'none' }} className="ktk-email" />
              </div>
              <button type="submit" data-magnet style={{ marginTop: 8, fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: '#0C0A07', backgroundColor: '#EBD3A2', padding: '17px 24px', border: 'none', cursor: 'pointer' }} className="ktk-request">REQUEST A CONVERSATION</button>
            </form>
          ) : (
            <div style={{ border: '1px solid rgba(195,154,87,0.22)', backgroundColor: '#120E0A', padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 24, color: '#EDE4D3' }}>Thank you, {form.name}.</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#9A8C74', margin: 0 }}>Someone from our team will reach out to {form.contact} shortly to talk through {form.facility}.</p>
              <button onClick={() => setSubmitted(false)} style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', color: '#C39A57', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(195,154,87,0.3)', paddingBottom: 3, cursor: 'pointer', marginTop: 12 }}>SUBMIT ANOTHER REQUEST</button>
            </div>
          )}
        </div>
      </div>

      {/* 09 FOOTER */}
      <footer data-screen-label="09 Footer" style={{ position: 'relative', padding: '60px 48px 40px', backgroundColor: '#0C0A07', borderTop: '1px solid rgba(195,154,87,0.14)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: DISPLAY, letterSpacing: '0.2em', fontSize: 16, color: '#EDE4D3' }}>DWELL</div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: '#6E6350', marginTop: 8 }}>Dwell also protects the youngest — ambient safety for childcare, on the same platform.</div>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            <a href="#approach" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9A8C74' }}>APPROACH</a>
            <a href="#features" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9A8C74' }}>FEATURES</a>
            <a href="#privacy" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9A8C74' }}>PRIVACY</a>
            <a href="#contact" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', color: '#9A8C74' }}>CONTACT</a>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: '#4E4638' }}>© MMXXVI DWELL</div>
        </div>
      </footer>
    </div>
  )
}
