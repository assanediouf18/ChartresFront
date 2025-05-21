import colors from '@/constants/Colors';
import useAnswerStore from '@/store/useAnswerStore';
import useGlobalStore from '@/store/useGlobalStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const question = useGlobalStore(state => state.question);
    const [randomizedAnswers, setRandomizedAnswers] = useState<Array<{ value: number | string, isOutlier: boolean }>>([]);

    const players = useGlobalStore(state => state.players);
    const { getAnswer } = useAnswerStore();

    // const setQuestion = useGlobalStore(state => state.setNextQuestion);
    // const { question: nextQuestion } = useGetNextQuestion();
    // useEffect(() => {
    //     if(nextQuestion) {
    //         console.log(nextQuestion);
    //         setQuestion(nextQuestion);
    //     }
    // }, [nextQuestion])

    useEffect(() => {
        if (question) {
            const allAnswers = players
                .map(player => ({
                    player,
                    answer: getAnswer(question.id, player)
                }))
                .filter(item => item.answer !== undefined);

            // Find the outlier (minimum value for now)
            const outlier = allAnswers.reduce((min, current) => {
                const currentValue = Number(current.answer?.value);
                const minValue = Number(min.answer?.value);
                return currentValue < minValue ? current : min;
            });

            // Create array of answers with outlier flag
            const answers = allAnswers.map(({ answer, player }) => ({
                value: answer?.value,
                isOutlier: player === outlier.player
            }));

            // Randomize the order
            const shuffled = [...answers].sort(() => Math.random() - 0.5);
            setRandomizedAnswers(shuffled);
        }
    }, [question, players]);

    const handleNewQuestion = () => {
        // TODO: Implement navigation to next question
        // router.push(`/question/${nextQuestion.id}`);
        router.back();
    };

    if (!question) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Question not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.text}</Text>
                    <Text style={styles.categoryText}>{question.category}</Text>
                </View>

                <View style={styles.answersContainer}>
                    <Text style={styles.sectionTitle}>All Answers</Text>
                    {randomizedAnswers.map((answer, index) => (
                        <View
                            key={index}
                            style={[
                                styles.answerCard,
                                answer.isOutlier && styles.outlierCard
                            ]}
                        >
                            <Text style={styles.answerValue}>
                                {answer.value} {question.price_unit}
                            </Text>
                        </View>
                    ))}
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.newQuestionButton,
                        pressed && styles.pressed
                    ]}
                    onPress={handleNewQuestion}
                >
                    <Text style={styles.newQuestionButtonText}>Next Question</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
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
        marginBottom: 32,
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
    answersContainer: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    answerCard: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    outlierCard: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '20', // 20% opacity
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    answerValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    newQuestionButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newQuestionButtonText: {
        color: colors.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 