
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getArticlesNote = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_ArticlesNote);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addArticlesNote = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ArticlesNote, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateArticlesNote = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_ArticlesNote+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const ArticlesNoteFun = {
    getArticlesNote,
    addArticlesNote,
    updateArticlesNote,
};

export default ArticlesNoteFun;


