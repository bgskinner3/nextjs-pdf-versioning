'use client';

import { useEffect } from 'react';
import { FileUpload, EnhancedViewer } from '@/ui';
import { cn } from '@/utils';
import { usePdfActions, usePdfValues } from '@/hooks';
import { PdfService } from '@/service';

export default function Home() {
  const values = usePdfValues();
  const actions = usePdfActions();
  const { docId, currentFile, currentVersion } = values;
  useEffect(() => {
    return () => {
      if (values.fileUrl) URL.revokeObjectURL(values.fileUrl);
    };
  }, [values.fileUrl]);
  useEffect(() => {
    if (docId && !currentFile) {
      PdfService.getDocumentFile(docId).then((blob) => {
        if (!blob) return;
        const file = new File([blob], `doc-${docId}.pdf`, {
          type: 'application/pdf',
          lastModified: Date.now(),
        });
        actions.setCurrentFile(file);
        actions.setFileUrl(URL.createObjectURL(file));
      });
    }
  }, [docId, currentFile, actions]);
  useEffect(() => {
    if (docId && currentVersion) {
      // Fetch and set annotations
      PdfService.getAnnotations(docId, currentVersion.version).then((anns) => {
        // anns is TPdfAnnotation[], need to map to TPdfAnnotationData[]
        actions.setAnnotations(anns.map((a) => a.data));
      });

      // Fetch and set content operations
      PdfService.getContentOps(docId, currentVersion.version).then((ops) => {
        actions.setContentOps(ops);
      });
    }
  }, [docId, currentVersion, actions]);
  console.log(values.contentOps);
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
        {values.mode === 'uploader' && (
          <FileUpload
            actions={actions}
            fileActions={<FileUpload.Actions actions={actions} />}
            values={values}
          >
            <FileUpload.ContentContainer
              errorMessage={values.errorMessage}
              header={' Upload PDF'}
              subHeader="Drag or drop your PDF files here or click to upload"
            >
              <FileUpload.LoaderStates currentFile={values.currentFile}>
                <FileUpload.Backdrop />
              </FileUpload.LoaderStates>
            </FileUpload.ContentContainer>
          </FileUpload>
        )}
        {values.mode !== 'uploader' && values.fileUrl && (
          <EnhancedViewer fileUrl={values.fileUrl} />
        )}
      </main>
    </div>
  );
}
