import {
  TPdfAnnotationData,
  THighlightAnnotation,
  TFreeTextAnnotation,
  TTextAnnotation,
  TRedactionAnnotation,
  TStickyNoteAnnotation,
  TInsertTextOperation,
  TReplaceTextOperation,
  TDeleteTextOperation,
  TContentOperation,
} from '@/types';

export const isHighlight = (
  value: TPdfAnnotationData,
): value is THighlightAnnotation => value.type === 'highlight';

export const isText = (value: TPdfAnnotationData): value is TTextAnnotation =>
  value.type === 'text';

export const isFreeText = (
  value: TPdfAnnotationData,
): value is TFreeTextAnnotation => value.type === 'free-text';

export const isRedaction = (
  value: TPdfAnnotationData,
): value is TRedactionAnnotation => value.type === 'redaction';

export const isStickyNote = (
  value: TPdfAnnotationData,
): value is TStickyNoteAnnotation => value.type === 'sticky-note';

export const isInsert = (
  value: TContentOperation,
): value is TInsertTextOperation => value.type === 'insert';
export const isDelete = (
  value: TContentOperation,
): value is TDeleteTextOperation => value.type === 'delete';
export const isReplace = (
  value: TContentOperation,
): value is TReplaceTextOperation => value.type === 'replace';
