import colors from "@/constants/Colors";
import defaultStyles, { typography } from "@/constants/styles";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoomScreen() {
    const { width } = useWindowDimensions();
    const router = useRouter();

    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0);

    const setNumberOfPlayersInState = useGlobalStore(state => state.setNumberOfPlayers);
    const handleNavigation = () => {
        if(setNumberOfPlayersInState(numberOfPlayers)) {
            router.navigate('/rooms/names');
        }
    }

    return (
            <SafeAreaView style={[defaultStyles.container]}>
                <ScrollView contentContainerStyle={[styles.container, { paddingHorizontal: width * 0.05 }]}>
                    <Text style={styles.title}>NUMBER OF PLAYERS</Text>

                    <Image
                        source={require('../../assets/images/players_page.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <TextInput
                        placeholder="2"
                        style={styles.input}
                        maxLength={2}
                        inputMode="decimal"
                        keyboardType="numeric"
                        onChangeText={value => setNumberOfPlayers(parseInt(value))}
                        placeholderTextColor="#aaa"
                    />

                    <Pressable
                        style={[
                            defaultStyles.btnOutlined,
                            styles.btn,
                            numberOfPlayers <= 0 && styles.btnDisabled,
                        ]}
                        onPress={handleNavigation}
                        disabled={numberOfPlayers <= 0}
                    >
                        <Text style={styles.btnText}>Next</Text>
                    </Pressable>

                    <Pressable
                        style={[defaultStyles.btnOutlined, styles.cancelBtn]}
                        onPress={router.back}
                    >
                        <Text style={styles.cancelText}>Cancel</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        paddingVertical: 32,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        gap: 24,
    },
    title: {
        fontSize: typography.h1.size,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    image: {
        width: '60%',
        maxWidth: 300,
        height: undefined,
        aspectRatio: 1,
        marginVertical: 16,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        width: '100%',
        backgroundColor: colors.card,
        color: colors.primary,
        fontSize: 18,
        textAlign: 'center',
        
    },
    btn: {
        width: '100%',
        backgroundColor: colors.primary,
        borderColor: 'transparent',
    },
    btnDisabled: {
        backgroundColor: colors.primary,
    },
    btnText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelBtn: {
        width: '100%',
        borderColor: 'transparent',
        backgroundColor: colors.secondary,
    },
    cancelText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
