import colors from '@/constants/colors';
import defaultStyles from '@/constants/styles';
import useGlobalStore, { Mode } from '@/store/useGlobalStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModeScreen() {
    const router = useRouter();
    const availableModes = Object.values(Mode);
    const setMode = useGlobalStore(state => state.setMode);

    const handleModeSelection = (mode: Mode) => {
        setMode(mode);
        router.navigate(mode == Mode.SOLO ? '/categories' : '/rooms');
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonHolder}>
                { availableModes.map((mode, index) => (
                    <Pressable
                        key={index}
                        style={({ pressed }) => [
                            defaultStyles.btnOutlined,
                            pressed && defaultStyles.btnPressed,
                        ]}
                        onPress={() => handleModeSelection(mode)}
                    >
                        <Text
                            style={[styles.choiceText]}
                        >
                            { mode }
                        </Text>
                    </Pressable>
                )) }
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
    choiceText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
    },
});