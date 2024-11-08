import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getArticlesPlack = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_ArticlesPlack);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addArticlesPlack = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ArticlesPlack, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateArticlesPlack = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_ArticlesPlack+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const ArticlesPlackFun = {
    getArticlesPlack,
    addArticlesPlack,
    updateArticlesPlack,
};

export default ArticlesPlackFun;


