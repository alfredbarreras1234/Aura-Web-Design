import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'
export const LINKS = [['inicio','Inicio'],['servicios','Servicios'],['quienes-somos','Cómo trabajamos'],['resenas','Reseñas'],['contacto','Contacto']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="nav" aria-label="Navegación principal"><div className="wrap nav-in">
      <a className="brand" href="#inicio"><img src="/logo.png" alt="" width="38" height="38" /><span>Aura <b>Web Design</b></span></a>
      <ul id="primary-navigation" className={'links' + (open ? ' open' : '')}>
        {LINKS.map(([id, t]) => <li key={id}><a href={'#' + id} onClick={() => setOpen(false)}>{t}</a></li>)}
      </ul>
      <div className="nav-actions">
        <ThemeToggle />
        <button className="icon-btn burger" type="button" onClick={() => setOpen(o => !o)} aria-controls="primary-navigation" aria-expanded={open} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? '✕' : '☰'}</button>
      </div>
    </div></nav>
  )
}
