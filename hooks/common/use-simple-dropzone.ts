'use client';
import { useCallback, useState } from 'react';
import type { CSSProperties, ChangeEvent, DragEvent } from 'react';
type TRootProps = {
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
type TInputProps = {
  type: string;
  style: CSSProperties;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type TUseSimpleDrop = {
  onDrop: (file: File) => void;
  onDropRejected?: (file: File) => void;
  noClick?: boolean;
};
export function useSimpleDropzone({
  onDrop,
  onDropRejected,
  noClick = false,
}: TUseSimpleDrop) {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const filterFile = useCallback(
    (file: File) => {
      if (file.type !== 'application/pdf') {
        onDropRejected?.(file);
        return null;
      }
      return file;
    },
    [onDropRejected],
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      const accepted = file && filterFile(file);

      if (accepted) onDrop(accepted);
    },
    [filterFile, onDrop],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const accepted = file && filterFile(file);

      if (accepted) onDrop(accepted);
    },
    [filterFile, onDrop],
  );

  const getRootProps = useCallback(
    (): TRootProps => ({
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onClick: noClick ? undefined : undefined, // optional click handler
    }),
    [handleDragOver, handleDragLeave, handleDrop, noClick],
  );

  const getInputProps = useCallback(
    (): TInputProps => ({
      type: 'file',
      style: { display: 'none' },
      onChange: handleInputChange,
    }),
    [handleInputChange],
  );

  return {
    getRootProps,
    getInputProps,
    isDragging,
  };
}
