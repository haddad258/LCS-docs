import api from '../../Api/api';
import { ApiSupperSettings } from '../../Api/config';

const getUsersAdmin = async () => {
    try {
        const result = await api.get(ApiSupperSettings.api_UsersAdmin);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addUsersAdmin = async (status) => {
    try {
        const result = await api.post(ApiSupperSettings.api_UsersAdmin, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateUsersAdmin = async (data) => {
    try {
        const result = await api.put(`${ApiSupperSettings.api_UsersAdmin_update}${data.id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateUsersAdminPassword = async (data,id) => {
    try {
        const result = await api.put(`${ApiSupperSettings.api_UsersAdmin_update +"update/password/" }${id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const AdminFun = {
    getUsersAdmin,
    addUsersAdmin,
    updateUsersAdmin,
    updateUsersAdminPassword
};

export default AdminFun;
