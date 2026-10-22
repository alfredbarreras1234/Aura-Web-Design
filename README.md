# Aura Web Design
1. `npm install`
2. Copia `.env.example` a `.env` y completa tus credenciales de Supabase.
3. Ejecuta `supabase/schema.sql` en el editor SQL de Supabase.
4. `npm run dev`.

Vercel: importa el repositorio (Framework: Vite) y define `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y `VITE_ADMIN_PASSWORD` en Environment Variables.

El formulario de contacto envía los mensajes a `alfredbarreras1234@gmail.com` mediante FormSubmit. La primera vez, FormSubmit enviará un correo de activación a esa bandeja; confirma la dirección para empezar a recibir los mensajes. Supabase, si está configurado, conserva además una copia para el panel de administración.
