const axios = require('axios');
// const API_URL = "https://api.dev.lcs-system.com/mobile";
const API_URL = "http://192.168.1.28:3009/mobile";
const Apis = {
    UserLoginAPI: `${API_URL}/api/customers/root/login`,
    API_PlanPack: `${API_URL}/api/public/plan/packs`,
    API_PlanPackCategorie: `${API_URL}/api/public/plan/packs/categories/`,
    API_Product_PlanPack: `${API_URL}/api/products/info/products/`,
  
    
    API_ProfilesDisponible: `${API_URL}/api/profiles`,
    Api_RegisterCustomer: `${API_URL}/api/customers/`,
    API_updateCustomer: `${API_URL}/api/customers/update`,
    API_getCustomer: `${API_URL}/api/customers/my/info`,
    
    api_Categories: `${API_URL}/api/categories/`,
  
    Api_NewOrderNewSubscription: `${API_URL}/api/private/orders/newsubscription/create`,
    Api_NewOrderOldSubscription: `${API_URL}/api/private/orders/oldsubscription/create`,
    api_getordres: `${API_URL}/api/private/orders`,
    api_orders_detail: `${API_URL}/api/private/ordersdetails/info/`,
    api_updateorder_detail: `${API_URL}/api/private/ordersdetails/`,
    
  
    
  
    Api_getSubscriptions: `${API_URL}/api/my/subscriptions`,
  
  
  };
  async function fetchMultipleAPIs() {
    const startTime = performance.now();
    let count = 0; // Track API call count
  
    const makeAPICall = async () => {
      try {
        const response = await axios.get(Apis.API_PlanPack);
        console.log("response.data"); // Process response if needed
      } catch (error) {
        console.error(error);
      } finally {
        count++;
        if (count < 400) { // Adjust limit as needed
          setTimeout(makeAPICall, 10); // Delay between calls (adjust delay)
        } else {
          const endTime = performance.now();
          const elapsedTime = endTime - startTime;
          console.log("Elapsed time:", elapsedTime, "ms");
        }
      }
    };
  
    makeAPICall(); // Start the first call
  }
  
  fetchMultipleAPIs();