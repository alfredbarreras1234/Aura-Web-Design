import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
export default function ReviewsSection() {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState(''), [comment, setComment] = useState('')
  const [rating, setRating] = useState(0), [err, setErr] = useState(''), [busy, setBusy] = useState(false)
  const [loadError, setLoadError] = useState('')

  const load = async () => {
    if (!supabase) return
    try {
      const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(50)
      if (error) throw error
      setReviews(data)
      setLoadError('')
    } catch (error) {
      console.error('No se pudieron cargar las reseñas:', error)
      setLoadError('No se pudieron cargar las reseñas. Intenta actualizar la página.')
    }
  }
  useEffect(() => {
    load()
    if (!supabase) return
    const ch = supabase.channel('reviews-rt').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reviews' }, load).subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [])

  const submit = async e => {
    e.preventDefault()
    if (name.trim().length < 2 || !rating || comment.trim().length < 5) return setErr('Completa nombre, calificación y comentario.')
    setErr(''); setBusy(true)
    const row = { name: name.trim(), rating, comment: comment.trim() }
    try {
      if (supabase) {
        const { error } = await supabase.from('reviews').insert(row)
        if (error) throw error
      } else {
        setReviews(r => [{ ...row, id: crypto.randomUUID(), created_at: new Date().toISOString() }, ...r])
      }
      setName(''); setComment(''); setRating(0)
      setErr(supabase ? '' : 'Modo de demostración: esta reseña solo se guardó en esta sesión.')
    } catch (error) {
      console.error('No se pudo enviar la reseña:', error)
      setErr('No se pudo enviar. Intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="alt" id="resenas"><div className="wrap">
      <h2>Reseñas</h2><p className="sub">La opinión de quienes confían en nosotros.</p>
      <div className="two">
        <form className="card" onSubmit={submit} noValidate>
          <h3>Deja tu opinión</h3>
          <input aria-label="Tu nombre" value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" maxLength={60} />
          <div className="stars" role="radiogroup" aria-label="Calificación">
            {[1,2,3,4,5].map(n => <button type="button" key={n} role="radio" aria-checked={rating === n} aria-label={n + ' estrellas'} className={n <= rating ? 'on' : ''} onClick={() => setRating(n)}>★</button>)}
          </div>
          <textarea aria-label="Tu comentario" rows="4" value={comment} onChange={e => setComment(e.target.value)} placeholder="Tu comentario" maxLength={400} />
          <div className="err">{err}</div>
          <button className="btn" disabled={busy}>{busy ? 'Enviando…' : 'Enviar reseña'}</button>
        </form>
        <div className="reviews">
          {!supabase && <p className="sub">Modo de demostración: las reseñas solo se conservan mientras esta página permanezca abierta.</p>}
          {loadError && <p className="err" role="alert">{loadError}</p>}
          {reviews.length === 0 && <p className="sub">{supabase ? 'Sé el primero en opinar.' : 'Todavía no hay reseñas en esta sesión.'}</p>}
          {reviews.map(r => (
            <article className="card" key={r.id}>
              <b>{r.name}</b> <span className="gold">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              <p>{r.comment}</p><small>{new Date(r.created_at).toLocaleDateString('es')}</small>
            </article>
          ))}
        </div>
      </div>
    </div></section>
  )
}
