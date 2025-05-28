import { StyleSheet } from 'react-native';
import colors from './Colors';

export const typography = {
    h1: {
        size: 30,
        color: "#ffffff",
    },
    big: {
        size: 18,
    },
    base: {
        size: 16,
    },
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    h1: {
        fontSize: typography.h1.size,
        marginVertical: 8,
        fontWeight: "bold",
    },
    btnOutlined: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.border,
    },
    btnPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
});

export default defaultStyles;