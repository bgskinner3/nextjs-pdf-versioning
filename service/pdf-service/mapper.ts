import type { TPdfAnnotationData, TPDFLibAnnotationHandler } from '@/types';
import {
  isHighlight,
  isText,
  isFreeText,
  isRedaction,
  isStickyNote,
} from '@/utils';
import { rgb, StandardFonts } from 'pdf-lib';

/**
 * annotationMapper
 *
 *
 */
export const annotationMapper: Record<string, TPDFLibAnnotationHandler> = {
  highlight: async (pdfDoc, ann: TPdfAnnotationData) => {
    if (!isHighlight(ann)) return;
    const page = pdfDoc.getPage(ann.page - 1);
    page.drawRectangle({
      x: ann.rect.x,
      y: ann.rect.y,
      width: ann.rect.width,
      height: ann.rect.height,
      color: rgb(1, 1, 0),
      opacity: ann.opacity,
    });
  },

  text: async (pdfDoc, ann: TPdfAnnotationData) => {
    if (!isText(ann)) return;
    const page = pdfDoc.getPage(ann.page - 1);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(ann.content, {
      x: ann.x,
      y: ann.y,
      size: ann.fontSize,
      font,
    });
  },

  'free-text': async (pdfDoc, ann) => {
    if (!isFreeText(ann)) return;
    const page = pdfDoc.getPage(ann.page - 1);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(ann.content, {
      x: ann.position.x,
      y: ann.position.y,
      size: ann.fontSize,
      font,
    });
  },

  redaction: async (pdfDoc, ann) => {
    if (!isRedaction(ann)) return;
    const page = pdfDoc.getPage(ann.page - 1);
    page.drawRectangle({
      x: ann.rect.x,
      y: ann.rect.y,
      width: ann.rect.width,
      height: ann.rect.height,
      color: rgb(0, 0, 0),
    });
  },

  'sticky-note': async (pdfDoc, ann) => {
    if (!isStickyNote(ann)) return;
    const page = pdfDoc.getPage(ann.page - 1);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(`💬 ${ann.content}`, {
      x: ann.position.x,
      y: ann.position.y,
      size: 12,
      font,
    });
  },
};
