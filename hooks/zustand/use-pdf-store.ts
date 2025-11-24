import { create } from 'zustand';
import { TPdfVersion, TPdfAnnotationData, TContentOperation } from '@/types';
import { persist } from 'zustand/middleware';
import { LOCAL_STORAGE_KEYS } from '@/constants';
export type TPDFStoreActions = {
  setCurrentFile: (file: File | null) => void;
  setDocId: (id: string) => void;
  setCurrentVersion: (version: TPdfVersion) => void;
  setFileUrl: (url: string) => void;
  setMode: (mode: 'uploader' | 'edit') => void;
  setAnnotations: (annotations: TPdfAnnotationData[]) => void;
  addAnnotation: (annotation: TPdfAnnotationData) => void;
  reset: ({ retain }: TResetOptions) => void;
  setError: (error: string | null) => void;
  setContentOps: (contentOps: TContentOperation[]) => void;
};
export type TPDFStoreValues = {
  currentFile: File | null;
  docId: string | null;
  currentVersion: TPdfVersion | null;
  fileUrl: string | null;
  mode: 'uploader' | 'edit';
  annotations: TPdfAnnotationData[];
  contentOps: TContentOperation[];
  errorMessage: string | null;
};
type TPDFStore = {
  actions: TPDFStoreActions;
} & TPDFStoreValues;
type TResetOptions = {
  retain?: Array<keyof Omit<TPDFStore, 'actions'>>;
};

/**
 * Zustand pdf store
 *
 * This store centralizes the state for PDF file uploads, document tracking,
 * version management, annotations, and viewer mode. Using this store:
 *
 * - Avoids prop drilling across components.
 * - Provides a single source of truth for the current PDF, its versions,
 *   annotations, and UI mode.
 * - Offers convenient actions to update, reset, or modify state slices.
 *
 */
export const usePdfStore = create(
  persist<TPDFStore>(
    (set, get) => ({
      currentFile: null,
      docId: null,
      currentVersion: null,
      fileUrl: null,
      mode: 'uploader',
      annotations: [],
      contentOps: [],
      errorMessage: null,
      actions: {
        setCurrentFile: (file) => set({ currentFile: file }),
        setDocId: (id) => set({ docId: id }),
        setCurrentVersion: (version) => set({ currentVersion: version }),
        setContentOps: (contentOps) => set({ contentOps }),
        setFileUrl: (url) => set({ fileUrl: url }),
        setMode: (mode) => set({ mode }),
        setAnnotations: (annotations) => set({ annotations }),
        addAnnotation: (annotation) =>
          set((state) => ({
            annotations: [...state.annotations, annotation],
          })),
        setError: (errorMessage) => set({ errorMessage }),
        reset: ({ retain = [] }: TResetOptions = {}) => {
          const state = get();
          set({
            currentFile: retain.includes('currentFile')
              ? state.currentFile
              : null,
            docId: retain.includes('docId') ? state.docId : null,
            currentVersion: retain.includes('currentVersion')
              ? state.currentVersion
              : null,
            fileUrl: retain.includes('fileUrl') ? state.fileUrl : null,
            mode: retain.includes('mode') ? state.mode : 'uploader',
            annotations: retain.includes('annotations')
              ? state.annotations
              : [],
            errorMessage: retain.includes('errorMessage')
              ? state.errorMessage
              : null,
            actions: state.actions,
          });
        },
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.pdfStore,
      // partialize: (state) => {
      //   const { actions: _, ...persisted } = state;
      //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //   return persisted as any;
      // },
      partialize: (state) =>
        ({
          docId: state.docId,
          currentVersion: state.currentVersion,
          mode: state.mode,
          annotations: state.annotations,
          errorMessage: state.errorMessage,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
    },
  ),
);

export const usePdfValues = () => {
  const mode = usePdfStore((state) => state.mode);
  const annotations = usePdfStore((state) => state.annotations);
  const docId = usePdfStore((state) => state.docId);
  const currentVersion = usePdfStore((state) => state.currentVersion);
  const currentFile = usePdfStore((state) => state.currentFile);
  const fileUrl = usePdfStore((state) => state.fileUrl);
  const errorMessage = usePdfStore((state) => state.errorMessage);
  const contentOps = usePdfStore((state) => state.contentOps);
  return {
    currentFile,
    fileUrl,
    docId,
    currentVersion,
    mode,
    annotations,
    errorMessage,
    contentOps,
  };
};

export const usePdfActions = () => usePdfStore((state) => state.actions);
