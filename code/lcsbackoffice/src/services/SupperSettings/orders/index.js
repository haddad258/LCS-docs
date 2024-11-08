
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getOrders = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_Orders);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addOrders = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_Orders, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateOrders = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_Orders + data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const OrdersFun = {
    getOrders,
    addOrders,
    updateOrders,
};

export default OrdersFun;


