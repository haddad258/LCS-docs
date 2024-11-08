// const API_URL = "http://192.168.1.28:3009/mobile";
const API_URL = "https://api.dev.lcs-system.com/mobile";

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
export { API_URL, Apis };
