import { create } from "zustand";

export enum Mode {
    SOLO = "Solo",
    MULTIPLAYER = "Multiplayer",
}

export interface GlobalAppData {
    mode?: Mode,
    setMode: (newMode: Mode) => void
}

const useGlobalStore = create<GlobalAppData>((set) => ({
    mode: undefined,
    setMode: (newMode: Mode) => set((state) => ({ mode: newMode })),
    resetMdoe: () => set(state => ({mode: undefined}))
}));

export default useGlobalStore;