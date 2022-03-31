import React from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';
import { RoundedButton } from './RoundedButton';

export const FocusHistory = ({focusHistory, clearHistory}) => {
    return <>
        {!!focusHistory.length && (<><Text style={styles.text}>Things we have focus on:</Text><FlatList contentContainerStyle={{ alignItems: 'center', margin: 5 }} style={styles.list} data={focusHistory} renderItem={({ item, index }) => <View style={styles.item}><Text style={styles.subject(item.status)}>{item.subject}</Text></View>}></FlatList>
        <View style={styles.clearBtn}>
        <RoundedButton title="Clear " size={75} onPress={() => clearHistory([])}/>
        </View>
        </>)}
    </>
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: colors.white,
        fontSize: fontSizes.lg,
    },
    list: {
        flex: 1,
    },
    item: {
        marginVertical: spacing.sm,
    },
    subject: (status) => ({
        color: status === 1 ? 'green': 'red',
        fontSize: fontSizes.md
    }),
    clearBtn: {
        alignItems: 'center'
    }
})