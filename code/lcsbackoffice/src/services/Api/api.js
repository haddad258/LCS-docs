import axios from 'axios';
import { API_URL } from './config';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('@accessToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiClient;