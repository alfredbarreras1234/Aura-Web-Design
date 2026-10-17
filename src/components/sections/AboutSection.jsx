const ITEMS = [
  ['01','Primero conversamos','Nos cuentas sobre tu negocio, a quién quieres llegar y qué necesitas resolver.'],
  ['02','Acordamos el plan','Definimos el alcance y los pasos del proyecto antes de empezar a diseñar.'],
  ['03','Lo ponemos en marcha','Revisamos juntos el sitio, hacemos los ajustes acordados y lo dejamos listo para publicar.'],
]
export default function AboutSection() {
  return (
    <section className="process-section" id="quienes-somos"><div className="wrap">
      <div className="section-heading">
        <div><p className="eyebrow">Sin complicaciones</p><h2>Un proceso claro, de principio a fin.</h2></div>
        <p className="sub">Trabajamos paso a paso y conversamos contigo durante el proyecto. Sin sorpresas sobre lo que se va a entregar.</p>
      </div>
      <div className="grid process-grid">{ITEMS.map(([ic, t, d]) => <article className="process-step" key={t}><span>{ic}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </div></section>
  )
}
