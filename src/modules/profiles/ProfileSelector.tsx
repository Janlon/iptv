import { KeyboardEvent, MouseEvent, useState } from 'react';
import { useProfiles, type Profile } from './ProfileContext';

export function ProfileSelector() {
  const { profiles, selectProfile, createProfile } = useProfiles();
  const [showPinModal, setShowPinModal] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [pin, setPin] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState('🎬');
  const [newProfilePin, setNewProfilePin] = useState('');
  const [error, setError] = useState('');

  const AVATARS = [
    '🎬', '🎭', '🎪', '🎨', '🎸', '🎮', '🎯', '🎲',
    '🌟', '⭐', '✨', '💫', '🔥', '⚡', '💎', '🏆'
  ];

  function handleProfileClick(profile: Profile) {
    if (profile.pin) {
      setShowPinModal(profile.id);
      setPin('');
      setError('');
    } else {
      selectProfile(profile.id);
    }
  }

  function handlePinSubmit(event?: MouseEvent | KeyboardEvent) {
    event?.preventDefault();
    if (!showPinModal) return;

    const success = selectProfile(showPinModal, pin);
    if (success) {
      setShowPinModal(null);
      setPin('');
      setError('');
    } else {
      setError('PIN incorreto');
      setPin('');
    }
  }

  function handleCreateProfile(event?: MouseEvent | KeyboardEvent) {
    event?.preventDefault();
    if (!newProfileName.trim()) {
      setError('Digite um nome para o perfil');
      return;
    }

    createProfile(newProfileName, newProfileAvatar, newProfilePin || undefined);
    setShowCreateModal(false);
    setNewProfileName('');
    setNewProfileAvatar('🎬');
    setNewProfilePin('');
    setError('');
  }

  function handleKeyDown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  return (
    <div className="profile-selector">
      <div className="profile-selector__container">
        <h1 className="profile-selector__title">Quem está assistindo?</h1>
        
        <div className="profile-selector__grid">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              className="profile-card"
              onClick={() => handleProfileClick(profile)}
              onKeyDown={(e) => handleKeyDown(e, () => handleProfileClick(profile))}
              type="button"
            >
              <div className="profile-card__avatar">{profile.avatar}</div>
              <span className="profile-card__name">{profile.name}</span>
              {profile.pin && <span className="profile-card__lock">🔒</span>}
            </button>
          ))}

          {profiles.length < 8 && (
            <button
              className="profile-card profile-card--add"
              onClick={() => {
                setShowCreateModal(true);
                setError('');
              }}
              type="button"
            >
              <div className="profile-card__avatar profile-card__avatar--add">+</div>
              <span className="profile-card__name">Adicionar Perfil</span>
            </button>
          )}
        </div>
      </div>

      {showPinModal && (
        <div className="modal-overlay" onClick={() => setShowPinModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Digite o PIN</h2>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="****"
              autoFocus
              maxLength={10}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePinSubmit();
                }
              }}
            />
            {error && <p className="modal__error">{error}</p>}
            <div className="modal__actions">
              <button type="button" onClick={() => setShowPinModal(null)}>Cancelar</button>
              <button type="button" onClick={handlePinSubmit}>Entrar</button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Novo Perfil</h2>
            
            <label>
              Nome
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="Ex: João, Maria..."
                autoFocus
                maxLength={20}
              />
            </label>

            <label>
              Avatar
              <div className="avatar-picker">
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                    onClick={() => setNewProfileAvatar(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </label>

            <label>
              PIN (opcional)
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={newProfilePin}
                onChange={(e) => setNewProfilePin(e.target.value)}
                placeholder="Deixe vazio para não usar"
                maxLength={10}
              />
            </label>

            {error && <p className="modal__error">{error}</p>}

            <div className="modal__actions">
              <button type="button" onClick={() => {
                setShowCreateModal(false);
                setNewProfileName('');
                setNewProfileAvatar('🎬');
                setNewProfilePin('');
                setError('');
              }}>
                Cancelar
              </button>
              <button type="button" onClick={handleCreateProfile}>
                Criar Perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
