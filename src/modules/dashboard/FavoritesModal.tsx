import { useState } from 'react';
import { useProfiles, type Favorite } from '../profiles/ProfileContext';
import { useAuth } from '../auth/AuthContext';
import './favorites.css';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemSelect: (item: { streamId: string | number; title: string; type: 'movie' | 'series' }) => void;
}

export function FavoritesModal({ isOpen, onClose, onItemSelect }: FavoritesModalProps) {
  const { getFavorites, removeFavorite, activeProfile } = useProfiles();
  const { state: authState } = useAuth();
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'type'>('recent');
  
  if (!isOpen) return null;

  const favorites = getFavorites();
  
  // Ordenação dos favoritos
  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'recent':
      default:
        return b.addedAt - a.addedAt;
    }
  });

  const handleItemClick = (favorite: Favorite) => {
    onItemSelect({
      streamId: favorite.streamId,
      title: favorite.title,
      type: favorite.type
    });
    onClose();
  };

  const handleRemoveFavorite = (streamId: string | number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (confirm('Remover este item dos favoritos?')) {
      removeFavorite(streamId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--large favorites-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="favorites-header">
            <h2>⭐ Meus Favoritos</h2>
            <span className="favorites-count">
              {favorites.length} {favorites.length === 1 ? 'item' : 'itens'}
            </span>
          </div>
          <button className="modal__close" onClick={onClose} type="button">×</button>
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <div className="favorites-empty__icon">⭐</div>
            <h3>Nenhum favorito ainda</h3>
            <p>Adicione filmes e séries aos seus favoritos para encontrá-los facilmente aqui.</p>
            <button className="btn btn--primary" onClick={onClose} type="button">
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="favorites-controls">
              <div className="favorites-sort">
                <label>Ordenar por:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'name' | 'type')}
                >
                  <option value="recent">Adicionados recentemente</option>
                  <option value="name">Nome (A-Z)</option>
                  <option value="type">Tipo (Filmes/Séries)</option>
                </select>
              </div>
              <div className="favorites-profile">
                Perfil: <strong>{activeProfile?.name}</strong>
              </div>
            </div>

            <div className="favorites-grid">
              {sortedFavorites.map((favorite) => (
                <div 
                  key={favorite.streamId} 
                  className="favorite-item"
                  onClick={() => handleItemClick(favorite)}
                >
                  <div className="favorite-item__poster">
                    {favorite.poster ? (
                      <img 
                        src={favorite.poster} 
                        alt={favorite.title}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="favorite-item__poster-placeholder">
                        {favorite.type === 'movie' ? '🎬' : '📺'}
                      </div>
                    )}
                  </div>
                  
                  <div className="favorite-item__info">
                    <h4 className="favorite-item__title">{favorite.title}</h4>
                    <div className="favorite-item__meta">
                      <span className={`favorite-item__type favorite-item__type--${favorite.type}`}>
                        {favorite.type === 'movie' ? '🎬 Filme' : '📺 Série'}
                      </span>
                      <span className="favorite-item__date">
                        {new Date(favorite.addedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <button
                    className="favorite-item__remove"
                    onClick={(e) => handleRemoveFavorite(favorite.streamId, e)}
                    title="Remover dos favoritos"
                    type="button"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}