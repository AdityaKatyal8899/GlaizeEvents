'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, ArrowDownRight, MapPin, Calendar, Users, X, Sparkles, Layers, ArrowUpRight } from 'lucide-react'

const projectsData = [
  {
    id: 'royal-wedding',
    title: 'The Royal Palace Wedding',
    category: 'Weddings',
    location: 'Jaipur, Rajasthan',
    year: '2026',
    guests: '650 Guests',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    overview: 'A 3-day royal destination wedding orchestrated across palace courtyards. Features bespoke brass-crafted mandap architecture, 20,000 hand-threaded marigolds, and dynamic warm-candlelight projection mapping.',
    highlights: ['Multi-courtyard spatial flow', 'Acoustic classical sitar & live symphony', 'Heritage lighting engineering'],
  },
  {
    id: 'corporate-summit',
    title: 'Global Tech Leadership Summit',
    category: 'Corporate',
    location: 'Mumbai, Maharashtra',
    year: '2026',
    guests: '1,200 Delegates',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
    overview: 'High-level technology conference for global enterprise leaders. Included broadcast-grade 4K kinetic LED curved walls, executive networking lounges, and multi-track hybrid live streaming.',
    highlights: ['Seamless multi-track keynote AV', 'Zero-latency hybrid broadcast', 'High-security VVIP protocol'],
  },
  {
    id: 'summer-nights',
    title: 'Summer Nights Live Symphony',
    category: 'Live Events',
    location: 'Noida, NCR',
    year: '2026',
    guests: '3,500 Attendees',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
    overview: 'An open-air amphitheater concert and live orchestral experience. Heavy-duty structural trussing, custom kinetic laser programming, and world-class acoustic engineering.',
    highlights: ['360-degree surround sound engineering', 'Dynamic laser & kinetic lighting', 'Turnkey crowd flow logistics'],
  },
  {
    id: 'evening-bloom',
    title: 'An Evening in Bloom',
    category: 'Private',
    location: 'Udaipur, Rajasthan',
    year: '2025',
    guests: '120 Guests',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
    overview: 'An intimate milestone celebration held at a private lakeside estate. Custom botanical pergolas, bespoke tablescapes curated with vintage silverware, and private Michelin-partner dining.',
    highlights: ['Artisanal floral architecture', 'Secret acoustic performance', 'Bespoke lakeside mixology bar'],
  },
  {
    id: 'heritage-sangeet',
    title: 'Heritage Sangeet & Lantern Gala',
    category: 'Weddings',
    location: 'Jodhpur, Rajasthan',
    year: '2025',
    guests: '500 Guests',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85',
    overview: 'A high-energy musical evening set against historic fort ramparts, featuring 1,000 floating water lanterns, custom stage carpentry, and synchronized pyro-spectacles.',
    highlights: ['Fort rampart projection mapping', 'Custom revolving stage', 'Floating lantern water installations'],
  },
  {
    id: 'brand-premiere',
    title: 'Automotive World Premiere',
    category: 'Corporate',
    location: 'Delhi NCR',
    year: '2025',
    guests: '800 Press & VIPs',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
    overview: 'Exclusive international media unveil of a flagship luxury electric vehicle with interactive tunnel lighting, holographic unveil sequence, and VIP lounge hospitality.',
    highlights: ['Holographic vehicle reveal', 'Interactive tunnel lighting', 'International press management'],
  },
]

const categories = ['All', 'Weddings', 'Corporate', 'Private', 'Live Events']

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -50% 0px' })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [activeCategory])

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory)

  return (
    <main className="site-shell">
      {/* Floating Brand Wordmark */}
      <a href="/" className="floating-wordmark" aria-label="Glaize Events home">
        GLAIZE <span>EVENTS</span>
      </a>

      {/* Floating Sticky Hamburger Button */}
      <button
        ref={menuButtonRef}
        className="floating-menu-toggle"
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

      {/* Portfolio Hero Header */}
      <section className="portfolio-hero subpage-hero">
        <nav aria-label="Breadcrumb" className="site-breadcrumbs">
          <a href="/" className="crumb-link">Home</a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">Selected Work Archive</span>
        </nav>

        <div className="section-label">
          <span>03</span>
          <span>Selected Work & Archive</span>
        </div>

        <div className="portfolio-hero-title-grid">
          <div>
            <h1>
              <span className="hero-word-wrap">
                <span className="hero-word hero-word-first">A few</span>
              </span>{' '}
              <span className="hero-word-wrap">
                <em className="hero-word hero-word-second">moments.</em>
              </span>
            </h1>
            <p className="portfolio-lead">
              Celebrations and live productions that found their own distinct rhythm, spatial texture, and lasting emotional resonance.
            </p>
          </div>

          <div className="portfolio-category-filter">
            <span className="filter-label-text">Filter by Discipline:</span>
            <div className="category-filter-chips">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-chip ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Grid */}
      <section className="content-section section-rule portfolio-grid-section">
        <div className="portfolio-masonry-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-card"
              data-reveal="card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="portfolio-card-image media-frame">
                <img src={project.image} alt={project.title} />
                <span className="portfolio-index-pill">0{index + 1}</span>
                <div className="portfolio-card-overlay">
                  <span className="view-case-btn">View Case Study <ArrowUpRight size={14} /></span>
                </div>
              </div>
              <div className="portfolio-card-caption">
                <div className="caption-text">
                  <h3>{project.title}</h3>
                  <p className="caption-sub">{project.category} • {project.location}</p>
                </div>
                <div className="caption-meta">
                  <span className="year-pill">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Case Study Lightbox Modal */}
      {selectedProject && (
        <div
          className="case-study-lightbox"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="lightbox-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close Case Study"
            >
              <X size={20} />
            </button>

            <div className="lightbox-media media-frame">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="lightbox-body">
              <div className="lightbox-header">
                <span className="eyebrow">{selectedProject.category} / {selectedProject.year}</span>
                <h2>{selectedProject.title}</h2>
                <div className="lightbox-specs">
                  <span><MapPin size={13} /> {selectedProject.location}</span>
                  <span><Users size={13} /> {selectedProject.guests}</span>
                </div>
              </div>

              <p className="lightbox-overview">{selectedProject.overview}</p>

              <div className="lightbox-highlights">
                <strong>Curated Production Highlights:</strong>
                <ul>
                  {selectedProject.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </div>

              <div className="lightbox-footer">
                <a href="/contact" className="button button-dark">
                  Plan a similar event <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final Call to Action */}
      <section className="final-cta content-section section-rule" data-reveal="section">
        <div className="cta-copy">
          <p className="eyebrow">04 / Let&apos;s begin</p>
          <h2>Ready to orchestrate your next moment?</h2>
          <p>Schedule a private discovery consultation with our Senior Event Directors.</p>
          <a className="button button-dark" href="/contact">
            Book Consultation <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="cta-image media-frame">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85"
            alt="Evening celebration"
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
