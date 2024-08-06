import axios from "axios";
import { getAccessToken, setAccessToken, getRefreshToken, clearTokens } from "./authService";

// const token = localStorage.getItem('token')
// const instance = axios.create({
//     baseURL: 'https://localhost:44389',
//     timeout: 5000,
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
// })

const instance = axios.create({
    baseURL: 'https://localhost:44389',
    timeout: 5000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = getRefreshToken();
//         try {
//           const response = await instance.post('/refresh-token', { token: refreshToken });
//           if (response.status === 200) {
//             const { accessToken } = response.data;
//             setAccessToken(accessToken);
//             instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//             return instance(originalRequest);
//           }
//         } catch (err) {
//           clearTokens();
//           window.location.href = '/login'; // Redirect to login if refresh token fails
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

export default instance;