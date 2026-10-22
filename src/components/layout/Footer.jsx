import { LINKS } from './Navbar.jsx'
import { WHATSAPP_LINK, BUSINESS_PHONE, PHONE_LINK, CONTACT_EMAIL } from '../../lib/contact.js'
export default function Footer() {
  return (
    <footer className="footer"><div className="wrap">
      <div className="grid">
        <div><div className="brand light"><img src="/logo.png" alt="" width="34" height="34" /><span>Aura <b>Web Design</b></span></div>
          <p>Diseño y desarrollo web para negocios en El Salvador.</p></div>
        <div><h4>Enlaces</h4>{LINKS.map(([id, t]) => <a key={id} href={'#' + id}>{t}</a>)}</div>
        <div><h4>Contacto</h4><a href={PHONE_LINK}>{BUSINESS_PHONE}</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a></div>
      </div>
      <small>© {new Date().getFullYear()} Aura Web Design. Todos los derechos reservados.</small>
    </div></footer>
  )
}
