import { create } from "zustand";

export const usePositionStore = create<{
  positions: string[];
  setPositions: (positions: string[]) => void;
  addPosition: (position: string) => void;
  removePosition: (position: string) => void;
}>((set) => ({
  positions: [],
  setPositions: (positions) => set({ positions }),
  addPosition: (position) =>
    set((state) => ({ positions: [...state.positions, position] })),
  removePosition: (position) =>
    set((state) => ({
      positions: state.positions.filter((p) => p !== position),
    })),
}));
