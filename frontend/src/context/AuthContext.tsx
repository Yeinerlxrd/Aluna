import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, clearSession, saveSession } from '../services/api';
import { requireSupabase, supabase } from '../services/supabase';
import type { User } from '../types';

interface AuthValue { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<void>; loginWithGoogle: () => Promise<void>; register: (data: Record<string, unknown>) => Promise<void>; logout: () => Promise<void> }
const AuthContext = createContext<AuthValue | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => {
    const restore = async () => {
      try {
        if (localStorage.getItem('aluna_token')) {
          const response = await api.get('/auth/me'); setUser(response.data.user);
        } else {
          const { data: { session } } = await supabase?.auth.getSession() ?? { data: { session: null } };
          if (session) await exchangeSupabaseSession();
        }
      }
      catch { clearSession(); await supabase?.auth.signOut(); }
      finally { setLoading(false); }
    };
    void restore();
  }, []);
  const login = async (email: string, password: string) => {
    const { error } = await requireSupabase().auth.signInWithPassword({ email, password });
    if (error) throw error;
    await exchangeSupabaseSession();
  };
  const exchangeSupabaseSession = async () => {
    const { data: { session } } = await requireSupabase().auth.getSession();
    if (!session) throw new Error('No hay una sesión de Supabase activa.');
    const response = await api.post('/auth/supabase', { access_token: session.access_token });
    saveSession(response.data.token); setUser(response.data.user);
  };
  const loginWithGoogle = async () => {
    const { error } = await requireSupabase().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/login` } });
    if (error) throw error;
  };
  const register = async (data: Record<string, unknown>) => {
    const { data: result, error } = await requireSupabase().auth.signUp({ email: String(data.email), password: String(data.password), options: { data: { name: data.name } } });
    if (error) throw error;
    if (!result.session) throw new Error('EMAIL_CONFIRMATION_REQUIRED');
    await exchangeSupabaseSession();
  };
  const logout = async () => { try { await api.post('/auth/logout'); } finally { await supabase?.auth.signOut(); clearSession(); setUser(null); } };
  return <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => { const value = useContext(AuthContext); if (!value) throw new Error('useAuth debe usarse dentro de AuthProvider'); return value; };
