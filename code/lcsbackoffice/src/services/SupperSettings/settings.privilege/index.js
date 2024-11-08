import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getPrivilege = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_Privilege);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addPrivilege = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_Privilege, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updatePrivilege = async (data) => {
    try {
        const result = await api.put(`${ApiSupperSettings.api_Privilege_update}${data.id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const AdminFun = {
    getPrivilege,
    addPrivilege,
    updatePrivilege,
};

export default AdminFun;
