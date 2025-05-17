import mockStats from '@/mocks/stats';
import { Answer, CommunityStats } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AnswerState {
    answers: Answer[];
    communityStats: CommunityStats[];
    addAnswer: (answer: Answer) => void;
    getAnswer: (questionId: string) => Answer | undefined;
    getCommunityStats: (questionId: string) => CommunityStats | undefined;
    hasAnswered: (questionId: string) => boolean;
}

const useAnswerStore = create<AnswerState>()(
    persist(
        (set, get) => ({
            answers: [],
            communityStats: mockStats,

            addAnswer: (answer: Answer) => {
                set((state) => {
                    // Remove any existing answer for this question
                    const filteredAnswers = state.answers.filter(
                        (a) => a.questionId !== answer.questionId
                    );

                    return {
                        answers: [...filteredAnswers, answer],
                    };
                });
            },

            getAnswer: (questionId: string) => {
                return get().answers.find((answer) => answer.questionId === questionId);
            },

            getCommunityStats: (questionId: string) => {
                return get().communityStats.find((stats) => stats.questionId === questionId);
            },

            hasAnswered: (questionId: string) => {
                return get().answers.some((answer) => answer.questionId === questionId);
            },
        }),
        {
            name: 'answer-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAnswerStore;