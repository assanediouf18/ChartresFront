import colors from '@/constants/colors';
import useAnswerStore from '@/store/useAnswerStore';
import { Question } from '@/types';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SliderQuestionProps {
    question: Question;
    onAnswer: (value: number) => void;
}

export default function SliderQuestion({ question, onAnswer }: SliderQuestionProps) {
    const savedAnswer = useAnswerStore((state) => state.getAnswer(question.id));
    const [value, setValue] = useState<number>(
        savedAnswer?.value as number || (question.minValue || 0)
    );

    useEffect(() => {
        if (savedAnswer?.value) {
            setValue(savedAnswer.value as number);
        }
    }, [savedAnswer]);

    const handleValueChange = (newValue: number) => {
        setValue(newValue);
        onAnswer(newValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.valueText}>
                {value.toFixed(0)} {question.price_unit}
            </Text>

            <Slider
                style={styles.slider}
                minimumValue={question.minValue || 0}
                maximumValue={question.maxValue || 100}
                value={value}
                onValueChange={handleValueChange}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.inactive}
                thumbTintColor={colors.primary}
                step={1}
            />

            <View style={styles.rangeLabels}>
                <Text style={styles.rangeText}>
                    {question.minValue} {question.price_unit}
                </Text>
                <Text style={styles.rangeText}>
                    {question.maxValue} {question.price_unit}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 20,
    },
    valueText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.primary,
        marginBottom: 20,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    rangeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    rangeText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
});