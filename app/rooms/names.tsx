import colors from "@/constants/Colors";
import defaultStyles from "@/constants/styles";
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
                paginationStyle={{ paddingVertical: 15, alignItems: "center", position: "relative" }}
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
                        paddingHorizontal: width,
                        minHeight: height*0.9,
                        justifyContent: 'center'
                    }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={defaultStyles.title}>{title}</Text>

                <Image
                    source={require('../../assets/images/names_page.png')}
                    style={[styles.image, { width: width * 0.3, height: width * 0.3 }]}
                    resizeMode="contain"
                />

                <TextInput
                    placeholder="John Doe"
                    style={defaultStyles.input}
                    maxLength={12}
                    value={playerName}
                    onChangeText={setPlayerName}
                    placeholderTextColor="#aaa"
                />

                <Pressable
                    style={[
                        defaultStyles.btnOutlined,
                        defaultStyles.btn,
                        playerName === "" && defaultStyles.btnDisabled,
                    ]}
                    onPress={() => {
                        if (playerName !== "") {
                            onNextBtnClick(playerName);
                        }
                    }}
                    disabled={playerName === ""}
                >
                    <Text style={defaultStyles.btnText}>{nextBtnTitle}</Text>
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
        paddingVertical: 50,
    },
    image: {
        width: '60%',
        maxWidth: 300,
        height: undefined,
        aspectRatio: 1,
        marginVertical: -30,
        
    },
});
