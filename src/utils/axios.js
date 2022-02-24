import axios from "axios";
import store from "../store";

const axiosApi = axios.create({
  timeout: 20000,
});

axiosApi.defaults.headers["Content-Type"] = "application/json";
axiosApi.defaults.headers.common.Authorization = `Bearer ${
  store.getState().userLogin.userInfo.access_token || ""
}`;

axiosApi.defaults.baseURL = "/";

// axiosApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosApi;
