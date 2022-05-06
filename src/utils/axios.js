import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setToken,
} from "../utils/localStorage";

const axiosApi = axios.create({
  timeout: 20000,
});

const accessToken = getAccessToken();

axiosApi.defaults.headers["Content-Type"] = "application/json";

axiosApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

axiosApi.defaults.baseURL = "/";

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      return axios
        .post("/api/v1/auth/refresh", {
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log(res.data.data.access_token);

            setToken({ accessToken: res.data.data.access_token, refreshToken });

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
