import * as React from 'react';
import { View, Text, StyleSheet, VirtualizedList, ActivityIndicator } from 'react-native';
import getNewsDetails from '../../api/getNewsDetails';
import Comment from './comments';
const Details = ({ data }) => {

  const [comments, setComments] = React.useState(null);

  React.useEffect(() => {
    fetchData(data.kids, "parent").then(x => setComments(x))
  }, []);

  const fetchData = (x, type) => {
    return new Promise(async (resolve, reject) => {
      let data = []

      // counting total data load
      let count = 0;
      for (const key of x) {
        count++;
        const contents = await getNewsDetails(key);

        if (contents.kids) {
          const kidItem = await fetchData(contents.kids, "kid");
          contents.kidItem = kidItem;
        }
        if (contents.text) data.push(contents);

        // preload data without waiting all data fetched
        if (type == "parent" && count > 2) {
          setComments(data);
          count = 0;
        }
      }
      resolve(data);
    });
  }

  // Recrusive rendering for comment and reply
  const recrusiveComment = x =>
    <Comment data={x}>
      {x.kidItem && <VirtualizedList ItemSeparatorComponent={() => <View style={styles.separator}
      />}
        data={x.kidItem}
        renderItem={({ item, index }) => {
          return <View style={styles.item}><Text></Text>{recrusiveComment(item)}</View>;
        }}
        keyExtractor={item => item.id}
        getItemCount={x => x.length}
        getItem={(x, i) => ({ ...x[i], no: i + 1 })}
      />}
    </Comment>

  return (
    <View style={{ flex: 1 }}>
      {comments ?
        <VirtualizedList ItemSeparatorComponent={() => <View style={styles.separator}
        />}
          data={comments}
          renderItem={({ item, index }) => {
            return <View style={styles.item}>{recrusiveComment(item)}</View>;
          }}
          keyExtractor={item => item.id}
          getItemCount={x => x.length}
          getItem={(x, i) => ({ ...x[i], no: i + 1 })}
        />
        :
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" /><Text style={styles.title}>Loading...</Text></View>}
    </View>
  );
}

export default Details;


const styles = StyleSheet.create({

  item: {
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  separator: {
    marginHorizontal: 10,
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});