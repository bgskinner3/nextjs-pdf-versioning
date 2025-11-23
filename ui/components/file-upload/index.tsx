'use client';
import { cn } from '@/utils';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { BasicIcon } from '../icon';
import { useSimpleDropzone } from '@/hooks';
import { GridPattern } from './backdrop';

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  action,
}: {
  action?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setErrors([]);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    action?.(newFiles);
  };

  const handleRejectedFiles = (rejectedFiles: File[]) => {
    const messages = rejectedFiles.map(
      (file) => `${file.name} is not a PDF file and was rejected.`,
    );
    setErrors(messages);
  };
  const handleClick = () => {
    setErrors([]);
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragging, getInputProps } = useSimpleDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: handleRejectedFiles,
  });

  return (
    <div
      className="group/fileBase flex items-center justify-center relative w-full overflow-hidden"
      {...getRootProps()}
      data-has-error={errors.length > 0}
      data-has-files={files.length}
    >
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
        <GridPattern />
      </div>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file relative block w-fit cursor-pointer overflow-hidden rounded-lg p-10"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          {...getInputProps()}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            Upload PDF
          </p>
          <p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400">
            Drag or drop your PDF files here or click to upload
          </p>
          <div className="relative mx-auto mt-10 w-full max-w-xl">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={'file' + idx}
                  layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
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
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="shadow-input w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
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
                )}
              >
                {isDragging ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-neutral-600"
                  >
                    Drop it
                    <BasicIcon
                      name="pdf"
                      className="h-auto w-8 text-neutral-400"
                    />
                  </motion.p>
                ) : (
                  <BasicIcon
                    name="pdf"
                    className="h-auto w-8 text-neutral-400"
                  />
                )}
              </motion.div>
            )}

            <motion.div
              variants={secondaryVariant}
              style={
                {
                  '--border-width': '2px',
                  '--duration': '14s',
                  backgroundImage:
                    'radial-gradient(transparent, transparent, #4f46e5, #f59e0b, #06b6d4, transparent, transparent)',
                } as React.CSSProperties
              }
              className={cn(
                'absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-transparent opacity-0 outline outline-offset-2 outline-sky-400 outline-dashed',
                'motion-safe:animate-shine pointer-events-none will-change-[background-position]',
                'p-(--border-width)', // padding equals border width
                '[-webkit-mask:linear-gradient(#fff 0 0)_content-box,linear-gradient(#fff 0 0)]',
                'mask-exclude [-webkit-mask-composite:xor]',
                '[-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]',
                'mask-size-[100%_100%] mask-no-repeat',
                'bg-size-[300%_300%]',
                'group-data-[has-files=false]/fileBase:hidden',
              )}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
