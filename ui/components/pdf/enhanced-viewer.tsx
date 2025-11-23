'use client';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

type TEnhancedViewerProps = {
  fileUrl: string;
};

export const EnhancedViewer = ({ fileUrl }: TEnhancedViewerProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="h-screen w-full overflow-hidden rounded-md border">
      {/* Worker is necessary for pdf.js */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
        />
      </Worker>
    </div>
  );
};
