'use client';
import { cn } from '@/utils';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { BasicIcon } from '../icon';
import { useSimpleDropzone } from '@/hooks';
import { GridPattern } from './backdrop';
import type { CSSProperties, ReactNode, ComponentPropsWithoutRef } from 'react';
import { Button } from '../button';
import type { TPDFStoreActions, TPDFStoreValues } from '@/hooks';
import { PdfService } from '@/service';

const FileUploadedActions = ({ actions }: { actions: TPDFStoreActions }) => {
  return (
    <motion.div
      className={cn(
        'relative z-20 mt-10 flex w-full max-w-xl flex-row justify-center gap-6',
        'group-data-[has-files=false]/fileBase:max-h-0',
        'group-data-[has-files=false]/fileBase:mt-0',
        'h-full overflow-hidden transition-all duration-500',
      )}
    >
      <Button
        className={cn(
          'bg-blood-red flex w-full max-w-[150px] justify-center border-red-400 text-red-400',
          'hover:border-blood-red hover:text-blood-red hover:bg-red-400',
          'active:border-blood-red active:text-blood-red active:bg-red-400',
          'group-data-[has-files=true]/fileBase:translate-y-0',
          'group-data-[has-files=false]/fileBase:translate-y-full',
          'group-data-[has-files=false]/fileBase:pointer-events-none',
          'h-full transition-all',
        )}
        onClick={() => actions.reset({ retain: ['mode'] })}
      >
        Clear
      </Button>
      <Button
        className={cn(
          'flex w-full max-w-[150px] justify-center border border-blue-300 bg-slate-800 text-blue-300',
          'hover:border-blue-400 hover:bg-blue-400 hover:text-slate-900',
          'active:border-blue-500 active:bg-blue-500 active:text-white',
          'group-data-[has-files=true]/fileBase:translate-y-0',
          'group-data-[has-files=false]/fileBase:translate-y-full',
          'group-data-[has-files=false]/fileBase:pointer-events-none',
          'h-full transition-all',
        )}
        onClick={() => actions.setMode('edit')}
      >
        Edit
      </Button>
    </motion.div>
  );
};

const FileHoveredBackdrop = () => {
  const customProps: Record<string, string> = {
    '--border-width': '2px',
    '--duration': '14s',
  };
  const styleProps: CSSProperties = {
    ...customProps,
  };
  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
      style={styleProps}
      className={cn(
        'absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-transparent opacity-0 outline outline-offset-2 outline-sky-400 outline-dashed',
        'motion-safe:animate-shine pointer-events-none will-change-[background-position]',
        'p-(--border-width)',
        '[-webkit-mask:linear-gradient(#fff 0 0)_content-box,linear-gradient(#fff 0 0)]',
        'bg-[radial-gradient(transparent,transparent,#4f46e5,#f59e0b,#06b6d4,transparent,transparent)]',
        'mask-exclude [-webkit-mask-composite:xor]',
        '[-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]',
        'mask-size-[100%_100%] mask-no-repeat',
        'bg-size-[300%_300%]',
        'group-data-[has-files=true]/fileBase:hidden',
        'group-data-[has-files=true]/fileBase:pointer-events-none',
      )}
    ></motion.div>
  );
};

type TFileUploaderStates = {
  currentFile?: TPDFStoreValues['currentFile'];
} & ComponentPropsWithoutRef<'div'>;
const FileUploaderStates = ({
  currentFile,
  className,
  children,
  ...props
}: TFileUploaderStates) => {
  return (
    <div
      className={cn('relative mx-auto w-full max-w-xl', className)}
      {...props}
    >
      {currentFile && (
        <motion.div
          layoutId={'file-upload'}
          className={cn(
            'relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 md:h-24 dark:bg-neutral-900',
            'shadow-sm',
          )}
        >
          <div className="flex w-full items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
              className="max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300"
            >
              {currentFile.name}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
              className="shadow-input w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white"
            >
              {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
            </motion.p>
          </div>

          <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
              className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800"
            >
              {currentFile.type}
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
              modified
              {new Date(currentFile.lastModified).toLocaleDateString()}
            </motion.p>
          </div>
        </motion.div>
      )}
      {!currentFile && (
        <motion.div
          layoutId="file-upload"
          variants={{
            initial: {
              x: 0,
              y: 0,
            },
            animate: {
              x: 20,
              y: -20,
              opacity: 0.9,
            },
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className={cn(
            'relative z-40 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-neutral-900 group-hover/file:shadow-2xl',
            'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]',

            // error handling
            'group-data-[has-error=true]/fileBase:animate-shake',
            'group-data-[has-error=true]/fileBase:bg-blood-red',
            'group-data-[has-error=true]/fileBase:group-hover/file:bg-neutral-900',
            'transition-colors duration-500',
            'group-data-[has-files=true]/fileBase:pointer-events-none',
            'shadow-dark-600',
          )}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn('flex flex-col items-center gap-4 text-neutral-600')}
          >
            <span
              className={cn(
                'group-data-[is-dragging=false]/file:opacity-0',
                'group-data-[is-dragging=true]/file:opacity-100',
                'transition-all duration-300',
              )}
            >
              Drop it
            </span>
            <BasicIcon
              name="pdf"
              className={cn(
                'h-auto w-10 text-neutral-400',
                '-translate-y-5',
                'transition-all duration-300',
                'group-data-[is-dragging=true]/file:translate-y-0',
                'group-data-[is-dragging=true]/file:fill-sky-400',
                'group-hover/file:fill-sky-400',
                'group-data-[has-error=true]/fileBase:fill-red-400',
              )}
            />
          </motion.p>
        </motion.div>
      )}
      {children}
    </div>
  );
};

type TContentContainer = {
  header: ReactNode;
  subHeader?: ReactNode;
  errorMessage?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;
const FileUploaderContentContainer = ({
  header,
  subHeader,
  errorMessage,
  children,
  className,
  ...props
}: TContentContainer) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-y-8',
        className,
      )}
      {...props}
    >
      <hgroup
        className={cn('flex w-full flex-col items-center justify-center')}
      >
        <h2 className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
          {header}
        </h2>
        <h3 className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 empty:hidden dark:text-neutral-400">
          {subHeader}
        </h3>
      </hgroup>
      {children}
      <motion.div
        className={cn(
          'flex w-full max-w-md items-center justify-center',
          'min-h-[50px] overflow-hidden',
          'group-data-[has-files=true]/fileBase:hidden',
        )}
      >
        <div
          className={cn(
            'h-full',
            'translate-y-full opacity-0',
            'group-data-[has-error=true]/fileBase:translate-y-0 group-data-[has-error=true]/fileBase:opacity-100',
            'transition-all duration-1000 ease-in-out',
            'overflow-hidden',
            'text-center font-bold text-red-400',
          )}
        >
          <span>{errorMessage}</span>
        </div>
      </motion.div>
    </div>
  );
};
type TFileUploadRoot = {
  actions: TPDFStoreActions;
  values: TPDFStoreValues;
  fileActions: ReactNode;
} & ComponentPropsWithoutRef<'div'>;
const FileUploadRoot = ({
  actions,
  values,
  children,
  className,
  fileActions,
  ...props
}: TFileUploadRoot) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    actions.setError(null);

    // PDF validation
    if (file.type !== 'application/pdf') {
      actions.setError('Only PDF files are allowed.');
      return;
    }

    actions.setCurrentFile(file);

    try {
      const newDocId = await PdfService.createDocument(file);
      actions.setDocId(newDocId);
    } catch {
      actions.setError('Failed to save document. Please try again.');
      return;
    }

    const url = URL.createObjectURL(file);
    actions.setFileUrl(url);
  };

  const handleClick = () => {
    actions.setError(null);
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragging, getInputProps } = useSimpleDropzone({
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (rejected: File) => {
      if (rejected)
        actions.setError(
          `${rejected.name} is not a PDF file and was rejected. Please try Again.`,
        );
    },
  });

  return (
    <div
      className={cn(
        'group/fileBase relative flex w-full items-center justify-center overflow-hidden',
        'flex-col py-12',
        className,
      )}
      {...getRootProps()}
      data-has-error={!!values.errorMessage}
      data-has-files={!!values.currentFile}
      {...props}
    >
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
        <GridPattern hasError={!!values.errorMessage} />
      </div>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className={cn(
          'group/file relative block w-fit cursor-pointer overflow-hidden rounded-lg px-10',
          'group-data-[has-files=true]/fileBase:pointer-events-none',
        )}
        data-is-dragging={isDragging}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          {...getInputProps()}
          className={cn('hidden')}
        />
        {children}
      </motion.div>
      {fileActions}
    </div>
  );
};

export const FileUpload = Object.assign(FileUploadRoot, {
  ContentContainer: FileUploaderContentContainer,
  LoaderStates: FileUploaderStates,
  Backdrop: FileHoveredBackdrop,
  Actions: FileUploadedActions,
});
