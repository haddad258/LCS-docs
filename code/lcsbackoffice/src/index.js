import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// import './app.css';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/store'
import { AuthProvider } from 'src/components/context/JWTAuthContext';
import './i18n';
import axios from 'axios';
import i18next from 'i18next';

const lang=localStorage.getItem('lang')||'fr';
axios.defaults.headers.common['Accept-Language']=lang;
i18next.changeLanguage(lang);
createRoot(document.getElementById('root')).render(
  <Provider  store={store}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
