import type { SearchPlugin } from '@react-pdf-viewer/search';
import { Button } from '../../button';
import { cn } from '@/utils';
import { useToolbarValues } from '@/hooks';
import { usePdfSearch } from '@/hooks';

export const SearchViewer = ({
  searchPluginInstance,
}: {
  searchPluginInstance: SearchPlugin;
}) => {
  const { activePanels } = useToolbarValues();
  const searchItems = usePdfSearch(searchPluginInstance);

  return (
    <div
      className={cn(
        'grid grid-cols-[3fr_1fr] items-center justify-center gap-2 border-b bg-[#1a1a1a] px-3',
        'group/input',
        'transition-all duration-500 ease-in',
        'max-h-0 origin-top overflow-hidden py-0',
        'data-[active=false]:pointer-events-none',
        'data-[active=true]:max-h-[150px] data-[active=true]:py-6',
      )}
      data-has-error={!!searchItems.error}
      data-active={activePanels.has('search')}
    >
      <div
        className={cn(
          'flex w-full max-w-3xl flex-row items-center justify-end gap-x-2 place-self-end',
          'row-start-1',
        )}
      >
        <input
          type="text"
          value={searchItems.query}
          onChange={(e) => {
            searchItems.setQuery(e.target.value);
            searchItems.setError('');
          }}
          placeholder="Search PDF"
          className={cn(
            'text-off-white border-off-white flex-1 rounded-xl border px-3 py-3 text-sm',
            'focus:outline-none',
            'group-data-[has-error=true]/input:border-red-500',
            'group-data-[has-error=true]/input:animate-shake',
          )}
        />

        <Button
          onClick={searchItems.search}
          className={cn(
            'group-data-[has-error=true]/input:border-red-500',
            'group-data-[has-error=true]/input:animate-shake',
            'w-full max-w-[150px] justify-center',
          )}
        >
          Search
        </Button>
        <Button
          onClick={searchItems.clear}
          className={cn('w-full max-w-[150px] justify-center')}
          variant="outline"
        >
          Clear
        </Button>
      </div>
      <div
        className={cn(
          'col-start-2 row-start-1 flex h-full w-full flex-row items-center justify-center',
          'gap-x-3',
        )}
      >
        <Button
          onClick={searchItems.prev}
          disabled={searchItems.totalMatches === 0}
          className={cn(
            'w-full max-w-[100px] justify-center rounded-xl border px-3 py-2 text-sm disabled:opacity-40',
            'h-fit',
          )}
        >
          Prev
        </Button>
        <div className="border-off-white flex h-full w-fit items-center justify-center rounded-full">
          <span
            className={cn(
              'text-off-white w-14 text-center text-lg',
              searchItems.totalMatches === 0 && 'opacity-40',
            )}
          >
            {searchItems.matchCounter}
          </span>
        </div>
        <Button
          onClick={searchItems.next}
          disabled={searchItems.totalMatches === 0}
          className={cn(
            'h-fit w-full max-w-[100px] justify-center rounded-xl border px-3 py-2 text-sm disabled:opacity-40',
          )}
        >
          Next
        </Button>
      </div>

      {/* <Button
        onClick={searchItems.prev}
        disabled={searchItems.totalMatches === 0}
        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40"
      >
        Prev
      </Button>

      <Button
        onClick={searchItems.next}
        disabled={searchItems.totalMatches === 0}
        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40"
      >
        Next
      </Button>

      <span className="w-14 text-center text-xs text-gray-600">
        {searchItems.matchCounter}
      </span>

      <Button onClick={searchItems.clear}>Clear</Button> */}
    </div>
  );
};
