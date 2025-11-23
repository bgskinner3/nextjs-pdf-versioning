'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileUpload, EnhancedViewer } from '@/ui';
import { cn } from '@/utils';
import { PdfService } from '@/service';

export default function Home() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // Validation: PDF only
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      return;
    }

    setCurrentFile(file);

    // 1. Save document + Version 1 via service
    try {
      const newDocId = await PdfService.createDocument(file);
      setDocId(newDocId);
    } catch (error) {
      console.error('Failed to save document:', error);
      return;
    }

    // 2. Generate object URL for the viewer
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  }, []);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);
  return (
    <div
      className={cn(
        'flex min-h-screen w-full items-center justify-center bg-black font-sans',
        'container max-w-none 2xl:container',
      )}
    >
      <main
        className={cn(
          'flex min-h-screen w-full max-w-3xl min-w-screen flex-col items-center justify-center bg-black sm:items-start',
        )}
      >
        {!fileUrl && <FileUpload action={handleFileUpload} />}
        {fileUrl && <EnhancedViewer fileUrl={fileUrl} />}
      </main>
    </div>
  );
}
