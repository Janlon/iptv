import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useProfiles } from '../profiles/ProfileContext';
import { testConnection } from '../iptv/connectivity';
import './management.css';

interface ManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManagementModal({ isOpen, onClose }: ManagementModalProps) {
  const { state: authState, logout, updateCredentials } = useAuth();
  const { activeProfile, clearProfile, clearFavorites, clearWatchHistory, getFavorites, getWatchHistory } = useProfiles();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'connection' | 'account'>('favorites');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Estados para edição de credenciais
  const [editingCredentials, setEditingCredentials] = useState(false);
  const [newUrl, setNewUrl] = useState(authState.credentials?.baseUrl || '');
  const [newUsername, setNewUsername] = useState(authState.credentials?.username || '');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleClearFavorites = () => {
    const favoritesCount = getFavorites().length;
    if (favoritesCount === 0) {
      alert('Não há favoritos para limpar.');
      return;
    }
    
    if (confirm(`Tem certeza que deseja limpar todos os ${favoritesCount} favoritos? Esta ação não pode ser desfeita.`)) {
      clearFavorites();
      alert('Favoritos limpos com sucesso!');
    }
  };

  const handleClearHistory = () => {
    const historyCount = getWatchHistory().length;
    if (historyCount === 0) {
      alert('Não há histórico para limpar.');
      return;
    }
    
    if (confirm(`Tem certeza que deseja limpar todo o histórico (${historyCount} itens)? Esta ação não pode ser desfeita.`)) {
      clearWatchHistory();
      alert('Histórico limpo com sucesso!');
    }
  };

  const handleTestConnection = async () => {
    if (!authState.credentials) return;
    
    setIsTestingConnection(true);
    setConnectionResult(null);
    
    try {
      const result = await testConnection(authState.credentials);
      if (result.success) {
        setConnectionResult('✅ Conexão OK - Servidor respondendo normalmente');
      } else {
        setConnectionResult(`❌ Erro na conexão: ${result.error}`);
      }
    } catch (error) {
      setConnectionResult(`❌ Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleUpdateCredentials = () => {
    if (!newUrl.trim() || !newUsername.trim() || !newPassword.trim()) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const newCredentials = {
      baseUrl: newUrl.trim(),
      username: newUsername.trim(),
      password: newPassword.trim()
    };

    updateCredentials?.(newCredentials);
    setEditingCredentials(false);
    setNewPassword('');
    alert('Credenciais atualizadas com sucesso!');
  };

  const handleLogout = () => {
    clearProfile();
    logout();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--large" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Gerenciamento</h2>
          <button className="modal__close" onClick={onClose} type="button">×</button>
        </div>

        <div className="modal__tabs">
          <button
            className={activeTab === 'favorites' ? 'modal__tab modal__tab--active' : 'modal__tab'}
            onClick={() => setActiveTab('favorites')}
            type="button"
          >
            📋 Dados do Perfil
          </button>
          <button
            className={activeTab === 'connection' ? 'modal__tab modal__tab--active' : 'modal__tab'}
            onClick={() => setActiveTab('connection')}
            type="button"
          >
            🔧 Conexão
          </button>
          <button
            className={activeTab === 'account' ? 'modal__tab modal__tab--active' : 'modal__tab'}
            onClick={() => setActiveTab('account')}
            type="button"
          >
            👤 Conta
          </button>
        </div>

        <div className="modal__content">
          {activeTab === 'favorites' && (
            <div className="management-section">
              <h3>Dados do Perfil: {activeProfile?.name}</h3>
              <p className="management-section__description">
                Gerencie os dados salvos neste perfil
              </p>
              
              <div className="management-actions">
                <div className="management-card">
                  <div className="management-card__info">
                    <h4>🌟 Favoritos</h4>
                    <p>Remove todos os itens da sua lista de favoritos</p>
                    <span className="data-count">{getFavorites().length} itens salvos</span>
                  </div>
                  <button 
                    className="btn btn--danger"
                    onClick={handleClearFavorites}
                    type="button"
                    disabled={getFavorites().length === 0}
                  >
                    Limpar Favoritos
                  </button>
                </div>

                <div className="management-card">
                  <div className="management-card__info">
                    <h4>📺 Histórico</h4>
                    <p>Remove todo o histórico de reprodução e posições salvas</p>
                    <span className="data-count">{getWatchHistory().length} itens no histórico</span>
                  </div>
                  <button 
                    className="btn btn--danger"
                    onClick={handleClearHistory}
                    type="button"
                    disabled={getWatchHistory().length === 0}
                  >
                    Limpar Histórico
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connection' && (
            <div className="management-section">
              <h3>Teste de Conexão</h3>
              <p className="management-section__description">
                Verifique se o servidor IPTV está respondendo corretamente
              </p>

              <div className="connection-test">
                <div className="connection-info">
                  <p><strong>Servidor:</strong> {authState.credentials?.baseUrl}</p>
                  <p><strong>Usuário:</strong> {authState.credentials?.username}</p>
                </div>

                <button
                  className="btn btn--primary"
                  onClick={handleTestConnection}
                  disabled={isTestingConnection}
                  type="button"
                >
                  {isTestingConnection ? '🔄 Testando...' : '🔗 Testar Conexão'}
                </button>

                {connectionResult && (
                  <div className={`connection-result ${connectionResult.includes('✅') ? 'success' : 'error'}`}>
                    {connectionResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="management-section">
              <h3>Configurações da Conta</h3>
              <p className="management-section__description">
                Gerencie suas credenciais de acesso
              </p>

              {!editingCredentials ? (
                <div className="account-info">
                  <div className="account-field">
                    <label>URL do Servidor:</label>
                    <span>{authState.credentials?.baseUrl}</span>
                  </div>
                  <div className="account-field">
                    <label>Usuário:</label>
                    <span>{authState.credentials?.username}</span>
                  </div>
                  <div className="account-field">
                    <label>Senha:</label>
                    <span>••••••••</span>
                  </div>

                  <div className="account-actions">
                    <button
                      className="btn btn--secondary"
                      onClick={() => {
                        setEditingCredentials(true);
                        setNewUrl(authState.credentials?.baseUrl || '');
                        setNewUsername(authState.credentials?.username || '');
                        setNewPassword('');
                      }}
                      type="button"
                    >
                      ✏️ Editar Credenciais
                    </button>

                    <button
                      className="btn btn--danger"
                      onClick={() => setShowLogoutConfirm(true)}
                      type="button"
                    >
                      🚪 Sair da Conta
                    </button>
                  </div>
                </div>
              ) : (
                <div className="credential-edit">
                  <label>
                    URL do Servidor
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="http://servidor.com:8080"
                    />
                  </label>

                  <label>
                    Usuário
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="seu_usuario"
                    />
                  </label>

                  <label>
                    Nova Senha
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite a nova senha"
                    />
                  </label>

                  <div className="credential-actions">
                    <button
                      className="btn btn--secondary"
                      onClick={() => {
                        setEditingCredentials(false);
                        setNewPassword('');
                      }}
                      type="button"
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn--primary"
                      onClick={handleUpdateCredentials}
                      type="button"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {showLogoutConfirm && (
          <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
            <div className="modal modal--small" onClick={(e) => e.stopPropagation()}>
              <h3>Confirmar Saída</h3>
              <p>Tem certeza que deseja sair da conta? Você precisará fazer login novamente.</p>
              <div className="modal__actions">
                <button
                  className="btn btn--secondary"
                  onClick={() => setShowLogoutConfirm(false)}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="btn btn--danger"
                  onClick={handleLogout}
                  type="button"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}