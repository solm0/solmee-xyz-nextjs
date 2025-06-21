import { create } from "zustand"

interface State {
  value: string | null;
  offsetX: number | null;
  width: number | null;
  setValue: (value: string | null, offsetX: number | null, width: number | null) => void;
}

export const useHoveredLiquidStore = create<State>((set) => ({
  value: null,
  offsetX: null,
  width: null,
  setValue: (value: string | null, offsetX: number | null, width: number | null) => set({ value: value, offsetX: offsetX, width: width}),
}));