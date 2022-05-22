import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import ListInfo from './listInfo';


const List = ({ data, reloadData, loadMore, processing, setIndex }) => {

  // Indicate scroll action to start fetch additional data if available
  const [momentumScroll, setMomentum] = React.useState(true);


  return (
    <VirtualizedList
      ItemSeparatorComponent={() => <View style={styles.separator}
      />}
      refreshing={processing}
      onRefresh={reloadData}
      initialNumToRender={20}
      data={data}
      onMomentumScrollBegin={() => setMomentum(false)}
      onEndReached={() => {
        if (!momentumScroll) {
          loadMore();
          setMomentum(true);
        }
      }}
      renderItem={({ item }) => <ListInfo setIndex={setIndex} data={item} />}
      keyExtractor={item => item.id}
      getItemCount={x => x.length}
      getItem={(x, i) => ({ ...x[i], no: i + 1 })}
    />
  );
}

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
  }
});

export default List;