// ./types/editing-types
import type { Rect, TFontInfo } from './common-types';

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

  content?: string;

  rect: Rect;
};

type TReplaceTextOperation = TContentOperationBase & {
  type: 'replace';
  oldContent: string;
  newContent: string;
  fontInfo: TFontInfo;

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
