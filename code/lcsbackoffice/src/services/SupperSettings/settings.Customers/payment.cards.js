
import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getPaymentCards = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_PaymentCards);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addPaymentCards = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_PaymentCards, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updatePaymentCards = async (data) => {
    try {
        const result = await api.put(ApiSupperSettings.api_PaymentCards+data.id, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const PaymentCardsFun = {
    getPaymentCards,
    addPaymentCards,
    updatePaymentCards,
};

export default PaymentCardsFun;


