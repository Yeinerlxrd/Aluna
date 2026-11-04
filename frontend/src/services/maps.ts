import type { NearbyPlace, SafeRoute } from '../types';

const osrmUrl = import.meta.env.VITE_OSRM_URL ?? 'https://router.project-osrm.org';
const overpassEndpoints = [
  import.meta.env.VITE_OVERPASS_URL ?? 'https://overpass-api.de/api/interpreter',
  import.meta.env.VITE_OVERPASS_FALLBACK_URL ?? 'https://overpass.kumi.systems/api/interpreter',
];

export async function planSafeRoute(start: [number, number], end: [number, number]): Promise<SafeRoute> {
  const coordinates = `${start[1]},${start[0]};${end[1]},${end[0]}`;
  const response = await fetch(`${osrmUrl}/route/v1/foot/${coordinates}?overview=full&geometries=geojson&steps=true`);
  if (!response.ok) throw new Error('No fue posible calcular la ruta.');
  const data = await response.json() as { routes?: Array<{ distance: number; duration: number; geometry: { coordinates: [number, number][] } }> };
  const route = data.routes?.[0];
  if (!route) throw new Error('No encontramos una ruta para esos puntos.');
  return { distanceKm: route.distance / 1000, durationMinutes: route.duration / 60, coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]) };
}

export async function findNearbyPlaces(latitude: number, longitude: number): Promise<NearbyPlace[]> {
  const query = `[out:json][timeout:15];(nwr(around:2500,${latitude},${longitude})[amenity~"hospital|police|fire_station|clinic"];);out center tags;`;
  for (const endpoint of overpassEndpoints) {
    try {
      const response = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`);
      if (!response.ok) continue;
      const data = await response.json() as { elements: Array<{ id: number; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: { name?: string; amenity?: string } }> };
      return data.elements.filter((place) => place.tags?.name).map((place) => ({
        id: String(place.id), name: place.tags?.name ?? 'Punto de atención', type: place.tags?.amenity ?? 'service',
        latitude: place.lat ?? place.center?.lat ?? latitude, longitude: place.lon ?? place.center?.lon ?? longitude,
      }));
    } catch { /* try the next public endpoint */ }
  }
  throw new Error('No fue posible cargar los puntos cercanos.');
}
