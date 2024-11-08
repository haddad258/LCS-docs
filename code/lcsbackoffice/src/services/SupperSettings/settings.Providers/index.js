
  import api from '../../Api/api';
  import { ApiSupperSettings } from '../../Api/config';
  
  const getProviders = async () => {
      try {
          const result = await api.get(ApiSupperSettings.api_Providers);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const addProviders = async (status) => {
      try {
          const result = await api.post(ApiSupperSettings.api_Providers, status);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const updateProviders = async (data) => {
      try {
          const result = await api.put(ApiSupperSettings.api_Providers+data.id, data);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  
  const updateProvidersCridentials = async (data,id) => {
    try {
        const result = await api.put(ApiSupperSettings.api_Providers+"update/password/"+id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


  
  const ProvidersFun = {
      getProviders,
      addProviders,
      updateProviders,
      updateProvidersCridentials
  };
  
  export default ProvidersFun;
  

  