// ./types/annotation-types
import type { Rect, Point } from './common-types';
import type { PDFDocument } from 'pdf-lib';
type THighlightAnnotation = {
  type: 'highlight';
  page: number;
  rect: Rect;
  color: string;
  opacity: number;
};
type TTextAnnotation = {
  type: 'text';
  page: number;
  x: number;
  y: number;
  content: string;
  fontSize: number;
  color: string;
};
type TFreeTextAnnotation = {
  type: 'free-text';
  page: number;
  position: Point;
  content: string;
  fontSize: number;
  color: string;
};
type TRedactionAnnotation = {
  type: 'redaction';
  page: number;
  rect: Rect;
  fillColor: string; // e.g. black box
};
type TStickyNoteAnnotation = {
  type: 'sticky-note';
  page: number;
  position: Point;
  content: string;
  author?: string;
};
type TPdfAnnotationData =
  | THighlightAnnotation
  | TTextAnnotation
  | TFreeTextAnnotation
  | TRedactionAnnotation
  | TStickyNoteAnnotation;

type TPDFLibAnnotationHandler = (
  pdfDoc: PDFDocument,
  ann: TPdfAnnotationData,
) => Promise<void>;

export type {
  THighlightAnnotation,
  TTextAnnotation,
  TFreeTextAnnotation,
  TRedactionAnnotation,
  TStickyNoteAnnotation,
  TPdfAnnotationData,
  TPDFLibAnnotationHandler,
};
