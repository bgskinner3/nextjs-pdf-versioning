import { create } from 'zustand';

export type TToolbarPanel =
  | 'search'
  | 'zoom'
  | 'settings'
  | 'outline'
  | 'highlight';

export type TToolbarStoreValues = {
  activePanels: Set<TToolbarPanel>;
};


export type TToolbarStoreActions = {
  setActivePanels: (panels: TToolbarPanel[]) => void;
  togglePanel: (panel: TToolbarPanel) => void;
  closePanel: (panel?: TToolbarPanel) => void;
  reset: (opts?: TResetOptions) => void;
};

type TToolbarStore = {
  actions: TToolbarStoreActions;
} & TToolbarStoreValues;

type TResetOptions = {
  retain?: Array<keyof Omit<TToolbarStore, 'actions'>>;
};

const usePdfToolbarStore = create<TToolbarStore>((set, get) => ({
  activePanels: new Set(['search']),

  actions: {
    setActivePanels: (panels) => set({ activePanels: new Set(panels) }),

    togglePanel: (panel) => {
      const state = get();
      const newSet = new Set(state.activePanels);
      if (newSet.has(panel)) {
        newSet.delete(panel);
      } else {
        newSet.add(panel);
      }
      set({ activePanels: newSet });
    },

    closePanel: (panel) => {
      const state = get();
      if (panel) {
        const newSet = new Set(state.activePanels);
        newSet.delete(panel);
        set({ activePanels: newSet });
      } else {
        set({ activePanels: new Set() });
      }
    },

    reset: ({ retain = [] }: TResetOptions = {}) => {
      const state = get();
      set({
        activePanels: retain.includes('activePanels')
          ? state.activePanels
          : new Set(),
        actions: state.actions,
      });
    },
  },
}));

export const useToolbarValues = () => {
  const activePanels = usePdfToolbarStore((state) => state.activePanels);
  return { activePanels };
};
/**
 * A selector hook that returns all toolbar actions.
 *
 * Use this to update toolbar UI state (e.g., toggle or close panels).
 *
 * @example
 * import { useToolbarActions } from '@/stores/usePdfToolbarStore';
 *
 * const SearchButton = () => {
 *   const { togglePanel } = useToolbarActions();
 *
 *   return (
 *     <button onClick={() => togglePanel('search')}>
 *       Open Search
 *     </button>
 *   );
 * };
 */
export const useToolbarActions = () =>
  usePdfToolbarStore((state) => state.actions);
