import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Button } from 'react-native';
import { timeSince, extractHostname } from '../../../api/utilities';

const ListInfo = ({ data, setIndex }) => {

  return (data &&
    <View style={styles.item}>

      <Text style={styles.no}>{data.no}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{data.title} <Text style={styles.textContent}>({extractHostname(data.url)})</Text></Text>
        <Text style={styles.textContent}>{data.score} points || by {data.by} || {timeSince(data.time)}</Text>
        <View style={styles.extraData}>
          <Button
            disabled={data.descendants?false:true}
            onPress={() => setIndex(data.id)}
            title={(data.descendants || "0") + " comments"}
            color="#841584"
            accessibilityLabel="view comments"
          />
        </View>
      </View>
    </View>
  );
}

export default ListInfo;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    alignItems: 'center',
    flexDirection: "row",
  },
  itemContent: { flex: 0.9, },
  title: {

    color: 'black',
    fontSize: 20,
  },
  textContent: {
    fontSize: 15,
    color: 'grey',
  },
  no: {
    color: 'black',
    fontSize: 15,
    flex: 0.1
  },
  extraData: {

    color: 'black',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});