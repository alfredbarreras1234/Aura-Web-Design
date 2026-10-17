const ITEMS = [
  ['📖','Historia','Aura Web Design nació para ayudar a negocios y emprendedores a tener una presencia digital profesional y accesible.'],
  ['🎯','Misión','Crear soluciones web de alto impacto visual que generen resultados medibles para nuestros clientes.'],
  ['🔭','Visión','Ser la agencia de diseño y desarrollo web de referencia por su calidad, cercanía e innovación.'],
  ['💎','Valores','Creatividad, transparencia, compromiso, excelencia y mejora continua.'],
]
export default function AboutSection() {
  return (
    <section className="alt" id="quienes-somos"><div className="wrap">
      <h2>Quiénes Somos</h2><p className="sub">Un equipo apasionado por el diseño y la tecnología.</p>
      <div className="grid">{ITEMS.map(([ic, t, d]) => <article className="card" key={t}><div className="ic">{ic}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
    </div></section>
  )
}
