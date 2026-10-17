const SERVICES = [
  ['🖥️','Diseño Web','Sitios corporativos con identidad propia y enfoque en conversión.',['Diseño a medida','Responsivo','Optimizado para SEO']],
  ['⚙️','Desarrollo a Medida','Aplicaciones web escalables con React, Supabase y despliegue en Vercel.',['Código mantenible','Panel administrable','Alto rendimiento']],
  ['🛒','Tiendas en Línea','Comercio electrónico seguro con catálogo, carrito y pagos.',['Pagos seguros','Gestión de inventario','Reportes de ventas']],
  ['🚀','Mantenimiento y SEO','Soporte continuo, mejoras y posicionamiento en buscadores.',['Actualizaciones','Respaldos','Análisis mensual']],
]
export default function ServicesSection() {
  return (
    <section id="servicios"><div className="wrap">
      <h2>Servicios</h2><p className="sub">Todo lo que tu presencia digital necesita.</p>
      <div className="grid">
        {SERVICES.map(([ic, t, d, b]) => (
          <article className="card" key={t}><div className="ic">{ic}</div><h3>{t}</h3><p>{d}</p>
            <ul>{b.map(x => <li key={x}>{x}</li>)}</ul></article>
        ))}
      </div>
    </div></section>
  )
}
