'use client';
import type { HTMLAttributes } from 'react';
import { cn } from '@/utils';
import { useState } from 'react';
import { useLoadOnce } from '@/hooks';
const randomShimmers = [
  'before:animate-[skeletonShimmer_2.6s_infinite]',
  'before:animate-[skeletonShimmer_2.7s_infinite]',
  'before:animate-[skeletonShimmer_2.3s_infinite]',
  'before:animate-[skeletonShimmer_2.6s_infinite]',
  'before:animate-[skeletonShimmer_2.9s_infinite]',
  'before:animate-[skeletonShimmer_2.7s_infinite]',
  'before:animate-[skeletonShimmer_2.1s_infinite]',
  'before:animate-[skeletonShimmer_2.3s_infinite]',
  'before:animate-[skeletonShimmer_2.9s_infinite]',
  'before:animate-[skeletonShimmer_2.8s_infinite]',
] as const;

type TSkeletonProps = {
  containerClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Skeleton({
  className,
  containerClassName,
  ...props
}: TSkeletonProps) {
  const [shimmer, setShimmer] = useState<string>(randomShimmers[0]);
  useLoadOnce(() => {
    const randomIndex = Math.floor(Math.random() * randomShimmers.length);
    setShimmer(randomShimmers[randomIndex]);
  });

  return (
    <div
      className={cn(
        'relative h-full w-full transition-all duration-300',
        containerClassName,
      )}
    >
      <div
        className={cn('absolute h-full w-full rounded-xl bg-black', className)}
      />
      <div
        role="presentation"
        className={cn(
          'relative rounded-xl',
          'before:absolute before:inset-0',
          'before:-translate-x-full',
          shimmer,
          'before:bg-linear-to-r',
          'before:from-transparent before:via-[#FFE4E61A] before:to-transparent',
          'isolate overflow-hidden shadow-xl shadow-black/5',
          'before:border-t before:border-[#FFE4E61A]',
          'bg-true-gray-500/30 h-full w-full',

          className,
        )}
        {...props}
      />
    </div>
  );
}
