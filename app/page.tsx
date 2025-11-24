'use client';

import { FileUpload, EnhancedViewer } from '@/ui';
import { cn } from '@/utils';
import { usePdfActions, usePdfValues, usePdfEffects } from '@/hooks';

export default function Home() {
  const values = usePdfValues();
  const actions = usePdfActions();

  usePdfEffects();
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
