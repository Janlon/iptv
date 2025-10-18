import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticate } from '../iptv/api';
import { Credentials } from '../iptv/types';
import { useAuth } from './AuthContext';

const DEFAULT_BASE_URL = 'http://';

function normalizeCredentials(credentials: Credentials): Credentials {
  const trimmedUrl = credentials.baseUrl.trim();
  const hasProtocol = /^https?:\/\//i.test(trimmedUrl);
  const baseUrl = trimmedUrl.length
    ? hasProtocol
      ? trimmedUrl
      : `http://${trimmedUrl}`
    : trimmedUrl;

  return {
    baseUrl,
    username: credentials.username.trim(),
    password: credentials.password.trim()
  };
}

export function LoginScreen() {
  const { setState, state } = useAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Credentials>({
    baseUrl: DEFAULT_BASE_URL,
    username: '',
    password: ''
  });

  const mutation = useMutation({
    mutationFn: authenticate,
    onMutate: () => {
      setState({ status: 'authenticating' });
    },
    onSuccess: (_data, variables: Credentials) => {
      setState({ status: 'authenticated', credentials: variables });
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      setState({ status: 'error', error: error.message });
    }
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeCredentials(form);
    setForm(normalized);
    mutation.mutate(normalized);
  }

  function handleChange(field: keyof Credentials) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev: Credentials) => ({ ...prev, [field]: value }));
    };
  }

  return (
    <div className="login-screen">
      <div className="login-box">
        <h1>GatoFlix</h1>
        <form onSubmit={handleSubmit}>
          <label>
            URL do servidor
            <input
              type="text"
              required
              autoFocus
              value={form.baseUrl}
              onChange={handleChange('baseUrl')}
              placeholder="http://servidor.com:porta"
            />
          </label>
          <label>
            Usuário
            <input
              type="text"
              required
              value={form.username}
              onChange={handleChange('username')}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              required
              value={form.password}
              onChange={handleChange('password')}
            />
          </label>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Conectando…' : 'Entrar'}
          </button>
          {(mutation.error || state.error) && (
            <p className="error">{mutation.error?.message ?? state.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
