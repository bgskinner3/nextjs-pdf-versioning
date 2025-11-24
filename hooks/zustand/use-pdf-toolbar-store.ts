import { create } from 'zustand';


export type TToolbarPanel =
  | 'search'
  | 'zoom'
  | 'settings'
  | 'outline'
  | 'thumbnails'
  | null;


export type TToolbarStoreValues = {
  activePanel: TToolbarPanel;
};
export type TToolbarStoreActions = {
  setActivePanel: (panel: TToolbarPanel) => void;
  togglePanel: (panel: NonNullable<TToolbarPanel>) => void;
  closePanel: () => void;
  reset: (opts?: TResetOptions) => void;
};

type TToolbarStore = {
  actions: TToolbarStoreActions;
} & TToolbarStoreValues;

type TResetOptions = {
  retain?: Array<keyof Omit<TToolbarStore, 'actions'>>;
};


const usePdfToolbarStore = create<TToolbarStore>((set, get) => ({
  activePanel: "search",

  actions: {
    setActivePanel: (panel) => set({ activePanel: panel }),

    togglePanel: (panel) => {
      const state = get();
      set({
        activePanel: state.activePanel === panel ? null : panel,
      });
    },

    closePanel: () => set({ activePanel: null }),

    reset: ({ retain = [] }: TResetOptions = {}) => {
      const state = get();

      set({
        activePanel: retain.includes('activePanel')
          ? state.activePanel
          : null,
        actions: state.actions,
      });
    },
  },
}));
export const useToolbarValues = () => {
  const activePanel = usePdfToolbarStore((state) => state.activePanel);
  return { activePanel };
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

