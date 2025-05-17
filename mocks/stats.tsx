import { CommunityStats } from '@/types';

const mockStats: CommunityStats[] = [
    {
        questionId: '1',
        averageValue: 25.75,
        totalResponses: 428,
    },
    {
        questionId: '2',
        averageValue: 24.3,
        totalResponses: 512,
    },
    {
        questionId: '3',
        distribution: {
            'Coffee': 0.35,
            'Pizza': 0.65,
        },
        totalResponses: 389,
    },
    {
        questionId: '4',
        averageValue: 2345.50,
        totalResponses: 276,
    },
    {
        questionId: '5',
        distribution: {
            'Fly': 0.72,
            'Be invisible': 0.28,
        },
        totalResponses: 631,
    },
    {
        questionId: '6',
        averageValue: 8.2,
        totalResponses: 342,
    },
    {
        questionId: '7',
        distribution: {
            'Speak all languages': 0.68,
            'Play all instruments': 0.32,
        },
        totalResponses: 418,
    },
    {
        questionId: '8',
        averageValue: 3210.75,
        totalResponses: 289,
    },
    {
        questionId: '9',
        distribution: {
            'Free flights': 0.48,
            'Free meals': 0.52,
        },
        totalResponses: 502,
    },
    {
        questionId: '10',
        averageValue: 15420.30,
        totalResponses: 367,
    },
];

export default mockStats;