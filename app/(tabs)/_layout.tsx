import colors from '@/constants/colors';
import { Tabs } from 'expo-router';
import { Home, PlusCircle } from 'lucide-react-native';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Would You Rather",
          tabBarLabel: "Questions",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create Question",
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => <PlusCircle size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}