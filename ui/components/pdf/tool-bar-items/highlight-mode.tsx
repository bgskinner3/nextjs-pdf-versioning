import {
  MessageIcon,
  RenderHighlightTargetProps,
  RenderHighlightContentProps,
  RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';
import { Fragment } from 'react';
import type { THighlighterValues, THighlighterActions } from '@/hooks';
import { Button } from '../../button';
import { BasicIcon } from '../../icon';
import type { ChangeEvent } from 'react';
import type { HighlightPlugin } from '@react-pdf-viewer/highlight';
import { cn } from '@/utils';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../../tool-tip';
import { TPdfVersion } from '@/types';

const RenderHighlightTarget = ({
  props,
  values,
  actions,
  version,
}: {
  props: RenderHighlightTargetProps;
  values: THighlighterValues;
  actions: THighlighterActions;
  version: TPdfVersion;
}) => {
  return (
    <div
      style={{
        background: '#eee',
        display: 'flex',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: 'translate(0, 8px)',
        zIndex: 999,
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex gap-x-2">
              <Button onClick={props.toggle} className="group/note">
                <MessageIcon />
              </Button>
              <Button
                className="group/highlight"
                onClick={() => {
                  actions.addNewNote(
                    {
                      id: values.notes.length + 1,
                      highlightAreas: props.highlightAreas,
                      quote: props.selectedText,
                      isHighlight: true,
                      isRedactor: false,
                      type: 'highlight',
                    },
                    version,
                  );
                  props.cancel();
                }}
              >
                <BasicIcon name="editMarker" />
              </Button>
              <Button
                className="group/highlight"
                onClick={() => {
                  setTimeout(() => {
                    actions.addNewNote(
                      {
                        id: values.notes.length + 1,
                        highlightAreas: props.highlightAreas,
                        quote: props.selectedText,
                        isHighlight: false,
                        isRedactor: true,
                        type: 'redactor',
                      },
                      version,
                    );
                  }, 0);
                  props.cancel();
                }}
              >
                <BasicIcon name="brush" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div
              style={{ width: '200px' }}
              className="text-off-white text-[16px]"
            >
              Add a note, redact or highlight
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

type TRenderHighlightContent = {
  props: RenderHighlightContentProps;
  actions: THighlighterActions;
  values: THighlighterValues;
  version: TPdfVersion;
};
const RenderHighlightContent = ({
  props,
  actions,
  values,
  version,
}: TRenderHighlightContent) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(0, 0, 0, .3)',
        borderRadius: '2px',
        padding: '8px',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        zIndex: 1,
      }}
    >
      <div>
        <textarea
          rows={3}
          style={{
            border: '1px solid rgba(0, 0, 0, .3)',
          }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            actions.setSingleNoteMessage(e.target.value)
          }
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '8px',
        }}
      >
        <div style={{ marginRight: '8px' }}>
          <Button
            onClick={() => {
              setTimeout(() => {
                actions.addNewNote(
                  {
                    id: values.notes.length + 1,
                    content: values.noteMessage,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                    type: 'note',
                    isHighlight: false,
                    isRedactor: false,
                  },
                  version,
                );
              }, 0);
              props.cancel();
            }}
          >
            Add
          </Button>
        </div>
        <Button onClick={props.cancel}>Cancel</Button>
      </div>
    </div>
  );
};

type TRenderHighlights = {
  props: RenderHighlightsProps;
  values: THighlighterValues;
};
const RenderHighlights = ({ props, values }: TRenderHighlights) => {
  return (
    <div>
      {values.notes.map((note) => (
        <Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .filter((area) => area.width > 0 && area.height > 0)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: note.isRedactor ? 'black' : 'yellow',
                    opacity: note.isRedactor ? 1 : 0.4,
                  },
                  props.getCssProperties(area, props.rotation),
                )}
              />
            ))}
        </Fragment>
      ))}
    </div>
  );
};

const SidebarNotes = ({
  values,
  highlightPluginInstance,
  actions,
}: {
  values: THighlighterValues;
  highlightPluginInstance: HighlightPlugin;
  actions: THighlighterActions;
}) => (
  <div
    className={cn(
      'flex w-full max-w-[500px] flex-col items-center gap-2 overflow-hidden',
    )}
  >
    <h2 className="p-3 text-2xl text-gray-500 uppercase">Annotations</h2>
    <div className="hidden last:flex">No Annotations currently</div>
    {values.notes.map((note) => {
      return (
        <div
          key={note.id}
          onClick={() =>
            highlightPluginInstance.jumpToHighlightArea(note.highlightAreas[0])
          }
          className={cn(
            'grid w-full grid-cols-[auto_50px]',
            'cursor-pointer px-4 py-2 hover:bg-gray-600',
            'transition-all duration-300',
          )}
        >
          <div className="flex flex-col">
            <span className="line-clamp-2">{note.content}</span>
            <blockquote className="line-clamp-1 text-neutral-500">
              {note.quote}
            </blockquote>
          </div>
          <Button
            className="group place-self-center"
            variant="none"
            onClick={() => actions.deleteNote(note.id)}
          >
            <BasicIcon
              name="trash"
              className="h-auto w-5 transition-all duration-500 group-hover:fill-red-300"
            />
          </Button>
        </div>
      );
    })}
  </div>
);

export {
  RenderHighlightContent,
  RenderHighlights,
  RenderHighlightTarget,
  SidebarNotes,
};
