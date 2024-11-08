
  import api from '../../Api/api';
  import { ApiSupperSettings } from '../../Api/config';
  
  const getArticles = async () => {
      try {
          const result = await api.get(ApiSupperSettings.api_Articles);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const addArticles = async (status) => {
      try {
          const result = await api.post(ApiSupperSettings.api_Articles, status);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const updateArticles = async (data) => {
      try {
          const result = await api.put(ApiSupperSettings.api_Articles+data.id, data);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  
  const getArticlesImages = async (id) => {
    try {
        const result = await api.get(ApiSupperSettings.api_ArticlesImages+id);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


  
  const ArticlesFun = {
      getArticles,
      addArticles,
      updateArticles,
      getArticlesImages
      
  };
  
  export default ArticlesFun;
  

  