'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, ArrowDownRight, MapPin, Sparkles, Award, Users, ShieldCheck, HeartHandshake, ArrowUpRight } from 'lucide-react'

import { SITE_MEDIA } from '@/lib/site-media'

const principles = [
  {
    num: '01',
    title: 'Understand Your Objective',
    desc: 'Every project starts with a clear brief. We take time to understand your event format, audience, venue, budget and what success looks like — then build around it.',
  },
  {
    num: '02',
    title: 'Dependable Execution',
    desc: 'Our approach is built around clear coordination and reliable on-ground execution. We manage vendors, artists and technical teams so the event runs exactly as planned.',
  },
  {
    num: '03',
    title: 'Flexible Collaboration',
    desc: 'We work with clients, planners, brands and event partners across India, Philippines and Thailand — adapting our support to your specific requirements and budget.',
  },
  {
    num: '04',
    title: 'Single Point of Coordination',
    desc: 'One team handles everything — production, entertainment, logistics and vendor management. Clear communication and timely updates throughout every project.',
  },
]

const leaders = [
  {
    name: 'Kunal Rathor',
    role: 'Founder & Principal Creative Director',
    bio: 'Leading event management, production coordination and artist booking across corporate, live and private events — with a focus on clear execution and reliable partnerships across India and international markets.',
    image: SITE_MEDIA.about.leaders[0].url,
  },
]



export default function AboutPage() {
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

  const navItems = ['About', 'Services', 'Portfolio', 'Contact']

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

      {/* About Page Hero (100dvh centered fold) */}
      <section className="about-hero subpage-hero" id="top">
        <div className="hero-content-wrap">
          <nav aria-label="Breadcrumb" className="site-breadcrumbs">
            <a href="/" className="crumb-link">Home</a>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">About the Studio</span>
          </nav>

          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span>01</span>
            <span>Studio Profile & Legacy</span>
          </div>

          <h1>
            <span className="hero-word-wrap">
              <span className="hero-word hero-word-first">Events with</span>
            </span>
            <br />
            <span className="hero-word-wrap">
              <em className="hero-word hero-word-second font-editorial">intention.</em>
            </span>
          </h1>

          <p className="about-lead">
            Glaiz Events is an India-based event management and production company focused on creating, coordinating and executing professional events — across India, Philippines and Thailand.
          </p>

          <div className="button-row hero-buttons" style={{ marginTop: '24px' }}>
            <a className="button button-dark hero-btn" href="/contact">
              Book Consultation <ArrowRight aria-hidden="true" />
            </a>
            <a className="button button-light hero-btn" href="/services">
              Our Services <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Scroll-Revealed Atelier Showcase Section */}
      <section className="about-showcase content-section" data-reveal="section">
        <div className="section-label">
          <span>01.1</span>
          <span>Atmosphere & Space</span>
        </div>
        <div className="about-showcase-media media-frame">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85"
            alt="Glaiz Events Gala Evening"
          />
        </div>
      </section>

      {/* Narrative & Ethos Section */}
      <section className="content-section section-rule" data-reveal="section">
        <div className="about-story-grid">
          <div>
            <span className="eyebrow">Our Philosophy</span>
            <h2>We deliver events that <em className="font-editorial">work</em> — every time.</h2>
          </div>
          <div className="story-paragraphs">
            <p>
              Whether coordinating a 400-delegate corporate conference, a live music show or an intimate private gathering, we bring clear planning, dependable production and flexible collaboration to every project — across event formats, audiences and <span className="font-editorial">budgets.</span>
            </p>
            <p>
              From the first brief to the final on-ground handover, our team coordinates vendors, artists and technical crews so clients can focus on what matters most — the event itself.
            </p>
            <div className="studio-badges">
              <span><Award size={13} /> Single Point of Coordination</span>
              <span><ShieldCheck size={13} /> Domestic &amp; International Projects</span>
              <span><HeartHandshake size={13} /> Production + Entertainment Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Creative Principles */}
      <section className="content-section section-rule about-principles-section" data-reveal="section">
        <div className="section-label">
          <span>02</span>
          <span>Core Methodology</span>
        </div>
        <div className="section-heading">
          <h2>The Glaiz<br /><em className="font-editorial">Approach</em></h2>
          <p>Four working principles guiding every project from the initial brief to <span className="font-editorial">on-ground execution.</span></p>
        </div>

        <div className="about-principles-grid">
          {principles.map((p) => (
            <div key={p.num} className="about-principle-card" data-reveal="card">
              <span className="principle-number">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Single Centered Director */}
      <section className="content-section section-rule" data-reveal="section">
        <div className="section-label">
          <span>03</span>
          <span>Creative Leadership</span>
        </div>
        <div className="section-heading" style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: '600px' }}>
          <h2>The <em className="font-editorial">Director</em></h2>
          <p>Creative architecture, spatial scenography, and dedicated production direction.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="leader-card" data-reveal="card" style={{ maxWidth: '440px', width: '100%' }}>
            <div className="leader-image media-frame">
              <img src={leaders[0].image} alt={leaders[0].name} />
            </div>
            <div className="leader-info" style={{ textAlign: 'center' }}>
              <h3>{leaders[0].name}</h3>
              <span className="leader-role">{leaders[0].role}</span>
              <p>{leaders[0].bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta content-section section-rule" data-reveal="section">
        <div className="cta-copy">
          <p className="eyebrow">Let&apos;s Create Together</p>
          <h2>Begin your commission with Glaiz.</h2>
          <p>Schedule a dedicated discovery consultation with our Senior Event Directors.</p>
          <a className="button button-dark" href="/contact">
            Schedule Consultation <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="cta-image media-frame">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85"
            alt="Evening celebration atmosphere"
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
