import colors from '@/constants/colors';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory
}: CategoryFilterProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <Pressable
                style={({ pressed }) => [
                    styles.categoryButton,
                    !selectedCategory && styles.selectedCategory,
                    pressed && styles.pressed,
                ]}
                onPress={() => onSelectCategory(null)}
            >
                <Text
                    style={[
                        styles.categoryText,
                        !selectedCategory && styles.selectedCategoryText
                    ]}
                >
                    All
                </Text>
            </Pressable>

            {categories.map((category, index) => (
                <Pressable
                    key={index}
                    style={({ pressed }) => [
                        styles.categoryButton,
                        selectedCategory === category && styles.selectedCategory,
                        pressed && styles.pressed,
                    ]}
                    onPress={() => onSelectCategory(category)}
                >
                    <Text
                        style={[
                            styles.categoryText,
                            selectedCategory === category && styles.selectedCategoryText
                        ]}
                    >
                        {category}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
        height: 64,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        textAlign: "center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedCategory: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    categoryText: {
        fontSize: 14,
        color: colors.text,
        textTransform: 'capitalize',
    },
    selectedCategoryText: {
        color: colors.background,
        fontWeight: '600',
    },
});