import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchSeries, fetchVodStreams } from '../iptv/api';
import type { Credentials, MediaType, XtreamCategory, XtreamSeries, XtreamVod } from '../iptv/types';
import './search.css';

type SearchFilters = {
  query: string;
  category: string;
  minRating: number;
  type: MediaType | 'all';
};

type GlobalSearchProps = {
  credentials: Credentials;
  onClose: () => void;
  onItemSelect: (item: XtreamVod | XtreamSeries, type: MediaType) => void;
};

export function GlobalSearch({ credentials, onClose, onItemSelect }: GlobalSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    minRating: 0,
    type: 'all'
  });

  const [inputValue, setInputValue] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, query: inputValue }));
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Fetch categories for both types
  const { data: movieCategories = [] } = useQuery<XtreamCategory[]>({
    queryKey: ['categories', credentials.baseUrl, credentials.username, 'movie'],
    queryFn: () => fetchCategories(credentials, 'movie'),
    staleTime: 1000 * 60 * 10
  });

  const { data: seriesCategories = [] } = useQuery<XtreamCategory[]>({
    queryKey: ['categories', credentials.baseUrl, credentials.username, 'series'],
    queryFn: () => fetchCategories(credentials, 'series'),
    staleTime: 1000 * 60 * 10
  });

  // Fetch all movies
  const { data: allMovies = [], isLoading: moviesLoading } = useQuery<XtreamVod[]>({
    queryKey: ['all-movies', credentials.baseUrl, credentials.username],
    queryFn: () => fetchVodStreams(credentials),
    staleTime: 1000 * 60 * 10,
    enabled: filters.type === 'all' || filters.type === 'movie'
  });

  // Fetch all series
  const { data: allSeries = [], isLoading: seriesLoading } = useQuery<XtreamSeries[]>({
    queryKey: ['all-series', credentials.baseUrl, credentials.username],
    queryFn: () => fetchSeries(credentials),
    staleTime: 1000 * 60 * 10,
    enabled: filters.type === 'all' || filters.type === 'series'
  });

  const allCategories = useMemo(() => {
    const combined = [...movieCategories, ...seriesCategories];
    const uniqueMap = new Map();
    combined.forEach(cat => {
      if (!uniqueMap.has(cat.category_id)) {
        uniqueMap.set(cat.category_id, cat);
      }
    });
    return Array.from(uniqueMap.values()).sort((a, b) => 
      a.category_name.localeCompare(b.category_name)
    );
  }, [movieCategories, seriesCategories]);

  const filteredResults = useMemo(() => {
    let results: Array<{ item: XtreamVod | XtreamSeries; type: MediaType }> = [];

    // Add movies
    if (filters.type === 'all' || filters.type === 'movie') {
      results.push(...allMovies.map(item => ({ item, type: 'movie' as MediaType })));
    }

    // Add series
    if (filters.type === 'all' || filters.type === 'series') {
      results.push(...allSeries.map(item => ({ item, type: 'series' as MediaType })));
    }

    // Apply filters
    results = results.filter(({ item }) => {
      // Search query filter
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const name = item.name.toLowerCase();
        if (!name.includes(query)) return false;
      }

      // Category filter
      if (filters.category !== 'all') {
        if (item.category_id !== filters.category) return false;
      }

      // Rating filter
      if (filters.minRating > 0) {
        const rating = parseFloat(item.rating || '0');
        if (rating < filters.minRating) return false;
      }

      return true;
    });

    // Sort by name
    results.sort((a, b) => a.item.name.localeCompare(b.item.name));

    return results;
  }, [allMovies, allSeries, filters]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const loading = moviesLoading || seriesLoading;

  return (
    <div className="global-search" onKeyDown={handleKeyDown}>
      <div className="global-search__overlay" onClick={onClose} />
      
      <div className="global-search__modal">
        <div className="global-search__header">
          <h2>Buscar Conteúdo</h2>
          <button type="button" onClick={onClose} className="global-search__close">✕</button>
        </div>

        <div className="global-search__filters">
          <input
            type="text"
            className="global-search__input"
            placeholder="Digite o nome do 🎬 filme ou 📺 série..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />

          <div className="global-search__filter-row">
            <select
              className="global-search__select"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as MediaType | 'all' }))}
            >
              <option value="all">📺🎬 Todos os tipos</option>
              <option value="movie">🎬 Filmes</option>
              <option value="series">📺 Séries</option>
            </select>

            <select
              className="global-search__select"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="all">Todas as categorias</option>
              {allCategories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>

            <select
              className="global-search__select"
              value={filters.minRating}
              onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
            >
              <option value="0">Qualquer nota</option>
              <option value="5">5+ ⭐</option>
              <option value="6">6+ ⭐</option>
              <option value="7">7+ ⭐</option>
              <option value="8">8+ ⭐</option>
              <option value="9">9+ ⭐</option>
            </select>
          </div>
        </div>

        <div className="global-search__results">
          {loading ? (
            <div className="global-search__loading">Carregando...</div>
          ) : filteredResults.length === 0 ? (
            <div className="global-search__empty">
              {filters.query ? 'Nenhum resultado encontrado' : 'Digite algo para buscar'}
            </div>
          ) : (
            <>
              <div className="global-search__count">
                {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''} encontrado{filteredResults.length !== 1 ? 's' : ''}
              </div>
              <div className="global-search__list">
                {filteredResults.map(({ item, type }, index) => {
                  const isVod = 'stream_id' in item;
                  const poster = isVod ? item.stream_icon : item.cover;
                  const id = isVod ? item.stream_id : item.series_id;
                  
                  return (
                    <button
                      key={`${type}-${id}-${index}`}
                      type="button"
                      className="global-search__item"
                      onClick={() => onItemSelect(item, type)}
                    >
                      <div className="global-search__item-poster">
                        {poster ? (
                          <img src={poster} alt={item.name} loading="lazy" />
                        ) : (
                          <div className="global-search__item-placeholder">{item.name.charAt(0)}</div>
                        )}
                      </div>
                      <div className="global-search__item-info">
                        <h3>{item.name}</h3>
                        <div className="global-search__item-meta">
                          <span className="global-search__item-type">
                            {type === 'movie' ? '🎬 Filme' : '📺 Série'}
                          </span>
                          {item.rating && (
                            <span className="global-search__item-rating">⭐ {item.rating}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
