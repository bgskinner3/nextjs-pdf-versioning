'use client';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import { SearchViewer } from './search-viewer';
import { cn } from '@/utils';
import { BasicIcon } from '../icon';
import { Button } from '../button';
import { useToolbarActions } from '@/hooks';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';

type TEnhancedViewerProps = {
  fileUrl: string;
};

export const EnhancedViewer = ({ fileUrl }: TEnhancedViewerProps) => {
  const { togglePanel } = useToolbarActions();
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    setInitialTab: (_doc) => Promise.resolve(0),
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          // Remove Search from the toolbar
          const { Search, ...rest } = slots;

          // Render the rest using the built-in renderer
          return (
            <div className={cn('flex flex-row items-center px-4')}>
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
              <slots.Zoom />
            </div>
          );
        }}
      </Toolbar>
    ),
  });
  const searchPluginInstance = searchPlugin({ enableShortcuts: true });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden rounded-md border">
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
/**
 export interface ToolbarSlot {
     CurrentPageInput(): React.ReactElement;
     CurrentPageLabel(props: CurrentPageLabelProps): React.ReactElement;
     CurrentScale(props: CurrentScaleProps): React.ReactElement;
     GoToFirstPage(props: GoToPageProps): React.ReactElement;
     GoToFirstPageMenuItem(props: GoToPageMenuItemProps): React.ReactElement;
     GoToLastPage(props: GoToPageProps): React.ReactElement;
     GoToLastPageMenuItem(props: GoToPageMenuItemProps): React.ReactElement;
     GoToNextPage(props: GoToPageProps): React.ReactElement;
     GoToNextPageMenuItem(props: GoToPageMenuItemProps): React.ReactElement;
     GoToPreviousPage(props: GoToPageProps): React.ReactElement;
     GoToPreviousPageMenuItem(props: GoToPageMenuItemProps): React.ReactElement;
     NumberOfPages(props: NumberOfPagesProps): React.ReactElement;
 
     Download(props: DownloadProps): React.ReactElement;
     DownloadMenuItem(props: DownloadMenuItemProps): React.ReactElement;
 
     EnterFullScreen(props: EnterFullScreenProps): React.ReactElement;
     EnterFullScreenMenuItem(props: EnterFullScreenMenuItemProps): React.ReactElement;
 
     Open(props: OpenProps): React.ReactElement;
     OpenMenuItem(): React.ReactElement;
 
     Print(props: PrintProps): React.ReactElement;
     PrintMenuItem(props: PrintMenuItemProps): React.ReactElement;
 
     Rotate(props: RotateProps): React.ReactElement;
     RotateBackwardMenuItem(props: RotateDecoratorProps): React.ReactElement;
     RotateForwardMenuItem(props: RotateDecoratorProps): React.ReactElement;
 
     Search(props: SearchProps): React.ReactElement;
     ShowSearchPopover(props: ShowSearchPopoverProps): React.ReactElement;
 
     ShowProperties(props: ShowPropertiesProps): React.ReactElement;
     ShowPropertiesMenuItem(props: ShowPropertiesMenuItemProps): React.ReactElement;
 
     SwitchScrollMode(props: SwitchScrollModeProps): React.ReactElement;
     SwitchScrollModeMenuItem(props: SwitchScrollModeMenuItemProps): React.ReactElement;
 
     SwitchSelectionMode(props: SwitchSelectionModeProps): React.ReactElement;
     SwitchSelectionModeMenuItem(props: SwitchSelectionModeMenuItemProps): React.ReactElement;
 
     SwitchTheme(props: SwitchThemeProps): React.ReactElement;
     SwitchThemeMenuItem(props: SwitchThemeMenuItemProps): React.ReactElement;
 
     SwitchViewMode(props: SwitchViewModeProps): React.ReactElement;
     SwitchViewModeMenuItem(props: SwitchViewModeMenuItemProps): React.ReactElement;
 
     Zoom(props: ZoomProps): React.ReactElement;
     ZoomIn(props: ZoomInProps): React.ReactElement;
     ZoomInMenuItem(props: ZoomMenuItemProps): React.ReactElement;
     ZoomOut(props: ZoomOutProps): React.ReactElement;
     ZoomOutMenuItem(props: ZoomMenuItemProps): React.ReactElement;
 }
 */
