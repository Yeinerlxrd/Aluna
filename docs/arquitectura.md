# Arquitectura inicial

Aluna se separa en una API Laravel y un cliente React. El cliente no accede directamente a la persistencia: todas las operaciones pasan por la API REST.

## Backend

- Laravel y Eloquent para dominio y persistencia.
- JWT para autenticación de la API.
- Form Requests para validar entradas.
- Recursos JSON para evitar exponer datos privados del reportante.
- MySQL/MariaDB como base de datos.

## Frontend

- React + TypeScript + Vite.
- React Router para navegación.
- Axios para la API.
- React Leaflet/OpenStreetMap para el mapa.
- Tailwind CSS 4 para estilos.

## Privacidad

Los reportes son comunitarios y no constituyen estadísticas oficiales. La identidad del usuario que crea un reporte nunca se incluye en las respuestas públicas.

## Servicios de emergencia

`GET /api/emergency-services` devuelve el catálogo configurable de líneas de Colombia que usa la interfaz de ayuda rápida. Incluye número, propósito, disponibilidad y fuente de referencia. El catálogo está en `backend/config/emergency.php` para poder actualizarlo sin modificar el controlador.

La aplicación nunca realiza llamadas automáticas ni sustituye a las autoridades. En el cliente, los números usan enlaces `tel:` para que la persona decida iniciar la llamada. La línea 123 se presenta como contacto para una emergencia inmediata.

## Reportes y proximidad

`GET /api/reports` admite `category`, `municipality_id`, `latitude` y `longitude`. Cuando se envían las coordenadas, la API ordena los reportes por distancia aproximada usando Haversine en kilómetros. Solo los reportes `verified` se exponen públicamente; los reportes nuevos permanecen pendientes de revisión.
