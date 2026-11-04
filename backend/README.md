# Aluna API

Este directorio está reservado para la aplicación Laravel. La creación del proyecto Laravel requiere PHP y Composer instalados en el entorno.

Configuración prevista:

```bash
composer create-project laravel/laravel .
composer require php-open-source-saver/jwt-auth
```

No ejecutar esos comandos hasta disponer de PHP y Composer compatibles.

## Supabase

Configura `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` y `SUPABASE_REPORTS_TABLE` en `.env`.
La clave `service_role` solo debe existir en el backend. Ejecuta `docs/supabase.sql` en el
SQL Editor de Supabase antes de crear reportes.

## Contrato MVP

Las rutas de `routes/api.php` exponen autenticación JWT (`/auth/register`, `/auth/login`,
`/auth/me`, `/auth/logout`), municipios (`/municipalities`) y reportes publicados
(`GET /reports`). Crear reportes requiere `Authorization: Bearer <token>` y queda en
estado `pending` para moderación. En una aplicación Laravel real instala
`php-open-source-saver/jwt-auth`, configura el guard `api` para `jwt` y ejecuta
`php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"`.
