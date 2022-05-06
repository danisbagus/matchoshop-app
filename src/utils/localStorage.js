const setToken = (tokenObj) => {
  localStorage.setItem("accessToken", tokenObj.accessToken);
  localStorage.setItem("refreshToken", tokenObj.refreshToken);
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const clearToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export { setToken, getAccessToken, getRefreshToken, clearToken };
