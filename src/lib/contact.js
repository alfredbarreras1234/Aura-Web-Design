export const BUSINESS_PHONE = '+503 6966-2264'
export const PHONE_LINK = 'tel:+50369662264'
export const WHATSAPP_LINK = 'https://wa.me/50369662264'
export const CONTACT_MESSAGES_KEY = 'aura_contact_messages'
export const ADMIN_SESSION_KEY = 'aura_admin_session'

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
