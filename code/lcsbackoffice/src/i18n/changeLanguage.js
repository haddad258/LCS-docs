import axios from 'axios';
import i18next from 'i18next';

// Function to change language
const changeLanguage = (newLang) => {
  // Update localStorage
  localStorage.setItem('lang', newLang);
  
  // Update Accept-Language header for axios
  axios.defaults.headers.common['Accept-Language'] = newLang;
  
  // Change language in i18next
  i18next.changeLanguage(newLang);
};

export default changeLanguage;