'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, ArrowDownRight, Check, Sparkles, Layers, Sliders, Music, Compass, Shield, ArrowUpRight } from 'lucide-react'

import { SITE_MEDIA } from '@/lib/site-media'

const servicesData = [
  {
    num: '01',
    title: 'Event Management & Coordination',
    tagline: 'Planning, coordination, scheduling and on-ground support.',
    image: SITE_MEDIA.services.corporate.url,
    desc: 'From initial brief to final execution, we manage the full event workflow — coordinating vendors, timelines, artists and technical teams so you stay focused on your objectives.',
    capabilities: [
      'End-to-end event planning & scheduling',
      'Vendor & supplier coordination',
      'On-ground event support & crew management',
      'Run-of-show management & timing',
      'Flexible solutions for all event sizes & budgets',
    ],
  },
  {
    num: '02',
    title: 'Event Production',
    tagline: 'Sound, lighting, stage, LED and technical setup.',
    image: SITE_MEDIA.services.live.url,
    desc: 'We handle complete production setup — professional sound systems, stage lighting, LED display solutions, podiums and AV equipment coordination for events of any scale.',
    capabilities: [
      'Professional sound systems & monitoring',
      'Stage lighting & event lighting',
      'LED screens & display solutions',
      'Stage, podium & technical setup',
      'DJ consoles & music equipment',
    ],
  },
  {
    num: '03',
    title: 'Corporate & Brand Events',
    tagline: 'Professional production for conferences, launches and celebrations.',
    image: SITE_MEDIA.services.corporate.url,
    desc: 'Dependable production support for corporate conferences, brand activations, product launches, annual gatherings and employee celebrations — with clear communication throughout.',
    capabilities: [
      'Conference & product launch production',
      'Brand activation & experiential support',
      'AV setup & presentation coordination',
      'Multi-track event scheduling',
      'Vendor & crew coordination',
    ],
  },
  {
    num: '04',
    title: 'Artist Management & Entertainment',
    tagline: 'Indian & Punjabi artist sourcing, booking and event-day support.',
    image: SITE_MEDIA.services.celebration.url,
    desc: 'We coordinate Indian and Punjabi artists for events and brand requirements — from availability checks and commercial negotiation to event-day artist support and technical riders.',
    capabilities: [
      'Artist sourcing & availability coordination',
      'Commercial booking & contract support',
      'DJ & live musician coordination',
      'Event-day artist management & support',
      'Entertainment curation for all event formats',
    ],
  },
]


const processSteps = [
  {
    step: '01',
    title: 'Brief & Understand',
    desc: 'We take your event brief — date, venue, audience, budget and technical requirements — to understand the objective and build the right plan.',
  },
  {
    step: '02',
    title: 'Proposal & Planning',
    desc: 'We suggest a suitable production and entertainment setup and share a clear commercial proposal tailored to your event format and budget.',
  },
  {
    step: '03',
    title: 'Coordination',
    desc: 'Our team coordinates vendors, artists, equipment and all event-day logistics — keeping communication clear and timelines on track.',
  },
  {
    step: '04',
    title: 'On-Ground Execution',
    desc: 'We focus on smooth setup, timely coordination and professional on-ground execution — from the first truck arriving to the final handover.',
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
      <a href="/" className="floating-wordmark" aria-label="Glaiz Events home">
        <img src="/logo.png" alt="Glaiz Events" className="floating-logo" />
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
            <p className="menu-kicker">Glaiz Events / Directory</p>
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
              <span>Worldwide Production Atelier</span>
              <span>Glaizevents@gmail.com</span>
              <a href="https://www.instagram.com/glaizevents" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "11px" }}>@glaizevents ↗</a>
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
              <span className="hero-word hero-word-first">Your vision.</span>
            </span>
            <br />
            <span className="hero-word-wrap">
              <em className="hero-word hero-word-second font-editorial">Our execution.</em>
            </span>
          </h1>

          <p className="services-lead">
            One reliable partner for event management, production and entertainment — tailored to your event format, audience and <span className="font-editorial">budget.</span>
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
          <a href="/" className="wordmark">GLAIZ <span>EVENTS</span></a>
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
          <a href="mailto:Glaizevents@gmail.com">Glaizevents@gmail.com</a>
          <a href="tel:+917982067406">+91 79820 67406</a><a href="https://www.instagram.com/glaizevents" target="_blank" rel="noopener noreferrer">@glaizevents ↗</a>
          <a href="/contact">Book Consultation ↗</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Glaiz Events</span>
          <span>Worldwide Production Atelier</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  )
}
