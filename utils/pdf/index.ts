import type { HighlightArea, SelectionData } from '@react-pdf-viewer/highlight';
import { TPdfAnnotationData, Rect, TNote } from '@/types';
import { DEFAULT_SELECTION_DATA } from '@/constants';
function highlightAreaToRect(area: HighlightArea): Rect {
  return {
    x: area.left,
    y: area.top,
    width: area.width,
    height: area.height,
  };
}

function mapNoteToAnnotationData(note: TNote): TPdfAnnotationData {
  const firstArea = note.highlightAreas[0];
  if (note.type === 'highlight') {
    return {
      type: 'highlight',
      page: firstArea.pageIndex + 1,
      rect: highlightAreaToRect(firstArea),
      opacity: 0.4,
      color: 'yellow',
    };
  }
  if (note.type === 'note') {
    return {
      type: 'sticky-note',
      page: firstArea.pageIndex + 1,
      position: highlightAreaToRect(firstArea),
      content: note.content || '',
    };
  }
  if (note.type === 'redactor') {
    return {
      type: 'redaction',
      page: firstArea.pageIndex + 1,
      rect: highlightAreaToRect(firstArea),
      fillColor: 'black',
    };
  }
  return {
    type: 'free-text',
    page: firstArea.pageIndex + 1,
    position: highlightAreaToRect(firstArea),
    content: '',
    fontSize: 12,
    color: 'black',
  };
}

const normalizeSelectionData = (
  selectionData: SelectionData,
): SelectionData => {
  if (
    !selectionData ||
    !selectionData.divTexts ||
    selectionData.divTexts.length === 0
  ) {
    return {
      ...DEFAULT_SELECTION_DATA,
      ...selectionData,
    };
  }

  const sortedDivs = [...selectionData.divTexts].sort(
    (a, b) => a.divIndex - b.divIndex,
  );
  const uniqueDivs = sortedDivs.filter(
    (div, i, arr) => i === 0 || div.divIndex !== arr[i - 1].divIndex,
  );

  let startDivIndex = Math.min(
    Math.max(selectionData.startDivIndex, 0),
    uniqueDivs.length - 1,
  );
  let endDivIndex = Math.min(
    Math.max(selectionData.endDivIndex, 0),
    uniqueDivs.length - 1,
  );
  /* prettier-ignore  */ if (startDivIndex > endDivIndex) [startDivIndex, endDivIndex] = [endDivIndex, startDivIndex];

  const clampOffset = (divIndex: number, offset: number) => {
    const div = uniqueDivs[divIndex];
    if (!div) return 0;
    /* prettier-ignore  */ const divNode: HTMLElement | null = document.querySelector( `[data-div-index="${div.divIndex}"]`);
    if (!divNode || divNode.childNodes.length === 0) return 0;
    divNode.normalize();
    return Math.min(Math.max(offset, 0), divNode.childNodes.length - 1);
  };

  return {
    ...selectionData,
    divTexts: uniqueDivs,
    startDivIndex,
    endDivIndex,
    startOffset: clampOffset(startDivIndex, selectionData.startOffset),
    endOffset: clampOffset(endDivIndex, selectionData.endOffset),
  };
};

export { mapNoteToAnnotationData, highlightAreaToRect, normalizeSelectionData };
