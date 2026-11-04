# Aluna

Plataforma colaborativa para consultar y reportar puntos de riesgo en espacios públicos.

## Estructura

- `backend/`: API Laravel, autenticación JWT y persistencia MySQL.
- `frontend/`: aplicación React + TypeScript + Vite.
- `docs/`: decisiones de arquitectura y contrato de API.

## Estado actual

La estructura inicial está preparada. La implementación del backend y la integración del frontend se realizarán por fases.

## Requisitos

- PHP 8.2+, Composer y extensión PDO MySQL.
- Node.js 20+ y npm.
- MySQL/MariaDB.

## Inicio rápido

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

## Mapas y claves API

El MVP usa OpenStreetMap mediante React Leaflet, por lo que no necesita una clave de Google Maps
ni una API adicional para funcionar. Si se cambia a Google Maps, configura
`VITE_GOOGLE_MAPS_API_KEY` únicamente en `frontend/.env.local`; nunca la subas al repositorio.
En Google Cloud restringe la clave por dominio/referrer y habilita solo las APIs necesarias.

## Servicios de mapas sin Google

El MVP usa servicios basados en OpenStreetMap:

- [OpenStreetMap](https://www.openstreetmap.org/) para mapas y tiles.
- [OSRM](https://project-osrm.org/) para rutas peatonales.
- [Overpass API](https://overpass-api.de/) para hospitales, clínicas y estaciones de policía.

Alternativas con cuenta y claves para producción:

- [MapTiler Cloud](https://cloud.maptiler.com/account/keys/) — mapas y geocodificación.
- [Mapbox](https://account.mapbox.com/access-tokens/) — mapas, búsqueda y rutas.
- [LocationIQ](https://my.locationiq.com/) — geocodificación basada en OSM.
- [HERE Developer](https://developer.here.com/) — mapas, rutas y búsqueda.
- [TomTom Developer](https://developer.tomtom.com/user/me/apps) — mapas, rutas y búsqueda.

No se necesita ninguna de esas claves para la demo actual. Si se usa un proveedor externo,
la clave debe restringirse por dominio, guardarse en `.env.local` y no subirse a Git.

Consulta [`docs/arquitectura.md`](docs/arquitectura.md) para el plan técnico.
