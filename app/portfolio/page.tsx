'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ArrowDownRight, MapPin, Calendar, Users, X, Sparkles, Layers, ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { SITE_MEDIA } from '@/lib/site-media'

const projectsData = [
  {
    id: 'corporate-conference',
    title: 'Corporate Conference Production',
    category: 'Corporate',
    location: 'Delhi NCR',
    year: '2026',
    guests: '400 Delegates',
    image: SITE_MEDIA.portfolio[0].url,
    overview: 'Full-scale production for a corporate conference including stage setup, professional sound & AV, LED displays and complete event crew coordination from setup to handover.',
    highlights: ['Professional stage & AV setup', 'LED screen & display solutions', 'Seamless crew coordination'],
  },
  {
    id: 'brand-activation',
    title: 'Brand Activation Event',
    category: 'Corporate',
    location: 'Mumbai',
    year: '2026',
    guests: '600 Attendees',
    image: SITE_MEDIA.portfolio[1].url,
    overview: 'Production and on-ground support for a brand activation event — from technical setup to artist coordination and crowd management across a full-day brand experience.',
    highlights: ['Brand-aligned technical production', 'Artist & entertainment coordination', 'On-ground event support'],
  },
  {
    id: 'live-concert',
    title: 'Live Concert & Music Show',
    category: 'Live Events',
    location: 'Mumbai',
    year: '2026',
    guests: '2,000+ Attendees',
    image: SITE_MEDIA.portfolio[2].url,
    overview: 'End-to-end production for an open-air live concert — sound systems, stage setup, event lighting, artist coordination and crowd management for a high-energy music show.',
    highlights: ['Professional sound & stage production', 'Artist coordination & rider support', 'Crowd flow and event logistics'],
  },
  {
    id: 'dandiya-festival',
    title: 'Dandiya & Festive Night',
    category: 'Festive',
    location: 'Noida, NCR',
    year: '2026',
    guests: '800 Guests',
    image: SITE_MEDIA.portfolio[3].url,
    overview: 'High-energy festive production with DJ setup, stage lighting, professional sound systems and entertainment coordination for a large-scale Dandiya celebration.',
    highlights: ['DJ & sound setup', 'Festive lighting & stage', 'Entertainment & crowd coordination'],
  },
  {
    id: 'private-evening',
    title: 'Private Social Evening',
    category: 'Private',
    location: 'Delhi',
    year: '2025',
    guests: '150 Guests',
    image: SITE_MEDIA.portfolio[4].url,
    overview: 'Intimate private event with curated entertainment, sound setup and dedicated on-ground support for a social gathering — managed with care and clear coordination.',
    highlights: ['Curated entertainment', 'Professional sound setup', 'Dedicated on-ground coordination'],
  },
  {
    id: 'college-festival',
    title: 'College & Youth Festival',
    category: 'Live Events',
    location: 'Mumbai',
    year: '2025',
    guests: '1,500 Students',
    image: SITE_MEDIA.portfolio[5].url,
    overview: 'Complete production for a college fest — DJ and artist coordination, stage setup, sound & lighting, and crowd experience management for a full-day youth festival.',
    highlights: ['DJ & artist coordination', 'Full stage & lighting setup', 'Youth crowd experience management'],
  },
]


const categories = ['All', 'Corporate', 'Live Events', 'Private', 'Festive']

export default function PortfolioPage() {
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
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [activeCategory])

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory)

  return (
    <main className="site-shell">
      {/* Luxury Horizontal Navigation Bar */}
      <Navbar />

      {/* Portfolio Hero Header (100dvh centered fold) */}
      <section className="portfolio-hero subpage-hero" id="top">
        <div className="hero-content-wrap">
          <nav aria-label="Breadcrumb" className="site-breadcrumbs">
            <a href="/" className="crumb-link">Home</a>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Selected Work Archive</span>
          </nav>

          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span>03</span>
            <span>Selected Work & Archive</span>
          </div>

          <h1>
            <span className="hero-word-wrap">
              <span className="hero-word hero-word-first">A few</span>
            </span>{' '}
            <span className="hero-word-wrap">
              <em className="hero-word hero-word-second font-editorial">moments.</em>
            </span>
          </h1>

          <p className="portfolio-lead">
            Celebrations and live productions that found their own distinct rhythm, spatial texture, and lasting <span className="font-editorial">emotional resonance</span>.
          </p>

          <div className="button-row hero-buttons" style={{ marginTop: '24px' }}>
            <a href="/contact" className="button button-dark hero-btn">
              Commission an Event <ArrowRight size={13} />
            </a>
            <a href="#gallery" className="button button-light hero-btn">
              Explore Archive <ArrowDownRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Grid */}
      <section className="content-section section-rule portfolio-grid-section" id="gallery" data-reveal="section">
        <div className="portfolio-category-filter" style={{ marginBottom: '40px' }}>
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
          <h2>Ready to orchestrate your <em className="font-editorial">next moment?</em></h2>
          <p>Schedule a private discovery consultation with our <span className="font-editorial">Senior Event Directors</span>.</p>
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
