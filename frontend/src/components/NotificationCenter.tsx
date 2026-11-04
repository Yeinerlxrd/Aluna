import { Bell, BellOff } from 'lucide-react';
import { useState } from 'react';

export function NotificationCenter() {
  const [enabled, setEnabled] = useState(() => typeof Notification !== 'undefined' && Notification.permission === 'granted');
  const enable = async () => {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    setEnabled(permission === 'granted');
    if (permission === 'granted') new Notification('Aluna', { body: 'Te avisaremos cuando haya novedades de tus reportes.' });
  };
  return <button className="notification-button" onClick={enable} title={enabled ? 'Notificaciones activadas' : 'Activar notificaciones'} aria-label="Activar notificaciones">{enabled ? <Bell size={18} /> : <BellOff size={18} />}</button>;
}
