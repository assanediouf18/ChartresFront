import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '@/constants/Colors';
import defaultStyles from '@/constants/styles';
import useGlobalStore, { Mode } from '@/store/useGlobalStore';

export default function ModeScreen() {
    const { width } = useWindowDimensions();
    const router = useRouter();
    const setMode = useGlobalStore(state => state.setMode);
    const availableModes = Object.values(Mode);

    const handleModeSelection = (mode: Mode) => {
        setMode(mode);
        router.navigate(mode === Mode.SOLO ? '/categories' : '/rooms');
    };

    return (
        <SafeAreaView style={defaultStyles.container}>
            <ScrollView contentContainerStyle={[styles.container, { paddingHorizontal: width * 0.05 }]}>
                <Text style={styles.title}>FOR HOW MUCH</Text>

                <Image
                    source={require('@/assets/images/welcome_page.png')}
                    style={[styles.image, { width: width * 0.8 }]}
                    resizeMode="contain"
                />

                <View style={styles.buttonHolder}>
                    {availableModes.map((mode, index) => (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.button,
                                pressed && defaultStyles.btnPressed,
                            ]}
                            onPress={() => handleModeSelection(mode)}
                        >
                            <Text style={styles.buttonText}>{mode}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        paddingVertical: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    image: {
        height: undefined,
        aspectRatio: 1,
        maxWidth: 400,
    },
    buttonHolder: {
        width: '100%',
        gap: 16,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
