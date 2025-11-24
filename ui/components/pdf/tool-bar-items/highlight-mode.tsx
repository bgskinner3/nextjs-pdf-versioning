import {
  MessageIcon,
  RenderHighlightTargetProps,
  RenderHighlightContentProps,
  RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';
import { Fragment } from 'react';
import type { THighlighterValues, THighlighterActions } from '@/hooks';
import { Position, Tooltip } from '@react-pdf-viewer/core';
import { Button } from '../../button';
import { BasicIcon } from '../../icon';
import type { ChangeEvent } from 'react';
import type { HighlightPlugin } from '@react-pdf-viewer/highlight';
import { cn } from '@/utils';
const RenderHighlightTarget = ({
  props,
  values,
  actions,
}: {
  props: RenderHighlightTargetProps;
  values: THighlighterValues;
  actions: THighlighterActions;
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
      <Tooltip
        position={Position.TopCenter}
        target={
          <div className="flex gap-x-2">
            <Button onClick={props.toggle} className="group/note">
              <MessageIcon />
            </Button>
            <Button
              className="group/highlight"
              onClick={() => {
                actions.addNewNote({
                  id: values.notes.length + 1,
                  content: values.noteMessage,
                  highlightAreas: props.highlightAreas,
                  quote: props.selectedText,
                  isHighlight: true,
                });
                props.cancel();
              }}
            >
              <BasicIcon name="editMarker" />
            </Button>
          </div>
        }
        content={() => (
          <div
            style={{ width: '200px' }}
            className="text-off-white text-[16px]"
          >
            Add a note or highlight
          </div>
        )}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );
};

type TRenderHighlightContent = {
  props: RenderHighlightContentProps;
  actions: THighlighterActions;
  values: THighlighterValues;
};
const RenderHighlightContent = ({
  props,
  actions,
  values,
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
        ></textarea>
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
              actions.addNewNote({
                id: values.notes.length + 1,
                content: values.noteMessage,
                highlightAreas: props.highlightAreas,
                quote: props.selectedText,
                isHighlight: false,
              });
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
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: 'yellow',
                    opacity: 0.4,
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
    <h2 className="p-3 text-2xl text-gray-500 uppercase">My Notes</h2>
    {values.notes.length === 0 && <div>There is no note</div>}
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
