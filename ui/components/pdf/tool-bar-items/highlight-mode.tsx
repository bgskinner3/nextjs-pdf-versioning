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
import type { ChangeEvent } from 'react';
import type { HighlightPlugin } from '@react-pdf-viewer/highlight';

const RenderHighlightTarget = ({
  props,
}: {
  props: RenderHighlightTargetProps;
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
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => (
          <div style={{ width: '100px' }} className="text-black">
            Add a note
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
}: {
  values: THighlighterValues;
  highlightPluginInstance: HighlightPlugin;
}) => (
  <>
    {values.notes.length === 0 && <div>There is no note</div>}
    {values.notes.map((note) => {
      return (
        <div
          key={note.id}
          onClick={() =>
            highlightPluginInstance.jumpToHighlightArea(note.highlightAreas[0])
          }
        >
          <blockquote>{note.quote}</blockquote>
          {note.content}
        </div>
      );
    })}
  </>
);

export {
  RenderHighlightContent,
  RenderHighlights,
  RenderHighlightTarget,
  SidebarNotes,
};
