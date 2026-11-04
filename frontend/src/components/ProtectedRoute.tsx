import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export function ProtectedRoute() { const { user, loading } = useAuth(); if (loading) return <p className="loading">Cargando…</p>; return user ? <Outlet /> : <Navigate to="/login" replace />; }
