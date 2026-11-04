import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { api, clearSession, saveSession } from '../services/api';
import { firebaseAuth, googleProvider } from '../services/firebase';
import type { User } from '../types';

interface AuthValue { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<void>; loginWithGoogle: () => Promise<void>; register: (data: Record<string, unknown>) => Promise<void>; logout: () => Promise<void> }
const AuthContext = createContext<AuthValue | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!localStorage.getItem('aluna_token')) return setLoading(false); api.get('/auth/me').then(r => setUser(r.data.user)).catch(clearSession).finally(() => setLoading(false)); }, []);
  const login = async (email: string, password: string) => { const r = await api.post('/auth/login', { email, password }); saveSession(r.data.token); setUser(r.data.user); };
  const loginWithGoogle = async () => { const result = await signInWithPopup(firebaseAuth, googleProvider); const firebaseToken = await result.user.getIdToken(); const response = await api.post('/auth/google', { id_token: firebaseToken }); saveSession(response.data.token); setUser(response.data.user); };
  const register = async (data: Record<string, unknown>) => { const r = await api.post('/auth/register', data); saveSession(r.data.token); setUser(r.data.user); };
  const logout = async () => { try { await api.post('/auth/logout'); } finally { clearSession(); setUser(null); } };
  return <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => { const value = useContext(AuthContext); if (!value) throw new Error('useAuth debe usarse dentro de AuthProvider'); return value; };
