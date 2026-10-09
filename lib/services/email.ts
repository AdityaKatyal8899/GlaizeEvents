import nodemailer, { type Transporter } from 'nodemailer'

/**
 * GLAIZ EVENTS — Luxury Client Email Notification Service
 * Dispatches luxury confirmation emails and OTP verification codes.
 * Supports:
 * 1. Standard SMTP (Gmail App Password, Zoho, Outlook, Amazon SES, Custom cPanel)
 * 2. Resend API Key (HTTP REST)
 * 3. Safe Dev/Demo Console Fallback
 */

interface SendOtpParams {
  toEmail: string
  code: string
}

interface SendConfirmationParams {
  toEmail: string
  fullName: string
  bookingRef: string
  meetingDate: string
  timeSlot: string
  meetingType: 'virtual' | 'in-person'
  eventType: string
  eventScale?: string
  customVisionNote?: string
}

// Configuration from environment variables
const SMTP_HOST = process.env.SMTP_HOST || (process.env.SMTP_USER?.includes('@gmail.com') ? 'smtp.gmail.com' : '')
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465

const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM || (SMTP_USER ? `Glaiz Events <${SMTP_USER}>` : 'Glaiz Events <Glaizevents@gmail.com>')
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'Glaizevents@gmail.com'

/**
 * Creates a cached nodemailer transport instance if SMTP credentials are provided
 */
let transporter: Transporter | null = null

function getTransporter(): Transporter | null {
  if (transporter) return transporter

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
    return transporter
  }

  return null
}

/**
 * Unified internal mail dispatcher
 */
async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }): Promise<boolean> {
  const mailer = getTransporter()

  // 1. Try Nodemailer SMTP if configured
  if (mailer) {
    try {
      const info = await mailer.sendMail({
        from: EMAIL_FROM,
        to,
        subject,
        html,
      })
      console.log(`[Email Service - SMTP Success] Message sent to ${to}: ${info.messageId}`)
      return true
    } catch (err: any) {
      console.error(`[Email Service - SMTP Error] Failed to send to ${to}:`, err?.message || err)
    }
  }

  // 2. Try Resend API if configured
  if (RESEND_API_KEY) {
    return sendViaResend({ to, subject, html })
  }

  // 3. Dev / Staging Simulation Fallback
  console.log(`[Email Service - Local Simulation] To: ${to} | Subject: "${subject}"`)
  return true
}

/**
 * Dispatch 4-digit security OTP code email
 */
