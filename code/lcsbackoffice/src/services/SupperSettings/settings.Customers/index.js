
  import api from '../../Api/api';
  import { ApiSupperSettings } from '../../Api/config';
  
  const getCustomers = async () => {
      try {
          const result = await api.get(ApiSupperSettings.api_Customers);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const addCustomers = async (status) => {
      try {
          const result = await api.post(ApiSupperSettings.api_Customers, status);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const updateCustomers = async (data) => {
      try {
          const result = await api.put(ApiSupperSettings.api_Customers+data.id, data);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  
  const updateCustomersCridentials = async (data,id) => {
    try {
        const result = await api.put(ApiSupperSettings.api_Customers+"update/password/"+id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const getCustomersImages = async (id) => {
    try {
        const result = await api.get(ApiSupperSettings.api_CustomersImages+id);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

  
  const CustomersFun = {
      getCustomers,
      addCustomers,
      updateCustomers,
      updateCustomersCridentials,
      getCustomersImages
  };
  
  export default CustomersFun;
  

  