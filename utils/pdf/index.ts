import type { HighlightArea } from '@react-pdf-viewer/highlight';
import { TPdfAnnotationData, Rect, TNote } from '@/types';

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
  return note.isHighlight
    ? {
        type: 'highlight',
        page: firstArea.pageIndex + 1,
        rect: highlightAreaToRect(firstArea),
        opacity: 0.4,
        color: 'yellow',
      }
    : {
        type: 'sticky-note',
        page: firstArea.pageIndex + 1,
        position: highlightAreaToRect(firstArea),
        content: note.content || '',
      };
}

export { mapNoteToAnnotationData, highlightAreaToRect };
