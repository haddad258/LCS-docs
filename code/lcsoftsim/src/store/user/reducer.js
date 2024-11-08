// userReducers.js
const SET_USER_INFO = 'SET_USER_INFO';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

const initialState = {
  userInfo: {}, // User information object
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return setUserInfo(state, action.payload);
    case UPDATE_USER_INFO:
      return updateUserInfo(state, action.payload);
    case CLEAR_USER_INFO:
      return clearUserInfo();
    default:
      return state;
  }
};

const setUserInfo = (state, payload) => {
  const { userInfo } = payload;
  return { ...state, userInfo: { ...userInfo } };
};

const updateUserInfo = (state, payload) => {
  const { updatedInfo } = payload;
  return { ...state, userInfo: { ...state.userInfo, ...updatedInfo } };
};

const clearUserInfo = () => {
  return { userInfo: {} };
};

export default userReducer;
