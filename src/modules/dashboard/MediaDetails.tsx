import { memo, useMemo } from 'react';
import { useProfiles } from '../profiles/ProfileContext';
import type { MediaType, XtreamSeries, XtreamVod } from '../iptv/types';

type MediaDetailsProps = {
  item?: XtreamVod | XtreamSeries;
  type: MediaType;
  loading: boolean;
  onPlay?: (item: XtreamVod | XtreamSeries) => void;
};

export const MediaDetails = memo(function MediaDetails({ item, type, loading, onPlay }: MediaDetailsProps) {
  const { isFavorite, addFavorite, removeFavorite } = useProfiles();
  
  const details = useMemo(() => {
    if (!item) {
      return null;
    }

    if ('stream_id' in item) {
      return {
        title: item.name,
        poster: item.stream_icon,
        rating: item.rating,
        description: item.plot,
        releasedAt: item.added
      };
    }

    return {
      title: item.name,
      poster: item.cover,
      rating: item.rating,
      description: item.plot,
      releasedAt: item.last_modified
    };
  }, [item]);

  const handleFavoriteToggle = () => {
    if (!item || !details) return;
    
    const streamId = 'stream_id' in item ? item.stream_id : item.series_id;
    const isCurrentlyFavorite = isFavorite(streamId);
    
    if (isCurrentlyFavorite) {
      removeFavorite(streamId);
    } else {
      addFavorite({
        streamId,
        title: details.title,
        poster: details.poster,
        type: type
      });
    }
  };

  const getFavoriteButtonText = () => {
    if (!item) return '';
    const streamId = 'stream_id' in item ? item.stream_id : item.series_id;
    return isFavorite(streamId) ? '⭐ Remover dos Favoritos' : '☆ Adicionar aos Favoritos';
  };

  if (loading && !details) {
    return (
      <aside className="details details--loading">
        <div className="details__poster details__poster--skeleton" />
        <div className="details__info">
          <div className="details__line details__line--primary" />
          <div className="details__line" />
          <div className="details__line" />
        </div>
      </aside>
    );
  }

  if (!details) {
    return (
      <aside className="details">
        <p>Use as setas para navegar e selecione um título.</p>
      </aside>
    );
  }

  return (
    <aside className="details">
      <div className="details__poster">
        {details.poster ? (
          <img src={details.poster} alt={details.title} loading="lazy" />
        ) : (
          <div className="details__poster--placeholder">{details.title.charAt(0)}</div>
        )}
      </div>
      <div className="details__info">
        <h3>{details.title}</h3>
        {details.rating && <span className="details__rating">Nota: {details.rating}</span>}
        {details.releasedAt && <span className="details__meta">Atualizado em {details.releasedAt}</span>}
        {details.description && <p>{details.description}</p>}
        <span className="details__type">{type === 'movie' ? 'Filme' : 'Série'}</span>
        
        <div className="details__actions">
          {item && onPlay && (
            <button className="details__play details__play--big" type="button" onClick={() => onPlay(item)}>
              <span role="img" aria-label="play" style={{fontSize: '2rem', marginRight: '0.5rem'}}>▶️</span>
              <span style={{fontSize: '1.25rem', fontWeight: 600}}>Assistir</span>
            </button>
          )}
          
          {item && (
            <button 
              className="details__favorite" 
              type="button" 
              onClick={handleFavoriteToggle}
              title={getFavoriteButtonText()}
            >
              {getFavoriteButtonText()}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
});
