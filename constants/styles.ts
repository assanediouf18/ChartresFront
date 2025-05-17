import { StyleSheet } from 'react-native';
import colors from './colors';

export const TYPOGRAPHY = {
    h1: {
        size: 24
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    h1: {
        fontSize: TYPOGRAPHY.h1.size,
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