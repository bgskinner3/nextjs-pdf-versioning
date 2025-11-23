import Image from 'next/image';
import { FileUpload } from '@/ui';
import { cn } from '@/utils';

export default function Home() {
  return (
    <div
      className={cn(
        'flex min-h-screen min-w-screen items-center justify-center bg-black font-sans',
        'container max-w-none 2xl:container',
      )}
    >
      <main
        className={cn(
          'flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-black px-16 py-32 sm:items-start',
        )}
      >
        <FileUpload />
      </main>
    </div>
    // <main
    //   className={cn(
    //     'container w-full max-w-none py-5 lg:py-10 2xl:container',
    //     'flex min-h-screen w-full flex-col items-center justify-between bg-black sm:items-start',
    //   )}
    // >
    //   <FileUpload />
    // </main>
  );
}
