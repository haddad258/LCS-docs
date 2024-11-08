const API_URL = process.env.REACT_APP_API_URL;
const API_URLPublic = API_URL+"/public/";
const API_URLPublicArticles = API_URL+"/public/imagesarticles/";
const API_URLPublicCustomers = API_URL+"/public/customers/";

const Apis = {
  UserLoginAPI: `${API_URL}/api/root/login`,
  UserLoginEmployeAPI: `${API_URL}/api/root/employe/login`,
  api_updatecridentials: `${API_URL}/api/root/update/credentials`,

};
const ApiSupperSettings = {

  api_UsersAdmin: `${API_URL}/api/users/admin`,
  api_UsersAdmin_update: `${API_URL}/api/users/admin/`,
  api_Privilege: `${API_URL}/api/privileges/list`,
  api_Privilege_update: `${API_URL}/api/privileges/list/`,
  ////////////////////////////////////////////////////////////////////////////////////////
  api_Customers: `${API_URL}/api/customers/`,
  api_Subscription: `${API_URL}/api/subscriptions/`,
  api_PaymentCards: `${API_URL}/api/payments/cards/`,
  
  api_CustomersImages: `${API_URL}/api/images/customers/`,

  
  api_Providers: `${API_URL}/api/providers/`,
  api_Publications: `${API_URL}/api/config/providers/publications/`,
  api_ProviderCalendar: `${API_URL}/api/config/providers/calendars`,
  
  
  api_ConfigApps: `${API_URL}/api/config/apps/`,
  api_Articles: `${API_URL}/api/configs/articles/`,
  api_ArticlesImages: `${API_URL}/api/images/articles/`,
  
  api_ArticlesDiscount: `${API_URL}/api/configs/discounts/articles`,
  api_ArticlesPlack: `${API_URL}/api/configs/placks/articles`,
  api_ArticlesProvider: `${API_URL}/api/config/providers/articles`,
  api_ArticlesNote: `${API_URL}/api/configs/review/crm/articles`,
  
  
  api_Placks: `${API_URL}/api/configs/placks/`,
  api_PaymentModes: `${API_URL}/api/configs/payment/mode/`,
  api_ProfilesIds: `${API_URL}/api/configs/profiles/keys/`,
  ///////////////////////////////////////////////////////////////
  api_StatusOrders: `${API_URL}/api/accounts/status/orders/`,
  api_Orders: `${API_URL}/api/accounts/list/orders/`,
  api_OrdersDetails: `${API_URL}/api/accounts/details/orders/`,
  
  
  




  ////////////////////////////////////////////////////////////////////////////
  API_ArticlesFilter: `${API_URL}/api/articles/config/module/settings/app/filterby/`,
  api_ImagesConfigs: `${API_URL}/upload/images/upload`,
  api_ImagesConfigsMutiples: `${API_URL}/multiples/upload/images/upload`,
  
  
  

};

export { API_URL, Apis, ApiSupperSettings ,API_URLPublic ,API_URLPublicArticles ,API_URLPublicCustomers};