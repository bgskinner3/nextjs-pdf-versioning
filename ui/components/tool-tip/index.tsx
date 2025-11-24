import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils';
import type { ComponentRef, ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      alignOffset={-20}
      className={cn(
        'body-14 rounded-md border border-black bg-black px-4 py-1 text-center wrap-break-word text-white shadow-md will-change-[transform,opacity]',
        'data-[side=left]:animate-slide-right-and-fade',
        'data-[side=bottom]:animate-slide-up-and-fade',
        'data-[side=right]:animate-slide-left-and-fade',
        'data-[side=top]:animate-slide-down-and-fade',
        'flex w-auto',
        'data-[state=closed]:animate-fade-up-and-out data-[state=closed]:delay-300',
        'data-[is-hidden=true]:hidden',
        'relative z-9999',
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
