# Next.js PDF Review & Versioning – Frontend Assignment

> A frontend-only Next.js application for uploading, editing, versioning, and exporting PDFs with annotations and version history.

---

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

---

## Project Overview

---

## Features

---

## Tech Stack

- **Framework:** ✅ Next.js 16
- **Rendering & PDF Handling:**
  - ✅ [`@react-pdf-viewer`](https://react-pdf-viewer.dev/) (Core + Plugins: default-layout, highlight, search, selection-mode, thumbnail, toolbar, zoom, properties)
  - ✅ [`pdf-lib`](https://pdf-lib.js.org/) (for editing PDFs and creating annotated/exported versions)
  - ✅ `pdfjs-dist` (underlying PDF parsing engine)
- **State Management:** ✅ `zustand`
- **Client-Side Storage:** ✅ `dexie` (IndexedDB wrapper)
- **Styling:** ✅ TailwindCSS + `clsx` + `tailwind-merge`
- **Utilities:** ✅ `uuid` for IDs, `canvas` for rendering
- **Diffing:** ❌ `diff-match-patch` (for text diffs)

---

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


---

## How to Use


--- 

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
