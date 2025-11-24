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
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { cn, ObjectUtils } from '@/utils';
import { BasicIcon } from '../icon';
import { Button } from '../button';
import {
  useToolbarActions,
  useToolbarValues,
  useHighlighterValues,
  useHighlighterActions,
  usePdfValues,
  usePdfActions,
} from '@/hooks';
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
  CustomZoom,
  SearchViewer,
} from './tool-bar-items';
import { LOCAL_STORAGE_KEYS } from '@/constants';
type TEnhancedViewerProps = {
  fileUrl: string;
};

export const EnhancedViewer = ({ fileUrl }: TEnhancedViewerProps) => {
  const pdfValues = usePdfValues();
  const pdfActions = usePdfActions();
  const values = useHighlighterValues();
  const highlighterActions = useHighlighterActions();
  const { togglePanel } = useToolbarActions();
  const { activePanels } = useToolbarValues();
  const zoomPluginInstance = zoomPlugin({});
  const searchPluginInstance = searchPlugin({ enableShortcuts: true });
  const selectionModePluginInstance = selectionModePlugin();

  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.None,
    /* prettier-ignore */ renderHighlightTarget: (props) => <RenderHighlightTarget props={props} actions={highlighterActions} values={values} version={pdfValues.currentVersion!}  />,
    /* prettier-ignore */ renderHighlightContent: (props) => <RenderHighlightContent props={props} actions={highlighterActions} values={values} version={pdfValues.currentVersion!} />,
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
            actions={highlighterActions}
          />
        ),
        icon: <MessageIcon />,
        title: 'Notes',
      }),
    renderToolbar: (Toolbar) => (
      <div className="shadow-dark-300 flex h-[50px] w-full items-center bg-inherit">
        <Toolbar>
          {(_) => {
            return (
              <div
                className={cn(
                  'grid h-full',
                  'grid-cols-3 pt-1',
                  'container max-w-none 2xl:container',
                )}
              >
                <div className="flex h-full flex-row items-center gap-x-2">
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
                  className={cn(
                    'flex h-full w-full items-center justify-end gap-x-4',
                    'y-2',
                  )}
                >
                  <Button
                    variant="solid"
                    className="flex max-h-[30px] w-full max-w-[120px] justify-center rounded-md border"
                  >
                    Commit
                  </Button>
                  <Button
                    variant="solid"
                    className="flex max-h-[30px] w-full max-w-[120px] justify-center rounded-md border"
                    onClick={() => {
                      pdfActions.reset({});
                      highlighterActions.resetNotes();
                      ObjectUtils.keys(LOCAL_STORAGE_KEYS).forEach((value) =>
                        localStorage.removeItem(value),
                      );
                    }}
                  >
                    New
                  </Button>
                  {/* <props.ShowProperties /> */}
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
