// Reducers.js
const ADD_TO_CART = 'ADD_TO_CART';
const ADD_TO_CART_multiple = 'ADD_TO_CART_multiple';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_FROM_CART = 'UPDATE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
const initialState = {
  products: {}, // { id: { product, quantity } }
  total: 0,
};

// reducer.js
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCart(state, action.payload);
    case ADD_TO_CART_multiple:
      return addToCartMultiple(state, action.payload);
    case REMOVE_FROM_CART:
      return removeFromCart(state, action.payload);
    case DELETE_FROM_CART:
      return deleteFromCart(state, action.payload);
    case UPDATE_FROM_CART:
      return updateCart(state, action.payload);
    case CLEAR_CART:
      return clearCart(state, action.payload);
    default:
      return state;
  }
};
const addToCart = (state, payload) => {
  const { id, product, quantity } = payload;
  const updatedProducts = { [id]: { product, quantity } };
  const updatedTotal =  product.price * quantity;
  return {  products: updatedProducts, total: updatedTotal };
};
const addToCartMultiple = (state, payload) => {
  const { id, product, quantity } = payload;
  const updatedProducts = { ...state.products, [id]: { product, quantity } };
  const updatedTotal = state.total + product.price * quantity;
  return { ...state, products: updatedProducts, total: updatedTotal };
};
const removeFromCart = (state, payload) => {
  const { id } = payload;
  const { [id]: removedProduct, ...updatedProducts } = state.products;
  const updatedTotal = state.total - removedProduct.product.price * removedProduct.quantity;
  return { ...state, products: updatedProducts, total: updatedTotal };
};

const deleteFromCart = (state, payload) => {
  const { id } = payload;
  const { [id]: deletedProduct, ...updatedProducts } = state.products;
  const updatedTotal = state.total - deletedProduct.product.price * deletedProduct.quantity;

  return { ...state, products: updatedProducts, total: updatedTotal };
};

const updateCart = (state, payload) => {
  const { id, quantity } = payload;
  const updatedProducts = {
    ...state.products,
    [id]: { ...state.products[id], quantity },
  };

  const updatedTotal = calculateTotal(updatedProducts);

  return { ...state, products: updatedProducts, total: updatedTotal };
};
const clearCart = (state, payload) => {
  return {
    products: {},
    total: 0,
  }
};
const calculateTotal = (products) => {
  let total = 0;
  for (const id in products) {
    const { product, quantity } = products[id];
    total += product.price * quantity;
  }
  return total;
};

export default cartReducer