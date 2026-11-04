# Aluna API

Este directorio está reservado para la aplicación Laravel. La creación del proyecto Laravel requiere PHP y Composer instalados en el entorno.

Configuración prevista:

```bash
composer create-project laravel/laravel .
composer require php-open-source-saver/jwt-auth
```

No ejecutar esos comandos hasta disponer de PHP y Composer compatibles.

## Firestore

Instala el adaptador de Firebase Admin:

```bash
composer require kreait/laravel-firebase
```

Configura `FIREBASE_PROJECT_ID` y `FIREBASE_CREDENTIALS` en `.env`. La credencial debe
ser el JSON de una cuenta de servicio fuera del repositorio; nunca la envíes al frontend.
Los usuarios de JWT continúan en el provider de Laravel y los reportes se guardan en la
colección Firestore `reports`.

## Contrato MVP

Las rutas de `routes/api.php` exponen autenticación JWT (`/auth/register`, `/auth/login`,
`/auth/me`, `/auth/logout`), municipios (`/municipalities`) y reportes publicados
(`GET /reports`). Crear reportes requiere `Authorization: Bearer <token>` y queda en
estado `pending` para moderación. En una aplicación Laravel real instala
`php-open-source-saver/jwt-auth`, configura el guard `api` para `jwt` y ejecuta
`php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"`.
