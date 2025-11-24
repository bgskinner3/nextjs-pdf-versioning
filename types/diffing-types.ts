// ./types/diffing-types

import type { Rect } from './common-types';
import type { TPdfAnnotation } from './pdf-types';
type TTextDiff = {
  type: 'added' | 'removed' | 'modified';
  page: number;
  coords: Rect[];
  oldText?: string;
  newText?: string;
};

type TAnnotationAdded = {
  type: 'added';
  annotation: TPdfAnnotation;
};

type TAnnotationRemoved = {
  type: 'removed';
  annotation: TPdfAnnotation;
};

type TAnnotationModified = {
  type: 'modified';
  before: TPdfAnnotation;
  after: TPdfAnnotation;
};
type TAnnotationDiff =
  | TAnnotationAdded
  | TAnnotationRemoved
  | TAnnotationModified;
type TVersionDiff = {
  fromVersion: number;
  toVersion: number;

  textDiffs: TTextDiff[];
  annotationDiffs: TAnnotationDiff[];
};

export type {
  TTextDiff,
  TAnnotationAdded,
  TAnnotationRemoved,
  TAnnotationModified,
  TVersionDiff,
};
