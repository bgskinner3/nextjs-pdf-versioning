'use client';
import type {
  ZoomPlugin,
  RenderZoomInProps,
  RenderZoomOutProps,
} from '@react-pdf-viewer/zoom';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import { Button } from '../../button';
import { cn } from '@/utils';
import { useToolbarValues } from '@/hooks';
import { useEffect } from 'react';
export const CustomZoom = ({
  zoomPluginInstance,
}: {
  zoomPluginInstance: ZoomPlugin;
}) => {
  const { ZoomOut, Zoom, ZoomIn, zoomTo } = zoomPluginInstance;
  const { activePanels } = useToolbarValues();
  const forceFit = activePanels.has('highlight');

  useEffect(() => {
    if (forceFit) {
      zoomTo(SpecialZoomLevel.PageWidth);
    }
  }, [forceFit, zoomTo]);
  return (
    <div
      className={cn(
        'col-start-2 flex flex-row items-center justify-center gap-2 place-self-center rounded-xl px-4 py-1',
        forceFit &&
          'pointer-events-none w-fit bg-gray-400 [&_span]:text-gray-500',
      )}
    >
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
            disabled={forceFit}
          >
            <span className={cn('pb-1', forceFit && 'text-off-white!')}>-</span>
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
            disabled={forceFit}
          >
            <span className={cn('pb-1', forceFit && 'text-off-white!')}>+</span>
          </Button>
        )}
      </ZoomIn>
    </div>
  );
};
