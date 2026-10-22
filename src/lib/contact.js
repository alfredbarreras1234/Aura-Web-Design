export const BUSINESS_PHONE = '+503 6966-2264'
export const PHONE_LINK = 'tel:+50369662264'
export const WHATSAPP_LINK = 'https://wa.me/50369662264'
export const CONTACT_EMAIL = 'alfredbarreras1234@gmail.com'
export const CONTACT_MESSAGES_KEY = 'aura_contact_messages'
export const ADMIN_SESSION_KEY = 'aura_admin_session'

export async function sendContactEmail(message) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: message.name,
      email: message.email,
      _replyto: message.email,
      subject: message.subject,
      message: message.message,
      _subject: `Nuevo mensaje de Aura Web Design: ${message.subject}`,
      _template: 'table',
    }),
  })

  const result = await response.json()
  if (!response.ok || (result.success !== true && result.success !== 'true')) {
    throw new Error(result.message || `El servicio de correo respondió con ${response.status}.`)
  }
}

export function getAdminPassword() {
  return import.meta.env.VITE_ADMIN_PASSWORD || 'aura2025'
}

export function getStoredMessages() {
  try {
    const raw = localStorage.getItem(CONTACT_MESSAGES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    return []
  }
}

export function saveContactMessage(message) {
  try {
    const stored = getStoredMessages()
    const next = [
      ...stored,
      {
        ...message,
        created_at: message.created_at || new Date().toISOString(),
      },
    ]
    localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(next))
    return next
  } catch (error) {
    return [message]
  }
}
