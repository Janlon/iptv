import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeriesInfo } from '../iptv/api';
import type { Credentials, XtreamEpisode, XtreamSeriesInfo } from '../iptv/types';

type SeriesSelectorProps = {
  seriesId: number;
  seriesTitle: string;
  credentials: Credentials;
  onEpisodeSelect: (episodeId: string, episodeTitle: string, extension: string) => void;
  onClose: () => void;
};

export function SeriesSelector({ seriesId, seriesTitle, credentials, onEpisodeSelect, onClose }: SeriesSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  const { data: seriesInfo, isLoading, error } = useQuery<XtreamSeriesInfo>({
    queryKey: ['series-info', seriesId],
    queryFn: () => fetchSeriesInfo(credentials, seriesId),
    staleTime: 1000 * 60 * 10
  });

  const seasons = seriesInfo ? Object.keys(seriesInfo.episodes).sort((a, b) => Number(a) - Number(b)) : [];

  useEffect(() => {
    if (seasons.length > 0 && !selectedSeason) {
      setSelectedSeason(seasons[0]);
    }
  }, [seasons, selectedSeason]);

  const handleEpisodeClick = useCallback((episode: XtreamEpisode) => {
    const episodeTitle = `${seriesTitle} - T${selectedSeason} E${episode.episode_num}: ${episode.title}`;
    onEpisodeSelect(episode.id, episodeTitle, episode.container_extension);
  }, [seriesTitle, selectedSeason, onEpisodeSelect]);

  if (isLoading) {
    return (
      <div className="series-selector">
        <div className="series-selector__header">
          <h2>{seriesTitle}</h2>
          <button type="button" onClick={onClose} className="series-selector__close">✕</button>
        </div>
        <div className="series-selector__loading">Carregando temporadas...</div>
      </div>
    );
  }

  if (error || !seriesInfo) {
    return (
      <div className="series-selector">
        <div className="series-selector__header">
          <h2>{seriesTitle}</h2>
          <button type="button" onClick={onClose} className="series-selector__close">✕</button>
        </div>
        <div className="series-selector__error">
          Erro ao carregar episódios. Tente novamente.
        </div>
      </div>
    );
  }

  const episodes = selectedSeason ? seriesInfo.episodes[selectedSeason] || [] : [];

  return (
    <div className="series-selector">
      <div className="series-selector__header">
        <h2>{seriesInfo.info.name}</h2>
        <button type="button" onClick={onClose} className="series-selector__close">✕</button>
      </div>

      <div className="series-selector__content">
        <div className="series-selector__seasons">
          <h3>Temporadas</h3>
          <div className="series-selector__season-list">
            {seasons.map((season) => (
              <button
                key={season}
                type="button"
                className={`series-selector__season ${selectedSeason === season ? 'series-selector__season--active' : ''}`}
                onClick={() => setSelectedSeason(season)}
              >
                Temporada {season}
              </button>
            ))}
          </div>
        </div>

        <div className="series-selector__episodes">
          <h3>Episódios - Temporada {selectedSeason}</h3>
          <div className="series-selector__episode-list">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="series-selector__episode"
              >
                <div className="series-selector__episode-info">
                  <span className="series-selector__episode-num">E{episode.episode_num}</span>
                  <span className="series-selector__episode-title">{episode.title}</span>
                  {episode.info?.duration && (
                    <span className="series-selector__episode-duration">{episode.info.duration}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="series-selector__episode-play"
                  onClick={() => handleEpisodeClick(episode)}
                >
                  ▶ Assistir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
