import { useEffect, useState } from 'react';

const BREAKPOINTS = [
  { width: 3840, columns: 8 },
  { width: 2560, columns: 7 },
  { width: 1920, columns: 6 },
  { width: 1280, columns: 5 },
  { width: 1024, columns: 4 },
  { width: 768, columns: 3 }
];

const DEFAULT_COLUMNS = 3;

export function useResponsiveColumns() {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      const matched = BREAKPOINTS.find((breakpoint) => width >= breakpoint.width);
      setColumns(matched?.columns ?? DEFAULT_COLUMNS);
    }

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { columns };
}
