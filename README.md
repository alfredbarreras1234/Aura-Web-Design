# Aura Web Design
1. `npm install`
2. Copia `.env.example` a `.env` y completa tus credenciales de Supabase.
3. En Supabase, crea un usuario autenticado desde Auth > Users con el mismo correo que pongas en `VITE_ADMIN_EMAIL`.
4. Ejecuta `supabase/schema.sql` en el editor SQL de Supabase.
5. `npm run dev`.

Vercel: importa el repositorio (Framework: Vite) y define `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y `VITE_ADMIN_EMAIL` en Environment Variables. La contraseña real se ingresa desde el panel de administración y se valida con Supabase Auth.
