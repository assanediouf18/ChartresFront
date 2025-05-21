import colors from '@/constants/Colors';
import { Answer, CommunityStats, Question } from '@/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ResultsViewProps {
    question: Question;
    userAnswer: Answer;
    stats: CommunityStats;
}

export default function ResultsView({ question, userAnswer, stats }: ResultsViewProps) {
    if (question.type === 'slider') {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Results</Text>

                <View style={styles.resultCard}>
                    <Text style={styles.labelText}>Your answer</Text>
                    <Text style={styles.valueText}>
                        {userAnswer.value} {question.price_unit}
                    </Text>
                </View>

                <View style={styles.resultCard}>
                    <Text style={styles.labelText}>Community average</Text>
                    <Text style={styles.valueText}>
                        {stats.averageValue?.toFixed(1)} {question.price_unit}
                    </Text>
                </View>

                {userAnswer.value !== undefined && stats.averageValue !== undefined && (
                    <View style={styles.comparisonCard}>
                        <Text style={styles.comparisonText}>
                            {Number(userAnswer.value) > stats.averageValue
                                ? `You answered ${((Number(userAnswer.value) / stats.averageValue) * 100 - 100).toFixed(0)}% higher than average`
                                : Number(userAnswer.value) < stats.averageValue
                                    ? `You answered ${((stats.averageValue / Number(userAnswer.value)) * 100 - 100).toFixed(0)}% lower than average`
                                    : "Your answer matches the community average exactly!"}
                        </Text>
                    </View>
                )}

                <Text style={styles.totalText}>
                    Based on {stats.totalResponses} responses
                </Text>
            </View>
        );
    }

    // For choice questions
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Results</Text>

            <View style={styles.resultCard}>
                <Text style={styles.labelText}>Your choice</Text>
                <Text style={styles.valueText}>{userAnswer.value}</Text>
            </View>

            {question.choices?.map((choice, index) => (
                <View key={index} style={styles.distributionBar}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.choiceLabel}>{choice}</Text>
                        <Text style={styles.percentText}>
                            {((stats.distribution?.[choice] || 0) * 100).toFixed(0)}%
                        </Text>
                    </View>

                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                {
                                    width: `${(stats.distribution?.[choice] || 0) * 100}%`,
                                    backgroundColor: userAnswer.value === choice ? colors.primary : colors.secondary,
                                }
                            ]}
                        />
                    </View>
                </View>
            ))}

            <Text style={styles.totalText}>
                Based on {stats.totalResponses} responses
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    resultCard: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
    },
    labelText: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    valueText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    comparisonCard: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    comparisonText: {
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
    },
    totalText: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 12,
    },
    distributionBar: {
        marginBottom: 16,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    choiceLabel: {
        fontSize: 16,
        color: colors.text,
    },
    percentText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
    barContainer: {
        height: 12,
        backgroundColor: colors.inactive,
        borderRadius: 6,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: 6,
    },
});