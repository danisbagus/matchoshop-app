import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setToken,
} from "../utils/localStorage";

const axiosApi = axios.create({
  timeout: 20000,
});

// Add a request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    config.headers["Content-Type"] = "application/json";
    config.baseURL = "/";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      const accessToken = getAccessToken();

      return axios
        .post("/api/v1/auth/refresh", {
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            const newAccesToken = res.data.data.access_token;

            setToken({ accessToken: newAccesToken, refreshToken });

            axiosApi.defaults.headers.common.Authorization = `Bearer ${newAccesToken}`;
            return axiosApi(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
