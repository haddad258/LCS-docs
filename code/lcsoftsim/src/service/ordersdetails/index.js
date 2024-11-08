import api from '../Api/api';
import { Apis } from '../Api/config';

const getOrderDetails = async (id) => {
    try {
        console.log(Apis.api_orders_detail + id)
        const result = await api.get(Apis.api_orders_detail + id);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const addOrderDetails = async (status) => {
    try {
        const result = await api.post(Apis.api_orders_detail, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateOrderDetails = async (data) => {
    try {
        const result = await api.put(`${Apis.api_updateorder_detail}${data.id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const OrderDetailsFun = {
    getOrderDetails,
    addOrderDetails,
    updateOrderDetails,
};

export default OrderDetailsFun;
