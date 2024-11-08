import React, {  useState } from "react";
import { TouchableOpacity, Image, Modal, StyleSheet, Text, FlatList, View } from "react-native";
import { Colors } from "../../core/theme";
import { FontAwesome } from "react-native-vector-icons";
import { PlanPank } from "../../service";
import Products from './ProductList'
function Item({ item, props }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState({});



  const getlistProducts = async (id) => {

    try {
      const list = await PlanPank.getProduct(id)
      if (list) {
        setModalVisible(true)
        setList(list)
        console.log(list)
      }
    } catch (error) {

    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log(item)}>
        <Image source={{ uri: "https://i.ibb.co/5R4CcQ4/oh-mega-1920x225.png" }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.brand}>{item.name}</Text>
        <Text style={styles.description}> {item.description} </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}> {item.price} $</Text>
        </View>
        <TouchableOpacity onPress={() => getlistProducts(item.id)} style={styles.eyeIcon}>
          <FontAwesome name="eye" color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        {/* Modal Content */}
        <View style={styles.modalContainer}>
          <View style={styles.modalDetails}>
            <Image source={{ uri: "https://i.ibb.co/gRcS12P/oh-lavoix-1920x225.png" }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>description: {item.qte}</Text>
            <FlatList
            data={list}
            renderItem={({ item }) => (<Products item={item} />)}
            keyExtractor={item => item.id}

          />
            

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: "#fff",
    borderColor: Colors.secondary,
    borderRadius: 15,
    padding: 5
  },
  image: {
    height: 130,
    width: "99%",
    alignSelf: "center",
    borderRadius: 20,
    padding: 10
  },
  detailsContainer: {
    padding: 10,
  },
  brand: {
    fontSize: 20,
    color: Colors.accent,
    fontWeight: "300",
    textAlign: "center"
  },
  description: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "300",
    textAlign: "center"
  },
  priceContainer: {
    backgroundColor: Colors.light,
    borderRadius: 10,
    padding: 9,
    marginTop: 5,
    alignSelf: "center",
  },
  price: {
    fontSize: 15,
    color: "black",
    fontWeight: "700",
    textAlign: "center",
  },
  eyeIcon: {
    padding: 5,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    marginHorizontal: 5,
    alignSelf: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    height: 140,
    width: 140,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 20,
  },
  modalDetails: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "96%",
    borderWidth: 1,
    borderColor: Colors.colorTiers,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.accent,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    color: Colors.grey,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    marginTop: 15,
    borderRadius: 15,
    width: "60%",

  },
  closeButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Item;
