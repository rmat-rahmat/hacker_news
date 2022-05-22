import React from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { timeSince } from '../../../api/utilities';

import RenderHtml from 'react-native-render-html';

const Comment = ({ data, children }) => {

    const { width } = useWindowDimensions();

    return (data &&
        <View style={styles.item}>

            <View style={styles.itemContent}>
                <Text style={styles.textContent}>{data.by} || {timeSince(data.time)}</Text>
                {data.text && <RenderHtml baseStyle={styles.text}
                    contentWidth={width}
                    source={{ html: data.text }}
                />}
                {/* <Text style={styles.textContent}>{data.score} points || by {data.by} || {timeSince(data.time)}</Text> */}
                <View style={styles.extraData}>
                    {children}
                </View>
            </View>
        </View>
    );
}

export default Comment;

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
    },
    itemContent: { flex: 0.9, },
    title: {

        color: 'black',
        fontSize: 20,
    },
    text: {
        color: 'black',
        fontSize: 15
    },
    textContent: {
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold'
    },
    no: {
        color: 'black',
        fontSize: 15,
        flex: 0.1
    },
    extraData: {
    }
});