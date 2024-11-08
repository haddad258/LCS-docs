
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getPublications = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_Publications);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addPublications = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_Publications, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updatePublications = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_Publications+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const PublicationsFun = {
    getPublications,
    addPublications,
    updatePublications,
};

export default PublicationsFun;


