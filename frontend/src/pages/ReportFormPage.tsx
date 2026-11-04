import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { ReportCategory } from '../types';

export function ReportFormPage() {
  const [form, setForm] = useState({
    category: 'iluminacion' as ReportCategory,
    reference: '',
    description: '',
    latitude: '',
    longitude: '',
    municipality_id: '1',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const set = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const coordinates = form.latitude && form.longitude
        ? { latitude: Number(form.latitude), longitude: Number(form.longitude) }
        : {};
      await api.post('/reports', {
        category: form.category,
        reference: form.reference,
        description: form.description,
        municipality_id: Number(form.municipality_id),
        ...coordinates,
      });
      setMessage('Gracias. Tu reporte quedó pendiente de revisión.');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch {
      setMessage('No se pudo enviar. Revisa los campos e inténtalo de nuevo.');
    }
  };

  return (
    <section className="form-card">
      <p className="eyebrow">Comparte información</p>
      <h1>Crear reporte</h1>
      <p className="muted">No incluyas datos personales. Un equipo revisará el reporte antes de publicarlo.</p>
      <form onSubmit={submit}>
        <label>Categoría<select value={form.category} onChange={(event) => set('category', event.target.value)}>
          <option value="acoso">Acoso</option><option value="iluminacion">Mala iluminación</option>
          <option value="zona_desolada">Zona desolada</option><option value="otro">Otro</option>
        </select></label>
        <label>Punto de referencia<input required value={form.reference} onChange={(event) => set('reference', event.target.value)} /></label>
        <label>Descripción<textarea required minLength={10} value={form.description} onChange={(event) => set('description', event.target.value)} /></label>
        <div className="form-grid">
          <label>Latitud (opcional)<input type="number" step="any" value={form.latitude} onChange={(event) => set('latitude', event.target.value)} /></label>
          <label>Longitud (opcional)<input type="number" step="any" value={form.longitude} onChange={(event) => set('longitude', event.target.value)} /></label>
        </div>
        {message && <div className="notice">{message}</div>}
        <button className="button button-primary full">Enviar reporte</button>
      </form>
    </section>
  );
}
