'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { ArrowRight, ArrowDownRight, CheckCircle2, ShieldCheck, Mail, Phone, Calendar as CalendarIcon, Clock, Video, RefreshCw, KeyRound, User, ChevronLeft, ChevronRight, AlertCircle, MessageSquare } from 'lucide-react'


const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const TIME_PRESETS = [
  '11:00 AM',
  '01:30 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM',
]

export default function ContactPage() {
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

  // Step management: 'details' -> 'otp' -> 'event_booking' -> 'confirmed'
  const [currentStep, setCurrentStep] = useState<'details' | 'otp' | 'event_booking' | 'confirmed'>('details')

  // Step 1: Basic Info
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [step1Error, setStep1Error] = useState('')

  // OTP State
  const [otpValue, setOtpValue] = useState(['', '', '', ''])
  const [generatedOtp, setGeneratedOtp] = useState('4829')
  const [otpError, setOtpError] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Step 2: Event Details & Meeting Preferences
  const [eventType, setEventType] = useState('')
  const [meetingTime, setMeetingTime] = useState('03:30 PM IST')
  const [clientNote, setClientNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Live Database Booked Dates & Slots
  const [bookedSlots, setBookedSlots] = useState<{ date: string; timeSlot: string }[]>([])
  const [bookingApiError, setBookingApiError] = useState('')

  // Custom Theme-Followed Calendar State
  const today = useMemo(() => new Date(), [])
  const [calendarViewDate, setCalendarViewDate] = useState(() => new Date())
  const [selectedMeetingDate, setSelectedMeetingDate] = useState<Date>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    return d
  })

  // Step 3: Confirmation Data
  const [bookingRef, setBookingRef] = useState('')

  // Fetch live booked slots from MongoDB backend
  useEffect(() => {
    async function loadBookedSchedule() {
      try {
        const res = await fetch('/api/booked-dates')
        if (res.ok) {
          const data = await res.json()
          if (data.bookedSlots) {
            setBookedSlots(data.bookedSlots)
          }
        }
      } catch (err) {
        console.warn('Failed to load booked schedule:', err)
      }
    }
    loadBookedSchedule()
  }, [])

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
  }, [])

  // Calendar Helpers
  const currentMonthIdx = calendarViewDate.getMonth()
  const currentYear = calendarViewDate.getFullYear()

  // Format date helper (YYYY-MM-DD)
  const formatDateKey = (d: Date) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const daysInMonth = useMemo(() => {
    const totalDays = new Date(currentYear, currentMonthIdx + 1, 0).getDate()
    let firstDayIndex = new Date(currentYear, currentMonthIdx, 1).getDay()
    firstDayIndex = (firstDayIndex + 6) % 7

    const days: {
      dayNumber: number | null
      dateObj: Date | null
      isPast: boolean
      isSelected: boolean
      isToday: boolean
      isFullyBooked: boolean
      availableSlotsCount: number
    }[] = []

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        dayNumber: null,
        dateObj: null,
        isPast: false,
        isSelected: false,
        isToday: false,
        isFullyBooked: false,
        availableSlotsCount: 0,
      })
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(currentYear, currentMonthIdx, d)
      const isPast = dateObj.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
      const isSelected = !!selectedMeetingDate &&
        selectedMeetingDate.getFullYear() === currentYear &&
        selectedMeetingDate.getMonth() === currentMonthIdx &&
        selectedMeetingDate.getDate() === d
      const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonthIdx && today.getDate() === d
      
      const key = formatDateKey(dateObj)
      const bookedCount = bookedSlots.filter((slot) => slot.date === key).length
      const availableSlotsCount = Math.max(0, 6 - bookedCount)
      const isFullyBooked = availableSlotsCount === 0

      days.push({ dayNumber: d, dateObj, isPast, isSelected, isToday, isFullyBooked, availableSlotsCount })
    }

    return days
  }, [currentYear, currentMonthIdx, selectedMeetingDate, today, bookedSlots])

  const handlePrevMonth = () => {
    setCalendarViewDate(new Date(currentYear, currentMonthIdx - 1, 1))
  }

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(currentYear, currentMonthIdx + 1, 1))
  }

  const handleSelectDate = (dateObj: Date | null, isPast: boolean, isFullyBooked: boolean) => {
    if (!dateObj || isPast || isFullyBooked) return
    setSelectedMeetingDate(dateObj)
    setBookingApiError('')
  }

  // Handle Send OTP via Backend API
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep1Error('')
    if (!email || !fullName || !phone) return

    setIsSendingOtp(true)
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        setStep1Error(data.error || 'Failed to send verification code. Please try again.')
        setIsSendingOtp(false)
        return
      }

      if (data.demoCode) {
        setGeneratedOtp(data.demoCode)
      }
      setOtpValue(['', '', '', ''])
      setOtpError('')
      setResendTimer(30)
      setCurrentStep('otp')
    } catch (err: any) {
      setStep1Error(err?.message || 'Network error. Please try again.')
    } finally {
      setIsSendingOtp(false)
    }
  }

  // Handle OTP Input Change
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newOtp = [...otpValue]
    newOtp[index] = val.slice(-1)
    setOtpValue(newOtp)
    setOtpError('')

    if (val && index < 3) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Verify OTP via Backend API
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const entered = otpValue.join('')
    if (entered.length < 4) return

    setIsVerifyingOtp(true)
    setOtpError('')

    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: entered }),
      })

      const data = await response.json()
      if (response.ok && data.verified) {
        setCurrentStep('event_booking')
      } else {
        setOtpError(data.error || 'Invalid verification code. Please check and try again.')
      }
    } catch (err: any) {
      setOtpError('Failed to verify code. Please check your connection and try again.')
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleAutoFillOtp = () => {
    setOtpValue(generatedOtp.split(''))
    setOtpError('')
  }

  // Final Meeting Submission via Backend API
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMeetingDate || !eventType.trim()) return

    setIsSubmitting(true)
    setBookingApiError('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          selectedEventType: eventType.trim(),
          selectedScale: 'Bespoke Production Scope',
          meetingType: 'virtual',
          meetingDate: selectedMeetingDate.toISOString(),
          timeSlot: meetingTime.trim() || '11:00 AM IST',
          clientNote: clientNote.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setBookingApiError(data.error || 'Unable to schedule consultation. Please check the details and retry.')
        setIsSubmitting(false)
        return
      }

      setBookingRef(data.bookingRef || `GLZ-${Math.floor(1000 + Math.random() * 9000)}`)
      setCurrentStep('confirmed')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setBookingApiError(err?.message || 'Network error while confirming your consultation. Please retry.')
    } finally {
      setIsSubmitting(false)
    }
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

      {/* Page Header with Top Breadcrumb Navigation (100dvh centered fold) */}
      <section className="contact-simple-hero subpage-hero" id="top">
        <div className="hero-content-wrap">
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

          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span>04</span>
            <span>Direct Commission & Booking</span>
          </div>

          <h1>
            <span className="hero-word-wrap">
              <span className="hero-word hero-word-first">Let&apos;s start a</span>
            </span>
            <br />
            <span className="hero-word-wrap">
              <em className="hero-word hero-word-second font-editorial">conversation.</em>
            </span>
          </h1>

          <p className="contact-simple-intro">
            Verify your email, tell us about your occasion, select your preferred date on our calendar, and schedule directly with our <span className="font-editorial">lead event directors</span>.
          </p>

          <div className="button-row hero-buttons" style={{ marginTop: '24px' }}>
            <a href="#inquiry-form" className="button button-dark hero-btn">
              Begin Inquiry <ArrowRight size={13} />
            </a>
            <a href="mailto:Glaizevents@gmail.com" className="button button-light hero-btn">
              Email Directly <ArrowDownRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Main Section */}
      <section className="contact-simple-grid content-section section-rule" id="inquiry-form" data-reveal="section">
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
              <span className="step-label-text">Event & Schedule</span>
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

              {step1Error && (
                <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#fca5a5', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={15} />
                  <span>{step1Error}</span>
                </div>
              )}

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
                <p className="otp-error-text">{otpError}</p>
              )}

              <button
                type="submit"
                disabled={isVerifyingOtp || otpValue.some((v) => !v)}
                className="button button-dark submit-button animated-btn"
              >
                {isVerifyingOtp ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Verify & Proceed to Booking</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <div className="otp-footer-actions">
                {resendTimer > 0 ? (
                  <span className="resend-countdown">Resend code in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleRequestOtp}
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
          {/* STEP 2: Manual Event Type & Custom Theme-Followed Calendar & Timing */}
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

              {bookingApiError && (
                <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#fca5a5', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={15} />
                  <span>{bookingApiError}</span>
                </div>
              )}

              <div className="form-card-header" style={{ marginTop: '20px' }}>
                <span className="card-step-badge">Step 2 of 2</span>
                <h2>Event Details & Virtual Schedule</h2>
                <p>Provide your event occasion, choose a preferred date on our calendar, and specify your meeting time.</p>
              </div>

              {/* Virtual Consultation Notice Pill */}
              <div style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '14px 18px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(154, 111, 68, 0.15)', border: '1px solid var(--accent)', display: 'grid', placeItems: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  <Video size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--heading)', display: 'block' }}>Virtual Discovery Session</strong>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Discovery meetings are conducted via Google Meet with our Lead Event Director.</span>
                </div>
              </div>

              {/* 1. Manual Event Type Input */}
              <div className="field-group">
                <label htmlFor="event-type">1. Event Type / Occasion *</label>
                <input
                  id="event-type"
                  type="text"
                  required
                  placeholder="e.g. 3-Day Royal Wedding in Rajasthan, Tech Leadership Summit, Private Birthday Gala..."
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="editorial-input"
                />
              </div>

              {/* 2. Bespoke Theme-Followed Interactive Calendar Picker */}
              <div className="field-group calendar-field-group" style={{ marginTop: '28px' }}>
                <div className="calendar-section-heading">
                  <div>
                    <label>
                      <CalendarIcon size={14} style={{ display: 'inline', marginRight: 6 }} />
                      2. Choose Meeting Date *
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
                          disabled={dayItem.isPast || dayItem.isFullyBooked}
                          onClick={() => handleSelectDate(dayItem.dateObj, dayItem.isPast, dayItem.isFullyBooked)}
                          className={`cal-day-btn ${dayItem.isPast ? 'is-past' : ''} ${dayItem.isFullyBooked ? 'is-fully-booked' : ''} ${dayItem.isSelected ? 'is-selected' : ''} ${dayItem.isToday ? 'is-today' : ''}`}
                          title={dayItem.isFullyBooked ? 'All slots booked for this date' : `${dayItem.availableSlotsCount}/6 slots available`}
                        >
                          <span className="cal-day-num">{dayItem.dayNumber}</span>
                          {!dayItem.isPast && (
                            <span className={`cal-slot-badge ${dayItem.isFullyBooked ? 'is-full' : dayItem.availableSlotsCount < 6 ? 'is-limited' : ''}`}>
                              {dayItem.isFullyBooked ? 'FULL' : `${dayItem.availableSlotsCount}/6`}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Manual Meeting Time Input + Quick Presets */}
              <div className="field-group" style={{ marginTop: '28px' }}>
                <div className="section-sub-header">
                  <label htmlFor="meeting-time">
                    <Clock size={14} style={{ display: 'inline', marginRight: 6 }} />
                    3. Preferred Meeting Time (IST) *
                  </label>
                  <span className="sub-helper">Type your preferred time or click a preset below</span>
                </div>

                <div className="input-with-icon" style={{ marginTop: '8px' }}>
                  <Clock size={16} className="input-icon" />
                  <input
                    id="meeting-time"
                    type="text"
                    required
                    placeholder="e.g. 03:30 PM IST, 11:00 AM, or 18:00"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="editorial-input"
                  />
                </div>

                {/* Quick Time Presets */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                  {TIME_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMeetingTime(`${preset} IST`)}
                      style={{
                        background: meetingTime.includes(preset) ? 'var(--ink)' : 'var(--paper)',
                        color: meetingTime.includes(preset) ? 'var(--paper)' : 'var(--ink)',
                        border: '1px solid var(--line)',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'all .15s ease',
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Special Notes & Venue/Vision Details (Optional) */}
              <div className="field-group" style={{ marginTop: '24px' }}>
                <label htmlFor="client-note">4. Vision, Venue & Special Requests (Optional)</label>
                <textarea
                  id="client-note"
                  rows={3}
                  placeholder="Share details on your intended venue, guest count, aesthetic theme, or questions..."
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  className="editorial-input textarea-input"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !selectedMeetingDate || !eventType.trim() || !meetingTime.trim()}
                className="button button-dark submit-button animated-btn"
                style={{ marginTop: '20px' }}
              >
                {isSubmitting ? (
                  <span>Scheduling Your Virtual Consultation...</span>
                ) : (
                  <>
                    <span>Confirm & Schedule Virtual Meeting</span>
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
                Thank you, <strong>{fullName}</strong>. Your virtual discovery consultation has been confirmed with our Lead Event Director.
              </p>

              <div className="confirmed-details-box">
                <div className="detail-line">
                  <span>Booking Reference:</span>
                  <strong>{bookingRef}</strong>
                </div>
                <div className="detail-line">
                  <span>Meeting Format:</span>
                  <strong>Virtual Discovery Call (Google Meet)</strong>
                </div>
                <div className="detail-line">
                  <span>Confirmed Date:</span>
                  <strong>{formattedSelectedDate}</strong>
                </div>
                <div className="detail-line">
                  <span>Confirmed Time:</span>
                  <strong>{meetingTime}</strong>
                </div>
                <div className="detail-line">
                  <span>Event Occasion:</span>
                  <strong>{eventType}</strong>
                </div>
                {clientNote && (
                  <div className="detail-line">
                    <span>Vision & Venue Note:</span>
                    <strong>{clientNote}</strong>
                  </div>
                )}
                <div className="detail-line">
                  <span>Calendar & Video Invite:</span>
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
                    setEventType('')
                  }}
                  className="button button-light"
                >
                  Schedule Another Meeting
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar — Clean Direct & Virtual Focus */}
        <div className="simple-contact-sidebar">
          <div className="sidebar-card">
            <span className="sidebar-header-label">Direct Communication</span>
            <div className="direct-item">
              <strong>Official Desk</strong>
              <a href="mailto:Glaizevents@gmail.com" className="sidebar-link">
                <Mail size={13} /> Glaizevents@gmail.com
              </a>
            </div>
            <div className="direct-item">
              <strong>Studio Phone / WhatsApp</strong>
              <a href="tel:+917982067406" className="sidebar-link">
                <Phone size={13} /> +91 79820 67406
              </a>
            </div>
            <div className="direct-item">
              <strong>Instagram Atelier</strong>
              <a href="https://www.instagram.com/glaizevents" target="_blank" rel="noopener noreferrer" className="sidebar-link">
                <MessageSquare size={13} /> @glaizevents ↗
              </a>
            </div>
          </div>

          <div className="sidebar-card">
            <span className="sidebar-header-label">Virtual Atelier</span>
            <div className="office-item">
              <strong><Video size={13} /> Seamless Online Discovery</strong>
              <p>We work with clients across India and globally, orchestrating destination productions through dedicated virtual creative direction sessions.</p>
              <span className="hours-tag">Available Worldwide • By Confirmed Booking</span>
            </div>
          </div>

          <div className="sidebar-card security-note-card">
            <span className="sidebar-header-label">Client Assurance</span>
            <p className="security-text">
              <ShieldCheck size={14} /> All event inquiries, dates, budgets, and production scopes are held under strict non-disclosure.
            </p>
          </div>
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
