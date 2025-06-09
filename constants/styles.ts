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
    title: {
        fontSize: typography.h1.size,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    h1: {
        fontSize: typography.h1.size,
        marginVertical: 8,
        fontWeight: "bold",
    },
    btn: {
        width: '100%',
        backgroundColor: colors.primary,
        borderColor: 'transparent',
        paddingVertical: 13,
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 13,
        width: '100%',
        backgroundColor: colors.card,
        color: colors.primary,
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 12,
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
    btnDisabled: {
        backgroundColor: colors.primary,
    },
    btnText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelBtn: {
        width: '100%',
        borderColor: 'transparent',
        backgroundColor: colors.secondary,
    },
    cancelText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default defaultStyles;