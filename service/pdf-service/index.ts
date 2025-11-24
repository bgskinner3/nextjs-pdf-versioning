import { db } from '../db-service';
import { v4 as uuidv4 } from 'uuid';
import { TPdfDocument, TPdfVersion } from '@/types';
export class PdfService {
  private static createNewDocument(
    docId: string,
    fileName: string,
  ): TPdfDocument {
    return {
      id: docId,
      name: fileName,
      currentVersion: 1,
      createdAt: new Date(),
    };
  }

  private static createInitialVersion(
    docId: string,
    file: File,
    message = 'Initial Upload (V1)',
  ): TPdfVersion {
    return {
      docId,
      version: 1,
      message,
      timestamp: new Date(),
      fileBlob: file,
      annotations: [],
      contentOps: [],
    };
  }

  private static createNextVersion(
    docId: string,
    currentVersion: number,
    file: File,
    message: string,
  ): TPdfVersion {
    return {
      docId,
      version: currentVersion + 1,
      message,
      timestamp: new Date(),
      fileBlob: file,
      annotations: [],
      contentOps: [],
    };
  }

  static async createDocument(file: File): Promise<string> {
    const docId = uuidv4();
    const newDoc = this.createNewDocument(docId, file.name);
    const version1 = this.createInitialVersion(docId, file);

    await db.documents.put(newDoc);
    await db.versions.add(version1);

    return docId;
  }

  /** Add a new version to an existing document */
  static async addVersion(docId: string, file: File, message: string) {
    const doc = await db.documents.get(docId);
    if (!doc) throw new Error('Document not found');

    const newVersion = this.createNextVersion(
      docId,
      doc.currentVersion,
      file,
      message,
    );

    await db.versions.add(newVersion);
    await db.documents.update(docId, {
      currentVersion: doc.currentVersion + 1,
    });
  }

  /** Fetch all versions for a document */
  static async getVersions(docId: string): Promise<TPdfVersion[]> {
    return db.versions.where('docId').equals(docId).sortBy('version');
  }

  /** Get document metadata */
  static async getDocument(docId: string): Promise<TPdfDocument | undefined> {
    return db.documents.get(docId);
  }

  static async getAnnotations(docId: string, version: number) {
    return db.getAnnotationsForVersion(docId, version);
  }

  static async getContentOps(docId: string, version: number, page?: number) {
    if (page != null) {
      return db.getContentOpsForPage(docId, version, page);
    }
    return db.contentOps.where('docId').equals(docId).toArray();
  }
}
