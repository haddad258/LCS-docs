

import * as React from "react";
import { TouchableOpacity, Image, StyleSheet, Text, Dimensions, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Colors } from "../../../core/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Item({ item, props }) {

    const updateSupplier =(item)=>{
        alert("itemss")
    }
    return (
        <TouchableOpacity onPress={() =>updateSupplier(item)}>
            <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.uri }} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.category}>{item.numero}</Text>
                <View style={styles.iconsView}  >
                <View style={{ backgroundColor: Colors.light, padding: 6 ,borderRadius:30}} >
                    <FontAwesome name="calendar" color="#19ef08" size={20} />
                </View>
                <View style={{ backgroundColor: Colors.light, padding: 6 ,borderRadius:30}} >
                    <FontAwesome name="globe" color="red" size={20} />
                </View>
                <View style={{ backgroundColor: Colors.light, padding: 6 ,borderRadius:30}} >
                    <FontAwesome name="info-circle" color="#f172c8" size={20} />
                </View>
                <View style={{ backgroundColor: Colors.light, padding: 6,borderRadius:30 }} >
                    <FontAwesome name="image" color="#292ff9" size={20} />
                </View>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: 20,
        width: (windowWidth / 2) - (windowWidth * 0.05),
        height: windowHeight / 3,
        backgroundColor: "#FFF",
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 15
    },
    photo: {
        width: windowWidth / 2.5,
        height: windowHeight / 6,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginTop:10,
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
    },
    category: {
        marginTop: 5,
        marginBottom: 5
    },
    iconsView: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: 'row',
        padding:10
    }
})
export default Item
