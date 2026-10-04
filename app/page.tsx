'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react'

const images = {
  hero: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85',
  heroDetail: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85',
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
  corporate: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
  celebration: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
  live: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
  cta: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85',
}

const services = [
  ['01', 'Weddings', 'Thoughtful celebrations shaped around your story.', images.wedding],
  ['02', 'Corporate Events', 'Clear ideas, considered details, seamless delivery.', images.corporate],
  ['03', 'Private Celebrations', 'Intimate gatherings with a distinct sense of place.', images.celebration],
  ['04', 'Live Events', 'Energy, atmosphere and production that stays with you.', images.live],
]

const projects = [
  { title: 'The Royal Wedding', type: 'Wedding', location: 'Delhi', year: '2026', image: images.wedding, className: 'md:col-span-7' },
  { title: 'Corporate Summit', type: 'Corporate', location: 'Mumbai', year: '2026', image: images.corporate, className: 'md:col-span-5 md:mt-32' },
  { title: 'Summer Nights', type: 'Live Event', location: 'Noida', year: '2026', image: images.live, className: 'md:col-span-5 md:-mt-16' },
  { title: 'An Evening in Bloom', type: 'Private', location: 'Jaipur', year: '2025', image: images.celebration, className: 'md:col-span-7 md:mt-16' },
]

