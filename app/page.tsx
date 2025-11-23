'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileUpload } from '@/ui';
import { cn, db, TPdfDocument, TPdfVersion } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';

const EnhancedViewer = dynamic(
  () =>
    import('@/ui/components/pdf/enhanced-viewer').then(
      (mod) => mod.EnhancedViewer,
    ),
  { ssr: false },
);

export default function Home() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setCurrentFile(file);

    // Generate object URL for PDF viewing
    const url = URL.createObjectURL(file);
    setFileUrl(url);

    // 1. Create a unique ID for the document
    const newDocId = uuidv4();
    setDocId(newDocId);

    // 2. Persist the file and V1 metadata in IndexedDB
    const newDocument: TPdfDocument = {
      id: newDocId,
      name: file.name,
      currentVersion: 1,
    };

    const firstVersion: TPdfVersion = {
      docId: newDocId,
      version: 1,
      message: 'Initial Upload (V1)',
      timestamp: new Date(),
      fileBlob: file,
    };

    try {
      await db.documents.put(newDocument);
      await db.versions.add(firstVersion);
    } catch (error) {
      console.error('Failed to save document to IndexedDB:', error);
    }
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
          'flex min-h-screen min-w-screen w-full max-w-3xl flex-col items-center justify-center bg-black sm:items-start',
        )}
      >
        {!fileUrl && <FileUpload action={handleFileUpload} />}
        {fileUrl && <EnhancedViewer fileUrl={fileUrl} />}
      </main>
    </div>
  );
}
