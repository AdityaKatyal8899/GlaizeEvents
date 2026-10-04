'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, ArrowDownRight, Check, Sparkles, Layers, Sliders, Music, Compass, Shield, ArrowUpRight } from 'lucide-react'

const servicesData = [
  {
    num: '01',
    title: 'Luxury Weddings & Destination Nuptials',
    tagline: 'Thoughtful celebrations shaped around your story.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    desc: 'From royal destination palaces in Rajasthan to private cliffside estates, we design multi-day wedding experiences where cultural reverence meets contemporary editorial design.',
    capabilities: [
      'Multi-day ceremony architecture & spatial decor',
      'Destination venue acquisition & hotel buyouts',
      'Bespoke culinary curation & guest concierge',
      'Artist programming & ritual choreography',
      'VIP protocol, logistics & seamless transport',
    ],
  },
  {
    num: '02',
    title: 'Corporate Summits & Annual Galas',
    tagline: 'Clear ideas, considered details, seamless delivery.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
    desc: 'High-stakes executive conferences, tech product launches, and annual leadership galas requiring flawless technical precision, brand alignment, and VVIP security.',
    capabilities: [
      'Broadcast-grade stage & audio-visual engineering',
      'Keynote presentation scenography & dynamic lighting',
      'Executive networking lounges & breakout environments',
      'Seamless multi-track scheduling & run-of-show',
      'Hybrid streaming & international media facilitation',
    ],
  },
  {
    num: '03',
    title: 'Private Celebrations & VIP Soirees',
    tagline: 'Intimate gatherings with a distinct sense of place.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
    desc: 'Milestone birthdays, private estate dinners, and VIP gatherings crafted with absolute privacy, bespoke culinary concepts, and immersive atmospheric design.',
    capabilities: [
      'Custom dining scenography & tablescape curation',
      'Private mixology & Michelin-partner gastronomy',
      'Acoustic music curation & secret performances',
      'Strict privacy & non-disclosure compliance',
      'Complete home or estate spatial transformation',
    ],
  },
  {
    num: '04',
    title: 'Live Concerts & Public Productions',
    tagline: 'Energy, atmosphere and production that stays with you.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
    desc: 'Large-scale arena shows, cultural festivals, and experiential brand activations designed to handle thousands of guests with electrifying energy and safety.',
    capabilities: [
      'Heavy-duty trussing, rigging & arena staging',
      'Dynamic laser, kinetic lighting & 3D projection mapping',
      'Crowd flow architecture & emergency contingency',
      'Artist rider fulfillment & green-room hospitality',
      'Government licensing & municipal permissions',
    ],
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Discover & Align',
    desc: 'We conduct a deep discovery session to understand your vision, cultural sensibilities, acoustic requirements, and spatial footprint.',
  },
  {
    step: '02',
    title: 'Concept & Scenography',
    desc: 'Our design team develops comprehensive 3D moodboards, lighting plans, spatial floorplans, and material palettes for your sign-off.',
  },
  {
    step: '03',
    title: 'Engineering & Logistics',
    desc: 'We coordinate with vetted master vendors, conduct acoustic tuning, construct custom set elements, and formulate minute-by-minute run-of-show schedules.',
  },
  {
    step: '04',
    title: 'Flawless Execution',
    desc: 'On-site directors orchestrate every detail in real-time, ensuring an effortless, transcendent experience for you and your guests.',
  },
]

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="site-shell">
      {/* Floating Brand Wordmark */}
      <a href="/" className="floating-wordmark" aria-label="Glaize Events home">
        GLAIZE <span>EVENTS</span>
      </a>

      {/* Floating Sticky Hamburger Button */}
      <button
        ref={menuButtonRef}
        className={`floating-menu-toggle ${isScrolled ? 'is-scrolled' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
      >
        <span className="menu-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {/* Full-Screen Blurred Backdrop & Solid Drawer */}
      <div
        id="site-menu"
        className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false)
        }}
      >
        <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
          <div className="menu-panel-content">
            <p className="menu-kicker">Glaize Events / Directory</p>
            <nav aria-label="Main navigation">
              <a href="/" onClick={() => setMenuOpen(false)}><span>00</span>Home<ArrowDownRight aria-hidden="true" /></a>
              <a href="/about" onClick={() => setMenuOpen(false)}><span>01</span>About<ArrowDownRight aria-hidden="true" /></a>
              <a href="/services" onClick={() => setMenuOpen(false)}><span>02</span>Services<ArrowDownRight aria-hidden="true" /></a>
              <a href="/portfolio" onClick={() => setMenuOpen(false)}><span>03</span>Portfolio<ArrowDownRight aria-hidden="true" /></a>
              <a href="/contact" onClick={() => setMenuOpen(false)}><span>04</span>Contact<ArrowDownRight aria-hidden="true" /></a>
            </nav>
          </div>
          <div className="menu-bottom">
            <a className="menu-cta" href="/contact" onClick={() => setMenuOpen(false)}>
              Book a consultation <ArrowRight aria-hidden="true" />
            </a>
            <div className="menu-details">
              <span>Delhi / Mumbai / Worldwide</span>
              <span>hello@glaizeevents.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Hero Header (100dvh centered fold) */}
      <section className="services-hero subpage-hero" id="top">
        <div className="hero-content-wrap">
          <nav aria-label="Breadcrumb" className="site-breadcrumbs">
            <a href="/" className="crumb-link">Home</a>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Services & Production</span>
          </nav>

          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span>02</span>
            <span>What We Orchestrate</span>
          </div>

          <h1>
            <span className="hero-word-wrap">
              <span className="hero-word hero-word-first">Production with</span>
            </span>
            <br />
            <span className="hero-word-wrap">
              <em className="hero-word hero-word-second font-editorial">distinction.</em>
            </span>
          </h1>

          <p className="services-lead">
            One considered approach tailored to the scale, acoustic requirements, and <span className="font-editorial">aesthetic soul</span> of your occasion.
          </p>

          <div className="button-row hero-buttons" style={{ marginTop: '24px' }}>
            <a href="/contact" className="button button-dark hero-btn">
              Plan Your Event <ArrowRight size={13} />
            </a>
            <a href="/portfolio" className="button button-light hero-btn">
              View Portfolio <ArrowDownRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Detailed Services Deep-Dive */}
      <section className="content-section section-rule" data-reveal="section">
        <div className="services-quick-cta-banner" style={{ marginBottom: '60px' }}>
          <div className="services-quick-cta-box">
            <p className="eyebrow">Direct Commission Scheduling</p>
            <h3>Looking to schedule a <span className="font-editorial">bespoke event</span>?</h3>
            <a href="/contact" className="button button-dark" style={{ width: 'fit-content', marginTop: '12px' }}>
              Plan Your Event <ArrowRight size={13} />
            </a>
          </div>
        </div>
        <div className="detailed-services-list">
          {servicesData.map((s, index) => (
            <div key={s.num} className="detailed-service-row" data-reveal="card">
              <div className="service-row-media media-frame">
                <img src={s.image} alt={s.title} />
                <span className="service-index-badge">{s.num} / 04</span>
              </div>
              <div className="service-row-content">
                <span className="eyebrow">{s.tagline}</span>
                <h2>{s.title}</h2>
                <p className="service-main-desc">{s.desc}</p>

                <div className="service-capabilities-list">
                  <strong className="caps-title">Included Production Scope:</strong>
                  <ul>
                    {s.capabilities.map((cap) => (
                      <li key={cap}>
                        <Check size={14} className="cap-check" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="/contact" className="text-link">
                  Inquire for this category <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Phase Execution Process */}
      <section className="content-section section-rule" data-reveal="section">
        <div className="section-label">
          <span>03</span>
          <span>Execution Roadmap</span>
        </div>
        <div className="section-heading">
          <h2>From concept<br /><em className="font-editorial">to live event.</em></h2>
          <p>A rigorous, collaborative process ensuring seamless creative translation and <span className="font-editorial">calm logistics</span>.</p>
        </div>

        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.step} className="process-step">
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta content-section section-rule" data-reveal="section">
        <div className="cta-copy">
          <p className="eyebrow">04 / Get Started</p>
          <h2>Let&apos;s create something <em className="font-editorial">extraordinary.</em></h2>
          <p>Tell us about your event timeline and our directors will prepare an initial concept direction.</p>
          <a className="button button-dark" href="/contact">
            Schedule Consultation <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="cta-image media-frame">
          <img
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85"
            alt="Event decor details"
          />
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="site-footer">
        <div className="footer-brand">
          <a href="/" className="wordmark">GLAIZE <span>EVENTS</span></a>
          <p>Events with intention.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">Directory</span>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-column">
          <span className="footer-label">Connect</span>
          <a href="mailto:hello@glaizeevents.com">hello@glaizeevents.com</a>
          <a href="tel:+911123456789">+91 11 2345 6789</a>
          <a href="/contact">Book Consultation ↗</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Glaize Events</span>
          <span>Delhi / Mumbai / Worldwide</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  )
}
