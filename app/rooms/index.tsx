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
                        style={defaultStyles.input}
                        maxLength={2}
                        inputMode="decimal"
                        keyboardType="numeric"
                        onChangeText={value => setNumberOfPlayers(parseInt(value))}
                        placeholderTextColor="#aaa"
                    />

                    <Pressable
                        style={[
                            defaultStyles.btnOutlined,
                            defaultStyles.btn,
                            numberOfPlayers <= 0 && defaultStyles.btnDisabled,
                        ]}
                        onPress={handleNavigation}
                        disabled={numberOfPlayers <= 0}
                    >
                        <Text style={defaultStyles.btnText}>Next</Text>
                    </Pressable>

                    <Pressable
                        style={[defaultStyles.btnOutlined, defaultStyles.cancelBtn]}
                        onPress={router.back}
                    >
                        <Text style={defaultStyles.cancelText}>Cancel</Text>
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
        paddingVertical: 30,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        gap: 10,
    },
    title: {
        fontSize: typography.h1.size,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    image: {
        width: '40%',
        maxWidth: 300,
        height: undefined,
        aspectRatio: 1,
    },
});
