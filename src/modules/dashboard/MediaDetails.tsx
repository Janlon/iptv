import { memo, useMemo } from 'react';
import type { MediaType, XtreamSeries, XtreamVod } from '../iptv/types';

type MediaDetailsProps = {
  item?: XtreamVod | XtreamSeries;
  type: MediaType;
  loading: boolean;
  onPlay?: (item: XtreamVod | XtreamSeries) => void;
};

export const MediaDetails = memo(function MediaDetails({ item, type, loading, onPlay }: MediaDetailsProps) {
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
        {item && onPlay && (
          <button className="details__play details__play--big" type="button" onClick={() => onPlay(item)}>
            <span role="img" aria-label="play" style={{fontSize: '2rem', marginRight: '0.5rem'}}>▶️</span>
            <span style={{fontSize: '1.25rem', fontWeight: 600}}>Assistir</span>
          </button>
        )}
      </div>
    </aside>
  );
});
