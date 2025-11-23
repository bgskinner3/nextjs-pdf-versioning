'use client';

// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

// type ViewerProps = {
//   file: File; // Accepts the File object directly
// };

// export const SimplePdfViewer = ({ file }: ViewerProps) => {
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//     setPageNumber(1);
//     // V1 initialization handled in the parent component
//   };

//   return (
//     <div
//       className="pdf-viewer-container"
//       style={{ display: 'flex', height: '100vh' }}
//     >
//       {/* Sidebar for Thumbnails/Page Selector would go here */}

//       <div className="main-viewer" style={{ flexGrow: 1, overflow: 'auto' }}>
//         <Document
//           file={file} // Pass the File object here
//           onLoadSuccess={onDocumentLoadSuccess}
//           onLoadError={console.error}
//         >
//           <Page
//             pageNumber={pageNumber}
//             renderTextLayer={true}
//             renderAnnotationLayer={true}
//           />
//         </Document>

//         {/* Navigation Controls */}
//         <div className="navigation-controls">
//           <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))}>
//             Prev
//           </button>
//           <span>
//             Page {pageNumber} of {numPages}
//           </span>
//           <button
//             onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
