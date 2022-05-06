import axios from "../utils/axios";
import { setToken, getAccessToken, clearToken } from "../utils/localStorage";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data || {},
    });

    localStorage.setItem("userInfo", JSON.stringify(data.data));

    setToken({
      accessToken: data.data.access_token || "",
      refreshToken: data.data.refresh_token || "",
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  clearToken();
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAIL_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
  document.location.href = "/login";
};

export const register =
  (email, name, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const { data } = await axios.post("/api/v1/auth/register/customer", {
        email,
        name,
        password,
        confirm_password: confirmPassword,
      });

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.data || {},
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data || {},
      });

      localStorage.setItem("userInfo", JSON.stringify(data.data));
      localStorage.setItem("accessToken", data.data.access_token);
      localStorage.setItem("refreshToken", data.data.refresh_token);
    } catch (error) {
      console.log(error.response.data.message || error.message);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const getUserDetail =
  (isAdmin = false, id = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_DETAIL_REQUEST });

      let url = "/api/v1/user";
      if (isAdmin) {
        url = `/api/v1/admin/user/${id}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: USER_DETAIL_SUCCESS,
        payload: data.data || [],
      });
    } catch (error) {
      console.log(error.response.data.message || error.message);
      dispatch({
        type: USER_DETAIL_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const { data } = await axios.patch("/api/v1/user/profile", user);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.data || [],
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data || {},
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const getUserList = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/v1/admin/user");

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.data || [],
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const updateUser = (userID, user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const { data } = await axios.patch(`/api/v1/admin/user/${userID}`, user);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data.data || [] });

    dispatch({ type: USER_DETAIL_RESET });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
