// ./types/editing-types
import type { Rect, TFontInfo } from './common-types';
// type TInsertTextOperation = {
//   type: 'insert';
//   page: number;
//   position: number; // character index in extracted text run
//   coords: Rect; // bounding box, needed for diff overlay
//   text: string;
//   font: TFontInfo;
// };

// type TReplaceTextOperation = {
//   type: 'replace';
//   page: number;
//   position: number;
//   length: number;
//   coords: Rect;
//   oldText: string;
//   newText: string;
//   font: TFontInfo;
// };

// type TDeleteTextOperation = {
//   type: 'delete';
//   page: number;
//   position: number;
//   length: number;
//   coords: Rect;
//   removedText: string;
// };
type TContentOperationBase = {
  id?: number;
  docId: string;
  version: number;
  page: number;
  // Coordinates in PDF space (points from bottom-left)
  y: number;
  x: number;
  timestamp: Date;
};

type TInsertTextOperation = TContentOperationBase & {
  type: 'insert';
  content: string;
  fontInfo: TFontInfo;
};

type TDeleteTextOperation = TContentOperationBase & {
  type: 'delete';
  // Optional: original content for tracking purposes
  content?: string;
  // Coordinates define the area of text to be removed/masked
  rect: Rect;
};

type TReplaceTextOperation = TContentOperationBase & {
  type: 'replace';
  oldContent: string;
  newContent: string;
  fontInfo: TFontInfo;
  // Coordinates define the area of text to be replaced/masked
  rect: Rect;
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
