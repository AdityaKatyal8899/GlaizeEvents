'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, ArrowDownRight, MapPin, Sparkles, Award, Users, ShieldCheck, HeartHandshake, ArrowUpRight } from 'lucide-react'

const principles = [
  {
    num: '01',
    title: 'Creative Direction with Depth',
    desc: 'We never duplicate themes or rely on standard event tropes. Every gathering begins with a clean slate, translating your brand or personal narrative into cohesive spatial architecture.',
  },
  {
    num: '02',
    title: 'Calm Technical Logistics',
    desc: 'Behind our breathtaking aesthetics is a rigorous military-grade production engine: structural engineering, precise acoustic tuning, and contingency planning for every split second.',
  },
  {
    num: '03',
    title: 'Curated Global Network',
    desc: 'Over 10+ years, we have built trusted relationships with Michelin-star culinary masters, international acoustic designers, master floral sculptors, and heritage venues.',
  },
  {
    num: '04',
    title: 'Discreet High-Touch Hospitality',
    desc: 'From high-security VVIP protocols to bespoke guest concierges, our team operates with quiet discretion, ensuring hosts and guests immerse fully without stress.',
  },
]

const leaders = [
  {
    name: 'Devansh Verma',
    role: 'Founder & Principal Creative Director',
    bio: 'With over a decade orchestrating high-profile destination weddings and cultural summits across India and Europe, Devansh brings an architectural sensibility and editorial eye to every commission.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Ananya Sen',
    role: 'Director of Production & Spatial Scenography',
    bio: 'Specializing in transformative lighting design, stage architecture, and live acoustic environments, Ananya transforms blank arenas and heritage grounds into sensory wonderlands.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Kabir Malhotra',
    role: 'Head of Technical Logistics & VIP Protocol',
    bio: 'A veteran in large-scale live productions and corporate summits, Kabir oversees technical vendor integrations, precision run-of-show schedules, and security choreography.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
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
            Founded in 2014, Glaize Events is a luxury event planning, spatial design, and live production atelier headquartered in Delhi with creative suites in <span className="font-editorial">Mumbai</span>.
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
            alt="Glaize Events Gala Evening"
          />
        </div>
      </section>

      {/* Narrative & Ethos Section */}
      <section className="content-section section-rule" data-reveal="section">
        <div className="about-story-grid">
          <div>
            <span className="eyebrow">Our Philosophy</span>
            <h2>We design <em className="font-editorial">memories</em> that outlive the moment.</h2>
          </div>
          <div className="story-paragraphs">
            <p>
              We believe great events are not measured simply by scale, but by how deeply they resonate. Whether orchestrating a 4-day royal wedding in Rajasthan, an international tech summit in Mumbai, or an intimate private gathering, we operate at the intersection of architectural discipline and <span className="font-editorial">theatrical wonder</span>.
            </p>
            <p>
              From the initial hand-drawn sketch to the final guest departure under ambient candlelight, our studio brings calm precision, creative courage, and meticulous hospitality to every commission.
            </p>
            <div className="studio-badges">
              <span><Award size={13} /> 10+ Years of Craft</span>
              <span><ShieldCheck size={13} /> Strict Non-Disclosure Protocol</span>
              <span><HeartHandshake size={13} /> 100% Curated Vendor Vetting</span>
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
          <h2>The Glaize<br /><em className="font-editorial">Standard</em></h2>
          <p>Four foundational pillars guiding every project from concept sketch to <span className="font-editorial">live show execution.</span></p>
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

      {/* Leadership & Directors */}
      <section className="content-section section-rule" data-reveal="section">
        <div className="section-label">
          <span>03</span>
          <span>Creative Leadership</span>
        </div>
        <div className="section-heading">
          <h2>The <em className="font-editorial">directors</em></h2>
          <p>Experienced creative architects, technical masters, and luxury hospitality veterans.</p>
        </div>

        <div className="leaders-grid">
          {leaders.map((leader) => (
            <div key={leader.name} className="leader-card" data-reveal="card">
              <div className="leader-image media-frame">
                <img src={leader.image} alt={leader.name} />
              </div>
              <div className="leader-info">
                <h3>{leader.name}</h3>
                <span className="leader-role">{leader.role}</span>
                <p>{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats content-section section-rule" data-reveal="section">
        <div className="stat">
          <strong>10<span>+</span></strong>
          <p>Years of<br />Excellence</p>
        </div>
        <div className="stat">
          <strong>100<span>+</span></strong>
          <p>Bespoke Events<br />Delivered</p>
        </div>
        <div className="stat">
          <strong>50<span>+</span></strong>
          <p>Enterprise & Private<br />Clients Served</p>
        </div>
        <p className="stat-note">
          An archive of good company,<br />distinguished guests & lasting impressions.
        </p>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta content-section section-rule" data-reveal="section">
        <div className="cta-copy">
          <p className="eyebrow">Let&apos;s Create Together</p>
          <h2>Begin your commission with Glaize.</h2>
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
