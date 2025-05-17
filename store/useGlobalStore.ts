import { create } from "zustand";

export enum Mode {
    SOLO = "Solo",
    MULTIPLAYER = "Multiplayer",
}

export interface GlobalAppData {
    mode?: Mode,
    numberOfPlayers: number,
    players: string[],
    setMode: (newMode: Mode) => void
    resetMode: () => void
    addPlayer: (player: string) => void
    setNumberOfPlayers: (nbOfPlayers: number) => boolean
}

const useGlobalStore = create<GlobalAppData>((set) => ({
    mode: undefined,
    players: [],
    numberOfPlayers: 1,
    setMode: (newMode: Mode) => set(_state => ({ mode: newMode})),
    resetMode: () => set(_state => ({ mode: undefined})),
    addPlayer: (player: string) => set(state => ({players: [...state.players, player]})),
    setNumberOfPlayers: (nbOfPlayers) => {
        if(nbOfPlayers > 0) {
            set(_state => ({ numberOfPlayers: nbOfPlayers }));
            return true;
        }
        return false;
    }
}));

export default useGlobalStore;