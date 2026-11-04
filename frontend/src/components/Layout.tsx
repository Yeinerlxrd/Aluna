import { Link, Outlet } from 'react-router-dom';
import { NotificationCenter } from './NotificationCenter';
import { AlunaLogo } from './AlunaLogo';
import { useAuth } from '../context/AuthContext';
export function Layout() {
  const { user, logout } = useAuth();
  return <><header className="app-header"><Link to="/" className="brand"><AlunaLogo /></Link><nav>{user && <><Link to="/dashboard">Mapa</Link><Link to="/reports/new">Reportar</Link><Link to="/profile">Perfil</Link><NotificationCenter /></>}{user ? <><span className="user-name">{user.name}</span><button className="link-button" onClick={logout}>Salir</button></> : <Link to="/login">Ingresar</Link>}</nav></header><main className="page"><Outlet /></main></>;
}
