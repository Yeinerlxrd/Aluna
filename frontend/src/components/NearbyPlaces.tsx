import { Building2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { findNearbyPlaces } from '../services/maps';
import type { NearbyPlace } from '../types';

export function NearbyPlaces() {
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [message, setMessage] = useState('');
  const search = () => {
    setMessage('Buscando lugares cercanos…');
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try { setPlaces(await findNearbyPlaces(coords.latitude, coords.longitude)); setMessage(''); }
      catch { setMessage('No encontramos puntos cercanos.'); }
    }, () => setMessage('Permite la ubicación para buscar hospitales y estaciones.'));
  };
  return <section className="places-panel"><div className="places-heading"><Building2 size={19} /><div><h2>Puntos de atención</h2><p>Hospitales, clínicas y policía cercanos.</p></div></div><button className="button button-outline" onClick={search}>{message === 'Buscando lugares cercanos…' ? <LoaderCircle className="spin" size={16} /> : <Building2 size={16} />} Buscar cerca de mí</button>{message && <p className="route-message">{message}</p>}<div className="places-list">{places.map((place) => <a href={`https://www.openstreetmap.org/?mlat=${place.latitude}&mlon=${place.longitude}`} target="_blank" rel="noreferrer" key={place.id}><strong>{place.name}</strong><small>{place.type}</small></a>)}</div></section>;
}