export default function Page() {
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
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) menuButtonRef.current?.focus()
  }, [menuOpen])

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

  const navItems = ['About', 'Services', 'Portfolio', 'Testimonials', 'Contact']

  return (
    <main className="site-shell">
      {/* Floating Wordmark */}
      <a href="#top" className="floating-wordmark" aria-label="Glaize Events home">
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

      {/* 1. Full-Screen Typography & CTA First-Fold (100dvh) */}
      <section className="hero-fullscreen" id="top">
        <div className="hero-content-wrap">
          <p className="eyebrow hero-eyebrow">Event planning & production / Est. 2014</p>
          <h1 className="hero-heading">
            <span className="hero-word-wrap">
              <span className="hero-word hero-word-glaize">GLAIZE</span>
            </span>
            <br />
            <span className="hero-word-wrap">
              <em className="hero-word hero-word-events">EVENTS</em>
            </span>
          </h1>
          <p className="hero-intro">
            We create unforgettable events, from intimate celebrations to large-scale <span className="font-editorial">experiences</span>.
          </p>
          <div className="button-row hero-buttons">
            <a className="button button-dark hero-btn" href="/contact">
              Book Consultation <ArrowRight aria-hidden="true" />
            </a>
            <a className="button button-light hero-btn" href="/portfolio">
              View our work <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Scroll-Revealed Showcase Section (Appears after scrolling) */}
      <section className="hero-showcase content-section" data-reveal="hero-showcase">
        <div className="section-label">
          <span>00</span>
          <span>Atmosphere & Scale</span>
        </div>
        <div className="hero-showcase-grid">
          <div className="hero-media media-frame">
            <img src={images.hero} alt="Guests gathered beneath warm lights at an elegant event" />
          </div>
          <div className="hero-showcase-aside">
            <div className="hero-detail media-frame">
              <img src={images.heroDetail} alt="Close-up of flowers and table details at a celebration" />
            </div>
            <p className="hero-side-note">
              01 / 04<br />
              <span>Make a moment<br /><span className="font-editorial">matter.</span></span>
            </p>
          </div>
        </div>
      </section>

      <section className="intro content-section" id="about" data-reveal="section">
        <div className="section-label"><span>01</span><span>Why Glaize</span></div>
        <div className="intro-grid">
          <h2>Events with<br /><em className="font-editorial">intention.</em></h2>
          <div className="intro-body"><p>From the first sketch to the final guest departure, Glaize brings creative direction, calm logistics and a deeply personal <span className="font-editorial">point of view</span> to every event.</p><a className="text-link" href="/about">Meet the team & story <ArrowRight aria-hidden="true" /></a></div>
        </div>
        <div className="principles">
          {['End-to-end event planning', 'Creative concepts', 'Trusted vendors', 'Precision Production Logistics'].map((item, index) => <a href="/about" className="principle" key={item} data-reveal="row"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><ArrowRight aria-hidden="true" /></a>)}
        </div>
      </section>

      <section className="services content-section section-rule" id="services" data-reveal="section">
        <div className="section-label"><span>02</span><span>What we do</span></div>
        <div className="section-heading"><h2>Our <em className="font-editorial">services</em></h2><p>One considered approach, tailored to the scale and <span className="font-editorial">spirit of your occasion.</span></p></div>
        <div className="service-grid">
          {services.map(([number, title, description, image]) => <a className="service-item" href="/services" key={title} data-reveal="card"><div className="service-image"><img src={image} alt={`${title} event`} /></div><div className="service-meta"><span>{number} / 04</span><ArrowUpRight aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></a>)}
        </div>
        <div className="service-footer"><span>Also: Event decor & styling / Complete event management</span><a className="text-link" href="/services">Explore all services <ArrowRight aria-hidden="true" /></a></div>
      </section>

      <section className="portfolio content-section" id="portfolio" data-reveal="section">
        <div className="section-label"><span>03</span><span>Selected work</span></div>
        <div className="section-heading"><h2>A few <em className="font-editorial">moments</em></h2><p>Celebrations that found their own rhythm, texture and <span className="font-editorial">light.</span></p></div>
        <div className="project-grid">
          {projects.map((project, index) => <a className={`project ${project.className}`} href="/portfolio" key={project.title} data-reveal="card"><div className="project-image"><img src={project.image} alt={`${project.title} event photography`} /><span className="project-index">0{index + 1}</span></div><div className="project-caption"><div><h3>{project.title}</h3><p>{project.type} / {project.location}</p></div><span>{project.year}</span></div></a>)}
        </div>
        <div className="service-footer" style={{ marginTop: '48px' }}>
          <span>Explore our full archive across destination weddings, corporate summits & live productions</span>
          <a className="text-link" href="/portfolio">View full portfolio archive <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="process content-section section-rule" data-reveal="section">
        <div className="section-label"><span>04</span><span>Our process</span></div>
        <div className="section-heading"><h2>From idea<br /><em className="font-editorial">to event.</em></h2><p>A clear, collaborative process that keeps the big picture in focus and the details <span className="font-editorial">beautifully handled.</span></p></div>
        <div className="process-grid">{[['01', 'Discover', 'Understand the vision.'], ['02', 'Design', 'Build the concept.'], ['03', 'Plan', 'Coordinate vendors, logistics and execution.'], ['04', 'Deliver', 'Bring the event to life.']].map(([num, title, desc]) => <div className="process-step" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>
      </section>

      <section className="stats content-section" data-reveal="section"><div className="stat"><strong>10<span>+</span></strong><p>Years of<br />experience</p></div><div className="stat"><strong>100<span>+</span></strong><p>Events<br />delivered</p></div><div className="stat"><strong>50<span>+</span></strong><p>Clients<br />served</p></div><p className="stat-note">A growing archive<br />of good company.</p></section>

      <section className="testimonial content-section section-rule" id="testimonials" data-reveal="section"><div className="section-label"><span>05</span><span>Kind words</span></div><div className="quote-mark">“</div><blockquote>They understood the feeling we wanted before we had the words for it. Every detail felt like us, only <span className="font-editorial-italic">more considered</span>.</blockquote><div className="quote-byline"><strong>Rhea & Arjun</strong><span>Private celebration / Delhi</span></div></section>

      <section className="final-cta content-section" id="contact" data-reveal="section"><div className="cta-copy"><p className="eyebrow">06 / Let&apos;s begin</p><h2>Let&apos;s create<br />something<br /><em className="font-editorial">memorable.</em></h2><p>Tell us about your event and we&apos;ll take it from <span className="font-editorial">concept to execution.</span></p><a className="button button-dark" href="/contact">Book a consultation <ArrowRight aria-hidden="true" /></a></div><div className="cta-image media-frame"><img src={images.cta} alt="Friends celebrating together beneath outdoor lights" /></div></section>

      <footer className="site-footer"><div className="footer-brand"><a href="/" className="wordmark">GLAIZE <span>EVENTS</span></a><p>Events with intention.</p></div><div className="footer-column"><span className="footer-label">Navigate</span><a href="/">Home</a><a href="/about">About</a><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/contact">Contact</a></div><div className="footer-column"><span className="footer-label">Contact</span><a href="mailto:hello@glaizeevents.com">hello@glaizeevents.com</a><a href="tel:+911123456789">+91 11 2345 6789</a><a href="/contact">Direct Booking ↗</a></div><div className="footer-bottom"><span>© 2026 Glaize Events</span><span>Delhi / Mumbai / Everywhere</span><a href="#top">Back to top ↑</a></div></footer>
    </main>
  )
}

function ArrowUpRight(props: React.ComponentProps<typeof ArrowRight>) { return <ArrowRight {...props} className="arrow-up-right" /> }
