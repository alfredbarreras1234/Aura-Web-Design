import { useEffect, useState } from 'react'
export default function ThemeToggle() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light')
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const on = e => { if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light') }
    mq.addEventListener('change', on); return () => mq.removeEventListener('change', on)
  }, [])
  const toggle = () => {
    const t = theme === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('theme', t) } catch { /* The selected theme still applies for this page. */ }
    setTheme(t)
  }
  return <button className="icon-btn" onClick={toggle} aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}>{theme === 'dark' ? '☀' : '☾'}</button>
}
