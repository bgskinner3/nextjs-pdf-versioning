'use client';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/properties/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { selectionModePlugin } from '@react-pdf-viewer/selection-mode';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { BasicIcon } from '../icon';
import { Skeleton } from '../skeleton';
import {
  ToolBarControls,
  CustomZoom,
  SidebarNotes,
  SearchViewer,
} from './tool-bar-items';
import {
  useHighlighterValues,
  useHighlighterActions,
  useSafeHighlightPlugin,
  useToolbarValues,
} from '@/hooks';
import { ArrayUtils, cn } from '@/utils';
type TEnhancedViewerProps = {
  fileUrl: string;
};

export const PDFViewerCore = ({ fileUrl }: TEnhancedViewerProps) => {
  const highlighterValues = useHighlighterValues();
  const highlighterActions = useHighlighterActions();
  const { activePanels } = useToolbarValues();

  /**
   * PLUGINS
   */
  const zoomPluginInstance = zoomPlugin({});
  const searchPluginInstance = searchPlugin({ enableShortcuts: true });
  const selectionModePluginInstance = selectionModePlugin();
  const highlightPluginInstance = useSafeHighlightPlugin();
  const thumbnailPluginInstance = thumbnailPlugin({
    renderSpinner: () => <Skeleton />,
  });
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    setInitialTab: (_doc) => Promise.resolve(0),
    sidebarTabs: (defaultTabs) => {
      const filtered = ArrayUtils.filter(
        defaultTabs,
        (item) => item.title !== 'Bookmark' && item.title !== 'Attachment',
      );
      return filtered.concat({
        content: (
          <SidebarNotes
            values={highlighterValues}
            highlightPluginInstance={highlightPluginInstance}
            actions={highlighterActions}
          />
        ),
        icon: <BasicIcon name="message" />,
        title: 'Annotations',
      });
    },
    renderToolbar: (Toolbar) => (
      <div className="shadow-dark-300 flex h-[50px] w-full items-center bg-inherit">
        <Toolbar>
          {({ GoToNextPage, GoToPreviousPage, NumberOfPages }) => (
            <ToolBarControls>
              <div className="flew-row flex items-center gap-x-2">
                <ToolBarControls.InteractiveActions
                  highlightPluginInstance={highlightPluginInstance}
                />

                <div className="flex h-full flex-row items-center justify-center py-1">
                  <div
                    className={cn(
                      'flex h-full flex-row items-center justify-center gap-x-4 rounded-xl px-4',
                      '[&_svg]:stroke-off-white! [&_svg]:stroke-2!',
                      '[&_div]:pt-1!',
                    )}
                  >
                    <GoToPreviousPage />
                    <NumberOfPages />
                    <GoToNextPage />
                  </div>
                </div>
              </div>
              <CustomZoom zoomPluginInstance={zoomPluginInstance} />
              <ToolBarControls.HomeActions />
            </ToolBarControls>
          )}
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
            defaultScale={
              activePanels.has('highlight')
                ? SpecialZoomLevel.PageFit
                : SpecialZoomLevel.PageWidth
            }
            plugins={[
              defaultLayoutPluginInstance,
              searchPluginInstance,
              zoomPluginInstance,
              selectionModePluginInstance,
              highlightPluginInstance,
              thumbnailPluginInstance,
            ]}
            theme="dark"
            enableSmoothScroll={true}
          />
        </Worker>
      </div>
    </div>
  );
};
