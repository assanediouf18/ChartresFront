import CategoryFilter from '@/components/CategoryFilter';
import QuestionCard from '@/components/QuestionCard';
import colors from '@/constants/colors';
import questions from '@/mocks/questions';
import { Question } from '@/types';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(questions);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(questions.map((q) => q.category))
    );
    setCategories(uniqueCategories);

    // Apply filter
    if (selectedCategory) {
      setFilteredQuestions(
        questions.filter((q) => q.category === selectedCategory)
      );
    } else {
      setFilteredQuestions(questions);
    }
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="dark" />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <FlatList
        data={filteredQuestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuestionCard question={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No questions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 16
  },
  listContent: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});