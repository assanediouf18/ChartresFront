import colors from '@/constants/Colors';
import useGlobalStore, { Mode } from '@/store/useGlobalStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
             <Text style={styles.title}>FOR HOW MUCH</Text>

            <Image
                source={require('@/assets/images/welcome_page.png')}
                style={styles.image}
                resizeMode="contain"
            />

            <View style={styles.buttonHolder}>
                { availableModes.map((mode, index) => (
                    <Pressable
                        key={index}
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.pressedButton,
                        ]}
                        onPress={() => handleModeSelection(mode)}
                    >
                        <Text style={styles.choiceText}>
                            {mode}
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        gap: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1, // Keeps it square — adjust if your image is wider/taller
        marginBottom: 24,
    },
    buttonHolder: {
        width: '100%',
        gap: 16,
    },
    choiceText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    button: {
        backgroundColor: '#456990',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
    },
    pressedButton: {
        opacity: 0.8,
    },
});
