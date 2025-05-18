import useGlobalStore from "@/store/useGlobalStore";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { SwiperFlatListRefProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

export default function NamesSelectionScreen() {
    const nbPlayers = useGlobalStore(state => state.numberOfPlayers);
    const swiper = useRef<SwiperFlatListRefProps>(null);
    return (
        <SafeAreaView>
            <SwiperFlatList />
        </SafeAreaView>
    )
}