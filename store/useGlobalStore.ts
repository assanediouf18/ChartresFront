import { Question } from "@/types";
import { create } from "zustand";

export enum Mode {
    SOLO = "Solo",
    MULTIPLAYER = "Multiplayer",
}

export interface GlobalAppData {
    mode?: Mode,
    numberOfPlayers: number,
    players: string[],
    question?: Question,
    setMode: (newMode: Mode) => void
    resetMode: () => void
    addPlayer: (player: string, index: number) => void
    setNumberOfPlayers: (nbOfPlayers: number) => boolean
    setNextQuestion: (question: Question) => void
}

const useGlobalStore = create<GlobalAppData>((set) => ({
    mode: undefined,
    players: [],
    numberOfPlayers: 1,
    setMode: (newMode: Mode) => set(_state => ({ mode: newMode })),
    resetMode: () => set(_state => ({ mode: undefined })),
    addPlayer: (player: string, index: number) => {
        set(state => ({
            players: index < state.players.length
                ? state.players.map((p, i) => i === index ? player : p)
                : [...state.players, player]
        }))
    },
    setNumberOfPlayers: (nbOfPlayers) => {
        if (nbOfPlayers > 0) {
            set(_state => ({ numberOfPlayers: nbOfPlayers }));
            return true;
        }
        return false;
    },
    setNextQuestion: (newQuestion) => set((state) => ({ question: newQuestion }))
}));

export default useGlobalStore;