import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { api } from '../services/api';
import type { Report } from '../types';

export function ReportDetailPage() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!id) return;
    api.get(`/reports/${id}`).then(({ data }) => setReport(data)).catch(() => setError('Este reporte no está disponible.'));
  }, [id]);
  if (error) return <section className="empty-state"><h1>Reporte no disponible</h1><p className="muted">{error}</p><Link className="button button-primary" to="/dashboard">Volver al mapa</Link></section>;
  if (!report) return <p className="loading">Cargando reporte…</p>;
  return <article className="detail-card"><Link className="back-link" to="/dashboard"><ArrowLeft size={16} /> Volver al mapa</Link><span className={`severity ${report.category}`}>{report.category.replaceAll('_', ' ')}</span><h1>{report.reference}</h1><p className="muted">{report.description}</p><dl className="detail-list"><div><dt>Municipio</dt><dd>{report.municipality?.name ?? 'No especificado'}</dd></div><div><dt>Estado</dt><dd>{report.status === 'verified' ? 'Verificado por la comunidad' : 'Pendiente de revisión'}</dd></div><div><dt>Fecha</dt><dd>{new Date(report.created_at).toLocaleDateString('es-CO')}</dd></div><div><dt>Ubicación</dt><dd>{report.latitude != null && report.longitude != null ? <><MapPin size={15} /> {report.latitude}, {report.longitude}</> : 'Sin coordenadas exactas'}</dd></div></dl></article>;
}
