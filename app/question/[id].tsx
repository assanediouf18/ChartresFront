import ChoiceQuestion from '@/components/ChoiceQuestion';
import ResultsView from '@/components/ResultsView';
import SliderQuestion from '@/components/SliderQuestion';
import colors from '@/constants/colors';
import questions from '@/mocks/questions';
import useAnswerStore from '@/store/useAnswerStore';
import { Question } from '@/types';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QuestionScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [question, setQuestion] = useState<Question | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [sliderValue, setSliderValue] = useState<number | null>(null);
    const [choiceValue, setChoiceValue] = useState<string | null>(null);

    const {
        addAnswer,
        getAnswer,
        getCommunityStats,
        hasAnswered
    } = useAnswerStore();

    useEffect(() => {
        if (id) {
            const foundQuestion = questions.find((q) => q.id === id);
            if (foundQuestion) {
                setQuestion(foundQuestion);

                // Check if user has already answered
                if (hasAnswered(id)) {
                    // setShowResults(true);

                    const savedAnswer = getAnswer(id);
                    if (savedAnswer) {
                        if (foundQuestion.type === 'slider') {
                            setSliderValue(savedAnswer.value as number);
                        } else {
                            setChoiceValue(savedAnswer.value as string);
                        }
                    }
                }
            }
        }
    }, [id]);

    const handleSliderAnswer = (value: number) => {
        setSliderValue(value);
    };

    const handleChoiceAnswer = (value: string) => {
        setChoiceValue(value);
    };

    const handleSubmit = () => {
        if (!question) return;

        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        const value = question.type === 'slider' ? sliderValue : choiceValue;

        if (value !== null) {
            addAnswer({
                questionId: question.id,
                value,
                timestamp: Date.now(),
            });

            setShowResults(true);
        }
    };

    const handleShare = () => {
        // This would be implemented with the Share API in a real app
        if (Platform.OS !== 'web') {
            Haptics.selectionAsync();
        }
    };

    if (!question) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Question not found</Text>
            </SafeAreaView>
        );
    }

    const userAnswer = getAnswer(question.id);
    const stats = getCommunityStats(question.id);

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            style={({ pressed }) => [
                                styles.headerButton,
                                pressed && styles.pressed
                            ]}
                        >
                            <ArrowLeft size={24} color={colors.text} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={handleShare}
                            style={({ pressed }) => [
                                styles.headerButton,
                                pressed && styles.pressed
                            ]}
                        >
                            <Share2 size={24} color={colors.text} />
                        </Pressable>
                    ),
                }}
            />

            <SafeAreaView style={styles.container} edges={['bottom']}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>{question.text}</Text>
                        <Text style={styles.categoryText}>{question.category}</Text>
                    </View>

                    {!showResults ? (
                        <>
                            {question.type === 'slider' ? (
                                <SliderQuestion
                                    question={question}
                                    onAnswer={handleSliderAnswer}
                                />
                            ) : (
                                <ChoiceQuestion
                                    question={question}
                                    onAnswer={handleChoiceAnswer}
                                />
                            )}

                            <Pressable
                                style={({ pressed }) => [
                                    styles.submitButton,
                                    pressed && styles.pressed,
                                    (!sliderValue && !choiceValue) && styles.disabledButton,
                                ]}
                                onPress={handleSubmit}
                                disabled={!sliderValue && !choiceValue}
                            >
                                <Text style={styles.submitButtonText}>Submit Answer</Text>
                            </Pressable>
                        </>
                    ) : (
                        userAnswer && stats && (
                            <ResultsView
                                question={question}
                                userAnswer={userAnswer}
                                stats={stats}
                            />
                        )
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 20,
    },
    questionContainer: {
        marginBottom: 24,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 16,
        color: colors.textSecondary,
        textTransform: 'capitalize',
    },
    submitButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    disabledButton: {
        backgroundColor: colors.inactive,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    submitButtonText: {
        color: colors.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerButton: {
        padding: 8,
    },
});