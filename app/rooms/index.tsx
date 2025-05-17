import colors from "@/constants/colors";
import defaultStyles, { typography } from "@/constants/styles";
import useGlobalStore, { Mode } from "@/store/useGlobalStore";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoomScreen() {
    const router = useRouter();

    const mode = useGlobalStore(state => state.mode);

    if(mode !== Mode.MULTIPLAYER) {
        router.replace('/');
    }

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            "roomId": "",
            "pseudo": "",
        }
    });

    const onJoin = (data: any) => {
        console.log(data);
    }

    return (
        <SafeAreaView style={[defaultStyles.container]}>
            <View style={styles.header}>
                <Text style={[defaultStyles.h1]}>Join a Room</Text>
            </View>
            <View style={styles.main}>
                <View style={[styles.roomForm]}>
                    <View style={styles.formRow}>
                        <Text style={styles.inputLabel}>Room ID*</Text>
                        <Controller
                            control={control}
                            name={"roomId"}
                            rules={{ required: true, maxLength: 12 }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <TextInput
                                        placeholder="ID0001234567"
                                        style={styles.input}
                                        maxLength={12}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                )
                            }}
                         />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.inputLabel}>Pseudo</Text>
                        {/* <TextInput
                            placeholder="John Doe"
                            style={styles.input}
                            maxLength={20}
                        /> */}
                        <Controller
                            control={control}
                            name={"pseudo"}
                            rules={{ required: true, maxLength: 12 }}
                            render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                    <TextInput
                                        placeholder="John Doe"
                                        style={styles.input}
                                        maxLength={20}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <View style={{gap: 4}}>
                    <Text style={styles.note}>*If the room does not exist, it will be created</Text>
                    <Pressable style={[defaultStyles.btnOutlined, styles.joinBtn]} onPress={handleSubmit(onJoin)}>
                        <Text style={{ color: "white" }}>Join</Text>
                    </Pressable>
                </View>
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