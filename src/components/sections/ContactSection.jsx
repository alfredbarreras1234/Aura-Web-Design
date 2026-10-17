import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
const RULES = {
  name: v => v.trim().length >= 2 || 'Ingresa tu nombre.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Correo electrónico inválido.',
  subject: v => v.trim().length >= 3 || 'Escribe un asunto.',
  message: v => v.trim().length >= 10 || 'El mensaje debe tener al menos 10 caracteres.',
}
const EMPTY = { name: '', email: '', subject: '', message: '' }
const LABELS = { name: 'Nombre', email: 'Correo electrónico', subject: 'Asunto', message: 'Mensaje' }
export default function ContactSection() {
  const [f, setF] = useState(EMPTY), [errs, setErrs] = useState({}), [status, setStatus] = useState('idle')
  const msg = (k, v) => { const r = RULES[k](v); return r === true ? '' : r }
  const change = k => e => { const v = e.target.value; setF(p => ({ ...p, [k]: v })); setErrs(p => ({ ...p, [k]: msg(k, v) })) }
  const submit = async e => {
    e.preventDefault()
    const all = Object.fromEntries(Object.keys(RULES).map(k => [k, msg(k, f[k])]))
    setErrs(all); if (Object.values(all).some(Boolean)) return
    if (!supabase) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const { error } = await supabase.from('contacts').insert(f)
      if (error) throw error
      setStatus('ok')
      setF(EMPTY)
    } catch (error) {
      console.error('No se pudo enviar el formulario de contacto:', error)
      setStatus('error')
    }
  }
  return (
    <section id="contacto"><div className="wrap">
      <h2>Contáctanos</h2><p className="sub">Cuéntanos sobre tu proyecto.</p>
      <div className="two">
        <form onSubmit={submit} noValidate>
          {Object.keys(RULES).map(k => (
            <div key={k}>
              {k === 'message'
                ? <textarea id={`contact-${k}`} name={k} aria-label={LABELS[k]} rows="5" maxLength="2000" placeholder={LABELS[k]} value={f[k]} onChange={change(k)} required />
                : <input id={`contact-${k}`} name={k} aria-label={LABELS[k]} type={k === 'email' ? 'email' : 'text'} maxLength={k === 'name' ? 100 : 160} placeholder={LABELS[k]} value={f[k]} onChange={change(k)} required />}
              <div className="err">{errs[k]}</div>
            </div>
          ))}
          <button className="btn" disabled={status === 'loading'}>{status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}</button>
          <div role="status" className={status === 'ok' ? 'ok' : 'err'}>
            {status === 'ok' && '✅ ¡Mensaje enviado! Te responderemos pronto.'}
            {status === 'error' && (supabase ? 'No se pudo enviar. Intenta de nuevo.' : 'El formulario no está disponible: configura la conexión con Supabase para recibir mensajes.')}
          </div>
        </form>
        <div>
          <p>📍 Santa Tecla, El Salvador</p><p>✉️ contacto@aurawebdesign.com</p><p>📞 +503 0000-0000</p>
          <iframe title="Mapa" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-89.30%2C13.65%2C-89.26%2C13.69&layer=mapnik" />
        </div>
      </div>
    </div></section>
  )
}
