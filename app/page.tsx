'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react'

import { SITE_MEDIA } from '@/lib/site-media'

const images = {
  hero: SITE_MEDIA.home.hero.url,
  heroDetail: SITE_MEDIA.home.heroDetail.url,
  wedding: SITE_MEDIA.home.wedding.url,
  corporate: SITE_MEDIA.home.corporate.url,
  celebration: SITE_MEDIA.home.celebration.url,
  live: SITE_MEDIA.home.live.url,
  cta: SITE_MEDIA.home.cta.url,
}


const services = [
  ['01', 'Corporate & Brand Events', 'Professional production for conferences, launches and activations.', images.corporate],
  ['02', 'Live Shows & Concerts', 'Energy, production and crowd experience that stays with you.', images.live],
  ['03', 'Artist Management', 'Indian & Punjabi artist sourcing, coordination and event-day support.', images.celebration],
  ['04', 'Event Production', 'Sound, lighting, stage, LED and on-ground technical coordination.', images.wedding],
]

const projects = [
  { title: 'Corporate Conference Production', type: 'Corporate', location: 'Delhi NCR', year: '2026', image: images.corporate, className: 'md:col-span-7' },
  { title: 'Live Concert & Music Show', type: 'Live Events', location: 'Mumbai', year: '2026', image: images.live, className: 'md:col-span-5 md:mt-32' },
  { title: 'Dandiya & Festive Night', type: 'Festive', location: 'Noida', year: '2026', image: images.wedding, className: 'md:col-span-5 md:-mt-16' },
  { title: 'Private Social Evening', type: 'Private', location: 'Delhi', year: '2025', image: images.celebration, className: 'md:col-span-7 md:mt-16' },
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
      <a href="#top" className="floating-wordmark" aria-label="Glaiz Events home">
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

      {/* 1. Full-Screen Typography & CTA First-Fold (100dvh) */}
      <section className="hero-fullscreen" id="top">
        <div className="hero-content-wrap">
          <p className="eyebrow hero-eyebrow">Luxury Event Planning & Production</p>
          <h1 className="hero-heading">
            <span className="hero-word-wrap">
              <span className="hero-word hero-word-glaize">GLAIZ</span>
            </span>
            <br />
            <span className="hero-word-wrap">
              <em className="hero-word hero-word-events">EVENTS</em>
            </span>
          </h1>
          <p className="hero-intro">
            Your vision. Our execution. From corporate productions to live concerts and private celebrations — one reliable partner, <span className="font-editorial">end-to-end.</span>
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
        <div className="section-label"><span>01</span><span>Why Glaiz</span></div>
        <div className="intro-grid">
          <h2>Events with<br /><em className="font-editorial">intention.</em></h2>
          <div className="intro-body"><p>From the first brief to on-ground execution, Glaiz Events brings event coordination, production expertise and entertainment support — so you have one reliable partner across every <span className="font-editorial">requirement.</span></p><a className="text-link" href="/about">Meet the team & story <ArrowRight aria-hidden="true" /></a></div>
        </div>
        <div className="principles">
          {['End-to-end event management', 'Sound, lighting & stage production', 'Artist & entertainment coordination', 'Domestic & international collaboration'].map((item, index) => <a href="/about" className="principle" key={item} data-reveal="row"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><ArrowRight aria-hidden="true" /></a>)}
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
          <span>Explore our full archive across corporate events, live shows, festive productions & private gatherings</span>
          <a className="text-link" href="/portfolio">View full portfolio archive <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="process content-section section-rule" data-reveal="section">
        <div className="section-label"><span>04</span><span>Our process</span></div>
        <div className="section-heading"><h2>From idea<br /><em className="font-editorial">to event.</em></h2><p>A clear, collaborative process that keeps the big picture in focus and the details <span className="font-editorial">beautifully handled.</span></p></div>
        <div className="process-grid">{[['01', 'Discover', 'Understand the vision.'], ['02', 'Design', 'Build the concept.'], ['03', 'Plan', 'Coordinate vendors, logistics and execution.'], ['04', 'Deliver', 'Bring the event to life.']].map(([num, title, desc]) => <div className="process-step" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>
      </section>

      <section className="testimonial content-section section-rule" id="testimonials" data-reveal="section"><div className="section-label"><span>05</span><span>Kind words</span></div><div className="quote-mark">“</div><blockquote>They understood the feeling we wanted before we had the words for it. Every detail felt like us, only <span className="font-editorial-italic">more considered</span>.</blockquote><div className="quote-byline"><strong>Rhea & Arjun</strong><span>Private celebration / Delhi</span></div></section>

      <section className="final-cta content-section" id="contact" data-reveal="section"><div className="cta-copy"><p className="eyebrow">06 / Let&apos;s begin</p><h2>Let&apos;s create<br />something<br /><em className="font-editorial">memorable.</em></h2><p>Tell us about your event and we&apos;ll take it from <span className="font-editorial">concept to execution.</span></p><a className="button button-dark" href="/contact">Book a consultation <ArrowRight aria-hidden="true" /></a></div><div className="cta-image media-frame"><img src={images.cta} alt="Friends celebrating together beneath outdoor lights" /></div></section>

      <footer className="site-footer"><div className="footer-brand"><a href="/" className="wordmark">GLAIZ <span>EVENTS</span></a><p>Events with intention.</p></div><div className="footer-column"><span className="footer-label">Navigate</span><a href="/">Home</a><a href="/about">About</a><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/contact">Contact</a></div><div className="footer-column"><span className="footer-label">Contact</span><a href="mailto:Glaizevents@gmail.com">Glaizevents@gmail.com</a><a href="tel:+917982067406">+91 79820 67406</a><a href="https://www.instagram.com/glaizevents" target="_blank" rel="noopener noreferrer">@glaizevents ↗</a><a href="/contact">Direct Booking ↗</a></div><div className="footer-bottom"><span>© 2026 Glaiz Events</span><span>Worldwide Production Atelier</span><a href="#top">Back to top ↑</a></div></footer>
    </main>
  )
}

function ArrowUpRight(props: React.ComponentProps<typeof ArrowRight>) { return <ArrowRight {...props} className="arrow-up-right" /> }
