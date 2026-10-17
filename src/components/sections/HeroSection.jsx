import { WHATSAPP_LINK, BUSINESS_PHONE, PHONE_LINK } from '../../lib/contact.js'

export default function HeroSection() {
  return (
    <header className="hero" id="inicio">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="eyebrow">Diseño y desarrollo web · El Salvador</p>
          <h1>Una web bien hecha puede abrirte muchas puertas.</h1>
          <p className="hero-description">Diseñamos sitios web para negocios que quieren explicar mejor lo que hacen y recibir consultas por internet.</p>
          <div className="hero-actions">
            <a className="btn" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Hablemos de tu proyecto <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#servicios">Conoce los servicios</a>
          </div>
        </div>
        <aside className="hero-note" aria-label="Contacto directo">
          <span className="note-mark" aria-hidden="true">A.</span>
          <p className="note-label">¿Tienes una idea?</p>
          <h2>Cuéntanos qué necesitas.</h2>
          <p>Una conversación es un buen lugar para empezar.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Escríbenos por WhatsApp <span aria-hidden="true">↗</span></a>
          <a className="note-phone" href={PHONE_LINK}>{BUSINESS_PHONE}</a>
        </aside>
      </div>
    </header>
  )
}
