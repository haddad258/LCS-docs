import React, { useEffect, useState,useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { Colors } from '../../../core/theme'
import { PlanPank } from '../../../service'
import { addToCart, removeFromCart } from '../../../store/cart/actions';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
function PlanPacks() {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  const getlist = async () => {
    var list = await PlanPank.getPlanPack()
    console.log(list)
    if (list) setUsers(list)
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product.id, product, 1));
  };
  useEffect(() => {
    getlist()
  }, [])
  useFocusEffect(
    useCallback(() => {
      console.log('HomeScreen is focused');
      getlist()
      return () => {
        console.log('HomeScreen is unfocused');
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          enableEmptySections={true}
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.box}>
                  {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
                  <View style={{ paddingLeft: 20 }} >
                    <Text style={styles.phonenumber}>{item.name}</Text>
                    <Text style={styles.description} numberOfLines={2} >{item.description}</Text>
                    <Text style={styles.imsi}>{item.MCC}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.iconContent}>
                    <Image
                      style={styles.icon}
                      source={{ uri: 'https://img.icons8.com/color/70/000000/plus.png' }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary

  },
  image: {
    width: 60,
    height: 60,
  },
  body: {
    backgroundColor: Colors.primary

  },
  box: {
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  imsi: {
    color: Colors.black,
    fontSize: 12,
    marginLeft: 10,
  },
  phonenumber:
  {
    color: Colors.primary,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "700"
  },
  description:
  {
    color: Colors.gray,
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 10,
    width: "90%"
  },
  iconContent: {
    width: 60,
    backgroundColor: Colors.info,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  icon: {
    width: 40,
    height: 40,
  },
})

export default PlanPacks


// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// export default function QRCodeScannerScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     console.log(data)
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <View style={styles.cameraContainer}>
//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={styles.camera}
//         />
//       </View>

//       {scanned && (
//         <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cameraContainer: {
//     width: 300,
//     height: 200,
//     overflow: 'hidden',
//     borderRadius: 10,
//     backgroundColor: 'transparent',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   camera: {
//     ...StyleSheet.absoluteFillObject,
//     width:300
//   },
// });
