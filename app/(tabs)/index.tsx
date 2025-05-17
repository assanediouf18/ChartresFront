import colors from '@/constants/colors';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const selectedChoice = false;
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonHolder}>
          <Pressable
            style={({ pressed }) => [
              styles.choiceButton,
              selectedChoice && styles.selectedChoice,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[styles.choiceText]}
            >
              Solo
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.choiceButton,
              selectedChoice && styles.selectedChoice,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[styles.choiceText]}
            >
              Multiplayer
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  buttonHolder: {
    flex: 1,
    padding: 32,
    gap: 12,
    justifyContent: "center",
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