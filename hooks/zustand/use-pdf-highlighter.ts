import { create } from 'zustand';
import { HighlightArea } from '@react-pdf-viewer/highlight';
import { persist } from 'zustand/middleware';

type TNote = {
  id: number;
  content?: string;
  highlightAreas: HighlightArea[];
  quote: string;
  isHighlight: boolean;
};

export type THighlighterValues = {
  noteMessage: string;
  type: 'note' | 'highlight' | null;
  notes: TNote[];
};

export type THighlighterActions = {
  setSingleNoteMessage: (message: string) => void;
  setType: (type: 'note' | 'highlight' | null) => void;
  addNewNote: (note: TNote) => void;
  updateNote: (id: number, content: Partial<TNote>) => void;
  deleteNote: (id: number) => void;
  resetNotes: () => void;
};

type THighlighterStore = THighlighterValues & {
  actions: THighlighterActions;
};
const useHighlighterStore = create<THighlighterStore>()(
  persist(
    (set, get) => ({
      noteMessage: '',
      notes: [],
      type: null,
      actions: {
        setSingleNoteMessage: (message: string) =>
          set({ noteMessage: message }),
        setType: (type: 'note' | 'highlight' | null) => set({ type: type }),
        addNewNote: (note: TNote) => {
          const state = get();
          set({ notes: [...state.notes, note], type: null });
        },

        updateNote: (id: number, content: Partial<TNote>) => {
          const state = get();
          const updatedNotes = state.notes.map((note) =>
            note.id === id ? { ...note, ...content } : note,
          );
          set({ notes: updatedNotes });
        },

        deleteNote: (id: number) => {
          const state = get();
          set({ notes: state.notes.filter((note) => note.id !== id) });
        },

        resetNotes: () => set({ notes: [], noteMessage: '' }),
      },
    }),
    {
      name: 'highlighter-storage', // key in localStorage
      partialize: (state) => ({ notes: state.notes }), // only persist notes
      // optional: migrate or version logic can be added here
    },
  ),
);
export const useHighlighterValues = () => {
  const noteMessage = useHighlighterStore((state) => state.noteMessage);
  const notes = useHighlighterStore((state) => state.notes);
  const type = useHighlighterStore((state) => state.type);
  return { noteMessage, notes, type };
};

export const useHighlighterActions = () => {
  return useHighlighterStore((state) => state.actions);
};
