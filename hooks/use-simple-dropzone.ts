'use client'
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
  multiple?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type TUseSimpleDrop = {
  onDrop: (files: File[]) => void;
  onDropRejected?: (errors: File[]) => void;
  multiple?: boolean;
  noClick?: boolean;
};
export function useSimpleDropzone({
  onDrop,
  onDropRejected,
  multiple = true,
  noClick = false,
}: TUseSimpleDrop) {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const filterFiles = useCallback(
    (files: File[]) => {
      const pdfFiles = files.filter((file) => file.type === 'application/pdf');
      const rejected = files.filter((file) => file.type !== 'application/pdf');

      if (!multiple && pdfFiles.length > 1) {
        onDropRejected?.(pdfFiles.concat(rejected));
        return [];
      }

      if (rejected.length > 0) {
        onDropRejected?.(rejected);
      }

      return pdfFiles;
    },
    [multiple, onDropRejected],
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

      const dropped = Array.from(event.dataTransfer.files);
      const accepted = filterFiles(dropped);

      if (accepted.length) onDrop(accepted);
    },
    [filterFiles, onDrop],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const selected = Array.from(e.target.files);
      const accepted = filterFiles(selected);

      if (accepted.length) onDrop(accepted);
    },
    [filterFiles, onDrop],
  );

  const getRootProps = useCallback(
    (): TRootProps => ({
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onClick: noClick ? undefined : undefined, // click handled externally
    }),
    [handleDragOver, handleDragLeave, handleDrop, noClick],
  );

  const getInputProps = useCallback(
    (): TInputProps => ({
      type: 'file',
      multiple,
      style: { display: 'none' },
      onChange: handleInputChange,
    }),
    [handleInputChange, multiple],
  );

  return {
    getRootProps,
    getInputProps,
    isDragging,
  };
}
