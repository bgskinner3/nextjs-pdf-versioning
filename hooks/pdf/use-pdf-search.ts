import { useState, useCallback } from 'react';
import type { SearchPlugin } from '@react-pdf-viewer/search';

export const usePdfSearch = (searchPluginInstance: SearchPlugin) => {
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  const [totalMatches, setTotalMatches] = useState<number>(0);

  const { highlight, clearHighlights, jumpToNextMatch, jumpToPreviousMatch } =
    searchPluginInstance;

  const search = useCallback(async () => {
    if (!query.trim()) return;

    try {
      const matches = await highlight(query);
      if (!matches.length) {
        setTotalMatches(0);
        setCurrentMatch(0);
        setError('No text found in this PDF or no matches found.');
      } else {
        setTotalMatches(matches.length);
        setCurrentMatch(0);
        setError('');
      }
    } catch {
      setError('An error occurred while searching.');
    }
  }, [query, highlight]);

  const next = useCallback(() => {
    if (totalMatches === 0) return;

    const result = jumpToNextMatch();

    if (result) {
      setCurrentMatch((prev) => (prev + 1) % totalMatches);
    }
  }, [jumpToNextMatch, totalMatches]);

  const prev = useCallback(() => {
    if (totalMatches === 0) return;

    const result = jumpToPreviousMatch();
    if (result) {
      setCurrentMatch((prev) => (prev - 1 + totalMatches) % totalMatches);
    }
  }, [jumpToPreviousMatch, totalMatches]);

  const clear = useCallback(() => {
    clearHighlights();
    setQuery('');
    setError('');
    setCurrentMatch(0);
    setTotalMatches(0);
  }, [clearHighlights]);
  const hasMatches = totalMatches > 0;
  const matchCounter =
    totalMatches > 0 ? `${currentMatch + 1} / ${totalMatches}` : '0 / 0';

  return {
    query,
    setQuery,
    error,
    currentMatch,
    totalMatches,
    hasMatches,
    matchCounter,
    search,
    next,
    prev,
    clear,
    setError,
  };
};
