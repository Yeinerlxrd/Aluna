import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, SlidersHorizontal } from 'lucide-react';
import { api } from '../services/api';
import type { Municipality, Report, ReportCategory } from '../types';
import { EmergencyPanel } from '../components/EmergencyPanel';
import { ReportsMap } from '../components/ReportsMap';
import { SafeRoutePlanner } from '../components/SafeRoutePlanner';
import { NearbyPlaces } from '../components/NearbyPlaces';

export function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [category, setCategory] = useState<ReportCategory | ''>('');
  const [municipalityId, setMunicipalityId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/municipalities').then(({ data }) => setMunicipalities(data)).catch(() => setMunicipalities([]));
  }, []);
  useEffect(() => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (municipalityId) params.set('municipality_id', municipalityId);
    api.get(`/reports?${params}`).then(({ data }) => setReports(data.data))
      .catch(() => setError('No pudimos cargar los reportes. Intenta de nuevo.'))
      .finally(() => setLoading(false));
  }, [category, municipalityId]);

  return <><div className="page-heading"><div><p className="eyebrow"><MapPin size={16}/> Explora tu comunidad</p><h1>Reportes cercanos</h1><p className="muted">Información comunitaria para decidir tu recorrido.</p></div><Link className="button button-primary" to="/reports/new"><Plus size={18}/> Crear reporte</Link></div>
    <div className="filter-bar"><SlidersHorizontal size={17} /><strong>Filtrar reportes</strong><select aria-label="Filtrar por categoría" value={category} onChange={(event) => setCategory(event.target.value as ReportCategory | '')}><option value="">Todas las categorías</option><option value="acoso">Acoso</option><option value="iluminacion">Iluminación</option><option value="zona_desolada">Zona desolada</option><option value="otro">Otro</option></select><select aria-label="Filtrar por municipio" value={municipalityId} onChange={(event) => setMunicipalityId(event.target.value)}><option value="">Todos los municipios</option>{municipalities.map((municipality) => <option value={municipality.id} key={municipality.id}>{municipality.name}</option>)}</select></div>
    <div className="dashboard-layout"><ReportsMap reports={reports} /><div className="dashboard-grid"><div className="report-list">{error && <div className="notice">{error}</div>}{loading && <p className="loading">Cargando reportes…</p>}{!loading && !error && reports.length === 0 && <div className="empty-state"><h2>No hay reportes con estos filtros</h2><p className="muted">Prueba otra categoría o municipio.</p></div>}{!loading && reports.map((report) => <Link className="report-card" to={`/reports/${report.id}`} key={report.id}><span className={`severity ${report.category}`}>{report.category.replaceAll('_', ' ')}</span><h3>{report.reference}</h3><p>{report.description}</p><small>{report.latitude != null && report.longitude != null ? `${report.latitude}, ${report.longitude}` : 'Sin coordenadas'} · {report.municipality?.name}</small></Link>)}</div><div className="dashboard-tools"><SafeRoutePlanner /><NearbyPlaces /><EmergencyPanel /></div></div></div></>;
}
