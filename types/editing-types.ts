// ./types/editing-types
import type { Rect, TFontInfo } from './common-types';
type TInsertTextOperation = {
  type: 'insert';
  page: number;
  position: number; // character index in extracted text run
  coords: Rect; // bounding box, needed for diff overlay
  text: string;
  font: TFontInfo;
};

type TReplaceTextOperation = {
  type: 'replace';
  page: number;
  position: number;
  length: number;
  coords: Rect;
  oldText: string;
  newText: string;
  font: TFontInfo;
};

type TDeleteTextOperation = {
  type: 'delete';
  page: number;
  position: number;
  length: number;
  coords: Rect;
  removedText: string;
};

type TContentOperation =
  | TInsertTextOperation
  | TDeleteTextOperation
  | TReplaceTextOperation;

export type {
  TInsertTextOperation,
  TReplaceTextOperation,
  TDeleteTextOperation,
  TContentOperation,
};
