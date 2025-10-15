import { FocusEvent, KeyboardEvent, MouseEvent, memo, useMemo } from 'react';

export type MediaGridItem = {
  id: number | string;
  title: string;
  poster?: string | null;
  meta?: string | null;
  raw: unknown;
};

type MediaGridProps = {
  items: MediaGridItem[];
  columns: number;
  focusedIndex: number;
  hasFocus: boolean;
  loading: boolean;
  onSelect?: (index: number, item: MediaGridItem) => void;
  onHighlight?: (index: number, item: MediaGridItem) => void;
};

const WINDOW_ROWS = 4;

export const MediaGrid = memo(function MediaGrid({
  items,
  columns,
  focusedIndex,
  hasFocus,
  loading,
  onSelect,
  onHighlight
}: MediaGridProps) {
  const windowedItems = useMemo<{ offset: number; list: MediaGridItem[] }>(() => {
    if (!items.length) {
      return { offset: 0, list: [] as MediaGridItem[] };
    }

    const rows = Math.ceil(items.length / columns);
    const focusedRow = Math.floor(focusedIndex / columns);
    const startRow = Math.max(focusedRow - 1, 0);
    const endRow = Math.min(startRow + WINDOW_ROWS, rows);
    const startIndex = startRow * columns;
    const endIndex = Math.min(endRow * columns, items.length);

    return {
      offset: startIndex,
      list: items.slice(startIndex, endIndex)
    };
  }, [columns, focusedIndex, items]);

  if (loading && !items.length) {
    return (
      <section className="grid grid--loading">
        {Array.from({ length: columns * WINDOW_ROWS }, (_, index) => index).map((index) => (
          <article key={index} className="card card--skeleton" />
        ))}
      </section>
    );
  }

  return (
    <section className="grid" data-focused={hasFocus}>
      {windowedItems.list.map((item, index) => {
        const absoluteIndex = windowedItems.offset + index;
        const isFocused = absoluteIndex === focusedIndex && hasFocus;

        const handleSelect = () => {
          onSelect?.(absoluteIndex, item);
        };

        const handlePointerEnter = () => {
          onHighlight?.(absoluteIndex, item);
        };

        const handleFocus = (_event: FocusEvent<HTMLElement>) => {
          onHighlight?.(absoluteIndex, item);
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect?.(absoluteIndex, item);
          }
        };

        const handleClick = (event: MouseEvent<HTMLElement>) => {
          event.preventDefault();
          handleSelect();
        };
        return (
          <article
            key={item.id}
            className={isFocused ? 'card card--focused' : 'card'}
            data-index={absoluteIndex}
            role="button"
            tabIndex={0}
            onMouseEnter={handlePointerEnter}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
          >
            <div className="card__poster">
              {item.poster ? (
                <img src={item.poster} alt={item.title} loading="lazy" />
              ) : (
                <div className="card__poster--placeholder">{item.title.charAt(0)}</div>
              )}
            </div>
            <div className="card__meta">
              <span className="card__title">{item.title}</span>
              {item.meta && <span className="card__info">{item.meta}</span>}
            </div>
          </article>
        );
      })}

      {!loading && !items.length && (
        <div className="grid__empty">Nenhum conteúdo disponível</div>
      )}
    </section>
  );
});
