import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck } from 'lucide-react';
import { AlunaLogo } from '../components/AlunaLogo';

export function LandingPage() {
  return <section className="landing-page"><div className="landing-brand"><AlunaLogo /></div><div className="landing-hero"><p className="eyebrow"><ShieldCheck size={16} /> Información que acompaña tu camino</p><h1>Muévete con más información. <span>Siéntete más segura.</span></h1><p className="hero-text">Aluna reúne reportes sobre iluminación, acoso y zonas desoladas para ayudarte a tomar decisiones informadas.</p><div className="hero-actions"><Link className="button button-primary button-large" to="/register">Crear mi cuenta</Link><Link className="text-link" to="/login">Ya tengo una cuenta →</Link></div></div><div className="landing-features"><div><MapPin size={20} /><strong>Consulta el mapa</strong><small>Explora reportes de tu zona.</small></div><div><ShieldCheck size={20} /><strong>Comparte con cuidado</strong><small>Tu identidad no se expone públicamente.</small></div></div></section>;
}
