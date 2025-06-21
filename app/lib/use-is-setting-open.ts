import { create } from 'zustand'

interface isSettingOpen {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const useIsSettingOpen = create<isSettingOpen>((set) => ({
  value: false,
  setValue: (value: boolean) => set({value: value}),
}))