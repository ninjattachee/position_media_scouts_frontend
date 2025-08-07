import { create } from "zustand";

export const useRunningStore = create<{
  running: boolean;
  setRunning: (running: boolean) => void;
}>((set) => ({
  running: false,
  setRunning: (running) => set({ running }),
}));
