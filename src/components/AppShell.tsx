import { useAuth } from '../modules/auth/AuthContext';
import { LoginScreen } from '../modules/auth/LoginScreen';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { useProfiles } from '../modules/profiles/ProfileContext';
import { ProfileSelector } from '../modules/profiles/ProfileSelector';
import '../modules/profiles/profiles.css';

export function AppShell() {
  const { state } = useAuth();
  const { activeProfile } = useProfiles();

  if (!activeProfile) {
    return <ProfileSelector />;
  }

  if (state.status === 'authenticating') {
    return (
      <div className="loading-screen">
        <div className="loading-screen__spinner" />
        <p>Carregando catálogo…</p>
      </div>
    );
  }

  if (state.status !== 'authenticated' || !state.credentials) {
    return <LoginScreen />;
  }

  return <Dashboard />;
}
