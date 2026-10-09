import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOtp extends Document {
  email: string
  code: string
  verified: boolean
  attempts: number
  createdAt: Date
}

const OtpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // MongoDB TTL index: Documents automatically expire and delete after 5 minutes (300 seconds)
    },
  },
  {
    timestamps: false,
  }
)

export const Otp: Model<IOtp> =
  mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema)
