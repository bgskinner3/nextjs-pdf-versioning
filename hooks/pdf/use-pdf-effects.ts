import { useEffect } from 'react';
import { usePdfActions, usePdfValues } from '@/hooks';
import { PdfService } from '@/service';
/**
 * usePdfEffects
 * ------------------------
 * Custom hook to manage PDF-related side effects for the application.
 *
 * Responsibilities:
 * 1. Fetch the PDF file from the server when a `docId` exists but no file is currently loaded.
 * 2. Fetch available versions of the PDF and set the latest version if none is selected.
 * 3. Fetch annotations and content operations for the current version of the PDF.
 * 4. Clean up object URLs when the component using this hook unmounts or the file changes.
 *
 * Usage:
 * Import this hook into a component and call it once. It encapsulates all the side-effect logic
 * so the component remains focused on rendering UI.
 *
 * Example:
 *   const values = usePdfValues();
 *   const actions = usePdfActions();
 *   usePdfEffects();
 */
export const usePdfEffects = () => {
  const values = usePdfValues();
  const actions = usePdfActions();
  const { docId, currentFile, currentVersion, fileUrl } = values;

  // Cleanup file URL
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  // Fetch file, versions, annotations, contentOps
  useEffect(() => {
    const fetchData = async () => {
      if (!docId) return;

      // Fetch file
      if (!currentFile) {
        const blob = await PdfService.getDocumentFile(docId);
        if (blob) {
          const file = new File([blob], `doc-${docId}.pdf`, {
            type: 'application/pdf',
            lastModified: Date.now(),
          });
          actions.setCurrentFile(file);
          actions.setFileUrl(URL.createObjectURL(file));
        }
      }

      // Determine current version
      let version = currentVersion;
      if (!version) {
        const versions = await PdfService.getVersions(docId);
        if (versions.length) {
          version = versions[versions.length - 1];
          actions.setCurrentVersion(version);
        }
      }

      // Fetch annotations & contentOps
      if (version) {
        const anns = await PdfService.getAnnotations(docId, version.version);
        actions.setAnnotations(anns.map((a) => a.data));

        const ops = await PdfService.getContentOps(docId, version.version);
        actions.setContentOps(ops);
      }
    };

    fetchData();
  }, [docId, currentFile, currentVersion, actions]);
};
