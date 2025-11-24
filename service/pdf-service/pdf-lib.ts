import { PDFDocument } from 'pdf-lib';
import { TPdfVersion, TPdfAnnotationData } from '@/types';
import { annotationMapper } from './mapper';

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
    await this.applyAnnotations(pdfDoc, version.annotations);
    const bytes = await pdfDoc.save();
    // TODO FIX TYPE
    // LOOKAT PRIOR ALGO LIB FOR BUFFER ARRAY
    // return new File(
    //   [bytes],
    //   `doc-v${version.version}-annotated.pdf`,
    //   { type: 'application/pdf' }
    // );
  }
}
