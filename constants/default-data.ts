import type { SelectionData } from '@react-pdf-viewer/highlight';
const DEFAULT_SELECTION_DATA: SelectionData = {
  divTexts: [],
  selectedText: '',
  startPageIndex: 0,
  endPageIndex: 0,
  startOffset: 0,
  startDivIndex: 0,
  endOffset: 0,
  endDivIndex: 0,
};

export { DEFAULT_SELECTION_DATA };