export async function sendOtpEmail({ toEmail, code }: SendOtpParams): Promise<boolean> {
  const subject = `Your Verification Code: ${code} — Glaiz Events`
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3eee5; color: #26201c; margin: 0; padding: 40px 20px; }
          .container { max-width: 540px; margin: 0 auto; background-color: #eae4d8; border: 1px solid #b7afa4; border-radius: 12px; padding: 36px; box-shadow: 0 4px 20px rgba(37,37,34,0.08); }
          .logo { font-size: 20px; font-weight: 700; letter-spacing: 0.12em; color: #4e301f; text-transform: uppercase; margin-bottom: 24px; border-bottom: 1px solid #b7afa4; padding-bottom: 16px; }
          .logo span { font-weight: 400; opacity: 0.8; }
          h1 { font-size: 24px; font-weight: 600; margin: 0 0 16px; color: #4e301f; }
          p { font-size: 15px; line-height: 1.6; color: #26201c; margin: 0 0 24px; }
          .code-box { background: #4e301f; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0; letter-spacing: 0.3em; font-size: 32px; font-weight: 700; color: #f3eee5; }
          .footer { font-size: 12px; color: #76685c; margin-top: 32px; border-top: 1px solid #b7afa4; padding-top: 16px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">GLAIZ <span>EVENTS</span></div>
          <h1>Security Verification</h1>
          <p>You requested access to book a consultation with our Lead Event Director. Please enter the one-time verification code below to authenticate your inquiry:</p>
          <div class="code-box">${code}</div>
          <p style="font-size: 13px; color: #76685c;">This security code expires in 5 minutes. If you did not make this request, you can safely disregard this email.</p>
          <div class="footer">
            Glaiz Events • Luxury Event Planning & Production<br>
            Worldwide • Glaizevents@gmail.com • +91 79820 67406
          </div>
        </div>
      </body>
    </html>
  `

  return sendMail({ to: toEmail, subject, html })
}

/**
 * Dispatch Luxury Consultation Confirmation to Client & Alert to Studio
 */
export async function sendBookingConfirmationEmail(data: SendConfirmationParams): Promise<boolean> {
  const subject = `Consultation Confirmed: ${data.bookingRef} — Glaiz Events Atelier`
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3eee5; color: #26201c; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #eae4d8; border: 1px solid #b7afa4; border-radius: 14px; padding: 40px; box-shadow: 0 4px 20px rgba(37,37,34,0.08); }
          .logo { font-size: 22px; font-weight: 700; letter-spacing: 0.14em; color: #4e301f; text-transform: uppercase; margin-bottom: 24px; border-bottom: 1px solid #b7afa4; padding-bottom: 18px; }
          .logo span { font-weight: 400; opacity: 0.8; }
          .badge { display: inline-block; background: #4e301f; color: #f3eee5; font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
          h1 { font-size: 26px; font-weight: 600; margin: 0 0 12px; color: #4e301f; }
          p { font-size: 15px; line-height: 1.6; color: #26201c; margin: 0 0 24px; }
          .summary-card { background: #f3eee5; border: 1px solid #b7afa4; border-radius: 10px; padding: 24px; margin: 24px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #dfd7c8; font-size: 14px; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #76685c; }
          .detail-value { font-weight: 600; color: #26201c; text-align: right; }
          .btn-primary { display: inline-block; background: #4e301f; color: #f3eee5 !important; text-decoration: none; font-size: 13px; font-weight: 700; padding: 14px 28px; border-radius: 6px; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.08em; }
          .footer { font-size: 12px; color: #76685c; margin-top: 36px; border-top: 1px solid #b7afa4; padding-top: 20px; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">GLAIZ <span>EVENTS</span></div>
          <span class="badge">Appointment Scheduled</span>
          <h1>We look forward to meeting you, ${data.fullName}.</h1>
          <p>Your discovery consultation has been confirmed with our senior production and creative team.</p>
          
          <div class="summary-card">
            <div class="detail-row">
              <span class="detail-label">Booking Reference</span>
              <span class="detail-value" style="color: #9a6f44; font-family: monospace; font-weight: 700;">${data.bookingRef}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date</span>
              <span class="detail-value">${data.meetingDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time Slot</span>
              <span class="detail-value">${data.timeSlot}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Format</span>
              <span class="detail-value">🎥 Virtual Discovery Call (Google Meet)</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Event Occasion</span>
              <span class="detail-value">${data.eventType}</span>
            </div>
            ${data.customVisionNote ? `
              <div class="detail-row">
                <span class="detail-label">Vision & Notes</span>
                <span class="detail-value">${data.customVisionNote}</span>
              </div>
            ` : ''}
          </div>

          <p style="font-size: 14px; color: #26201c;">
            A calendar invitation (.ics) and Google Meet video link will be shared prior to the session. If you need to reschedule or have urgent production notes, simply reply directly to this email.
          </p>

          <div class="footer">
            <strong>Glaiz Events</strong><br>
            Worldwide Luxury Event Planning & Production<br>
            Direct: +91 79820 67406 • <a href="mailto:Glaizevents@gmail.com" style="color: #9a6f44; text-decoration: none;">Glaizevents@gmail.com</a>
          </div>
        </div>
      </body>
    </html>
  `

  // 1. Send confirmation to client
  await sendMail({ to: data.toEmail, subject, html })

  // 2. Also send notification to Studio Director
  await sendMail({
    to: ADMIN_EMAIL,
    subject: `[NEW BOOKING] ${data.fullName} — ${data.meetingDate} (${data.eventType})`,
    html: `
      <h2>New Consultation Booked</h2>
      <p><strong>Client:</strong> ${data.fullName} (${data.toEmail})</p>
      <p><strong>Ref:</strong> ${data.bookingRef}</p>
      <p><strong>Date & Time:</strong> ${data.meetingDate} at ${data.timeSlot}</p>
      <p><strong>Occasion:</strong> ${data.eventType}</p>
      ${data.customVisionNote ? `<p><strong>Notes:</strong> ${data.customVisionNote}</p>` : ''}
    `
  })

  return true
}

/**
 * Resend REST API Client Fallback
 */
async function sendViaResend({ to, subject, html }: { to: string; subject: string; html: string }): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to,
        subject,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[Resend API Error]:', err)
      return false
    }

    return true
  } catch (error) {
    console.error('[Resend API Network Error]:', error)
    return false
  }
}
