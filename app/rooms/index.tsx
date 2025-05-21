import colors from "@/constants/Colors";
import defaultStyles, { typography } from "@/constants/styles";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoomScreen() {
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
            <View style={styles.header}>
                <Text 
                  style={[defaultStyles.h1, { paddingHorizontal: 12, textAlign: "center" }]}
                >
                    How Many People Will Play ?
                </Text>
            </View>
            <View style={styles.main}>
                <TextInput
                    placeholder="2"
                    style={styles.input}
                    maxLength={12}
                    inputMode="decimal"
                    onChangeText={value => setNumberOfPlayers(parseInt(value))}
                 />
            </View>
            <View style={styles.actions}>
                <Pressable style={[defaultStyles.btnOutlined, numberOfPlayers <= 0 ? { backgroundColor: "gray" } : styles.joinBtn]} onPress={handleNavigation}>
                    <Text style={{ color: "white" }}>Continue</Text>
                </Pressable>
                <Pressable style={[defaultStyles.btnOutlined, { borderColor: "transparent" }]} onPress={router.back}>
                    <Text style={{ color: colors.secondary }}>Cancel</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    roomForm: {
        gap: 12,
    },
    formRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    inputLabel: {
        fontWeight: 'bold',
        fontSize: typography.big.size,
    },
    input: {
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        fontSize: 14,
        borderColor: colors.primary
    },
    joinBtn: {
        backgroundColor: colors.primary,
    },
    actions: {
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 12,
    },
    header: {
        alignItems: "center",
        paddingVertical: 14,
    },
    note: {
        fontStyle: 'italic',
        color: "gray",
        textAlign: 'center',
    }
});