import { forwardRef, ComponentProps } from 'react';
import { cn } from '@/utils';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const rootVariants = cva(
  'pointer-events-auto flex w-max cursor-pointer items-center gap-2 transition-transform active:scale-[.98] body-12 sm:body-14 transition-all duration-300',
  {
    variants: {
      variant: {
        solid: cn(
          'border bg-cool-gray-1000 rounded-xl hover:duration-300 ',
          'hover:bg-gray-700 active:bg-cool-gray-1000/80 border-cool-gray-800/50 ',
          'text-white  py-2  hover:text-yellow-500  hover:border-yellow-500 disabled:bg-gray-200 disabled:border-gray-500',
        ),
        outline: cn(
          'hover:text-yellow-500 hover:border-yellow-500  rounded-md',
          'border bg-transparent text-white disabled:bg-gray-200 rounded-xl border-white  font-bold hover:bg-gray-100/30 hover:duration-300',
        ),
        error: cn(
          'bg-blood-red flex w-full max-w-[150px] justify-center border-red-400 text-red-400',
          'hover:border-blood-red hover:text-blood-red hover:bg-red-400',
          'active:border-blood-red active:text-blood-red active:bg-red-400 rounded-xl',
        ),

        none: 'p-0',
      },
      sizes: {
        s: 'px-3 py-1.5 body-12',
        m: 'px-[18px] py-2.5 body-14',
        l: 'px-4 py-3 body-16',
        xl: 'px-[22px] py-3.5 body-18',
      },
    },
  },
);

type TButtonProps = ComponentProps<'button'> & {
  variant?: VariantProps<typeof rootVariants>['variant'];
  size?: VariantProps<typeof rootVariants>['sizes'];
};

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  ({ size = 's', variant = 'solid', className, ...props }, ref) => {
    return (
      <button
        {...props}
        className={cn(
          rootVariants({ variant }),
          rootVariants({ sizes: size }),
          className,
          'disabled:pointer-events-none disabled:bg-gray-500! disabled:brightness-50',
        )}
        ref={ref}
      />
    );
  },
);

Button.displayName = 'Button';
