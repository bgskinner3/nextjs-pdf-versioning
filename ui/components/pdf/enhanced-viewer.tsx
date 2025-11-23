'use client';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import { SearchViewer } from './search-viewer';
import { cn } from '@/utils';
import { BasicIcon } from '../icon';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';

type TEnhancedViewerProps = {
  fileUrl: string;
};

export const EnhancedViewer = ({ fileUrl }: TEnhancedViewerProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    setInitialTab: (_doc) => Promise.resolve(0),

    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          // Destructure to remove Search
          const { Search, ZoomIn, ZoomOut, CurrentScale, ...restSlots } = slots;

          return (
            // <div className={cn('flex w-full min-w-[] justify-center')}>
            //   <div className="flex h-full flex-row items-center gap-4 [&_button]:mt-2">
            //     <ZoomIn />
            //     <CurrentScale />
            //     <ZoomOut />
            //   </div>
            // </div>
            <></>
          );
        }}
      </Toolbar>
    ),
  });
  const searchPluginInstance = searchPlugin({ enableShortcuts: true });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden rounded-md border">
      {/* PDF Viewer */}
      <SearchViewer searchPluginInstance={searchPluginInstance} />
      <div className="flex-1 overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            defaultScale={SpecialZoomLevel.PageFit}
            plugins={[defaultLayoutPluginInstance, searchPluginInstance]}
            theme="dark"
          />
        </Worker>
      </div>
    </div>
  );
};
