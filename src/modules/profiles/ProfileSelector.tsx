import { KeyboardEvent, MouseEvent, useState } from 'react';
import { useProfiles, type Profile } from './ProfileContext';

export function ProfileSelector() {
  const { profiles, selectProfile, createProfile, updateProfile, deleteProfile } = useProfiles();
  const [showPinModal, setShowPinModal] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<Profile | null>(null);
  const [pin, setPin] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState('🦸‍♂️');
  const [newProfilePin, setNewProfilePin] = useState('');
  const [error, setError] = useState('');

  const AVATARS = [
    // Heróis Clássicos
    '🦸‍♂️', '🦸‍♀️', '🕷️', '🦇', '⚡', '🛡️', '🔥', '❄️',
    // Vilões
    '🦹‍♂️', '🦹‍♀️', '💀', '🐍', '🔮', '⚔️', '💥', '🌪️',
    // Fantasia & Ficção
    '🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️',
    // Sci-Fi
    '🤖', '👽', '🛸', '🌌', '🧞‍♂️', '🧞‍♀️', '⭐', '🚀'
  ];

  const getAvatarTitle = (emoji: string) => {
    const titles: Record<string, string> = {
      '🦸‍♂️': 'Super-herói', '🦸‍♀️': 'Super-heroína', '🕷️': 'Aranha', '🦇': 'Morcego',
      '⚡': 'Raio', '🛡️': 'Escudo', '🔥': 'Fogo', '❄️': 'Gelo',
      '🦹‍♂️': 'Vilão', '🦹‍♀️': 'Vilã', '💀': 'Caveira', '🐍': 'Serpente',
      '🔮': 'Cristal', '⚔️': 'Espada', '💥': 'Explosão', '🌪️': 'Tornado',
      '🧙‍♂️': 'Mago', '🧙‍♀️': 'Maga', '🧚‍♂️': 'Fada', '🧚‍♀️': 'Fada',
      '🧝‍♂️': 'Elfo', '🧝‍♀️': 'Elfa', '🧛‍♂️': 'Vampiro', '🧛‍♀️': 'Vampira',
      '🤖': 'Robô', '👽': 'Alienígena', '🛸': 'OVNI', '🌌': 'Galáxia',
      '🧞‍♂️': 'Gênio', '🧞‍♀️': 'Gênia', '⭐': 'Estrela', '🚀': 'Foguete'
    };
    return titles[emoji] || emoji;
  };

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
    setNewProfileAvatar('🦸‍♂️');
    setNewProfilePin('');
    setError('');
  }

  function handleEditProfile() {
    if (!showEditModal) return;

    if (!newProfileName.trim()) {
      setError('Digite um nome para o perfil');
      return;
    }

    updateProfile(showEditModal.id, {
      name: newProfileName,
      avatar: newProfileAvatar,
      pin: newProfilePin || undefined
    });

    setShowEditModal(null);
    setNewProfileName('');
    setNewProfileAvatar('🦸‍♂️');
    setNewProfilePin('');
    setError('');
  }

  function openEditModal(profile: Profile) {
    setShowEditModal(profile);
    setNewProfileName(profile.name);
    setNewProfileAvatar(profile.avatar);
    setNewProfilePin(profile.pin || '');
    setError('');
  }

  function handleDeleteProfile(profileId: string) {
    if (profiles.length <= 1) {
      setError('Deve haver pelo menos um perfil');
      return;
    }
    
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      deleteProfile(profileId);
      setShowEditModal(null);
    }
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
        <p className="profile-selector__subtitle">
          {profiles.length} {profiles.length === 1 ? 'perfil criado' : 'perfis criados'} • 
          Máximo {8 - profiles.length} {8 - profiles.length === 1 ? 'perfil restante' : 'perfis restantes'}
        </p>
        
        <div className="profile-selector__grid">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-card-container">
              <button
                className="profile-card"
                onClick={() => handleProfileClick(profile)}
                onKeyDown={(e) => handleKeyDown(e, () => handleProfileClick(profile))}
                type="button"
              >
                <div className="profile-card__avatar">{profile.avatar}</div>
                <span className="profile-card__name">{profile.name}</span>
                {profile.pin && <span className="profile-card__lock">🔒</span>}
              </button>
              <button
                className="profile-card__edit"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(profile);
                }}
                title="Editar perfil"
                type="button"
              >
                ⚙️
              </button>
            </div>
          ))}

          {profiles.length < 8 && (
            <div className="profile-card-container">
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
            </div>
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
                <div className="avatar-category">
                  <span className="avatar-category__title">🦸 Heróis</span>
                  <div className="avatar-category__items">
                    {['🦸‍♂️', '🦸‍♀️', '🕷️', '🦇', '⚡', '🛡️', '🔥', '❄️'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="avatar-category">
                  <span className="avatar-category__title">🦹 Vilões</span>
                  <div className="avatar-category__items">
                    {['🦹‍♂️', '🦹‍♀️', '💀', '🐍', '🔮', '⚔️', '💥', '🌪️'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="avatar-category">
                  <span className="avatar-category__title">🧙 Fantasia</span>
                  <div className="avatar-category__items">
                    {['🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="avatar-category">
                  <span className="avatar-category__title">🚀 Sci-Fi</span>
                  <div className="avatar-category__items">
                    {['🤖', '👽', '🛸', '🌌', '🧞‍♂️', '🧞‍♀️', '⭐', '🚀'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
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
                setNewProfileAvatar('🦸‍♂️');
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

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Editar Perfil</h2>
            
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
                <div className="avatar-category">
                  <span className="avatar-category__title">🦸 Heróis</span>
                  <div className="avatar-category__items">
                    {['🦸‍♂️', '🦸‍♀️', '🕷️', '🦇', '⚡', '🛡️', '🔥', '❄️'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="avatar-category">
                  <span className="avatar-category__title">🦹 Vilões</span>
                  <div className="avatar-category__items">
                    {['🦹‍♂️', '🦹‍♀️', '💀', '🐍', '🔮', '⚔️', '💥', '🌪️'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="avatar-category">
                  <span className="avatar-category__title">🧙 Fantasia</span>
                  <div className="avatar-category__items">
                    {['🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="avatar-category">
                  <span className="avatar-category__title">🚀 Sci-Fi</span>
                  <div className="avatar-category__items">
                    {['🤖', '👽', '🛸', '🌌', '🧞‍♂️', '🧞‍♀️', '⭐', '🚀'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={newProfileAvatar === emoji ? 'avatar-picker__item avatar-picker__item--active' : 'avatar-picker__item'}
                        onClick={() => setNewProfileAvatar(emoji)}
                        title={getAvatarTitle(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
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
              <button 
                type="button" 
                onClick={() => handleDeleteProfile(showEditModal.id)}
                className="modal__delete-btn"
              >
                Excluir
              </button>
              <button type="button" onClick={() => {
                setShowEditModal(null);
                setNewProfileName('');
                setNewProfileAvatar('🦸‍♂️');
                setNewProfilePin('');
                setError('');
              }}>
                Cancelar
              </button>
              <button type="button" onClick={handleEditProfile}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
