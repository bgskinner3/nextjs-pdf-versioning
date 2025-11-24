import type { SearchPlugin } from '@react-pdf-viewer/search';
import { Button } from '../button';
import { cn } from '@/utils';
import { useToolbarActions, useToolbarValues } from '@/hooks';
import { usePdfSearch } from '@/hooks';


export const SearchViewer = ({
  searchPluginInstance,
}: {
  searchPluginInstance: SearchPlugin;
}) => {
  const { activePanel } = useToolbarValues();
  const searchItems = usePdfSearch(searchPluginInstance);


  return (
    <div
      className={cn(
        'flex items-center gap-2 border-b bg-[#1a1a1a] px-3',
        'group/input',
        'transition-all duration-500 ease-in',
        'max-h-0 origin-top overflow-hidden py-0',
        'data-[active=false]:pointer-events-none',
        'data-[active=true]:max-h-[100px] data-[active=true]:py-3',
      )}
      data-has-error={!!searchItems.error}
      data-active={activePanel === 'search'}
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
          'text-off-white border-off-white flex-1 rounded-md border px-3 py-2 text-sm',
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
        )}
      >
        Search
      </Button>

      <Button
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

      <Button onClick={searchItems.clear}>Clear</Button>
    </div>
  );
};
