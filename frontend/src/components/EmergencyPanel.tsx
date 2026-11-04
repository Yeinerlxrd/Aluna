import { PhoneCall, ShieldAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { EmergencyService } from '../types';

export function EmergencyPanel() {
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/emergency-services')
      .then(({ data }) => setServices(data.services))
      .catch(() => setError('No pudimos cargar los contactos. Si hay peligro inmediato, llama al 123.'));
  }, []);

  return (
    <aside className="emergency-panel" aria-labelledby="emergency-title">
      <div className="emergency-heading">
        <span className="emergency-icon"><ShieldAlert size={20} /></span>
        <div><h2 id="emergency-title">Ayuda rápida</h2><p>Colombia</p></div>
      </div>
      <p className="emergency-disclaimer">En una emergencia inmediata, llama al 123.</p>
      {error && <p className="error">{error}</p>}
      <div className="emergency-list">
        {services.map((service) => (
          <a className="emergency-service" href={`tel:${service.phone}`} key={service.id}>
            <span><strong>{service.name}</strong><small>{service.description}</small></span>
            <span className="emergency-call"><PhoneCall size={16} /> {service.phone}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
