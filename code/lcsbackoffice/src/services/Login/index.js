import api from '../Api/api';
import { Apis } from '../Api/config';
import { NotificationManager } from "react-notifications";
import { setCookie } from "../jwt/function";
const UserLogin = async (data) => {
    try {
        let result = await api.post(Apis.UserLoginAPI, data, {
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                withCredentials: false,
                changeOrigin: true,
            },
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        return null;
    }
};

const UserLoginEmploye = async (data) => {
    try {
        let result = await api.post(Apis.UserLoginEmployeAPI, data, {
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                withCredentials: false,
                changeOrigin: true,
            },
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        return null;
    }
};

const authenticate = (user, next) => {
    localStorage.setItem('@access_token', user.accessToken)
    next();
    if (typeof window !== "undefined") {
        setCookie("@token_session", user.accessToken, 10);
        next();
    }
};
const GET_Role = () => {

if(localStorage.getItem('@access_token')){
    var decodedHeader = (localStorage.getItem('@access_token'));
    return decodedHeader.roles}else {return []}

}
const logout = () => {
    localStorage.removeItem('@access_token', )
};


var LoginFun ={
    UserLogin,
    authenticate,
    GET_Role,
    logout,
    UserLoginEmploye
};
export default  LoginFun

