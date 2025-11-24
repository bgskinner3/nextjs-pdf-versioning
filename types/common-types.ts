// ./types/common-types
import type { ComponentPropsWithoutRef } from 'react';
import type { TPdfAnnotationData } from './annotation-types';

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

export type { TIconProps, Rect, Point, TFontInfo };
