import colors from "@/constants/colors";
import defaultStyles, { typography } from "@/constants/styles";
import questions from "@/mocks/questions";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CategoryItemProps
{ 
    name: string, 
    selected: boolean, 
    onCategoryPress: (categoryName: string) => void
}

function CategoryItem({ name, selected, onCategoryPress }: CategoryItemProps) {
    return (
        <Pressable 
            style={[styles.category, selected && styles.selectedCategory]}
            onPress={() => onCategoryPress(name)}
        >
            <Text style={[{ fontSize: typography.base.size}, selected && styles.selectedCategorytext]}>{name}</Text>
        </Pressable>
    )
}

export default function CategoriesSelectionScreen() {
    // const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(questions);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        // Extract unique categories
        const uniqueCategories = Array.from(
            new Set(questions.map((q) => q.category))
        );
        setCategories(uniqueCategories);
        setSelectedCategories(uniqueCategories);
    }, []);

    const handleCategoryPressed = (categoryName: string) => {
        setSelectedCategories(selectedCategories.includes(categoryName) ? 
            selectedCategories.filter(selected => selected !== categoryName) : 
            [...selectedCategories, categoryName]
        );
    }

    return (
        <SafeAreaView style={[defaultStyles.container, styles.container]}>
            <View style={styles.intro}>
                <Text style={[defaultStyles.h1, {textAlign: "center",}]}>Select the possible Categories</Text>
                <Text style={{ textAlign: "center", }}>The question will only be from the categories you selected</Text>
            </View>
            <FlatList
                data={categories}
                renderItem={({item}) => (
                    <CategoryItem 
                        name={item} 
                        selected={selectedCategories.includes(item)} 
                        onCategoryPress={handleCategoryPressed}
                    />
                )}
                keyExtractor={(_item, index) => index.toString()}
                contentContainerStyle={styles.list}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
            <Pressable 
                style={[defaultStyles.btnOutlined, { backgroundColor: colors.primary, marginBottom: 12 }]}
                onPress={() => console.log("Ready to go to next page !")}
            >
                <Text style={{color: "white"}}>Next</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingHorizontal: 24,
        gap: 32,
    },
    intro: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    category: {
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 4,
        borderColor: colors.border,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        flex: 1,
        // aspectRatio: 1,
    },
    selectedCategory: {
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}10`,
    },
    selectedCategorytext: {
        color: colors.primary,
    },
    list: {
        gap: 12,
    },
    columnWrapper: {
        flex: 1,
        minHeight: 92,
        justifyContent: "space-between",
        gap: 12,
    }
});
