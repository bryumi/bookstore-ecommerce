import { localStorageKeys } from "@/utils/localStorageKeys";
import axios from "axios";
export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(localStorageKeys.accessToken);
    if (accessToken && config.url !== "/clients") {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;

// export async function refreshAccessToken() {
//   try {
//     const credentials = localStorage.getItem(
//       localStorageKeys.refreshToken,
//     );

//     if (
//       typeof credentials === 'string' &&
//       credentials !== 'undefined'
//     ) {
//       const { data } = await api.post('/auth/local/refresh', {
//         refreshToken: credentials,
//       });

//       localStorage.setItem(localStorageKeys.accessToken, data.jwt);

//       return data?.jwt;
//     }

//     throw new Error('Invalid credentials');
//   } catch (error) {
//     localStorage.removeItem(localStorageKeys.accessToken);
//     localStorage.removeItem(localStorageKeys.refreshToken);
//     localStorage.removeItem(localStorageKeys.user);
//     window.location.href = '/';
//     return null;
//   }
// }
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest.retry &&
//       originalRequest.url !== '/auth/local/refresh'
//     ) {
//       originalRequest.retry = true;
//       const accessToken = await refreshAccessToken();
//       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//       return api(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );
