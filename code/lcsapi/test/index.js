const axios = require('axios');
// const API_URL = "https://api.dev.lcs-system.com/mobile";
// const API_URL = "http://192.168.1.28:3009/mobile";
const API_URL = "http://192.168.1.28:3009";
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
  api_planpacksPost: `${API_URL}/api/planpacks`,
  Api_getSubscriptions: `${API_URL}/api/my/subscriptions`,
};

async function fetchMultipleAPIs() {
  const startTime = performance.now();
  
  
  const promises = [];
  
  for (let i = 11; i < 1000; i++) {
    console.log(`Posting data ${i}`);
    promises.push(
      axios.post(Apis.api_planpacksPost, {
        name: 'PlanPack 1' + i,
        title: "title" + i,
        keyword: "keyword" + i,
        description: "description" + i,
      })
    );
  }

  for (let i = 11; i < 1000; i++) {
    console.log(`Getting data ${i}`);
    promises.push(axios.get(Apis.api_planpacksPost));
  }

  try {
    // Await all promises
    const responses = await Promise.all(promises.map(p => p.catch(error => ({ error })))); // Handle errors for individual requests

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    console.log("Elapsed time:", elapsedTime, "ms");

    // Process each response
    responses.forEach((response, index) => {
      if (response.error) {
        console.error(`Request ${index} failed:`, response.error.message);
      } else {
        console.log(`Request ${index} succeeded:`, response.data);
      }
    });
    
    console.log("Total successful responses:", responses.filter(r => !r.error).length);

  } catch (error) {
    console.error("Unexpected error occurred:", error);
  }
}

fetchMultipleAPIs();
