
import api from '../../Api/api.content';
import { ApiSupperSettings } from '../../Api/config';

const getImagesConfigs = async (entity) => {
    try {
        const result = await api.get(ApiSupperSettings.api_ImagesConfigs+entity);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addImagesConfigs = async (data) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ImagesConfigs, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateImagesConfigs = async (data,entity) => {
    try {
        const result = await api.put(ApiSupperSettings.api_ImagesConfigs+entity+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addImagesConfigsMultiples = async (data) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ImagesConfigsMutiples, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const ImagesConfigsFun = {
    getImagesConfigs,
    addImagesConfigs,
    updateImagesConfigs,
    addImagesConfigsMultiples
};

export default ImagesConfigsFun;


