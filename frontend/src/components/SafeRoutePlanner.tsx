import { useState } from 'react';
import { LocateFixed, Route } from 'lucide-react';
import { planSafeRoute } from '../services/maps';
import type { SafeRoute } from '../types';

export function SafeRoutePlanner() {
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState<SafeRoute | null>(null);
  const [message, setMessage] = useState('');
  const calculate = () => {
    const [lat, lng] = destination.split(',').map(Number);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return setMessage('Escribe el destino como latitud, longitud.');
    setMessage('Obteniendo tu ubicación…');
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try { setRoute(await planSafeRoute([coords.latitude, coords.longitude], [lat, lng])); setMessage('Ruta peatonal calculada con OpenStreetMap.'); }
      catch { setMessage('No pudimos calcular la ruta. Intenta de nuevo.'); }
    }, () => setMessage('Necesitamos permiso de ubicación para calcular la ruta.'));
  };
  return <section className="route-panel"><div className="route-heading"><Route size={19} /><div><h2>Planifica tu ruta</h2><p>Ruta peatonal desde tu ubicación actual.</p></div></div><div className="route-form"><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Destino: latitud, longitud" aria-label="Destino" /><button className="button button-primary" onClick={calculate}><LocateFixed size={17} /> Calcular</button></div>{message && <p className="route-message">{message}</p>}{route && <strong className="route-result">{route.distanceKm.toFixed(1)} km · {Math.round(route.durationMinutes)} min aprox.</strong>}</section>;
}
