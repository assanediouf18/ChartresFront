import defaultStyles from "@/constants/styles";
import questions from "@/mocks/questions";
import { Question } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesSelectionScreen() {
    // const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(questions);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        // Extract unique categories
        const uniqueCategories = Array.from(
            new Set(questions.map((q) => q.category))
        );
        setCategories(uniqueCategories);
    }, [selectedCategory]);

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View>
                <Text>Select the possible Categories</Text>
                <Text>The question will only be from the categories you selected</Text>
            </View>
            <FlatList
                data={categories}
                renderItem={({item}) => <Text>{item}</Text>}
                keyExtractor={(_item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

function setFilteredQuestions(arg0: Question[]) {
    throw new Error("Function not implemented.");
}
