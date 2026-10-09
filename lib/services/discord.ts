/**
 * GLAIZ EVENTS — Luxury Discord Webhook Notification Service
 * Dispatches beautifully structured luxury embed alerts whenever a new inquiry or consultation is booked.
 */

interface DiscordBookingPayload {
  bookingRef: string
  fullName: string
  phone: string
  email: string
  eventType: string
  eventScale: string
  meetingType: 'virtual' | 'in-person'
  meetingDate: string
  timeSlot: string
  customVisionNote?: string
  clientNote?: string
}

export async function sendDiscordBookingNotification(data: DiscordBookingPayload): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('[Discord Webhook] DISCORD_WEBHOOK_URL not configured. Skipping webhook notification.')
    return false
  }

  const embed = {
    title: `✨ New Commission Inquiry: ${data.bookingRef}`,
    description: `A new client has authenticated and booked a consultation with Glaiz Events Atelier.`,
    color: 0x9A6F44, // Glaiz Warm Bronze/Gold (#9A6F44)
    fields: [
      {
        name: '👤 Client Name',
        value: `**${data.fullName}**`,
        inline: true,
      },
      {
        name: '📞 Phone / WhatsApp',
        value: `\`${data.phone}\``,
        inline: true,
      },
      {
        name: '✉️ Email',
        value: `\`${data.email}\``,
        inline: true,
      },
      {
        name: '📅 Appointment Date',
        value: `**${data.meetingDate}**`,
        inline: true,
      },
      {
        name: '⏰ Time Slot (IST)',
        value: `**${data.timeSlot}**`,
        inline: true,
      },
      {
        name: '📍 Format',
        value: data.meetingType === 'virtual' ? '🎥 Google Meet Video Call' : '🏛️ In-Person Studio Meeting',
        inline: true,
      },
      {
        name: '🎭 Event Category',
        value: data.eventType,
        inline: true,
      },
      {
        name: '📐 Production Scale',
        value: data.eventScale,
        inline: true,
      },
      {
        name: '🏷️ Booking Reference',
        value: `\`${data.bookingRef}\``,
        inline: true,
      },
    ],
    footer: {
      text: 'Glaiz Events Atelier • Direct Booking System',
      icon_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=64&q=80',
    },
    timestamp: new Date().toISOString(),
  }

  if (data.customVisionNote) {
    embed.fields.push({
      name: '🏛️ Venue / Vision Notes',
      value: `> ${data.customVisionNote}`,
      inline: false,
    })
  }

  if (data.clientNote) {
    embed.fields.push({
      name: '📝 Special Requests / Questions',
      value: `> ${data.clientNote}`,
      inline: false,
    })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Glaiz Events Atelier Concierge',
        avatar_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=128&q=80',
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Discord Webhook] Failed to send notification:', response.status, errorText)
      return false
    }

    return true
  } catch (err) {
    console.error('[Discord Webhook] Network error dispatching notification:', err)
    return false
  }
}
