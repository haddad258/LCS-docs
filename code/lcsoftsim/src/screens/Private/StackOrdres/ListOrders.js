import React, { useState } from 'react';
import { View, Text,  StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Colors } from '../../../core/theme';
import { formatDate } from '../../../helpers/date';
import OrderDetails from './DetailsOrder';
function ListOrders({ listOrders, onrefresh }) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        // You can implement your data fetching logic here
        setRefreshing(true);
        // Call your data fetching function, and when the data is fetched, setRefreshing to false
        // For example, you can fetch the data using an asynchronous function or API call
        setTimeout(() => {
            onrefresh()
            // After fetching the data, setRefreshing to false
            setRefreshing(false);
        }, 1000);
    };
    

    const renderClassItem = ({ item }) => (
        <View style={styles.classItem}>
            <View style={[styles.card, { backgroundColor: Colors.white }]}>
                <Text style={styles.cardCode}>Code {item.code} </Text>
                <Text style={styles.cardType}>{item.type} </Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:"row"}}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
                    </View>
                    {/* Display icon on the right side */}
                   
                    <OrderDetails item={item} />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 16 }}
                data={listOrders}
                renderItem={renderClassItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16
    },
    card: {
        flex: 1,
        backgroundColor: '#ff7f50',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 16,
        padding: 16,

    },
    header: {
        marginBottom: 8,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#ffffff',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 8,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    userRole: {
        fontSize: 12,
        color: '#ffffff',
    },
    classItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timelineContainer: {
        width: 30,
        alignItems: 'center',
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ff7f50',
        marginBottom: 8,
    },
    timelineLine: {
        flex: 1,
        width: 2,
        backgroundColor: '#ff7f50',
    },
    classContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    classHours: {
        marginRight: 8,
        alignItems: 'flex-end',
    },
    startTime: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    endTime: {
        fontSize: 16,
    },
    cardCode: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.secondary,
        textAlign: 'center'
    },
    cardType: {
        fontSize: 12,
        color: Colors.gray,
    },
    cardDate: {
        fontSize: 12,
        fontWeight: "400",
        color: '#00008B',
        marginBottom: 8,
    },
    studentListContainer: {
        marginRight: 10,
    },
    studentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: -3,
        borderWidth: 1,
        borderColor: '#fff'
    },
});

export default ListOrders;