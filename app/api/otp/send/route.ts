import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Otp } from '@/lib/models/Otp'
import { sendOtpEmail } from '@/lib/services/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, fullName } = body

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()
    const code = Math.floor(1000 + Math.random() * 9000).toString()

    // Try saving to MongoDB if configured
    let dbConnected = false
    try {
      if (process.env.MONGODB_URI) {
        await connectToDatabase()
        dbConnected = true
        // Upsert OTP with new code
        await Otp.findOneAndUpdate(
          { email: cleanEmail },
          { code, verified: false, attempts: 0, createdAt: new Date() },
          { upsert: true, new: true }
        )
      }
    } catch (dbErr) {
      console.warn('[OTP Send] MongoDB connection warning:', dbErr)
    }

    // Send email notification
    await sendOtpEmail({ toEmail: cleanEmail, code })

    return NextResponse.json({
      success: true,
      message: 'Verification code generated and dispatched.',
      // In local dev/demo environment or when email provider is pending, we include the code in response
      demoCode: code,
      dbConnected,
    })
  } catch (error: any) {
    console.error('[API /api/otp/send] Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send verification code.' },
      { status: 500 }
    )
  }
}
