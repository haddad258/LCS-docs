
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getProviderCalendar = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_ProviderCalendar);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addProviderCalendar = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_ProviderCalendar, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateProviderCalendar = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_ProviderCalendar+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const ProviderCalendarFun = {
    getProviderCalendar,
    addProviderCalendar,
    updateProviderCalendar,
};

export default ProviderCalendarFun;


