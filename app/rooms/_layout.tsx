import useGlobalStore, { Mode } from "@/store/useGlobalStore";
import { router, Stack } from "expo-router";

export default function RoomLayout() {

    const mode = useGlobalStore(state => state.mode);

    if (mode !== Mode.MULTIPLAYER) {
        router.replace('/');
    }

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="names" options={{ headerShown: false }} />
            </Stack>
        </>
    );
  }