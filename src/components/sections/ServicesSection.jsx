const SERVICES = [
  ['01','Sitios web','Una página clara para presentar tu negocio, tus servicios y facilitar el contacto.',['Diseño adaptable a móviles','Contenido organizado','Contacto por formulario o WhatsApp']],
  ['02','Tiendas en línea','Muestra tus productos y recibe pedidos desde una tienda pensada para tus clientes.',['Catálogo de productos','Carrito de compras','Integración de pagos según el proyecto']],
  ['03','Desarrollo a medida','Funciones e integraciones pensadas para lo que tu proyecto necesita.',['Flujos y herramientas propias','Integraciones con otros servicios','Una base preparada para crecer']],
  ['04','Mantenimiento','Ajustes y mejoras para que tu sitio siga al día después de publicarlo.',['Cambios de contenido','Actualizaciones','Ayuda cuando la necesites']],
]
export default function ServicesSection() {
  return (
    <section id="servicios"><div className="wrap">
      <div className="section-heading">
        <div><p className="eyebrow">En qué podemos ayudarte</p><h2>Lo necesario para llevar tu negocio a la web.</h2></div>
        <p className="sub">Cada proyecto es distinto. Cuéntanos qué tienes en mente y vemos juntos por dónde empezar.</p>
      </div>
      <div className="grid service-grid">
        {SERVICES.map(([ic, t, d, b]) => (
          <article className="card service-card" key={t}><span className="service-number">{ic}</span><h3>{t}</h3><p>{d}</p>
            <ul>{b.map(x => <li key={x}>{x}</li>)}</ul></article>
        ))}
      </div>
    </div></section>
  )
}
