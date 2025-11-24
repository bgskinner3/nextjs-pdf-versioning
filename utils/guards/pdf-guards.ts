import {
  TPdfAnnotationData,
  THighlightAnnotation,
  TFreeTextAnnotation,
  TTextAnnotation,
  TRedactionAnnotation,
  TStickyNoteAnnotation,
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
