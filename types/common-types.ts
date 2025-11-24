// ./types/common-types
import type { ComponentPropsWithoutRef } from 'react';
import type { HighlightArea } from '@react-pdf-viewer/highlight';
type TTypeGuard<T> = (value: unknown) => value is T;

type TIconProps = {} & ComponentPropsWithoutRef<'svg'>;

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Point = {
  x: number;
  y: number;
};
type TFontInfo = {
  family: string;
  size: number;
  weight?: string | number;
  color?: string;
};
type TNote = {
  id: number;
  content?: string;
  highlightAreas: HighlightArea[];
  quote: string;
  isHighlight: boolean;
};

export type { TIconProps, Rect, Point, TFontInfo, TTypeGuard, TNote };
