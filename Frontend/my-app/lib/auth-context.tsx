
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  api,
  setAccessToken,
  registerAuthFailureHandler,
  refreshAccessToken,
} from './api-client';

type User = {
  id: number;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = await refreshAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await api.get<User>('/auth/me');
        setUser(me);
      } catch {
       
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  useEffect(() => {
    registerAuthFailureHandler(() => {
      setAccessToken(null);
      setUser(null);
    });
  }, []);

  async function login(email: string, password: string) {
    const data = await api.post<{
      accessToken: string;
      user: NonNullable<User>;
    }>('/auth/login', { email, password });

    setAccessToken(data.accessToken);
    setUser(data.user);
  }

  async function logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}