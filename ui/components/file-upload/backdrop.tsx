import { cn } from '@/utils';
import { memo, useMemo } from 'react';

function BasePattern() {
  const columns = 41;
  const rows = 11;

  const cells = useMemo(() => {
    return Array.from({ length: rows }).flatMap((_, row) =>
      Array.from({ length: columns }).map((_, col) => {
        const index = row * columns + col;
        const isEven = index % 2 === 0;

        return (
          <div
            key={`${col}-${row}`}
            className={cn(
              'flex h-10 w-10 shrink-0 rounded-xs',
              'bg-neutral-900',
              'data-[is-even=true]:bg-neutral-950',
              'data-[is-even=false]:shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] data-[is-even=false]:dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]',
            )}
            data-is-even={isEven}
          />
        );
      }),
    );
  }, []);

  return (
    <div className="flex shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-neutral-900">
      {cells}
    </div>
  );
}

export const GridPattern = memo(BasePattern);
