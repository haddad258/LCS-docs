// store/actions/userActions.js

export const setUserInfo = (userInfo) => {
  return {
    type: 'SET_USER_INFO',
    payload: { userInfo },
  };
};

export const updateUserInfo = (updatedInfo) => {
  return {
    type: 'UPDATE_USER_INFO',
    payload: { updatedInfo },
  };
};

export const clearUserInfo = () => {
  return {
    type: 'CLEAR_USER_INFO',
  };
};
