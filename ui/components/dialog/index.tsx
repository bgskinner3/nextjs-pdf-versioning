'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type {
  HTMLAttributes,
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactNode,
} from 'react';
import {
  useContext,
  createContext,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { cn } from '@/utils';
import type { DialogProps } from '@radix-ui/react-dialog';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import type { ColorKey } from 'tailwind-styles-config';
import { cva } from 'class-variance-authority';
import { BasicIcon } from '../icon';

type DialogProviderProps = {
  bgcolor?: ColorKey;
  size?: 'small' | 'base' | 'large' | 'max';
  displayClose?: boolean;
  overlayClassName?: string;
  closeButtonIconStyles?: string;
};

const DialogContext = createContext<DialogProviderProps>({
  size: 'base',
  displayClose: true,
});

const useDialogContext = () => useContext(DialogContext);

const DialogRootClone = DialogPrimitive.Root;

type DialogRootProps = DialogProps & DialogProviderProps;

const DialogRoot = ({
  bgcolor,
  size = 'base',
  displayClose = true,
  overlayClassName,
  ...props
}: DialogRootProps) =>
  cloneElement(
    <DialogContext.Provider
      value={{ bgcolor, size, displayClose, overlayClassName }}
    >
      <DialogRootClone {...props} />
    </DialogContext.Provider>,
  );

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => {
  const { overlayClassName } = useDialogContext();
  return (
    <DialogPrimitive.Overlay
      {...props}
      className={cn(
        'fixed inset-0 z-50 w-screen transform bg-black/80 will-change-[transform,opacity] data-[state=closed]:animate-[fadeOut_0.5s_ease-in-out] data-[state=open]:animate-[fadeIn_0.5s_ease-in-out]',
        className,
        overlayClassName,
      )}
      ref={ref}
    >
      {children}
    </DialogPrimitive.Overlay>
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Trigger ref={ref} {...props} className={cn(className)}>
      {children}
    </DialogPrimitive.Trigger>
  );
});
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

const DialogClose = DialogPrimitive.Close;
DialogClose.displayName = DialogPrimitive.Close.displayName;

const dialogContentVariants = cva(
  'data-[state=open]:animate-contentShow data-[state=close]:animate-contentClose fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] transform will-change-[transform,translate] flex flex-col overflow-hidden rounded-xl bg-white max-h-[70dvh] md:max-h-[60dvh]',
  {
    variants: {
      size: {
        small: 'w-[calc(400px_+_2rem)] max-w-[90vw]',
        base: 'w-[calc(600px_+_2rem)] max-w-[90vw]',
        large: 'w-[calc(800px_+_2rem)] max-w-[90vw]',
        max: 'w-[calc(1000px_+_2rem)] max-w-[90vw]',
      },
    },

    defaultVariants: {
      size: 'base',
    },
  },
);

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    onCloseClick?: () => void;
    closeButtonContainerClassName?: string;
    closeButtonIconClassName?: string;
    customCloseButton?: ReactNode;
  } & Pick<DialogProviderProps, 'bgcolor' | 'displayClose'>
>(
  (
    {
      className,
      onCloseClick,
      closeButtonContainerClassName,
      closeButtonIconClassName,
      customCloseButton,
      children,
      ...props
    },
    ref,
  ) => {
    const { bgcolor, size, displayClose, overlayClassName } =
      useContext(DialogContext);

    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 w-screen transform bg-black/80 will-change-[transform,opacity] data-[state=closed]:animate-[fadeOut_0.5s_ease-in-out] data-[state=open]:animate-[fadeIn_0.5s_ease-in-out]',
            overlayClassName,
          )}
        />
        <DialogPrimitive.Content
          bgcolor={bgcolor}
          className={cn(dialogContentVariants({ size, className }), className)}
          ref={ref}
          {...props}
        >
          {children}
          {displayClose && (
            <DialogClose
              className={cn(
                'absolute top-5 right-5 text-black outline-none focus:outline-none print:hidden',
                'group/accordionContainer',
                closeButtonContainerClassName,
              )}
              onClick={onCloseClick}
            >
              <BasicIcon
                className={cn(closeButtonIconClassName)}
                name="close"
              />
              {customCloseButton}
            </DialogClose>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

type DialogHeaderProps = Exclude<ComponentPropsWithoutRef<'div'>, 'color'> &
  Pick<DialogProviderProps, 'bgcolor'>;

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  const { bgcolor } = useDialogContext();

  return (
    <div
      className={cn(
        'flex flex-col gap-1.5 px-4 pt-6 text-left md:px-6',
        bgcolor ? 'pb-6' : 'pb-1.5',
        'text-white',
        className,
      )}
      {...props}
    />
  );
};
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    icon?: ReactNode;
  }
>(({ icon, className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      {...props}
      className={cn(
        'flex flex-row space-y-2 space-x-2 font-medium text-inherit',
        className,
      )}
      ref={ref}
    >
      {icon && (
        <div className={cn('icon h-1lh mr-3 flex w-auto items-center')}>
          {icon}
        </div>
      )}
      {children}
    </DialogPrimitive.Title>
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      className={cn('body-16 flex-1 font-medium text-inherit', className)}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Description>
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const dialogFooterClass = 'dialog-footer';

const DialogBody = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = useRef<ComponentRef<typeof ScrollArea>>(null);

  const shadowClass = 'shadow-[inset_0px_-3px_10px_0px_#000000]';
  useEffect(() => {
    const element = scrollRef?.current;

    if (element) {
      const nextSibling = element?.nextSibling as HTMLElement;

      const hasCssOverflow = (ele: HTMLElement) =>
        ele.scrollHeight > ele.clientHeight;

      const addShadow = () => {
        const _isScrollable = hasCssOverflow(element);

        if (
          _isScrollable &&
          nextSibling?.classList?.contains(dialogFooterClass)
        ) {
          nextSibling?.classList?.add(shadowClass);
        }
      };

      const removeShadow = () => {
        const _isScrollable = hasCssOverflow(element);

        const isEndOfScroll =
          Math.round(element?.offsetHeight) + Math.round(element?.scrollTop) >=
          Math.round(element.scrollHeight);

        if (
          (!_isScrollable || isEndOfScroll) &&
          nextSibling?.classList?.contains(dialogFooterClass)
        ) {
          nextSibling?.classList?.remove(shadowClass);
        }
      };

      const initial = () => {
        addShadow();
        removeShadow();
      };

      // add shadow if there is an overflow on the body content on initial render
      initial();

      const resizeObserver = new ResizeObserver(initial);

      resizeObserver.observe(element);

      element?.addEventListener('scroll', () => {
        // add shadow if there is an overflow on the body content on scroll
        addShadow();

        const isEndOfScroll =
          Math.round(element?.offsetHeight) + Math.round(element?.scrollTop) >=
          Math.round(element.scrollHeight);

        if (isEndOfScroll) {
          // remove shadow if there is no overflow on the body content
          nextSibling?.classList?.remove(shadowClass);
        }
      });
    }
  }, [scrollRef]);

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn(
        'h-full overflow-y-auto shadow-[inset_0_6px_12px_-4px_#000000]',
      )}
    >
      <div className={cn('px-4 py-6 md:px-6', className)} {...props}>
        {children}
      </div>
    </ScrollArea>
  );
};
DialogBody.displayName = 'DialogBody';

const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      dialogFooterClass,
      'flex w-full gap-3 px-4 py-6 lg:px-6',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Body: DialogBody,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  FixedFooter: DialogFooter,
  Close: DialogClose,
});
