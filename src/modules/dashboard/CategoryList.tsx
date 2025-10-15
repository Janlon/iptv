import { memo } from 'react';
import type { XtreamCategory } from '../iptv/types';

type CategoryListProps = {
  categories: XtreamCategory[];
  activeIndex: number;
  loading: boolean;
  focused: boolean;
  onFocus: (index: number) => void;
};

export const CategoryList = memo(function CategoryList({
  categories,
  activeIndex,
  loading,
  focused,
  onFocus
}: CategoryListProps) {
  if (loading && !categories.length) {
    return (
      <aside className="categories categories--loading">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="category category--skeleton" />
        ))}
      </aside>
    );
  }

  return (
    <aside className="categories" data-focused={focused}>
      {categories.map((category, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={category.category_id ?? index}
            type="button"
            className={isActive ? 'category category--active' : 'category'}
            onClick={() => onFocus(index)}
            data-focused={focused && isActive}
          >
            {category.category_name}
          </button>
        );
      })}
    </aside>
  );
});
