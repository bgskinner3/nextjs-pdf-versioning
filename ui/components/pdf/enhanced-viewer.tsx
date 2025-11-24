'use client';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import { SearchViewer } from './search-viewer';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { cn } from '@/utils';
import { BasicIcon } from '../icon';
import { Button } from '../button';
import {
  useToolbarActions,
  useToolbarValues,
  useHighlighterValues,
  useHighlighterActions,
} from '@/hooks';
import { CustomZoom } from './tool-bar';
import { selectionModePlugin } from '@react-pdf-viewer/selection-mode';
import {
  highlightPlugin,
  Trigger,
  MessageIcon,
} from '@react-pdf-viewer/highlight';
import {
  RenderHighlightContent,
  RenderHighlights,
  RenderHighlightTarget,
  SidebarNotes,
} from './tool-bar-items';

type TEnhancedViewerProps = {
  fileUrl: string;
};

export const EnhancedViewer = ({ fileUrl }: TEnhancedViewerProps) => {
  const values = useHighlighterValues();
  const actions = useHighlighterActions();
  const { togglePanel } = useToolbarActions();
  const { activePanels } = useToolbarValues();
  const zoomPluginInstance = zoomPlugin({});
  const searchPluginInstance = searchPlugin({ enableShortcuts: true });
  const selectionModePluginInstance = selectionModePlugin();
  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.None,
    /* prettier-ignore */ renderHighlightTarget: (props) => <RenderHighlightTarget props={props} />,
    /* prettier-ignore */ renderHighlightContent: (props) => <RenderHighlightContent props={props} actions={actions} values={values} />,
    /* prettier-ignore */ renderHighlights: (props) =>    <RenderHighlights props={props} values={values} />,
  });
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    setInitialTab: (_doc) => Promise.resolve(0),
    sidebarTabs: (defaultTabs) =>
      defaultTabs.concat({
        content: (
          <SidebarNotes
            values={values}
            highlightPluginInstance={highlightPluginInstance}
          />
        ),
        icon: <MessageIcon />,
        title: 'Notes',
      }),
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {() => {
          return (
            <div
              className={cn(
                'grid',
                'grid-cols-3',
                'container max-w-none 2xl:container',
              )}
            >
              <Button
                className={cn('group p-0 md:p-0')}
                variant="none"
                onClick={() => togglePanel('search')}
              >
                <BasicIcon
                  name="magnifyingGlass"
                  className={cn(
                    'h-5 w-auto transition-all duration-300 group-hover:fill-gray-500',
                  )}
                />
              </Button>
              <CustomZoom zoomPluginInstance={zoomPluginInstance} />
              <Button
                className={cn(
                  'group p-0 md:p-0',
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
                    activePanels.has('highlight') && 'fill-off-white',
                  )}
                />
              </Button>
            </div>
          );
        }}
      </Toolbar>
    ),
  });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden rounded-md border">
      <SearchViewer searchPluginInstance={searchPluginInstance} />
      <div className="flex-1 overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            defaultScale={SpecialZoomLevel.ActualSize}
            plugins={[
              defaultLayoutPluginInstance,
              searchPluginInstance,
              zoomPluginInstance,
              selectionModePluginInstance,
              highlightPluginInstance,
            ]}
            theme="dark"
            enableSmoothScroll={true}
          />
        </Worker>
      </div>
    </div>
  );
};
