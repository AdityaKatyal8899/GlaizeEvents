import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IInquiry extends Document {
  bookingRef: string
  fullName: string
  phone: string
  email: string
  selectedEventType: string
  selectedScale: string
  customVisionNote?: string
  meetingType: 'virtual' | 'in-person'
  meetingDate: Date
  timeSlot: string
  clientNote?: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  discordNotificationSent: boolean
  emailNotificationSent: boolean
  createdAt: Date
  updatedAt: Date
}

const InquirySchema = new Schema<IInquiry>(
  {
    bookingRef: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    selectedEventType: {
      type: String,
      required: [true, 'Event type or occasion is required'],
      trim: true,
    },
    selectedScale: {
      type: String,
      trim: true,
      default: 'Bespoke Production Scope',
    },
    customVisionNote: {
      type: String,
      trim: true,
      default: '',
    },
    meetingType: {
      type: String,
      enum: ['virtual', 'online'],
      default: 'virtual',
    },
    meetingDate: {
      type: Date,
      required: [true, 'Meeting date is required'],
      index: true,
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    clientNote: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'completed', 'cancelled'],
      default: 'confirmed',
      index: true,
    },
    discordNotificationSent: {
      type: Boolean,
      default: false,
    },
    emailNotificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Prevent duplicate appointment bookings for the exact same date & time slot
InquirySchema.index({ meetingDate: 1, timeSlot: 1, status: 1 })

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema)
