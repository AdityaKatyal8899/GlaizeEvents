'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRight,
  ArrowDownRight,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Building2,
  Mic2,
  Users,
  Cpu,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react'

export interface NavbarProps {
  currentPath?: string
}

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setServicesDropdownOpen(false)
  }, [pathname])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setServicesDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setServicesDropdownOpen(true)
  }

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 150)
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ]

  const serviceItems = [
    {
      title: 'Corporate & Brand',
      desc: 'Summits, galas & experiential brand activations',
      href: '/services#corporate',
      icon: Building2,
    },
    {
      title: 'Live Concerts & Staging',
      desc: 'Arena spectacles, festivals & live productions',
      href: '/services#concerts',
      icon: Mic2,
    },
    {
      title: 'Artist Management',
      desc: 'Celebrity curation, riders & VIP hospitality',
      href: '/services#artists',
      icon: Users,
    },
    {
      title: 'Technical Production',
      desc: 'Audio-visual architecture, rigging & SFX design',
      href: '/services#production',
      icon: Cpu,
    },
  ]

  return (
    <>
      <header className={`luxury-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="luxury-navbar-container">
          {/* Brand Logo */}
          <Link href="/" className="luxury-navbar-logo" aria-label="Glaiz Events home">
            <img
              src="/logo.png"
              alt="GLAIZ EVENTS"
              className="navbar-brand-img"
            />
          </Link>

          {/* Desktop Horizontal Navigation */}
          <nav className="luxury-navbar-nav" aria-label="Main Navigation">
            <ul className="luxury-nav-list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href

                if (link.hasDropdown) {
                  return (
                    <li
                      key={link.label}
                      className="luxury-nav-item has-dropdown"
                      onMouseEnter={handleMouseEnterServices}
                      onMouseLeave={handleMouseLeaveServices}
                    >
                      <Link
                        href={link.href}
                        className={`luxury-nav-link ${isActive ? 'is-active' : ''} ${
                          servicesDropdownOpen ? 'is-dropdown-open' : ''
                        }`}
                        aria-expanded={servicesDropdownOpen}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="dropdown-arrow-icon" aria-hidden="true" />
                      </Link>

                      {/* Mega Dropdown Menu */}
                      <div
                        className={`luxury-dropdown-menu ${
                          servicesDropdownOpen ? 'is-visible' : ''
                        }`}
                        role="menu"
                      >
                        <div className="luxury-dropdown-grid">
                          {serviceItems.map((svc) => {
                            const IconComponent = svc.icon
                            return (
                              <Link
                                key={svc.title}
                                href={svc.href}
                                className="luxury-dropdown-item"
                                role="menuitem"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                <div className="dropdown-item-icon-wrap">
                                  <IconComponent className="dropdown-item-icon" />
                                </div>
                                <div className="dropdown-item-text">
                                  <span className="dropdown-item-title">{svc.title}</span>
                                  <span className="dropdown-item-desc">{svc.desc}</span>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                        <div className="luxury-dropdown-footer">
                          <Link
                            href="/services"
                            className="dropdown-footer-link"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            <span>Explore all services & production capabilities</span>
                            <ArrowRight className="footer-arrow-icon" />
                          </Link>
                        </div>
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={link.label} className="luxury-nav-item">
                    <Link
                      href={link.href}
                      className={`luxury-nav-link ${isActive ? 'is-active' : ''}`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right Action CTA Button + Mobile Hamburger */}
          <div className="luxury-navbar-actions">
            <Link href="/contact" className="luxury-nav-cta">
              <span className="cta-text">Book Consultation</span>
              <span className="cta-icon-wrap">
                <ArrowRight className="cta-arrow" />
              </span>
            </Link>

            {/* Mobile In-Navbar Menu Button */}
            <button
              type="button"
              className={`luxury-mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileMenuOpen ? (
                <X className="toggle-icon" />
              ) : (
                <Menu className="toggle-icon" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      <div
        id="mobile-nav-panel"
        className={`luxury-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="luxury-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="luxury-mobile-content">
          <div className="mobile-drawer-header">
            <div className="mobile-brand-title">
              <span className="brand-dot" />
              <span>GLAIZ EVENTS</span>
            </div>
            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mobile-nav-scroll">
            <nav className="mobile-nav-links" aria-label="Mobile Navigation">
              <Link
                href="/"
                className={`mobile-nav-link ${pathname === '/' ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">01</span>
                <span className="mobile-nav-label">Home</span>
                <ArrowDownRight className="mobile-nav-arrow" />
              </Link>

              <Link
                href="/about"
                className={`mobile-nav-link ${pathname === '/about' ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">02</span>
                <span className="mobile-nav-label">About Us</span>
                <ArrowDownRight className="mobile-nav-arrow" />
              </Link>

              <div className="mobile-nav-group">
                <Link
                  href="/services"
                  className={`mobile-nav-link ${pathname === '/services' ? 'is-active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-num">03</span>
                  <span className="mobile-nav-label">Services</span>
                  <ArrowDownRight className="mobile-nav-arrow" />
                </Link>
                <div className="mobile-sub-services">
                  {serviceItems.map((svc) => (
                    <Link
                      key={svc.title}
                      href={svc.href}
                      className="mobile-sub-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sub-bullet">•</span>
                      <span>{svc.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/portfolio"
                className={`mobile-nav-link ${pathname === '/portfolio' ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">04</span>
                <span className="mobile-nav-label">Portfolio</span>
                <ArrowDownRight className="mobile-nav-arrow" />
              </Link>

              <Link
                href="/contact"
                className={`mobile-nav-link ${pathname === '/contact' ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">05</span>
                <span className="mobile-nav-label">Contact & Booking</span>
                <ArrowDownRight className="mobile-nav-arrow" />
              </Link>
            </nav>

            <div className="mobile-drawer-bottom">
              <Link
                href="/contact"
                className="mobile-cta-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mobile-contact-info">
                <div className="mobile-info-item">
                  <Mail className="mobile-info-icon" />
                  <a href="mailto:glaizevents@gmail.com">Glaizevents@gmail.com</a>
                </div>
                <div className="mobile-info-item">
                  <Phone className="mobile-info-icon" />
                  <a href="tel:+919876543210">+91 (Atelier Direct)</a>
                </div>
                <div className="mobile-info-item">
                  <svg className="mobile-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <a
                    href="https://www.instagram.com/glaizevents"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @glaizevents
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
