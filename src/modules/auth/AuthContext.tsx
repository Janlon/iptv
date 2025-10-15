import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type AuthCredentials = {
  baseUrl: string;
  username: string;
  password: string;
};

export type AuthState = {
  status: 'idle' | 'authenticating' | 'authenticated' | 'error';
  credentials?: AuthCredentials;
  error?: string;
};

type AuthContextValue = {
  state: AuthState;
  setState: (state: AuthState) => void;
  logout: () => void;
  updateCredentials: (credentials: AuthCredentials) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'iptv-lg-webos.credentials';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'idle' });
  const value = useMemo(
    () => ({
      state,
      setState,
      logout: () => {
        setState({ status: 'idle' });
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      },
      updateCredentials: (credentials: AuthCredentials) => {
        setState({ status: 'authenticated', credentials });
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
        }
      }
    }),
    [state]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const credentials = JSON.parse(stored) as AuthCredentials;
        setState({ status: 'authenticated', credentials });
      } catch (error) {
        console.error('Failed to parse stored credentials', error);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (state.status === 'authenticated' && state.credentials) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.credentials));
    }

    if (state.status === 'idle' || state.status === 'error') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
