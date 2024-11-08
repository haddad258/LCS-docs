import React from 'react';
import { Provider } from 'react-redux';
import AppStore from './AppStores';
import store from './src/store/store';
const App = () => {
  return (
    <Provider store={store}>
      <AppStore />
   </Provider>
  );
};

export default App;