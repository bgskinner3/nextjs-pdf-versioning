// ./types/pdf-types

import type { TPdfAnnotationData } from './annotation-types';
import type { TContentOperation } from './editing-types';
import type { Rect } from './common-types';

type TPdfDocument = {
  id?: string;
  name: string;
  currentVersion: number;
  createdAt: Date;
};
type TPdfAnnotation = {
  id?: number;
  docId: string;
  version: number;
  data: TPdfAnnotationData;
  timestamp: Date;
};

type TPdfVersion = {
  id?: number;
  docId: string;
  version: number;
  fileBlob: Blob;
  message: string;
  timestamp: Date;
  annotations: TPdfAnnotationData[];
  contentOps: TContentOperation[];
};

export type { TPdfDocument, TPdfAnnotation, TPdfVersion };

// Annotated PDF EXPORTS

type TCallout = {
  version: number;
  operationId?: string;
  description: string;
  coords: Rect;
};

type TPageCallout = {
  page: number;
  callouts: TCallout[];
};

type TAnnotatedPdfExportRequest = {
  docId: string;
  versionRange: {
    from: number;
    to: number;
  };
};

export type { TAnnotatedPdfExportRequest, TPageCallout, TCallout };
