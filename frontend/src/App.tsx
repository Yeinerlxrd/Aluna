import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ReportFormPage } from './pages/ReportFormPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { LandingPage } from './pages/LandingPage';
import { ProfilePage } from './pages/ProfilePage';
import { supabaseConfigured } from './services/supabase';
export function App() { return <BrowserRouter><AuthProvider><Routes><Route element={<Layout />}><Route path="/" element={<LandingPage />} /><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /><Route path="/reports/:id" element={<ReportDetailPage />} /><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<DashboardPage />} /><Route path="/reports/new" element={<ReportFormPage />} /><Route path="/profile" element={<ProfilePage />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes>{!supabaseConfigured && <div className="setup-banner">Aluna está en modo demostración. Configura Supabase en las variables de entorno para activar las cuentas.</div>}</AuthProvider></BrowserRouter>; }
