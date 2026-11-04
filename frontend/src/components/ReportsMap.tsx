import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import type { Report } from '../types';
import 'leaflet/dist/leaflet.css';

const categoryColors: Record<Report['category'], string> = {
  acoso: '#dc2626',
  iluminacion: '#f59e0b',
  zona_desolada: '#7c3aed',
  otro: '#0f766e',
};

export function ReportsMap({ reports }: { reports: Report[] }) {
  const mappedReports = reports.filter((report) => report.latitude != null && report.longitude != null);
  const center: [number, number] = mappedReports.length
    ? [mappedReports[0].latitude!, mappedReports[0].longitude!]
    : [4.711, -74.0721];
  const mapKey = import.meta.env.VITE_MAPTILER_API_KEY;
  const mapId = import.meta.env.VITE_MAPTILER_MAP_ID ?? 'streets';
  const tileUrl = mapKey
    ? `https://api.maptiler.com/maps/${mapId}/{z}/{x}/{y}.png?key=${mapKey}`
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution = mapKey
    ? '&copy; MapTiler &copy; OpenStreetMap contributors'
    : '&copy; OpenStreetMap contributors';

  return (
    <div className="reports-map" aria-label="Mapa de reportes comunitarios">
      <MapContainer center={center} zoom={13} scrollWheelZoom className="leaflet-map">
        <TileLayer attribution={attribution} url={tileUrl} />
        {mappedReports.map((report) => (
          <CircleMarker
            center={[report.latitude!, report.longitude!]}
            key={report.id}
            radius={9}
            pathOptions={{ color: categoryColors[report.category], fillColor: categoryColors[report.category], fillOpacity: 0.8 }}
          >
            <Popup><strong>{report.reference}</strong><br />{report.description}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      {mappedReports.length === 0 && <p className="map-empty">Los reportes con ubicación aparecerán aquí.</p>}
    </div>
  );
}
