import colors from '@/constants/Colors';
import useAnswerStore from '@/store/useAnswerStore';
import { Question } from '@/types';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ChoiceQuestionProps {
    question: Question;
    onAnswer: (value: string) => void;
}

export default function ChoiceQuestion({ question, onAnswer }: ChoiceQuestionProps) {
    const savedAnswer = useAnswerStore((state) => state.getAnswer(question.id));
    const [selectedChoice, setSelectedChoice] = useState<string | null>(
        savedAnswer?.value as string || null
    );

    useEffect(() => {
        if (savedAnswer?.value) {
            setSelectedChoice(savedAnswer.value as string);
        }
    }, [savedAnswer]);

    const handleSelect = (choice: string) => {
        setSelectedChoice(choice);
        onAnswer(choice);
    };

    return (
        <View style={styles.container}>
            {question.choices?.map((choice, index) => (
                <Pressable
                    key={index}
                    style={({ pressed }) => [
                        styles.choiceButton,
                        selectedChoice === choice && styles.selectedChoice,
                        pressed && styles.pressed,
                    ]}
                    onPress={() => handleSelect(choice)}
                >
                    <Text
                        style={[
                            styles.choiceText,
                            selectedChoice === choice && styles.selectedChoiceText
                        ]}
                    >
                        {choice}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 20,
        gap: 16,
    },
    choiceButton: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.border,
    },
    selectedChoice: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    choiceText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
    },
    selectedChoiceText: {
        color: colors.background,
    },
});