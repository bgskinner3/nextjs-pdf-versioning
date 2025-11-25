import { create } from 'zustand';

export type FreeTextBox = {
  id: string;
  docId: string;
  version: number;
  page: number;
  text: string;
  x: number; // normalized 0–1
  y: number; // normalized 0–1
  width: number;
  height: number;
  fontSize: number;
};

type State = {
  freeTexts: FreeTextBox[];
  addBox: (box: FreeTextBox) => void;
  updateBox: (id: string, updates: Partial<FreeTextBox>) => void;
  loadBoxes: (docId: string, version: number) => Promise<void>;
};

export const useFreeTextStore = create<State>((set, get) => ({
  freeTexts: [],

  addBox: (box) =>
    set((state) => ({
      freeTexts: [...state.freeTexts, box],
    })),

  updateBox: (id, updates) =>
    set((state) => ({
      freeTexts: state.freeTexts.map((b) =>
        b.id === id ? { ...b, ...updates } : b,
      ),
    })),

  loadBoxes: async (docId, version) => {
    const rows = await db.annotations
      .where('[docId+version]')
      .equals([docId, version])
      .toArray();

    set({
      freeTexts: rows
        .filter((r) => r.type === 'free-text')
        .map((r) => r.data as FreeTextBox),
    });
  },
}));
