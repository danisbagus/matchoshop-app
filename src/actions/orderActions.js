import axios from "../utils/axios";
import { getAccessToken } from "../utils/localStorage";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { data } = await axios.post(`/api/v1/order`, order);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.data || {},
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const getOrderDetails =
  (id, isAdmin = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      let url = `api/v1/order/${id}`;
      if (isAdmin) {
        url = `api/v1/admin/order/${id}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data.data || {},
      });
    } catch (error) {
      console.log(error.response.data.message || error.message);
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const { data } = await axios.put(
      `/api/v1/order/${orderId}/pay`,
      paymentResult
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data.data || {},
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const { data } = await axios.get(`/api/v1/order`);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.data || {},
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/order`);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.data || {},
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const { data } = await axios.put(`/api/v1/admin/order/${id}/deliver`, {});

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data.data || {},
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
