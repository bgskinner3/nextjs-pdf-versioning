import Dexie, { Table } from 'dexie';
import {
  TPdfDocument,
  TPdfVersion,
  TPdfAnnotation,
  TContentOperation,
} from '@/types';

export class AppDB extends Dexie {
  documents!: Table<TPdfDocument, string>;
  versions!: Table<TPdfVersion, number>;
  annotations!: Table<TPdfAnnotation, number>;
  contentOps!: Table<TContentOperation, number>;

  constructor() {
    super('PdfEditorDB');
    this.version(1).stores({
      documents: 'id, name, currentVersion, createdAt',
      versions: '++id, docId, version, timestamp',
      annotations: '++id, [docId+version], type',
      contentOps: '++id, [docId+version+page], type',
    });
  }

  getAnnotationsForVersion(docId: string, version: number) {
    return this.annotations
      .where('[docId+version]')
      .equals([docId, version])
      .toArray();
  }
  getContentOpsForPage(docId: string, version: number, page: number) {
    return this.contentOps
      .where('[docId+version+page]')
      .equals([docId, version, page])
      .toArray();
  }
}

export const db = new AppDB();
