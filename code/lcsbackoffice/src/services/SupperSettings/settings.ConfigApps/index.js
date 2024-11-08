
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getConfigApps = async (uri) => {
    try {
        const result = await api.get(ApiSupperSettings.api_ConfigApps+uri);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addConfigApps = async (data,uri) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ConfigApps+uri, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateConfigApps = async (data,uri) => {
    try {
        const result = await api.put(ApiSupperSettings.api_ConfigApps+uri, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const ConfigAppsFun = {
    getConfigApps,
    addConfigApps,
    updateConfigApps,
};

export default ConfigAppsFun;


