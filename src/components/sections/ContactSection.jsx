import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
import {
  WHATSAPP_LINK,
  BUSINESS_PHONE,
  PHONE_LINK,
  CONTACT_EMAIL,
  sendContactEmail,
  saveContactMessage,
} from '../../lib/contact.js'

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
    const payload = { ...f, created_at: new Date().toISOString() }
    const all = Object.fromEntries(Object.keys(RULES).map(k => [k, msg(k, payload[k])]))
    setErrs(all)
    if (Object.values(all).some(Boolean)) return

    setStatus('loading')
    try {
      await sendContactEmail(payload)
    } catch (error) {
      console.error('No se pudo enviar el formulario de contacto:', error)
      setStatus('error')
      return
    }

    saveContactMessage(payload)
    setF(EMPTY)

    if (supabase) {
      try {
        const { error } = await supabase.from('contacts').insert({
          name: f.name,
          email: f.email,
          subject: f.subject,
          message: f.message,
        })

        if (error) {
          throw error
        }
      } catch (error) {
        console.error('El mensaje llegó al correo, pero no se pudo guardar en Supabase:', error)
        setStatus('saved-with-warning')
        return
      }
    }

    setStatus('ok')
  }

  return (
    <section id="contacto"><div className="wrap">
      <div className="section-heading contact-heading">
        <div><p className="eyebrow">Hablemos</p><h2>Cuéntanos qué tienes en mente.</h2></div>
        <p className="sub">Escríbenos con una idea, una pregunta o simplemente para conocer cómo podemos ayudarte.</p>
      </div>
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
            {status === 'saved-with-warning' && 'Tu mensaje llegó al correo, pero no se pudo guardar en el panel.'}
            {status === 'error' && 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.'}
          </div>
        </form>
        <div className="contact-direct">
          <p className="eyebrow">Contacto directo</p>
          <a className="contact-phone" href={PHONE_LINK}>{BUSINESS_PHONE}</a>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <p>Elige cómo prefieres comunicarte.</p>
          <a className="btn" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Escríbenos por WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div></section>
  )
}
