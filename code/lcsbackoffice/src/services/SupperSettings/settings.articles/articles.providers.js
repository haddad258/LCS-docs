import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getArticlesProvider = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_ArticlesProvider);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addArticlesProvider = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ArticlesProvider, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateArticlesProvider = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_ArticlesProvider+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const ArticlesProviderFun = {
    getArticlesProvider,
    addArticlesProvider,
    updateArticlesProvider,
};

export default ArticlesProviderFun;


