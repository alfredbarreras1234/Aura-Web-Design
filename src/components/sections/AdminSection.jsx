import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
import {
  ADMIN_EMAIL,
  ADMIN_SESSION_KEY,
  getAdminPassword,
  getStoredMessages,
} from '../../lib/contact.js'

const ADMIN_LOGIN_KEY = ADMIN_SESSION_KEY

function formatDate(value) {
  if (!value) return 'Fecha no disponible'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default function AdminSection() {
  const [email, setEmail] = useState(ADMIN_EMAIL || '')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(ADMIN_LOGIN_KEY) === 'true'
  })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const totalMessages = messages.length
  const latestMessage = messages[0]

  useEffect(() => {
    if (!supabase) return

    const syncSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const allowed = ADMIN_EMAIL && session?.user?.email?.toLowerCase() === ADMIN_EMAIL
      if (allowed) {
        setIsLoggedIn(true)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(ADMIN_LOGIN_KEY, 'true')
        }
      } else if (typeof window !== 'undefined') {
        window.localStorage.removeItem(ADMIN_LOGIN_KEY)
      }
    }

    syncSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const allowed = ADMIN_EMAIL && session?.user?.email?.toLowerCase() === ADMIN_EMAIL
      setIsLoggedIn(Boolean(allowed))
      if (allowed && typeof window !== 'undefined') {
        window.localStorage.setItem(ADMIN_LOGIN_KEY, 'true')
      } else if (typeof window !== 'undefined') {
        window.localStorage.removeItem(ADMIN_LOGIN_KEY)
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    try {
      let items = getStoredMessages()

      if (supabase) {
        const { data, error: remoteError } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false })

        if (!remoteError && Array.isArray(data)) {
          const merged = [...data, ...items]
          const unique = new Map()
          merged.forEach((item) => {
            const key = [item.email, item.subject, item.message, item.created_at].join('|')
            if (!unique.has(key)) unique.set(key, item)
          })
          items = [...unique.values()].sort(
            (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
          )
        }
      }

      setMessages(items)
    } catch (loadError) {
      console.error('No se pudieron cargar los mensajes del panel de administración:', loadError)
      setMessages(getStoredMessages())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoggedIn) return
    loadMessages()
  }, [isLoggedIn])

  const handleLogin = async (event) => {
    event.preventDefault()

    if (supabase && ADMIN_EMAIL) {
      const cleanEmail = email.trim().toLowerCase()
      if (!cleanEmail || !password) {
        setError('Ingresa tu correo y contraseña.')
        return
      }

      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        })

        if (error) throw error

        setError('')
        setIsLoggedIn(true)
        window.localStorage.setItem(ADMIN_LOGIN_KEY, 'true')
        return
      } catch (loginError) {
        console.error('Error al iniciar sesión en Supabase:', loginError)
        setError('Credenciales incorrectas o usuario no autorizado.')
        return
      }
    }

    if (password === getAdminPassword()) {
      window.localStorage.setItem(ADMIN_LOGIN_KEY, 'true')
      setError('')
      setIsLoggedIn(true)
      return
    }

    setError('Contraseña incorrecta.')
  }

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }

    window.localStorage.removeItem(ADMIN_LOGIN_KEY)
    setPassword('')
    setIsLoggedIn(false)
    setMessages([])
  }

  return (
    <section id="admin" className="admin-section">
      <div className="wrap">
        <div className="section-heading admin-heading">
          <div>
            <p className="eyebrow">Acceso privado</p>
            <h2>Panel del administrador</h2>
          </div>
        </div>

        {!isLoggedIn ? (
          <div className="admin-login">
            <form onSubmit={handleLogin} className="admin-form">
              {supabase && (
                <>
                  <label htmlFor="admin-email">Correo electrónico</label>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu-email@dominio.com"
                    autoComplete="email"
                  />
                </>
              )}
              <label htmlFor="admin-password">Contraseña</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={supabase ? 'Introduce tu contraseña' : 'Introduce tu contraseña local'}
                autoComplete="current-password"
              />
              {error && <div className="err">{error}</div>}
              <button className="btn" type="submit">Entrar</button>
            </form>
          </div>
        ) : (
          <div className="admin-panel">
            <div className="admin-toolbar">
              <div>
                <p className="admin-panel-title">Mensajes recibidos</p>
                <span className="admin-badge">{totalMessages} mensajes</span>
              </div>
              <button className="btn btn-secondary" type="button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>

            <div className="admin-summary">
              <div className="admin-stat">
                <span>Total</span>
                <strong>{totalMessages}</strong>
              </div>
              <div className="admin-stat">
                <span>Último</span>
                <strong>{latestMessage ? formatDate(latestMessage.created_at) : 'Sin mensajes'}</strong>
              </div>
            </div>

            {loading ? (
              <p className="admin-empty">Cargando mensajes...</p>
            ) : messages.length === 0 ? (
              <p className="admin-empty">Todavía no hay mensajes en este panel.</p>
            ) : (
              <div className="admin-list">
                {messages.map((message, index) => (
                  <article key={`${message.email}-${message.subject}-${index}`} className="admin-card">
                    <div className="admin-card-head">
                      <strong>{message.name || 'Sin nombre'}</strong>
                      <span>{formatDate(message.created_at)}</span>
                    </div>
                    <p className="admin-meta">{message.email}</p>
                    <p className="admin-meta"><b>Asunto:</b> {message.subject}</p>
                    <p className="admin-message">{message.message}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
