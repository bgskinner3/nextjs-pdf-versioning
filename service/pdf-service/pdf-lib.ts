import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { TPdfVersion, TPdfAnnotationData } from '@/types';
import { annotationMapper } from './mapper';
import { isInsert, isDelete, isReplace } from '@/utils';
import { TContentOperation } from '@/types';
export class PdfLibService {
  static async loadPdf(version: TPdfVersion): Promise<PDFDocument> {
    const arrayBuffer = await version.fileBlob.arrayBuffer();
    return PDFDocument.load(arrayBuffer);
  }

  static async applyAnnotations(
    pdfDoc: PDFDocument,
    annotations: TPdfAnnotationData[],
  ) {
    for (const ann of annotations) {
      const handler = annotationMapper[ann.type];
      if (handler) {
        await handler(pdfDoc, ann);
      } else {
        console.warn(`No handler for annotation type: ${ann.type}`);
      }
    }
  }

  static async exportAnnotatedPdf(version: TPdfVersion) {
    const pdfDoc = await this.loadPdf(version);

    await this.applyContentOps(pdfDoc, version.contentOps);

    await this.applyAnnotations(pdfDoc, version.annotations);

    const bytes = await pdfDoc.save();

    return new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
  }

  static async applyContentOps(
    pdfDoc: PDFDocument,
    contentOps: TContentOperation[],
  ) {
    for (const op of contentOps) {
      const page = pdfDoc.getPage(op.page - 1);

      if (isInsert(op)) {
        // Handle text insertion
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        page.drawText(op.content, {
          x: op.x,
          y: op.y,
          size: op.fontInfo.size,
          font,
        });
      }
      if (isDelete(op) || isReplace(op)) {
        page.drawRectangle({
          x: op.rect.x,
          y: op.rect.y,
          width: op.rect.width,
          height: op.rect.height,
          color: rgb(1, 1, 1),
        });

        if (isReplace(op)) {
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          page.drawText(op.newContent, {
            x: op.x,
            y: op.y,
            size: op.fontInfo.size,
            font,
          });
        }
      }
    }
  }
}
