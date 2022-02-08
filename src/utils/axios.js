import axios from "axios";

const axiosApi = axios.create({
  timeout: 20000,
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlX2lkIjoxLCJleHAiOjE2NDQzNDQ3OTJ9.PCBGXVF2jEyI_siZ5jNWub_J4_WqJc0hcgFAAzK-ICM";

// axiosApi.defaults.headers["Content-Type"] = "application/json";
axiosApi.defaults.headers.common.Authorization = `Bearer ${token}`;
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
