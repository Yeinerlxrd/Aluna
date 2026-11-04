# CSV para Supabase

Estos archivos son plantillas de importación:

- `municipalities.csv`: municipios iniciales de Colombia.
- `reports.csv`: encabezados para importar reportes; se deja vacío para no insertar datos ficticios.

Las cuentas no deben importarse desde CSV. Supabase Auth administra las cuentas en
`auth.users`; se crean mediante email/contraseña o Google OAuth desde la aplicación.

Antes de importar:

1. Ejecuta `docs/supabase.sql` en el SQL Editor de Supabase.
2. Importa `municipalities.csv` en la tabla `municipalities` si la creas.
3. Importa `reports.csv` solo con reportes reales.
4. `user_id` debe coincidir con una cuenta existente y `municipality_id` con un municipio existente.
