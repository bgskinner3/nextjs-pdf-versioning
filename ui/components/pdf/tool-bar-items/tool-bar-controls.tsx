import { cn, ObjectUtils } from '@/utils';
import { Button } from '../../button';
import { BasicIcon } from '../../icon';
import { Dialog } from '../../dialog';
import type { ComponentPropsWithoutRef } from 'react';
import type { HighlightPlugin } from '@react-pdf-viewer/highlight';
import {
  useToolbarActions,
  useToolbarValues,
  usePdfActions,
  useHighlighterActions,
} from '@/hooks';
import { Trigger } from '@react-pdf-viewer/highlight';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { TooltipWrapper } from '../../tool-tip';

type TToolBarRoot = {} & ComponentPropsWithoutRef<'div'>;

const ToolBarControlsRoot = ({
  className,
  children,
  ...props
}: TToolBarRoot) => {
  return (
    <div
      className={cn('grid h-full w-full px-12', 'grid-cols-3 pt-1', className)}
      {...props}
    >
      {children}
    </div>
  );
};

type TInterActiveActions = {
  highlightPluginInstance: HighlightPlugin;
} & ComponentPropsWithoutRef<'div'>;
const InteractiveActions = ({
  highlightPluginInstance,
  className,
  ...props
}: TInterActiveActions) => {
  const { togglePanel } = useToolbarActions();
  const { activePanels } = useToolbarValues();
  return (
    <div
      className={cn('flex h-full flex-row items-center gap-x-2', className)}
      {...props}
    >
      <TooltipWrapper
        trigger={
          <Button
            className={cn(
              'group rounded-xl hover:bg-neutral-700',
              activePanels.has('search') && 'bg-neutral-700',
            )}
            variant="none"
            onClick={() => togglePanel('search')}
          >
            <BasicIcon
              name="magnifyingGlass"
              className={cn(
                activePanels.has('search') && 'fill-sky-500',
                'h-5 w-auto transition-all duration-300 group-hover:fill-sky-500',
              )}
            />
          </Button>
        }
      >
        <span className="text-off-white text-[16px]">Search</span>
      </TooltipWrapper>
      <TooltipWrapper
        trigger={
          <Button
            className={cn(
              'group rounded-xl hover:bg-neutral-700',
              activePanels.has('highlight') && 'bg-neutral-700',
            )}
            variant="none"
            onClick={() => {
              togglePanel('highlight');
              highlightPluginInstance.switchTrigger(
                activePanels.has('highlight')
                  ? Trigger.None
                  : Trigger.TextSelection,
              );
            }}
          >
            <BasicIcon
              name="editMarker"
              className={cn(
                activePanels.has('highlight') && 'fill-yellow-500',
                'h-5 w-auto transition-all duration-300 group-hover:fill-yellow-500',
              )}
            />
          </Button>
        }
      >
        <span className="text-off-white text-[16px]">Annotate</span>
      </TooltipWrapper>
      <TooltipWrapper
        trigger={
          <Button
            className={cn('group rounded-xl hover:bg-neutral-700')}
            variant="none"
          >
            <BasicIcon
              name="textBox"
              className={cn(
                'h-5 w-auto transition-all duration-300 group-hover:fill-green-500',
              )}
            />
          </Button>
        }
      >
        <div className="text-off-white flex flex-col gap-2 text-[16px]">
          <span>Free text</span>
          <span className="text-[14px] text-gray-500">Coming Soon!</span>
        </div>
      </TooltipWrapper>
    </div>
  );
};
type THomeControlActions = {} & ComponentPropsWithoutRef<'div'>;
const HomeControlActions = ({ className, ...props }: THomeControlActions) => {
  const pdfActions = usePdfActions();
  const highlighterActions = useHighlighterActions();
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-end gap-x-4',
        className,
      )}
      {...props}
    >
      <Button
        variant="solid"
        className="flex max-h-[30px] w-full max-w-[120px] justify-center rounded-md border"
      >
        Commit
      </Button>

      <Dialog
        size="small"
        overlayClassName=" z-[10002] bg-black/30 backdrop-blur-3xl"
        displayClose={false}
      >
        <Dialog.Trigger asChild>
          <Button
            variant="solid"
            className="flex max-h-[30px] w-full max-w-[120px] justify-center rounded-md border"
          >
            New
          </Button>
        </Dialog.Trigger>
        <Dialog.Content
          className={cn('group/content z-10002 h-fit', 'bg-cool-gray-1100')}
        >
          <Dialog.Header>
            <Dialog.Title className="sr-only">Are you sure?</Dialog.Title>
            <Dialog.Description className="w-full text-center">
              Heads up! If you bail now, everything you’ve done goes *poof*.
              Still wanna start over?
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <div className="flex w-full flex-row justify-evenly">
              <Button
                variant="solid"
                className="flex w-full max-w-[150px] justify-center border"
                onClick={() => {
                  pdfActions.reset({});
                  highlighterActions.resetNotes();
                  ObjectUtils.keys(LOCAL_STORAGE_KEYS).forEach((value) =>
                    localStorage.removeItem(value),
                  );
                }}
              >
                Yes, im sure
              </Button>
              <Button
                variant="solid"
                className="flex w-full max-w-[150px] justify-center border"
              >
                I lied
              </Button>
            </div>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export const ToolBarControls = Object.assign(ToolBarControlsRoot, {
  HomeActions: HomeControlActions,
  InteractiveActions: InteractiveActions,
});
