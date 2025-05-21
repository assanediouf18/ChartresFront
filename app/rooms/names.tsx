import colors from "@/constants/Colors";
import defaultStyles from "@/constants/styles";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

export default function NamesSelectionScreen() {
    const nbPlayers = useGlobalStore(state => state.numberOfPlayers);
    const swiper = useRef<SwiperFlatListRefProps>(null);
    const [gotoIndex, setGotoIndex] = useState<number>(-1);
    const [nextBtn, setNextBtn] = useState<string>("Next");
    const [prevBtn, setPrevBtn] = useState<string>("Back");
    const data = Array(nbPlayers).fill("Player n°").map((title, index) => `${title}${index + 1}`);
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
                renderItem={({ item, index }) => (
                    <GetNameSlide title={item} nextBtnTitle={nextBtn} onNextBtnClick={goToNext} />
                )}
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
                onChangeIndex={({ index, prevIndex }) => {
                    if (index == 0) {
                        setPrevBtn("Back")
                    } else {
                        setPrevBtn("Previous")
                    }

                    if (index == data.length - 1) {
                        setNextBtn("Done")
                    } else {
                        setNextBtn("Next")
                    }
                }}
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
    return (
        <View style={{ flex: 1, width: WIDTH, justifyContent: "center" }}>
            <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 16 }}>
                <Text style={[defaultStyles.h1]}>{title}</Text>
            </View>
            <View style={{ paddingHorizontal: 36, flexDirection: "row", gap: 8 }}>
                <TextInput
                    placeholder="John Doe"
                    style={styles.input}
                    maxLength={12}
                    value={playerName}
                    onChangeText={value => setPlayerName(value)}
                />
                <Pressable
                    style={[defaultStyles.btnOutlined, { backgroundColor: playerName == "" ? "gray" : colors.primary }]}
                    onPress={() => {
                        if (playerName != "") {
                            onNextBtnClick(playerName)
                        }
                    }}>
                    <Text style={{ color: "white" }}>{nextBtnTitle}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        fontSize: 14,
        borderColor: colors.primary,
        flexGrow: 1,
    },
});