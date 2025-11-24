import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TPdfVersion, TNote } from '@/types';
import { PdfService } from '@/service';
import { mapNoteToAnnotationData } from '@/utils';

export type THighlighterValues = {
  noteMessage: string;

  notes: TNote[];
};

export type THighlighterActions = {
  setSingleNoteMessage: (message: string) => void;

  addNewNote: (note: TNote, version: TPdfVersion) => void;
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

      actions: {
        setSingleNoteMessage: (message: string) =>
          set({ noteMessage: message }),

        addNewNote: async (note: TNote, version: TPdfVersion) => {
          const state = get();
          set({ notes: [...state.notes, note] });

          await PdfService.saveAnnotation(
            version.docId,
            version.version,
            mapNoteToAnnotationData(note),
          );
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
    },
  ),
);
export const useHighlighterValues = () => {
  const noteMessage = useHighlighterStore((state) => state.noteMessage);
  const notes = useHighlighterStore((state) => state.notes);

  return { noteMessage, notes };
};

export const useHighlighterActions = () => {
  return useHighlighterStore((state) => state.actions);
};
