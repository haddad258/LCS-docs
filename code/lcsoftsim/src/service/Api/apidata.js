import axios from 'axios';
import { API_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',

  },
});
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@Token_jwt");
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
      config.headers["Authorization"] = 'Bearer ' + token; // for Node.js Express back-end
    }
    return  config

  },
  (error) => {
    return Promise.reject(error);
  }
);
// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (originalConfig.url !== "/auth/signin" && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         try {
//           const rs = await instance.post("/auth/refreshtoken", {
//             refreshToken: TokenService.getLocalRefreshToken(),
//           });
//           const { accessToken } = rs.data;
//           TokenService.updateLocalAccessToken(accessToken);
//           return instance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }
//     return Promise.reject(err);
//   }
// );
export default instance;
