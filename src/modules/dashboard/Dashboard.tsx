import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import { fetchCategories, fetchSeries, fetchVodStreams } from '../iptv/api';
import { MediaType, XtreamCategory, XtreamSeries, XtreamVod } from '../iptv/types';
import { useRemoteNavigation, type RemoteKeyEvent } from '../navigation/useRemoteNavigation';
import { CategoryList } from './CategoryList';
import { MediaGrid } from './MediaGrid';
import { MediaDetails } from './MediaDetails';
import { PlayerOverlay } from './PlayerOverlay';
import { SeriesSelector } from './SeriesSelector';
import { GlobalSearch } from '../search';
import { useResponsiveColumns } from './useResponsiveColumns';
import './player.css';
import './series.css';

const TABS: { label: string; type: MediaType }[] = [
  { label: 'Filmes', type: 'movie' },
  { label: 'Séries', type: 'series' }
];

type SelectionState = {
  focusedPanel: 'tabs' | 'categories' | 'grid';
  categoryIndex: number;
  itemIndex: number;
};

const INITIAL_SELECTION: SelectionState = {
  focusedPanel: 'tabs',
  categoryIndex: 0,
  itemIndex: 0
};

export function Dashboard() {
  const {
    state: { credentials },
    logout
  } = useAuth();

  const [activeTab, setActiveTab] = useState<MediaType>('movie');
  const [selection, setSelection] = useState<SelectionState>(INITIAL_SELECTION);
  const [playingItem, setPlayingItem] = useState<(XtreamVod | XtreamSeries) | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<XtreamSeries | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<{ 
    id: string; 
    title: string; 
    extension: string;
    series: XtreamSeries;
  } | null>(null);
  const { columns } = useResponsiveColumns();
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery<XtreamCategory[]>({
    queryKey: ['categories', credentials?.baseUrl, credentials?.username, activeTab],
    queryFn: async () => {
      if (!credentials) {
        throw new Error('Credenciais ausentes');
      }
      console.debug('[dashboard] fetch categories', { tab: activeTab, base: credentials.baseUrl });
      return fetchCategories(credentials, activeTab);
    },
    enabled: Boolean(credentials)
  });

  const categories = categoriesQuery.data ?? [];
  const activeCategoryId = categories[selection.categoryIndex]?.category_id;

  const itemsQuery = useQuery<(XtreamVod | XtreamSeries)[]>({
    queryKey: ['items', activeTab, activeCategoryId],
    queryFn: async () => {
      if (!credentials) {
        throw new Error('Credenciais ausentes');
      }
      console.debug('[dashboard] fetch items', { tab: activeTab, category: activeCategoryId });
      if (activeTab === 'movie') {
        const vod = await fetchVodStreams(credentials, activeCategoryId);
        return vod as (XtreamVod | XtreamSeries)[];
      }
      const series = await fetchSeries(credentials, activeCategoryId);
      return series as (XtreamVod | XtreamSeries)[];
    },
    enabled: Boolean(credentials) && categories.length > 0,
    staleTime: 1000 * 60 * 10
  });

  const items = itemsQuery.data ?? [];
  const focusedItem = items[selection.itemIndex];
  const categoriesError = categoriesQuery.error instanceof Error ? categoriesQuery.error : null;
  const itemsError = itemsQuery.error instanceof Error ? itemsQuery.error : null;
  const errorMessage = categoriesError?.message ?? itemsError?.message ?? null;

  useRemoteNavigation(
    useCallback(
      ({ key }: RemoteKeyEvent) => {
        setSelection((prev: SelectionState) => {
          if (key === 'back') {
            return { ...INITIAL_SELECTION, focusedPanel: 'tabs' };
          }

          if (key === 'left') {
            if (prev.focusedPanel === 'grid') {
              if (prev.itemIndex % columns === 0) {
                return { ...prev, focusedPanel: 'categories' };
              }
              return { ...prev, itemIndex: Math.max(prev.itemIndex - 1, 0) };
            }

            if (prev.focusedPanel === 'categories') {
              return { ...prev, focusedPanel: 'tabs' };
            }
          }

          if (key === 'right') {
            if (prev.focusedPanel === 'tabs') {
              return { ...prev, focusedPanel: categories.length ? 'categories' : 'tabs' };
            }

            if (prev.focusedPanel === 'categories') {
              if (!items.length) {
                return prev;
              }
              return { ...prev, focusedPanel: 'grid' };
            }

            if (prev.focusedPanel === 'grid') {
              return { ...prev, itemIndex: Math.min(prev.itemIndex + 1, Math.max(items.length - 1, 0)) };
            }
          }

          if (key === 'up') {
            if (prev.focusedPanel === 'grid') {
              return {
                ...prev,
                itemIndex: Math.max(prev.itemIndex - columns, 0)
              };
            }

            if (prev.focusedPanel === 'categories') {
              return {
                ...prev,
                categoryIndex: Math.max(prev.categoryIndex - 1, 0)
              };
            }

            if (prev.focusedPanel === 'tabs') {
              return {
                ...prev,
                focusedPanel: 'grid'
              };
            }
          }

          if (key === 'down') {
            if (prev.focusedPanel === 'tabs') {
              return { ...prev, focusedPanel: categories.length ? 'categories' : 'tabs' };
            }

            if (prev.focusedPanel === 'categories') {
              return {
                ...prev,
                categoryIndex: Math.min(prev.categoryIndex + 1, Math.max(categories.length - 1, 0))
              };
            }

            if (prev.focusedPanel === 'grid') {
              return {
                ...prev,
                itemIndex: Math.min(prev.itemIndex + columns, Math.max(items.length - 1, 0))
              };
            }
          }

          if (key === 'enter') {
            if (prev.focusedPanel === 'grid' && focusedItem) {
              if (activeTab === 'series' && 'series_id' in focusedItem) {
                setSelectedSeries(focusedItem);
              } else {
                setPlayingItem(focusedItem);
              }
            }
            return prev;
          }

          return prev;
        });
      },
      [categories.length, columns, items.length, focusedItem, activeTab]
    )
  );

  const handleTabChange = useCallback(
    (type: MediaType) => {
      setActiveTab(type);
      setSelection({ ...INITIAL_SELECTION, focusedPanel: 'categories' });
      prefetchCategories(queryClient, credentials, type);
    },
    [credentials, queryClient]
  );

  const handleCategoryFocus = useCallback((index: number) => {
    setSelection((prev: SelectionState) => ({ ...prev, categoryIndex: index, itemIndex: 0 }));
  }, []);

  const derivedItems = useMemo(() => {
    return items.map((item: XtreamVod | XtreamSeries) => ({
      id: isVod(item) ? item.stream_id : item.series_id,
      title: item.name,
      poster: isVod(item) ? item.stream_icon : item.cover,
      meta: item.rating,
      raw: item
    }));
  }, [items]);

  const loading = categoriesQuery.isPending || itemsQuery.isPending;

  const clampItemIndex = useCallback(
    (index: number) => {
      if (!items.length) {
        return 0;
      }
      return Math.min(Math.max(index, 0), items.length - 1);
    },
    [items.length]
  );

  const handleGridSelect = useCallback(
    (index: number) => {
      setSelection((prev) => {
        const nextIndex = clampItemIndex(index);
        if (prev.focusedPanel === 'grid' && prev.itemIndex === nextIndex) {
          return prev;
        }
        return {
          ...prev,
          focusedPanel: 'grid',
          itemIndex: nextIndex
        };
      });
    },
    [clampItemIndex]
  );

  const handleGridHighlight = useCallback(
    (index: number) => {
      setSelection((prev) => {
        const nextIndex = clampItemIndex(index);
        if (prev.focusedPanel === 'grid' && prev.itemIndex === nextIndex) {
          return prev;
        }
        return {
          ...prev,
          focusedPanel: 'grid',
          itemIndex: nextIndex
        };
      });
    },
    [clampItemIndex]
  );

  const handleLogout = useCallback(() => {
    queryClient.clear();
    logout();
  }, [logout, queryClient]);

  const handlePlayItem = useCallback((item: XtreamVod | XtreamSeries) => {
    if (activeTab === 'series' && 'series_id' in item) {
      setSelectedSeries(item);
    } else {
      setPlayingItem(item);
    }
  }, [activeTab]);

  const handleEpisodeSelect = useCallback((episodeId: string, episodeTitle: string, extension: string) => {
    if (selectedSeries) {
      setPlayingEpisode({ 
        id: episodeId, 
        title: episodeTitle, 
        extension,
        series: selectedSeries
      });
      setSelectedSeries(null);
    }
  }, [selectedSeries]);

  const handleSearchItemSelect = useCallback((item: XtreamVod | XtreamSeries, type: MediaType) => {
    setShowSearch(false);
    if (type === 'series' && 'series_id' in item) {
      setSelectedSeries(item);
    } else {
      setPlayingItem(item);
    }
  }, []);

  // Global keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setShowSearch(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (!credentials || !categories.length) {
      return;
    }

    const categoryId = categories[0]?.category_id;
    if (!categoryId) {
      return;
    }
    console.debug('[dashboard] prefetch first items', { tab: activeTab, categoryId });
    queryClient.prefetchQuery({
      queryKey: ['items', activeTab, categoryId],
      queryFn: async () => {
        if (activeTab === 'movie') {
          const vod = await fetchVodStreams(credentials, categoryId);
          return vod as (XtreamVod | XtreamSeries)[];
        }
        const series = await fetchSeries(credentials, categoryId);
        return series as (XtreamVod | XtreamSeries)[];
      },
      staleTime: 1000 * 60 * 10
    });
  }, [activeTab, categories, credentials, queryClient]);

  useEffect(() => {
    if (!credentials) {
      return;
    }

    const nextTab: MediaType = activeTab === 'movie' ? 'series' : 'movie';
    console.debug('[dashboard] prefetch next tab categories', { nextTab });
    prefetchCategories(queryClient, credentials, nextTab);
  }, [activeTab, credentials, queryClient]);

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__title-group">
          <h2>{TABS.find((tab) => tab.type === activeTab)?.label}</h2>
          {credentials && (
            <span className="dashboard__subtitle">{credentials.username}</span>
          )}
        </div>
        <div className="dashboard__tabs" role="tablist">
          {TABS.map((tab, index) => (
            <button
              key={tab.type}
              role="tab"
              aria-selected={tab.type === activeTab}
              className={activeTab === tab.type ? 'tab tab--active' : 'tab'}
              data-focused={selection.focusedPanel === 'tabs' && index === 0}
              onClick={() => handleTabChange(tab.type)}
            >
              {tab.label}
            </button>
          ))}
          <button 
            className="dashboard__search-btn" 
            type="button" 
            onClick={() => setShowSearch(true)}
            title="Buscar (Ctrl+K)"
          >
            🔍 Buscar
          </button>
          <button className="dashboard__logout" type="button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

  {errorMessage && <div className="dashboard__error">{errorMessage}</div>}

  <main className="dashboard__content">
        <CategoryList
          categories={categories}
          activeIndex={selection.categoryIndex}
          loading={categoriesQuery.isPending}
          focused={selection.focusedPanel === 'categories'}
          onFocus={handleCategoryFocus}
        />

        <MediaGrid
          items={derivedItems}
          columns={columns}
          focusedIndex={selection.itemIndex}
          loading={loading}
          hasFocus={selection.focusedPanel === 'grid'}
          onSelect={handleGridSelect}
          onHighlight={handleGridHighlight}
        />

        <MediaDetails
          item={focusedItem}
          type={activeTab}
          loading={loading}
          onPlay={handlePlayItem}
        />
      </main>

      {selectedSeries && credentials && (
        <SeriesSelector
          seriesId={selectedSeries.series_id}
          seriesTitle={selectedSeries.name}
          credentials={credentials}
          onEpisodeSelect={handleEpisodeSelect}
          onClose={() => setSelectedSeries(null)}
        />
      )}

      {playingEpisode && credentials && (
        <PlayerOverlay
          streamId={playingEpisode.id}
          title={playingEpisode.title}
          type="series"
          credentials={credentials}
          onClose={() => setPlayingEpisode(null)}
          item={{ ...playingEpisode.series, container_extension: playingEpisode.extension } as any}
        />
      )}

      {playingItem && credentials && activeTab === 'movie' && (
        <PlayerOverlay
          streamId={isVod(playingItem) ? playingItem.stream_id : playingItem.series_id}
          title={playingItem.name}
          type={activeTab}
          credentials={credentials}
          onClose={() => setPlayingItem(null)}
          item={playingItem}
        />
      )}

      {showSearch && credentials && (
        <GlobalSearch
          credentials={credentials}
          onClose={() => setShowSearch(false)}
          onItemSelect={handleSearchItemSelect}
        />
      )}
    </div>
  );
}

function prefetchCategories(
  queryClient: QueryClient,
  credentials: { baseUrl: string; username: string; password: string } | undefined,
  type: MediaType
) {
  if (!credentials) {
    return;
  }

  queryClient.prefetchQuery({
    queryKey: ['categories', credentials.baseUrl, credentials.username, type],
    queryFn: () => fetchCategories(credentials, type)
  });
}

function isVod(item: XtreamVod | XtreamSeries): item is XtreamVod {
  return 'stream_id' in item;
}
