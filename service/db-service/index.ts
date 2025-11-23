import Dexie, { Table } from 'dexie';



export type TPdfVersion = {
  id?: number;
  docId: string;
  version: number;
  message: string;
  timestamp: Date;
  fileBlob: Blob;
}

export type TPdfDocument = {
  id?: string;
  name: string;
  currentVersion: number;
}

export class AppDB extends Dexie {
  documents!: Table<TPdfDocument, string>;
  versions!: Table<TPdfVersion, number>;

  constructor() {
    super('PdfEditorDB');
    this.version(1).stores({
      documents: 'id, name, currentVersion',
      versions: '++id, docId, version, timestamp',
    });
  }
}

export const db = new AppDB();
