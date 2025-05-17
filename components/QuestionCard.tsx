import colors from '@/constants/colors';
import useAnswerStore from '@/store/useAnswerStore';
import { Question } from '@/types';
import { useRouter } from 'expo-router';
import { ArrowRight, Check } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface QuestionCardProps {
    question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
    const router = useRouter();
    const hasAnswered = useAnswerStore((state) => state.hasAnswered(question.id));

    const handlePress = () => {
        router.push(`/question/${question.id}`);
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed
            ]}
            onPress={handlePress}
        >
            <View style={styles.content}>
                <Text style={styles.questionText}>{question.text}</Text>
                <Text style={styles.categoryText}>{question.category}</Text>
            </View>

            <View style={styles.rightContent}>
                {hasAnswered ? (
                    <View style={styles.answeredBadge}>
                        <Check size={16} color={colors.background} />
                    </View>
                ) : (
                    <ArrowRight size={20} color={colors.primary} />
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    content: {
        flex: 1,
        marginRight: 12,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 6,
    },
    categoryText: {
        fontSize: 14,
        color: colors.textSecondary,
        textTransform: 'capitalize',
    },
    rightContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    answeredBadge: {
        backgroundColor: colors.success,
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});