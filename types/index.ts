export interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    type: 'slider' | 'choice';
    minValue?: number;
    maxValue?: number;
    unit?: string;
    choices?: string[];
    category: string;
}

export interface Answer {
    questionId: string;
    value: number | string;
    timestamp: number;
}

export interface CommunityStats {
    questionId: string;
    averageValue?: number;
    distribution?: Record<string, number>;
    totalResponses: number;
  }