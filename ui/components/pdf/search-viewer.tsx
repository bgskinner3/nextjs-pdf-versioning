import { useState } from 'react';
import type { SearchPlugin } from '@react-pdf-viewer/search';
import { Button } from '../button';
import { cn } from '@/utils';

export const SearchViewer = ({
  searchPluginInstance,
}: {
  searchPluginInstance: SearchPlugin;
}) => {
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  const [totalMatches, setTotalMatches] = useState<number>(0);

  const { highlight, clearHighlights, jumpToNextMatch, jumpToPreviousMatch } =
    searchPluginInstance;

  const handleSearch = async () => {
    if (!query) return;

    const matches = await highlight(query); // returns Match[]
    if (matches.length === 0) {
      setTotalMatches(0);
      setCurrentMatch(0);
      setError('No text found in this PDF or no matches found.');
      return;
    }

    setTotalMatches(matches.length);
    setCurrentMatch(matches.length > 0 ? 0 : 0);
  };

  const handleNext = () => {
    const result = jumpToNextMatch();
    if (!result) return;

    setCurrentMatch(result.matchIndex);
  };

  const handlePrev = () => {
    const result = jumpToPreviousMatch();
    if (!result) return;

    setCurrentMatch(result.matchIndex - 1);
  };

  const handleClear = () => {
    clearHighlights();
    setQuery('');
    setError('');
    setCurrentMatch(0);
    setTotalMatches(0);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 border-b bg-[#1a1a1a] p-3',
        'group/input',
      )}
      data-has-error={!!error}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setError('');
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
        onClick={handleSearch}
        className={cn(
          'group-data-[has-error=true]/input:border-red-500',
          'group-data-[has-error=true]/input:animate-shake',
        )}
      >
        Search
      </Button>

      <Button
        onClick={handlePrev}
        disabled={totalMatches === 0}
        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40"
      >
        Prev
      </Button>

      <Button
        onClick={handleNext}
        disabled={totalMatches === 0}
        className="rounded-md border px-3 py-2 text-sm disabled:opacity-40"
      >
        Next
      </Button>

      {/* Match Counter */}
      <span className="w-14 text-center text-xs text-gray-600">
        {totalMatches > 0 ? `${currentMatch + 1} / ${totalMatches}` : '0 / 0'}
      </span>

      <Button onClick={handleClear}>Clear</Button>
    </div>
  );
};
