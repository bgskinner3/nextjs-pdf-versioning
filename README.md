# Next.js PDF Review & Versioning – Frontend Assignment

**A frontend-only Next.js application for uploading, editing, versioning, and exporting PDFs with annotations and version history.**  
Built with Next.js, it allows users to manage PDFs entirely in the browser, track version history, and generate annotated exports.

![PDF Uploader Preview](./public/readme-image/landing.png)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup & Installation](#setup--installation)
5. [How to Use](#how-to-use)
6. [Implementation Details](#implementation-details)
   - [PDF Upload & Initialization](#pdf-upload--initialization)
   - [Viewing & Navigation](#viewing--navigation)
   - [Editing Content & Annotations](#editing-content--annotations)
   - [Versioning & Diffing](#versioning--diffing)
   - [Exporting Annotated PDFs](#exporting-annotated-pdfs)
7. [Challenges & Trade-offs](#challenges--trade-offs)
8. [References / Libraries Used](#references--libraries-used)

## Project Overview

This project is a frontend PDF management tool built with Next.js. It allows users to upload PDFs, view pages with thumbnails, add annotations like highlights or sticky notes, and track version history. Users can commit new versions with messages and compare changes between versions.
The app is fully browser-based, storing files and metadata in IndexedDB, and uses @react-pdf-viewer and pdf-lib for PDF rendering and manipulation.

## Features

- ✅ **Upload & Initialize PDFs**
  - Drag & drop or select a PDF file to upload.
  - Automatic creation of Version 1 (V1) with file validation and friendly error states.
  - Persists file and V1 metadata in IndexedDB via Dexie.js.

- ✅ **View & Navigate PDFs**
  - Page thumbnails, zoom, pan, and jump-to-page functionality.
  - Text selection and search within the document.

- ✅ **Edit Content & Add Annotations**
  - Highlights, sticky notes, free text boxes, and rectangle redactions.
  - Edits are tracked as content operations; annotations remain non-destructive until committed.

- ✅ **Versioning & History**
  - Commit new versions (V2, V3…) with version messages.
  - Track changes and view version history.

### Future Implementations / Stretch Goals

- **Editing Content:** Edit existing text while preserving font and layout.
- **Version History & Diffing:** Compare two versions with inline text and annotation diffs.
- **Export Annotated PDF:** Generate PDF with change log and inline callouts for all edits.
- **Optional / Stretch Goals:**
  - Real-time collaboration (CRDTs / Y.js)
  - Portable version bundles (export/import JSON)
  - PDF-to-PPT export

## Tech Stack

| Category            | Technology           | Purpose                                                                      |
| ------------------- | -------------------- | ---------------------------------------------------------------------------- |
| Framework           | ✅ Next.js 14+       | Core application framework.                                                  |
| PDF Handling        | ✅ @react-pdf-viewer | PDF rendering and UI/UX (viewer, toolbar, thumbnails).                       |
| PDF Manipulation    | ✅ pdf-lib           | Generating, modifying, and exporting PDFs programmatically.                  |
| State Management    | ✅ zustand           | Managing global application state and version history.                       |
| Client-Side Storage | ✅ dexie             | A wrapper for IndexedDB to persist large PDF files and metadata efficiently. |
| Styling             | ✅ TailwindCSS       | Rapid UI development and styling.                                            |
| Diffing             | ❌ diff-match-patch  | (Planned for text diff calculation).                                         |

## Setup & Installation

```bash
# Clone the repo
git clone https://github.com/bgskinner3/nextjs-pdf-versioning.git
cd nextjs-pdf-versioning

# Install dependencies
npm install

# Run locally
npm run dev

```

## How to Use

- 📤 **Upload:** Drag and drop a PDF file onto the designated area or use the file picker button. Version 1 (V1) is created automatically upon upload.
- 📖 **Navigate:** Use the thumbnail sidebar or toolbar buttons to move between pages, zoom in/out, and jump to specific pages.
- ✏️ **Annotate:** Select annotation tools (highlight, sticky note, free text, redaction) from the toolbar and interact with the main document viewer.
- 💾 **Commit Version:** Click "Commit Version" in the sidebar, add a descriptive message, and snapshot your changes as a new version (V2, V3…).
- 📊 **View History & Diff:** Select two versions from the history list to view a summary of text and annotation differences.

## Implementation Detail

---

## Challenges & Trade-offs

---

## References / Libraries Used

1. **ts-kit**
   - [GitHub Repository](https://github.com/bgskinner3/ts-kit)
   - Personal TypeScript utility library (in-progress).
   - **Usage in this project:** Only a small subset of helper functions were adapted, mainly for:
     - PDF text extraction and manipulation
     - State management helpers for version tracking
   - All other project logic, PDF rendering, and UI were implemented independently.

2. **UI Implementations**
   - [Storybook Demo](http://storybook.masterofsum.dev/)
   - Personal Storybook of reusable and tested UI components.
   - **Usage in this project:** Only a small subset of helper functions were adapted, mainly for:
