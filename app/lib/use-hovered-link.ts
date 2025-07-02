import { create } from "zustand"

interface State {
  title: string | null;
  id: string | null;
  setId: (title: string | null, id: string | null) => void;
}

export const useHoveredLink = create<State>((set) => ({
  title: null,
  id: null,
  setId: (title: string | null, id: string | null,) => set({ title: title, id: id,}),
}));