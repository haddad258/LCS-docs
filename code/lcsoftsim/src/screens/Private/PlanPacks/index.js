import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCartMultiple, removeFromCart } from '../../../store/cart/actions';
import { useFocusEffect } from '@react-navigation/native';
import { PlanPank } from '../../../service';
import { Colors } from '../../../core/theme';
import ProductCard from './PlanPack';
import { showToast } from '../../../components/Toast';
function App  (props) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getProductsList = async () => {
    const list = await PlanPank.getPlanPack();
    console.log(list);
    if (list) setProducts(list);
  };

  const handleAddToCart = (product) => {
    showToast("add to cart")
    dispatch(addToCartMultiple(product.id, product, 1));
  };

  const handleRemoveFromCart = (product) => {
    showToast("remove from cart")
    dispatch(removeFromCart(product.id, product, 1));
  };
  const checkout = () => {
    props.navigation.navigate("MyCart");
  };

  
  useEffect(() => {
    getProductsList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('HomeScreen is focused');
      getProductsList();
      return () => {
        console.log('HomeScreen is unfocused');
      };
    }, [])
  );

  const renderProductItem = ({ item }) => (
    <ProductCard item={item} onIncrement={() => handleAddToCart(item)} onDecrement={() => handleRemoveFromCart(item)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        style={styles.productList}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      />
      <TouchableOpacity  onPress={()=> checkout("heere")} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  productList: {
    flex: 1,
    paddingTop: 16,
  },
  continueButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.info,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
