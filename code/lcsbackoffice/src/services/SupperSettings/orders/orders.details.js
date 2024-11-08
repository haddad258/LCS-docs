
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getOrdersDetails = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_OrdersDetails);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addOrdersDetails = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_OrdersDetails, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateOrdersDetails = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_OrdersDetails+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const OrdersDetailsFun = {
    getOrdersDetails,
    addOrdersDetails,
    updateOrdersDetails,
};

export default OrdersDetailsFun;


