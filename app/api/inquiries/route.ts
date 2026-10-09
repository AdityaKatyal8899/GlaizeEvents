import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Inquiry } from '@/lib/models/Inquiry'
import { sendDiscordBookingNotification } from '@/lib/services/discord'
import { sendBookingConfirmationEmail } from '@/lib/services/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName,
      phone,
      email,
      selectedEventType,
      selectedScale,
      customVisionNote,
      meetingType,
      meetingDate,
      timeSlot,
      clientNote,
    } = body

    if (!fullName || !phone || !email || !meetingDate || !timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required consultation details.' },
        { status: 400 }
      )
    }

    const meetingDateObj = new Date(meetingDate)
    const bookingRef = `GLZ-${Math.floor(1000 + Math.random() * 9000)}`

    // Human-readable date string for email & discord notifications
    const formattedDate = meetingDateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

    const eventLabel = selectedEventType?.trim() || 'Bespoke Event'
    const scaleLabel = selectedScale?.trim() || 'Bespoke Production Scope'


    let savedRecord = null
    let dbSaved = false

    // 1. Save to MongoDB if connection string configured
    if (process.env.MONGODB_URI) {
      try {
        await connectToDatabase()

        // Check if date + slot is already taken
        const existingBooking = await Inquiry.findOne({
          meetingDate: meetingDateObj,
          timeSlot,
          status: { $in: ['confirmed', 'pending'] },
        })

        if (existingBooking) {
          return NextResponse.json(
            {
              success: false,
              error: 'This specific date and time slot has already been reserved. Please select another slot on our calendar.',
            },
            { status: 409 }
          )
        }

        savedRecord = await Inquiry.create({
          bookingRef,
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          selectedEventType: selectedEventType || 'wedding',
          selectedScale: selectedScale || 'signature',
          customVisionNote: customVisionNote?.trim() || '',
          meetingType: meetingType || 'virtual',
          meetingDate: meetingDateObj,
          timeSlot,
          clientNote: clientNote?.trim() || '',
          status: 'confirmed',
          discordNotificationSent: false,
          emailNotificationSent: false,
        })

        dbSaved = true
      } catch (dbErr) {
        console.warn('[Inquiries API] MongoDB persistence warning:', dbErr)
      }
    }

    // 2. Dispatch Discord Webhook in background
    sendDiscordBookingNotification({
      bookingRef,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      eventType: eventLabel,
      eventScale: scaleLabel,
      meetingType: meetingType || 'virtual',
      meetingDate: formattedDate,
      timeSlot,
      customVisionNote: customVisionNote?.trim(),
      clientNote: clientNote?.trim(),
    }).then(async (discordOk) => {
      if (discordOk && savedRecord) {
        try {
          await Inquiry.findByIdAndUpdate(savedRecord._id, { discordNotificationSent: true })
        } catch {}
      }
    }).catch((err) => console.error('[Discord Webhook Error]:', err))

    // 3. Dispatch Luxury Email Confirmation in background
    sendBookingConfirmationEmail({
      toEmail: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      bookingRef,
      meetingDate: formattedDate,
      timeSlot,
      meetingType: meetingType || 'virtual',
      eventType: eventLabel,
      eventScale: scaleLabel,
      customVisionNote: customVisionNote?.trim(),
    }).then(async (emailOk) => {
      if (emailOk && savedRecord) {
        try {
          await Inquiry.findByIdAndUpdate(savedRecord._id, { emailNotificationSent: true })
        } catch {}
      }
    }).catch((err) => console.error('[Email Dispatch Error]:', err))

    return NextResponse.json({
      success: true,
      bookingRef,
      message: 'Consultation appointment successfully confirmed.',
      dbSaved,
      booking: {
        bookingRef,
        fullName,
        email,
        phone,
        meetingDate: formattedDate,
        timeSlot,
        meetingType,
        eventType: eventLabel,
        eventScale: scaleLabel,
      },
    })
  } catch (error: any) {
    console.error('[API /api/inquiries] Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to confirm consultation.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        inquiries: [],
      })
    }

    await connectToDatabase()
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries,
    })
  } catch (error: any) {
    console.error('[API /api/inquiries GET] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}
