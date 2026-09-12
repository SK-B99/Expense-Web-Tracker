'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api, setAccessToken, registerAuthFailureHandler } from './api-client';

type User = { id: number; name: string; email: string } | null;

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
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    registerAuthFailureHandler(() => {
      setUser(null);
    });
  }, []);

  async function login(email: string, password: string) {
    const data = await api.post('/auth/login', { email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
  }

  async function logout() {
    await api.post('/auth/logout');
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}