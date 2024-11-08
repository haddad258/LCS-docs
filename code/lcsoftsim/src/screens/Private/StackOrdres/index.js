import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../core/theme';
import ListOrders from './ListOrders'
import { OrdersCreation } from '../../../service';
const AuthScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Done');
    const [list,setlist] = useState([])
    const handleTabPress = (tab) => {
        setSelectedTab(tab);
        getList()
    };
    useEffect(()=>{
           getList()
    },[])

    const getList =async () =>{
      const Orders = await OrdersCreation.getOrdres()
           console.log(Orders)
           setlist(Orders)
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, { backgroundColor: selectedTab === 'Ongoing' ? Colors.secondary : Colors.gray, borderTopLeftRadius: 10 }]}
                    onPress={() => handleTabPress('Ongoing')}
                >
                    <Text style={styles.tabText}>
                        Orders in Processing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, { backgroundColor: selectedTab === 'Done' ? Colors.secondary : Colors.gray, }]}
                    onPress={() => handleTabPress('Done')}
                >
                    <Text style={styles.tabText}>
                        Completed Orders
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, { backgroundColor: selectedTab === 'Cancelled' ? Colors.secondary : Colors.gray, }]}
                    onPress={() => handleTabPress('Cancelled')}
                >
                    <Text style={styles.tabText}>
                        Cancelled Orders
                    </Text>
                </TouchableOpacity>
            </View>

            <ListOrders listOrders={list} onrefresh={()=>getList()} />
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingTop: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.gray,
        margin: 5,
        borderRadius: 15,
        padding: 5
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 15
    },
    tabText: {
        fontWeight: '600',
        color: Colors.white
    },
    content: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#FFAAFF"
    },
});
