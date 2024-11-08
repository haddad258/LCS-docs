// cartReducer.js
const ADD_TO_CART = 'ADD_TO_CART';
const ADD_TO_CART_multiple = 'ADD_TO_CART_multiple';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_FROM_CART = 'UPDATE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
// Action types

// Action creators

export const  addToCartMultiple = (id,product,quantity) => {
  return {
    type: ADD_TO_CART_multiple,
    payload:{ id, product, quantity },
  };
};
export const addToCart = (id,product,quantity) => {
  return {
    type: ADD_TO_CART,
    payload:{ id, product, quantity },
  };
};
export const removeFromCart = (id,productremove,quantity) => {
  return {
    type: REMOVE_FROM_CART,
    payload:{ id, productremove, quantity },
  };
};


export const clearCart = () => ({
  type: CLEAR_CART,
});

export const updateFromCart = (idupdate, productupdate, quantityupdate, freeQuantity, discountType, discountPercentage, discountValue, finalPrice) => {
  return {
    type: UPDATE_FROM_CART,
    payload:{idupdate, productupdate, quantityupdate, freeQuantity, discountType, discountPercentage, discountValue, finalPrice},
  };
};
