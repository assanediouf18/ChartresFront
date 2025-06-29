export interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    type: 'slider' | 'choice';
    min_value?: number;
    max_value?: number;
    price_unit?: string;
    choices?: string[];
    category: string;
    average_answer: number;
}

export interface Answer {
    questionId: string;
    value: number | string;
    timestamp: number;
    player: string;
}

export interface CommunityStats {
    questionId: string;
    averageValue?: number;
    distribution?: Record<string, number>;
    totalResponses: number;
  }