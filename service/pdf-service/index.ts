import { db, TPdfDocument, TPdfVersion } from '../db-service'
import { v4 as uuidv4 } from 'uuid';



export class PdfService {
  /** Create a new document with Version 1 */
  static async createDocument(file: File): Promise<string> {
    const docId = uuidv4();

    const newDoc: TPdfDocument = {
      id: docId,
      name: file.name,
      currentVersion: 1,
    };

    const version1: TPdfVersion = {
      docId,
      version: 1,
      message: 'Initial Upload (V1)',
      timestamp: new Date(),
      fileBlob: file,
    };

    await db.documents.put(newDoc);
    await db.versions.add(version1);

    return docId;
  }

  /** Add a new version to an existing document */
  static async addVersion(docId: string, file: File, message: string) {
    const doc = await db.documents.get(docId);
    if (!doc) throw new Error('Document not found');

    const newVersion: TPdfVersion = {
      docId,
      version: doc.currentVersion + 1,
      message,
      timestamp: new Date(),
      fileBlob: file,
    };

    await db.versions.add(newVersion);
    await db.documents.update(docId, { currentVersion: doc.currentVersion + 1 });
  }

  /** Fetch all versions for a document */
  static async getVersions(docId: string): Promise<TPdfVersion[]> {
    return db.versions
      .where('docId')
      .equals(docId)
      .sortBy('version');
  }

  /** Get document metadata */
  static async getDocument(docId: string): Promise<TPdfDocument | undefined> {
    return db.documents.get(docId);
  }
}