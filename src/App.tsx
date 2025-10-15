import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AppShell } from './components/AppShell';
import { AuthProvider } from './modules/auth/AuthContext';
import { ProfileProvider } from './modules/profiles/ProfileContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1
    },
    mutations: {
      retry: 0
    }
  }
});

function App() {
  const client = useMemo(() => queryClient, []);

  return (
    <QueryClientProvider client={client}>
      <ProfileProvider>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
