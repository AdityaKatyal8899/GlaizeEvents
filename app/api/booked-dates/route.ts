import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Inquiry } from '@/lib/models/Inquiry'

export async function GET(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      // In standalone/mock mode, return initial sample booked dates for UI demonstration
      const today = new Date()
      const sampleBookedDate1 = new Date(today)
      sampleBookedDate1.setDate(today.getDate() + 5)
      
      const sampleBookedDate2 = new Date(today)
      sampleBookedDate2.setDate(today.getDate() + 8)

      return NextResponse.json({
        success: true,
        source: 'mock',
        bookedSlots: [
          {
            date: sampleBookedDate1.toISOString().split('T')[0],
            timeSlot: '02:00 PM – 02:45 PM',
          },
          {
            date: sampleBookedDate2.toISOString().split('T')[0],
            timeSlot: '11:00 AM – 11:45 AM',
          },
        ],
      })
    }

    await connectToDatabase()

    // Fetch all confirmed active bookings from today onwards
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const confirmedInquiries = await Inquiry.find({
      meetingDate: { $gte: today },
      status: { $in: ['confirmed', 'pending'] },
    }).select('meetingDate timeSlot status bookingRef')

    const bookedSlots = confirmedInquiries.map((item) => ({
      date: new Date(item.meetingDate).toISOString().split('T')[0],
      timeSlot: item.timeSlot,
      status: item.status,
    }))

    return NextResponse.json({
      success: true,
      source: 'database',
      bookedSlots,
    })
  } catch (error: any) {
    console.error('[API /api/booked-dates] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve booked schedule.' },
      { status: 500 }
    )
  }
}
