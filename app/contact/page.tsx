'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { ArrowRight, ArrowDownRight, ArrowLeft, CheckCircle2, ShieldCheck, Mail, Phone, Calendar as CalendarIcon, Clock, Video, Building, RefreshCw, KeyRound, MapPin, User, ChevronLeft, ChevronRight, Sparkles, Check, ChevronRight as BreadcrumbChevron } from 'lucide-react'

// Event Categories
const eventTypes = [
  { id: 'wedding', label: 'Wedding', desc: 'Curated ceremonies, receptions & destination celebrations' },
  { id: 'corporate', label: 'Corporate Summit', desc: 'Leadership retreats, annual galas & global conferences' },
  { id: 'private', label: 'Private Celebration', desc: 'Milestone anniversaries, intimate dinners & VIP soirees' },
  { id: 'live', label: 'Live Event / Concert', desc: 'Stage architecture, audio-visual & public productions' },
  { id: 'brand', label: 'Brand Activation', desc: 'Product launches, fashion runways & immersive pop-ups' },
]

// Production Scale & Scope Tiers (Capacity & Ambience Focus)
const productionScales = [
  {
    id: 'intimate',
    title: 'Intimate Gathering',
    capacity: 'Under 100 Guests',
    desc: 'Bespoke estate or private salon. Focus on refined floral architecture, artisanal dining curation, and high-touch hospitality.',
  },
  {
    id: 'signature',
    title: 'Signature Celebration',
    capacity: '100 – 400 Guests',
    desc: 'Ballroom or heritage venue. Comprehensive creative direction, custom set fabrication, dynamic lighting, and entertainment management.',
  },
  {
    id: 'grand',
    title: 'Grand Scale Production',
    capacity: '400 – 1,000+ Guests',
    desc: 'Multi-day palace or destination resort. Turnkey spatial transformation, multi-venue logistics, artist hospitality & live stage engineering.',
  },
  {
    id: 'landmark',
    title: 'Landmark & Global Arena',
    capacity: '1,000+ / Multi-City',
    desc: 'Public festival, arena concert, or international summit. Broadcast-grade production, high-security protocol & global deployment.',
  },
]

