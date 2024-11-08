import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getArticlesDiscount = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_ArticlesDiscount);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addArticlesDiscount = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ArticlesDiscount, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateArticlesDiscount = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_ArticlesDiscount+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const ArticlesDiscountFun = {
    getArticlesDiscount,
    addArticlesDiscount,
    updateArticlesDiscount,
};

export default ArticlesDiscountFun;


