import type {
  ZoomPlugin,
  RenderZoomInProps,
  RenderZoomOutProps,
} from '@react-pdf-viewer/zoom';
import { Button } from '../button';
import { cn } from '@/utils';

export const CustomZoom = ({
  zoomPluginInstance,
}: {
  zoomPluginInstance: ZoomPlugin;
}) => {
  const { ZoomOut, Zoom, ZoomIn } = zoomPluginInstance;

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <ZoomOut>
        {({ onClick }: RenderZoomOutProps) => (
          <Button
            variant="none"
            onClick={onClick}
            className={cn(
              'h-6 w-6 rounded-full border bg-neutral-700 md:px-0 md:py-0',
              'flex items-center justify-center text-[20px]',
              'hover:bg-off-white hover:border-neutral-700 hover:text-neutral-700',
            )}
          >
            <span className="pb-1"> -</span>
          </Button>
        )}
      </ZoomOut>

      <Zoom />

      <ZoomIn>
        {({ onClick }: RenderZoomInProps) => (
          <Button
            className={cn(
              'h-6 w-6 rounded-full border bg-neutral-700 md:px-0 md:py-0',
              'flex items-center justify-center text-[16px]',
              'hover:bg-off-white hover:border-neutral-700 hover:text-neutral-700',
            )}
            variant="none"
            onClick={onClick}
          >
            <span className="pb-1">+</span>
          </Button>
        )}
      </ZoomIn>
    </div>
  );
};
