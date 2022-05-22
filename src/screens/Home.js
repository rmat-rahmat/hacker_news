import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Modal, Pressable } from "react-native";
import List from "./list";
import Details from "./details";
import getTopNews from "../api/getTopNews";
import getNewsDetails from "../api/getNewsDetails";
import { chunk } from "../api/utilities";

const Home = () => {

    const [data, setData] = React.useState(null);
    const [activeData, setActiveData] = React.useState(null);
    const [loadGroup, setLoadGroup] = React.useState(1);
    const [detailData, setDetailData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [processing, setProcessing] = React.useState(false);

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setProcessing(true);

        // Get news from API
        getTopNews().then(x => {

            // Split large array into multiple array of 10 item
            const d = chunk(x, 10);
            setData(d);

            // Set initial 20 item to load
            const initialList = [...d[0], ...d[1]];

            fetchData(initialList).then(n => {
                setActiveData(n);
                setProcessing(false);
                if (loading) setLoading(false);
            }).catch(e=>console.log(e));
        }).catch(e => console.log(e));
    }

    // Fetch item detail from API
    const fetchData = (x) => {
        return new Promise(async (resolve, reject) => {
            let data = [];

            // Using async loop to prevent server timeout
            for (const key of x) {
                const contents = await getNewsDetails(key);
                data.push(contents);
            }
            resolve(data);
        });


    }

    // add more item to data list
    const loadMore = () => {

        // prevent data fetch if the process still run
        if (loadGroup < data.length && !processing) {
            const n = loadGroup + 1;

            setProcessing(true);
            fetchData(data[n]).then(ft => {
                setActiveData([...activeData, ...ft]);
                setProcessing(false);
            })
            setLoadGroup(n);
        }
    }

    // set parent item to view comment
    const setIndex = x => {
        const filterData = activeData.find(({ id }) => id === x);
        setDetailData(filterData);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {detailData && <Pressable onPress={() => setDetailData(null)}><Text style={styles.headerText}>{("< Back ")}</Text></Pressable>}
                <Text style={styles.headerText}>Hacker News</Text>
            </View>
            <View style={styles.content} >
                {activeData ? detailData ?
                    <Details data={detailData} /> :
                    <List data={activeData} setIndex={setIndex} reloadData={loadData} loadMore={loadMore} processing={processing} /> :
                    <Text>Data not found</Text>
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={loading}
                >
                    <View style={styles.centeredView}>
                        <ActivityIndicator size="large" />
                        <Text style={styles.title}>Loading...</Text>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        height: '100%',
    },
    header: {
        backgroundColor: "orange",
        flex: 0.08,
        alignItems: 'center',
        flexDirection: "row",
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 10
    },
    content: {
        backgroundColor: "white",
        flex: 0.92
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        color: 'black',
        fontSize: 32,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
});