import ChoiceQuestion from '@/components/ChoiceQuestion';
import ResultsView from '@/components/ResultsView';
import SliderQuestion from '@/components/SliderQuestion';
import colors from '@/constants/Colors';
import { useGetNextQuestion } from '@/hooks/queries';
import useAnswerStore from '@/store/useAnswerStore';
import useGlobalStore, { Mode } from '@/store/useGlobalStore';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QuestionScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const question = useGlobalStore(state => state.question);
    const [showResults, setShowResults] = useState(false);
    const [sliderValue, setSliderValue] = useState<number | null>(null);
    const [choiceValue, setChoiceValue] = useState<string | null>(null);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const {
        addAnswer,
        getAnswer,
        getCommunityStats,
        hasAnswered
    } = useAnswerStore();

    const players = useGlobalStore(state => state.players);
    const mode = useGlobalStore(state => state.mode);
    const isSoloMode = mode === Mode.SOLO;
    const currentPlayer = isSoloMode ? 'You' : players[currentPlayerIndex];

    const setQuestion = useGlobalStore(state => state.setNextQuestion);
    const { question: nextQuestion } = useGetNextQuestion();
    useEffect(() => {
        setQuestion(nextQuestion);
    }, [nextQuestion])

    useEffect(() => {
        // setQuestion(nextQuestion);
        // Check if current player has already answered
        console.log(question);
        if (hasAnswered(id, currentPlayer)) {
            setShowResults(true);

            const savedAnswer = getAnswer(id, currentPlayer);
            if (savedAnswer) {
                if (question.type === 'slider') {
                    setSliderValue(savedAnswer.value as number);
                } else {
                    setChoiceValue(savedAnswer.value as string);
                }
            }
        }
    }, [])

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
                player: currentPlayer
            });

            setShowResults(true);
        }
    };

    const handleNextPlayer = () => {
        if (isSoloMode) {
            // In solo mode, just reset the question state
            setShowResults(false);
            setSliderValue(null);
            setChoiceValue(null);
            router.push(`/question/${nextQuestion.id}`);
        } else if (currentPlayerIndex < players.length - 1) {
            // Move to next player
            setCurrentPlayerIndex(prev => prev + 1);
            setShowResults(false);
            setSliderValue(null);
            setChoiceValue(null);
        } else {
            // All players have answered, navigate to results page
            router.push(`/results?id=${nextQuestion.id}`);
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

    const userAnswer = getAnswer(question.id, currentPlayer);
    const stats = getCommunityStats(question.id);

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <Pressable
                            style={styles.headerButton}
                            onPress={() => router.back()}
                        >
                            <ArrowLeft size={24} color={colors.text} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable
                            style={styles.headerButton}
                            onPress={handleShare}
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
                        {!isSoloMode && <Text style={styles.playerText}>{currentPlayer}'s turn</Text>}
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
                        <>
                            {userAnswer && stats && (
                                <ResultsView
                                    question={question}
                                    userAnswer={userAnswer}
                                    stats={stats}
                                />
                            )}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.submitButton,
                                    pressed && styles.pressed,
                                ]}
                                onPress={handleNextPlayer}
                            >
                                <Text style={styles.submitButtonText}>
                                    {isSoloMode ? 'Next' : 
                                     currentPlayerIndex < players.length - 1 ? 'Next Player' : 'Finish'}
                                </Text>
                            </Pressable>
                        </>
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
    playerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 12,
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