// Time Slots
const timeSlots = [
  { id: 'slot-1', time: '11:00 AM – 11:45 AM', period: 'Morning Slot' },
  { id: 'slot-2', time: '02:00 PM – 02:45 PM', period: 'Afternoon Slot' },
  { id: 'slot-3', time: '04:30 PM – 05:15 PM', period: 'Late Afternoon' },
  { id: 'slot-4', time: '06:30 PM – 07:15 PM', period: 'Evening Slot' },
]

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Step management: 'details' -> 'otp' -> 'event_booking' -> 'confirmed'
  const [currentStep, setCurrentStep] = useState<'details' | 'otp' | 'event_booking' | 'confirmed'>('details')

  // Step 1: Basic Info
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // OTP State
  const [otpValue, setOtpValue] = useState(['', '', '', ''])
  const [generatedOtp, setGeneratedOtp] = useState('4829')
  const [otpError, setOtpError] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Step 2: Event Details & Scaled Selectors
  const [selectedEventType, setSelectedEventType] = useState('wedding')
  const [selectedScale, setSelectedScale] = useState('signature')
  const [customVisionNote, setCustomVisionNote] = useState('')
  const [meetingType, setMeetingType] = useState<'virtual' | 'in-person'>('virtual')

  // Custom Theme-Followed Calendar State
  const today = useMemo(() => new Date(), [])
  const [calendarViewDate, setCalendarViewDate] = useState(() => new Date())
  const [selectedMeetingDate, setSelectedMeetingDate] = useState<Date>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    return d
  })
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[1].time)
  const [clientNote, setClientNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Step 3: Confirmation Data
  const [bookingRef, setBookingRef] = useState('')

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (currentStep === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [currentStep, resendTimer])

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal="section"]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.18, rootMargin: '0px 0px -28% 0px' })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  // Calendar Helpers
  const currentMonthIdx = calendarViewDate.getMonth()
  const currentYear = calendarViewDate.getFullYear()

  const daysInMonth = useMemo(() => {
    const totalDays = new Date(currentYear, currentMonthIdx + 1, 0).getDate()
    let firstDayIndex = new Date(currentYear, currentMonthIdx, 1).getDay()
    firstDayIndex = (firstDayIndex + 6) % 7

    const days: { dayNumber: number | null; dateObj: Date | null; isPast: boolean; isSelected: boolean; isToday: boolean }[] = []

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: null, dateObj: null, isPast: false, isSelected: false, isToday: false })
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(currentYear, currentMonthIdx, d)
      const isPast = dateObj.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
      const isSelected = !!selectedMeetingDate &&
        selectedMeetingDate.getFullYear() === currentYear &&
        selectedMeetingDate.getMonth() === currentMonthIdx &&
        selectedMeetingDate.getDate() === d
      const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonthIdx && today.getDate() === d

      days.push({ dayNumber: d, dateObj, isPast, isSelected, isToday })
    }

    return days
  }, [currentYear, currentMonthIdx, selectedMeetingDate, today])

  const handlePrevMonth = () => {
    setCalendarViewDate(new Date(currentYear, currentMonthIdx - 1, 1))
  }

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(currentYear, currentMonthIdx + 1, 1))
  }

  const handleSelectDate = (dateObj: Date | null, isPast: boolean) => {
    if (!dateObj || isPast) return
    setSelectedMeetingDate(dateObj)
  }

  // Handle Send OTP
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !fullName || !phone) return

    setIsSendingOtp(true)
    setTimeout(() => {
      setIsSendingOtp(false)
      const randomCode = Math.floor(1000 + Math.random() * 9000).toString()
      setGeneratedOtp(randomCode)
      setOtpValue(['', '', '', ''])
      setOtpError(false)
      setResendTimer(30)
      setCurrentStep('otp')
    }, 700)
  }

  // Handle OTP Input Change
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newOtp = [...otpValue]
    newOtp[index] = val.slice(-1)
    setOtpValue(newOtp)
    setOtpError(false)

    if (val && index < 3) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    const entered = otpValue.join('')
    if (entered === generatedOtp || entered === '4829') {
      setCurrentStep('event_booking')
    } else {
      setOtpError(true)
    }
  }

  const handleAutoFillOtp = () => {
    setOtpValue(generatedOtp.split(''))
    setOtpError(false)
  }

  // Final Meeting Submission
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const refCode = `GLZ-${Math.floor(1000 + Math.random() * 9000)}`
      setBookingRef(refCode)
      setCurrentStep('confirmed')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 850)
  }

  const formattedSelectedDate = useMemo(() => {
    if (!selectedMeetingDate) return 'Select a date below'
    return selectedMeetingDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }, [selectedMeetingDate])

  const navItems = ['About', 'Services', 'Portfolio', 'Testimonials', 'Contact']

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

      {/* Page Header with Top Breadcrumb Navigation */}
      <section className="contact-simple-hero subpage-hero">
        {/* Navigation Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="site-breadcrumbs">
          <a href="/" className="crumb-link">Home</a>
          <span className="crumb-sep">/</span>
          <a href="/services" className="crumb-link">Services</a>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">
            {currentStep === 'details' && 'Inquiry • 01 Identity'}
            {currentStep === 'otp' && 'Inquiry • 02 Verification'}
            {currentStep === 'event_booking' && 'Inquiry • 03 Event & Schedule'}
            {currentStep === 'confirmed' && 'Inquiry • 04 Confirmed'}
          </span>
        </nav>

        <div className="contact-top-row">
          <div className="section-label">
            <span>04</span>
            <span>Direct Commission & Booking</span>
          </div>
          <a href="/" className="back-link">
            <ArrowLeft size={13} /> Back to Home
          </a>
        </div>

        <h1>
          <span className="hero-word-wrap">
            <span className="hero-word hero-word-first">Let&apos;s start a</span>
          </span>
          <br />
          <span className="hero-word-wrap">
            <em className="hero-word hero-word-second">conversation.</em>
          </span>
        </h1>
        <p className="contact-simple-intro">
          Verify your email to explore custom production scale tiers, select your preferred meeting date on our calendar, and schedule directly with our senior event directors.
        </p>
      </section>

      {/* Interactive Main Section */}
      <section className="contact-simple-grid content-section section-rule" data-reveal="section">
        <div className="form-card-container">
          
          {/* ========================================================================= */}
          {/* INTERACTIVE FORM STEP PROGRESS BREADCRUMBS */}
          {/* ========================================================================= */}
          <div className="step-progress-nav" aria-label="Form Progress">
            <button
              type="button"
              className={`progress-step-btn ${currentStep === 'details' ? 'is-active' : ''} ${['otp', 'event_booking', 'confirmed'].includes(currentStep) ? 'is-complete' : ''}`}
              onClick={() => { if (['otp', 'event_booking'].includes(currentStep)) setCurrentStep('details') }}
            >
              <span className="step-circle">{['otp', 'event_booking', 'confirmed'].includes(currentStep) ? '✓' : '1'}</span>
              <span className="step-label-text">Identity</span>
            </button>

            <div className={`progress-line ${['otp', 'event_booking', 'confirmed'].includes(currentStep) ? 'is-active-line' : ''}`} />

            <button
              type="button"
              className={`progress-step-btn ${currentStep === 'otp' ? 'is-active' : ''} ${['event_booking', 'confirmed'].includes(currentStep) ? 'is-complete' : ''}`}
              disabled={currentStep === 'details'}
              onClick={() => { if (currentStep === 'event_booking') setCurrentStep('otp') }}
            >
              <span className="step-circle">{['event_booking', 'confirmed'].includes(currentStep) ? '✓' : '2'}</span>
              <span className="step-label-text">OTP Security</span>
            </button>

            <div className={`progress-line ${['event_booking', 'confirmed'].includes(currentStep) ? 'is-active-line' : ''}`} />

            <button
              type="button"
              className={`progress-step-btn ${currentStep === 'event_booking' ? 'is-active' : ''} ${currentStep === 'confirmed' ? 'is-complete' : ''}`}
              disabled={['details', 'otp'].includes(currentStep)}
            >
              <span className="step-circle">{currentStep === 'confirmed' ? '✓' : '3'}</span>
              <span className="step-label-text">Event & Calendar</span>
            </button>

            <div className={`progress-line ${currentStep === 'confirmed' ? 'is-active-line' : ''}`} />

            <div className={`progress-step-btn ${currentStep === 'confirmed' ? 'is-active is-complete' : ''}`}>
              <span className="step-circle">4</span>
              <span className="step-label-text">Confirmed</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: Basic Identity Information */}
          {/* ========================================================================= */}
          {currentStep === 'details' && (
            <form onSubmit={handleRequestOtp} className="simple-contact-form step-animated-panel">
              <div className="form-card-header">
                <span className="card-step-badge">Step 1 of 2</span>
                <h2>Your Information</h2>
                <p>Enter your contact details. We will send a one-time verification code to authenticate your commission.</p>
              </div>

              <div className="field-group">
                <label htmlFor="name">Full Name *</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Aditya Katyal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="editorial-input"
                  />
                </div>
              </div>

              <div className="form-two-col">
                <div className="field-group">
                  <label htmlFor="contact-phone">Phone / WhatsApp *</label>
                  <div className="input-with-icon">
                    <Phone size={16} className="input-icon" />
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="editorial-input"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="input-icon" />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="editorial-input"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSendingOtp}
                className="button button-dark submit-button animated-btn"
              >
                {isSendingOtp ? (
                  <span>Sending Verification Code...</span>
                ) : (
                  <>
                    <span>Verify Email & Continue</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="privacy-micro-note">
                <ShieldCheck size={14} /> Spam protection: Verified inquiries receive direct calendar scheduling access.
              </p>
            </form>
          )}

          {/* ========================================================================= */}
          {/* STEP 1.5: Email OTP Verification */}
          {/* ========================================================================= */}
          {currentStep === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="simple-contact-form otp-form step-animated-panel">
              <div className="form-card-header">
                <div className="otp-icon-wrapper">
                  <KeyRound size={28} />
                </div>
                <span className="card-step-badge">Security Verification</span>
                <h2>Enter Email OTP</h2>
                <p>
                  We sent a 4-digit code to <strong>{email}</strong>. Please enter it below to verify your identity.
                </p>
              </div>

              <div className="demo-otp-banner">
                <span>Demo Code: <strong>{generatedOtp}</strong></span>
                <button type="button" onClick={handleAutoFillOtp} className="autofill-btn">
                  Auto-fill code
                </button>
              </div>

              <div className="otp-inputs-row">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpInputRefs.current[idx] = el }}
                    type="text"
                    maxLength={1}
                    value={otpValue[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`otp-box ${otpError ? 'is-error' : ''}`}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {otpError && (
                <p className="otp-error-text">Invalid code. Please check the 4-digit code and try again.</p>
              )}

              <button
                type="submit"
                disabled={otpValue.some((v) => !v)}
                className="button button-dark submit-button animated-btn"
              >
                <span>Verify & Proceed to Booking</span>
                <ArrowRight size={15} />
              </button>

              <div className="otp-footer-actions">
                {resendTimer > 0 ? (
                  <span className="resend-countdown">Resend code in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const newCode = Math.floor(1000 + Math.random() * 9000).toString()
                      setGeneratedOtp(newCode)
                      setResendTimer(30)
                      setOtpValue(['', '', '', ''])
                    }}
                    className="text-link-btn"
                  >
                    <RefreshCw size={12} /> Resend Code
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  className="text-link-btn"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: Event Type, Scaled Selector & Theme-Followed Custom Calendar */}
          {/* ========================================================================= */}
          {currentStep === 'event_booking' && (
            <form onSubmit={handleFinalSubmit} className="simple-contact-form step-animated-panel">
              {/* Verified Identity Badge */}
              <div className="verified-user-strip">
                <div>
                  <span className="verified-pill"><CheckCircle2 size={13} /> Email Verified</span>
                  <span className="verified-user-name"><strong>{fullName}</strong> ({email})</span>
                </div>
                <button type="button" onClick={() => setCurrentStep('details')} className="edit-details-link">
                  Edit
                </button>
              </div>

              <div className="form-card-header" style={{ marginTop: '20px' }}>
                <span className="card-step-badge">Step 2 of 2</span>
                <h2>Event Scale & Meeting Schedule</h2>
                <p>Select your event category, choose your production scale, and pick a meeting slot on our calendar.</p>
              </div>

              {/* 1. Event Type Selection */}
              <div className="field-group">
                <label>1. Select Event Type *</label>
                <div className="event-type-pills">
                  {eventTypes.map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      className={`event-pill-btn ${selectedEventType === type.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedEventType(type.id)}
                    >
                      <div className="pill-header-row">
                        <span className="pill-title">{type.label}</span>
                        {selectedEventType === type.id && <Check size={14} className="active-check" />}
                      </div>
                      <span className="pill-desc">{type.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Scaled Production Selector (Luxury Alternative to Raw Budget Numbers) */}
              <div className="field-group" style={{ marginTop: '28px' }}>
                <div className="section-sub-header">
                  <label>2. Production Scale & Footprint *</label>
                  <span className="sub-helper">Select the intended tier of spatial & decor execution</span>
                </div>
                <div className="scale-selector-grid">
                  {productionScales.map((scale) => (
                    <button
                      type="button"
                      key={scale.id}
                      className={`scale-card ${selectedScale === scale.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedScale(scale.id)}
                    >
                      <div className="scale-card-top">
                        <div>
                          <strong>{scale.title}</strong>
                          <span className="capacity-badge">{scale.capacity}</span>
                        </div>
                        <span className={`scale-radio ${selectedScale === scale.id ? 'selected' : ''}`} />
                      </div>
                      <p className="scale-desc">{scale.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Optional Custom Event Brief Notes */}
                <div className="custom-budget-optional">
                  <label htmlFor="custom-vision">Optional: Venue, Theme or Special Requests</label>
                  <input
                    id="custom-vision"
                    type="text"
                    placeholder="e.g. Heritage palace in Rajasthan, specific date window, or floral/acoustic preferences"
                    value={customVisionNote}
                    onChange={(e) => setCustomVisionNote(e.target.value)}
                    className="editorial-input"
                  />
                </div>
              </div>

              {/* 3. Meeting Format Selector */}
              <div className="field-group" style={{ marginTop: '28px' }}>
                <label>3. Consultation Meeting Format *</label>
                <div className="meeting-format-cards">
                  <button
                    type="button"
                    className={`format-card ${meetingType === 'virtual' ? 'is-active' : ''}`}
                    onClick={() => setMeetingType('virtual')}
                  >
                    <div className="format-header">
                      <Video size={18} />
                      <strong>Virtual Video Call</strong>
                    </div>
                    <p>Google Meet / Zoom discovery session with our Lead Event Director.</p>
                  </button>

                  <button
                    type="button"
                    className={`format-card ${meetingType === 'in-person' ? 'is-active' : ''}`}
                    onClick={() => setMeetingType('in-person')}
                  >
                    <div className="format-header">
                      <Building size={18} />
                      <strong>In-Person Studio Meeting</strong>
                    </div>
                    <p>Meet in person at our Delhi Chattarpur Studio or Mumbai Design Suite.</p>
                  </button>
                </div>
              </div>

              {/* 4. Bespoke Theme-Followed Interactive Calendar Picker */}
              <div className="field-group calendar-field-group" style={{ marginTop: '28px' }}>
                <div className="calendar-section-heading">
                  <div>
                    <label>
                      <CalendarIcon size={14} style={{ display: 'inline', marginRight: 6 }} />
                      4. Choose Meeting Date *
                    </label>
                    <span className="selected-date-display">{formattedSelectedDate}</span>
                  </div>
                </div>

                {/* Custom Editorial Theme Calendar */}
                <div className="custom-editorial-calendar">
                  <div className="calendar-nav-bar">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="cal-nav-btn"
                      aria-label="Previous Month"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="cal-current-month">
                      {MONTH_NAMES[currentMonthIdx]} {currentYear}
                    </span>

                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="cal-nav-btn"
                      aria-label="Next Month"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Day Headers (Mo, Tu, We...) */}
                  <div className="cal-day-headers">
                    {DAY_HEADERS.map((dh) => (
                      <span key={dh}>{dh}</span>
                    ))}
                  </div>

                  {/* Day Grid */}
                  <div className="cal-days-grid">
                    {daysInMonth.map((dayItem, idx) => {
                      if (!dayItem.dayNumber) {
                        return <span key={`empty-${idx}`} className="cal-empty-cell" />
                      }

                      return (
                        <button
                          key={`day-${dayItem.dayNumber}`}
                          type="button"
                          disabled={dayItem.isPast}
                          onClick={() => handleSelectDate(dayItem.dateObj, dayItem.isPast)}
                          className={`cal-day-btn ${dayItem.isPast ? 'is-past' : ''} ${dayItem.isSelected ? 'is-selected' : ''} ${dayItem.isToday ? 'is-today' : ''}`}
                        >
                          <span>{dayItem.dayNumber}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* 5. Custom Theme Time Slot Selector */}
              <div className="field-group" style={{ marginTop: '24px' }}>
                <div className="section-sub-header">
                  <label>
                    <Clock size={14} style={{ display: 'inline', marginRight: 6 }} />
                    5. Select Preferred Time Slot (IST) *
                  </label>
                  <span className="sub-helper">45-minute dedicated discovery session</span>
                </div>

                <div className="time-slots-grid">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        className={`time-slot-pill ${isSelected ? 'is-active' : ''}`}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                      >
                        <span className="slot-time">{slot.time}</span>
                        <span className="slot-period">{slot.period}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 6. Special Notes (Optional) */}
              <div className="field-group" style={{ marginTop: '24px' }}>
                <label htmlFor="client-note">Special Notes or Questions (Optional)</label>
                <textarea
                  id="client-note"
                  rows={3}
                  placeholder="Share details on venue preferences, dates, theme ideas, or guest count..."
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  className="editorial-input textarea-input"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !selectedMeetingDate}
                className="button button-dark submit-button animated-btn"
                style={{ marginTop: '20px' }}
              >
                {isSubmitting ? (
                  <span>Scheduling Your Commission Consultation...</span>
                ) : (
                  <>
                    <span>Confirm & Schedule Meeting</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: Confirmed Screen */}
          {/* ========================================================================= */}
          {currentStep === 'confirmed' && (
            <div className="confirmation-card step-animated-panel">
              <div className="confirmed-icon-circle">
                <CheckCircle2 size={36} />
              </div>
              <span className="card-step-badge">Meeting Confirmed</span>
              <h2>Appointment Scheduled</h2>
              <p className="confirmed-sub">
                Thank you, <strong>{fullName}</strong>. Your consultation has been confirmed with our Lead Event Director.
              </p>

              <div className="confirmed-details-box">
                <div className="detail-line">
                  <span>Booking Reference:</span>
                  <strong>{bookingRef}</strong>
                </div>
                <div className="detail-line">
                  <span>Meeting Format:</span>
                  <strong>{meetingType === 'virtual' ? 'Google Meet Video Call' : 'In-Person Studio Meeting'}</strong>
                </div>
                <div className="detail-line">
                  <span>Confirmed Date:</span>
                  <strong>{formattedSelectedDate}</strong>
                </div>
                <div className="detail-line">
                  <span>Confirmed Time:</span>
                  <strong>{selectedTimeSlot}</strong>
                </div>
                <div className="detail-line">
                  <span>Event Category:</span>
                  <strong>{eventTypes.find((e) => e.id === selectedEventType)?.label}</strong>
                </div>
                <div className="detail-line">
                  <span>Production Scale:</span>
                  <strong>{productionScales.find((p) => p.id === selectedScale)?.title}</strong>
                </div>
                {customVisionNote && (
                  <div className="detail-line">
                    <span>Vision & Venue Note:</span>
                    <strong>{customVisionNote}</strong>
                  </div>
                )}
                <div className="detail-line">
                  <span>Calendar Invite:</span>
                  <span className="sent-badge">Dispatched to {email}</span>
                </div>
              </div>

              <div className="confirmed-actions">
                <a href="/" className="button button-dark">
                  Back to Home <ArrowRight size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('details')
                    setOtpValue(['', '', '', ''])
                  }}
                  className="button button-light"
                >
                  Schedule Another Meeting
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="simple-contact-sidebar">
          <div className="sidebar-card">
            <span className="sidebar-header-label">Direct Communication</span>
            <div className="direct-item">
              <strong>Official Desk</strong>
              <a href="mailto:hello@glaizeevents.com" className="sidebar-link">
                <Mail size={13} /> hello@glaizeevents.com
              </a>
            </div>
            <div className="direct-item">
              <strong>Studio Phone / WhatsApp</strong>
              <a href="tel:+911123456789" className="sidebar-link">
                <Phone size={13} /> +91 11 2345 6789
              </a>
            </div>
          </div>

          <div className="sidebar-card">
            <span className="sidebar-header-label">Studio Offices</span>
            <div className="office-item">
              <strong><MapPin size={13} /> Delhi Design Atelier</strong>
              <p>The Dhan Mill, 100 Feet Road, Chattarpur, New Delhi 110074</p>
              <span className="hours-tag">Mon – Sat • 10:00 – 19:00 IST</span>
            </div>
            <div className="office-item" style={{ marginTop: '16px' }}>
              <strong><MapPin size={13} /> Mumbai Meeting Suite</strong>
              <p>Senapati Bapat Marg, Lower Parel, Mumbai 400013</p>
              <span className="hours-tag">By Confirmed Appointment Only</span>
            </div>
          </div>

          <div className="sidebar-card security-note-card">
            <span className="sidebar-header-label">Client Assurance</span>
            <p className="security-text">
              <ShieldCheck size={14} /> All event inquiries, dates, and production scopes are held under strict non-disclosure.
            </p>
          </div>
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
