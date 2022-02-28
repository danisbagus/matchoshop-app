import axios from "../utils/axios";

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
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post("/auth/v1/login", { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data || [],
    });

    localStorage.setItem("userInfo", JSON.stringify(data.data));
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (email, name, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const { data } = await axios.post("/auth/v1/register/customer", {
        email,
        name,
        password,
        confirm_password: confirmPassword,
      });

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.data || [],
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data || [],
      });

      localStorage.setItem("userInfo", JSON.stringify(data.data));
    } catch (error) {
      console.log(error.response.data.message || error.message);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const getUserDetail = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.get("/api/v1/user", config);

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
