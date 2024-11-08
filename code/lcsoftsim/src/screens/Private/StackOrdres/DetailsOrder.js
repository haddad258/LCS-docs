import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from '../../../core/theme';
import { OrdersDetails } from '../../../service';
import IndexOrdersDetails from './indexOrdersDetails'
const OrderDetailsModal = ({ item }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState([]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const getlistOrdersdetails = async () => {
        console.log(item.id);
        const listData = await OrdersDetails.getOrderDetails(item.id);
        if (listData) {
            setModalVisible(true);
            setList(listData);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text>{item.propertyName}: {item.propertyValue}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => getlistOrdersdetails()}>
                <FontAwesome5 name="file" color={Colors.primary} size={20} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* <FlatList
                            data={list}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        /> */}
                        <IndexOrdersDetails list={list} />

                        <TouchableOpacity style={styles.buttonClose} onPress={toggleModal}>
                            <Text style={styles.buttonCloseText} >Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: "96%",
        height: "60%",
        borderWidth: 1,
        borderColor: Colors.colorTiers,
    },
    listItem: {
        marginBottom: 10,
    },
    buttonClose: {
        backgroundColor: Colors.info,
        padding: 10,
        width: "30%",
        marginTop: "25%",
        textAlign: 'center',
        borderRadius:10
    },
    buttonCloseText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "700"
    },
});

export default OrderDetailsModal;
