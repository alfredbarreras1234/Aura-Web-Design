import { LINKS } from './Navbar.jsx'
const SOCIAL = ['Facebook','Instagram','LinkedIn','X']
export default function Footer() {
  return (
    <footer className="footer"><div className="wrap">
      <div className="grid">
        <div><div className="brand light"><img src="/logo.png" alt="" width="34" height="34" /><span>Aura <b>Web Design</b></span></div>
          <p>Sitios web modernos que hacen crecer tu negocio.</p></div>
        <div><h4>Enlaces</h4>{LINKS.map(([id, t]) => <a key={id} href={'#' + id}>{t}</a>)}</div>
        <div><h4>Síguenos</h4>{SOCIAL.map(s => <a key={s} href="#" aria-label={s}>{s}</a>)}</div>
        <div><h4>Legal</h4><a href="#">Términos de servicio</a><a href="#">Política de privacidad</a></div>
      </div>
      <small>© {new Date().getFullYear()} Aura Web Design. Todos los derechos reservados.</small>
    </div></footer>
  )
}
