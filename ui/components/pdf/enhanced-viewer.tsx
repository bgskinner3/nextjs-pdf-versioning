'use client';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/properties/lib/styles/index.css';
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
  usePdfValues,
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
  const pdfValues = usePdfValues();
  const values = useHighlighterValues();
  const actions = useHighlighterActions();
  const { togglePanel } = useToolbarActions();
  const { activePanels } = useToolbarValues();
  const zoomPluginInstance = zoomPlugin({});
  const searchPluginInstance = searchPlugin({ enableShortcuts: true });
  const selectionModePluginInstance = selectionModePlugin();

  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.None,
    /* prettier-ignore */ renderHighlightTarget: (props) => <RenderHighlightTarget props={props} actions={actions} values={values} version={pdfValues.currentVersion!}  />,
    /* prettier-ignore */ renderHighlightContent: (props) => <RenderHighlightContent props={props} actions={actions} values={values} version={pdfValues.currentVersion!} />,
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
            actions={actions}
          />
        ),
        icon: <MessageIcon />,
        title: 'Notes',
      }),
    renderToolbar: (Toolbar) => (
      <div className="shadow-dark-400 flex h-full w-full py-1">
        <Toolbar>
          {(props) => {
            return (
              <div
                className={cn(
                  'grid',
                  'grid-cols-3',
                  'container max-w-none 2xl:container',
                )}
              >
                <div className="flex flex-row gap-x-2">
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
                </div>
                <CustomZoom zoomPluginInstance={zoomPluginInstance} />
                <div
                  className={cn('flex h-full w-full items-center justify-end')}
                >
                  <Button variant="none" className="p-0 md:p-0">
                    Commit Version
                  </Button>
                  <props.ShowProperties />
                </div>
              </div>
            );
          }}
        </Toolbar>
      </div>
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
