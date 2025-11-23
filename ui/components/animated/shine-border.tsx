import { cn } from '@/utils';
import { HTMLAttributes } from 'react';
import type { CSSProperties } from 'react';

type TShineBorderProps = HTMLAttributes<HTMLDivElement> & {
  borderWidth?: number;
  duration?: number;
};

/**
 * ShineBorder
 *
 * A reusable animated border effect that creates a “shiny” glow
 * along the edges of a container. It uses a combination of:
 * - radial gradient background,
 * - CSS masking (`content-box`) to restrict the effect to the border area,
 * - CSS variables (`--border-width` and `--duration`) for dynamic sizing and animation speed.
 *
 * This component is typically positioned absolutely inside a relative container.
 *
 * @example
 * ```ts
 * <div className="relative h-[500px] w-full overflow-hidden">
 *   <ShineBorder borderWidth={3} duration={12} shineColor={["cyan-500","blue-600"]} />
 * </div>
 * ```
 */
export function ShineBorder({
  borderWidth = 2,
  duration = 14,

  className,
  style,
  ...props
}: TShineBorderProps) {
  const presetColors = ['#4f46e5', '#f59e0b', '#06b6d4']; // indigo-600, amber-500, cyan-500
  const resolvedColors = presetColors.join(', ');
  const customProps: Record<string, string> = {
    '--border-width': `${borderWidth}px`,
    '--duration': `${duration}s`,
  };
  const styleProps: CSSProperties = {
    ...customProps,
    backgroundImage: `radial-gradient(transparent,transparent, ${resolvedColors},transparent,transparent)`,
    ...style,
  };
  return (
    <div
      style={styleProps}
      className={cn(
        'motion-safe:animate-shine pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] will-change-[background-position]',
        '[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
        'mask-exclude [-webkit-mask-composite:xor]',
        '[-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]',
        'mask-size-[100%_100%] mask-no-repeat',
        'bg-size-[300%_300%]',
        'p-(--border-width)',
        className,
      )}
      {...props}
      data-role="shine-border"
    />
  );
}
