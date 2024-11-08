// store.js

import { configureStore } from "@reduxjs/toolkit";
// import UserInfoReducer from './user/reducer'
import changeState from './StateStore/reducer'
const store = configureStore({
  reducer: {
    // UserInfoReducer: UserInfoReducer,
    changeState:changeState
  },
});

export default store;
