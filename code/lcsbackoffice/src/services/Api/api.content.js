import axios from 'axios';
import { API_URL } from './config';
//import { getCookie } from '../jwt/function'

export default axios.create({
    baseURL : API_URL,
    headers : {
     //  "Authorization": getCookie('token'),
     'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Headers': 'Authorization',
        "x-access-token": localStorage.getItem('@access_token'),
        'Authorization': 'Bearer ' + localStorage.getItem('@access_token'),
    },
})