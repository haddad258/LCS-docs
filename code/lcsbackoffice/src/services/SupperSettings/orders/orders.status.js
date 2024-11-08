
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getStatusOrders = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_StatusOrders);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addStatusOrders = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_StatusOrders, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateStatusOrders = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_StatusOrders+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const StatusOrdersFun = {
    getStatusOrders,
    addStatusOrders,
    updateStatusOrders,
};

export default StatusOrdersFun;


