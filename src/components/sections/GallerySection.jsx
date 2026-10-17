import { useEffect, useState } from 'react'
const WORKS = [
  { t: 'Sitio corporativo', c: 'Corporativo', d: 'Web institucional con blog y formulario de contacto.', g: '#0052CC,#00B8D9' },
  { t: 'Tienda de moda', c: 'Tienda', d: 'E-commerce con catálogo, carrito y pasarela de pago.', g: '#0747A6,#4C9EEB' },
  { t: 'Landing de lanzamiento', c: 'Landing', d: 'Página de captación con alta conversión.', g: '#172B4D,#0052CC' },
  { t: 'Portal de servicios', c: 'Corporativo', d: 'Portal con roles de usuario y panel administrable.', g: '#00B8D9,#0747A6' },
  { t: 'Tienda de tecnología', c: 'Tienda', d: 'Catálogo con filtros e inventario en tiempo real.', g: '#4C9EEB,#172B4D' },
  { t: 'Landing de evento', c: 'Landing', d: 'Registro de asistentes y cuenta regresiva.', g: '#0052CC,#4C9EEB' },
]
const CATS = ['Todos', ...new Set(WORKS.map(w => w.c))]
export default function GallerySection() {
  const [cat, setCat] = useState('Todos')
  const [sel, setSel] = useState(null)
  useEffect(() => { const k = e => e.key === 'Escape' && setSel(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  return (
    <section id="galeria"><div className="wrap">
      <h2>Galería de trabajos</h2><p className="sub">Proyectos que hemos hecho realidad.</p>
      <div className="filters">{CATS.map(c => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="grid">
        {WORKS.filter(w => cat === 'Todos' || w.c === cat).map(w => (
          <button key={w.t} className="work" style={{ background: `linear-gradient(135deg,${w.g})` }} onClick={() => setSel(w)}>{w.t}</button>
        ))}
      </div>
      {sel && <div className="modal" onClick={() => setSel(null)} role="dialog" aria-modal="true">
        <div className="box" onClick={e => e.stopPropagation()}>
          <h3>{sel.t} · {sel.c}</h3><p>{sel.d}</p><button className="btn" onClick={() => setSel(null)}>Cerrar</button>
        </div></div>}
    </div></section>
  )
}
