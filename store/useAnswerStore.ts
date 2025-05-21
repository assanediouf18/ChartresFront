import { Answer, CommunityStats } from '@/types';
import { create } from 'zustand';

interface AnswerStore {
    answers: Answer[];
    addAnswer: (answer: Answer) => void;
    getAnswer: (questionId: string, player: string) => Answer | undefined;
    hasAnswered: (questionId: string, player: string) => boolean;
    getCommunityStats: (questionId: string) => CommunityStats;
}

const useAnswerStore = create<AnswerStore>((set, get) => ({
    answers: [],
    addAnswer: (answer) => set((state) => ({
        answers: [...state.answers, answer]
    })),
    getAnswer: (questionId, player) => {
        const state = get();
        return state.answers.find(
            (answer) => answer.questionId === questionId && answer.player === player
        );
    },
    hasAnswered: (questionId, player) => {
        const state = get();
        return state.answers.some(
            (answer) => answer.questionId === questionId && answer.player === player
        );
    },
    getCommunityStats: (questionId) => {
        const state = get();
        const questionAnswers = state.answers.filter(
            (answer) => answer.questionId === questionId
        );

        if (questionAnswers.length === 0) {
            return {
                questionId,
                totalResponses: 0
            };
        }

        // If the first answer is a number, treat as slider question
        if (typeof questionAnswers[0].value === 'number') {
            const values = questionAnswers.map(a => a.value as number);
            const sum = values.reduce((a, b) => a + b, 0);
            return {
                questionId,
                averageValue: sum / values.length,
                totalResponses: values.length
            };
        }

        // Otherwise treat as choice question
        const distribution: Record<string, number> = {};
        questionAnswers.forEach(answer => {
            const choice = answer.value as string;
            distribution[choice] = (distribution[choice] || 0) + 1;
        });

        // Convert counts to percentages
        Object.keys(distribution).forEach(key => {
            distribution[key] = distribution[key] / questionAnswers.length;
        });

        return {
            questionId,
            distribution,
            totalResponses: questionAnswers.length
        };
    }
}));

export default useAnswerStore;