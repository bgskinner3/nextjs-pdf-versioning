import type { tailwindColors } from './colors';

type A = keyof typeof tailwindColors;

declare module 'tailwind-styles-config' {
  type ColorKey = keyof typeof tailwindColors;
  type TStrokeClass = `${string}stroke-${ColorKey}`;

  type DelayKey =
    | 'delay-[100ms]'
    | 'delay-[200ms]'
    | 'delay-[300ms]'
    | 'delay-[400ms]'
    | 'delay-[500ms]'
    | 'delay-[600ms]'
    | 'delay-[700ms]'
    | 'delay-[800ms]'
    | 'delay-[900ms]'
    | 'delay-[1000ms]'
    | 'delay-[1100ms]'
    | 'delay-[1200ms]';

  type ITailwind = {
    theme: {
      colors: {
        [K in ColorKey]: `var(--${K})`;
      };
    };
  };

  export const tailwind: ITailwind;
}
