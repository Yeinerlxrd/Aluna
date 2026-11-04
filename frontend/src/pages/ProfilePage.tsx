import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { user, logout } = useAuth();
  return <section className="profile-card"><p className="eyebrow">Tu cuenta</p><h1>Perfil</h1><div className="profile-field"><span>Nombre</span><strong>{user?.name}</strong></div><div className="profile-field"><span>Correo</span><strong>{user?.email}</strong></div><div className="profile-actions"><Link className="button button-outline" to="/dashboard">Volver al mapa</Link><button className="button button-primary" onClick={logout}>Cerrar sesión</button></div></section>;
}
