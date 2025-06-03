import colors from "@/constants/Colors";
import defaultStyles, { typography } from "@/constants/styles";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

export default function NamesSelectionScreen() {
    const nbPlayers = useGlobalStore(state => state.numberOfPlayers);
    const swiper = useRef<SwiperFlatListRefProps>(null);
    const [gotoIndex, setGotoIndex] = useState<number>(-1);
    const [nextBtn, setNextBtn] = useState<string>("Next");
    const [prevBtn, setPrevBtn] = useState<string>("Back");
    const data = Array(nbPlayers).fill("PLAYER N°").map((title, index) => `${title}${index + 1}`);
    const router = useRouter();
    const addPlayer = useGlobalStore(state => state.addPlayer);

    useEffect(() => {
        if (gotoIndex >= 0) {
            swiper.current?.scrollToIndex({ index: gotoIndex, animated: true });
            setGotoIndex(-1);
        }
    }, [swiper, gotoIndex])

    const goToNext = (playerName: string) => {
        if (swiper) {
            let current: number = swiper.current?.getCurrentIndex() ?? 0;
            addPlayer(playerName, current);
            if (current == data.length - 1) {
                // get question id
                const questionId = 1;
                router.navigate(`/question/${questionId}`);
            } else {
                setGotoIndex(current + 1);
            }
        }
    }

    return (
        <SafeAreaView style={[defaultStyles.container]}>
            <SwiperFlatList
                ref={swiper}
                showPagination
                data={data}
                renderItem={({ item }) => (
                    <View style={{ width: Dimensions.get("window").width, alignItems: 'center' }}>
                        <GetNameSlide title={item} nextBtnTitle={nextBtn} onNextBtnClick={goToNext} />
                    </View>
                )}
                style={{ flexGrow: 1 }}
                paginationActiveColor={colors.primary}
                paginationStyle={{ paddingVertical: 32, alignItems: "center", position: "relative" }}
            />
        </SafeAreaView>
    )
}

const WIDTH = Dimensions.get("screen").width;

interface GetNameSlideProps {
    title: string,
    nextBtnTitle: string,
    onNextBtnClick: (playerName: string) => void
}
function GetNameSlide({ title, nextBtnTitle, onNextBtnClick }: GetNameSlideProps) {
    const [playerName, setPlayerName] = useState<string>("");
    const { width, height } = useWindowDimensions();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.slideContainer,
                    {
                        paddingHorizontal: width * 0.1,
                        minHeight: height,
                        justifyContent: 'center'
                    }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{title}</Text>

                <Image
                    source={require('../../assets/images/names_page.png')}
                    style={[styles.image, { width: width * 0.3, height: width * 0.3 }]}
                    resizeMode="contain"
                />

                <TextInput
                    placeholder="John Doe"
                    style={styles.input}
                    maxLength={12}
                    value={playerName}
                    onChangeText={setPlayerName}
                    placeholderTextColor="#aaa"
                />

                <Pressable
                    style={[
                        defaultStyles.btnOutlined,
                        styles.btn,
                        playerName === "" && styles.btnDisabled,
                    ]}
                    onPress={() => {
                        if (playerName !== "") {
                            onNextBtnClick(playerName);
                        }
                    }}
                    disabled={playerName === ""}
                >
                    <Text style={styles.btnText}>{nextBtnTitle}</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingVertical: 32,
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
        paddingHorizontal: 15,
        paddingVertical: 12,
        width: '100%',
        backgroundColor: colors.card,
        color: colors.primary,
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 12,
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
});
