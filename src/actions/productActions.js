import axios from "../utils/axios";
import { getAccessToken } from "../utils/localStorage";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

export const getListProduct =
  (isAdmin, keyword = "", page = 1, limit = 12) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      let url = `api/v1/product?keyword=${keyword}&page=${page}&limit=${limit}`;
      if (isAdmin) {
        url = `api/v1/admin/product?keyword=${keyword}&page=${page}&limit=${limit}`;
      }
      const { data } = await axios.get(url);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data || [],
        meta: data.meta || {},
      });
    } catch (error) {
      console.log(error.response.data.message || error.message);
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: "Failed get list product",
      });
    }
  };

export const getDetailProduct = (isAdmin, id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    let url = `api/v1/product/${id}`;
    if (isAdmin) {
      url = `api/v1/admin/product/${id}`;
    }
    const { data } = await axios.get(url);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.data || {} });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: "Failed get detail product",
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    await axios.post(`/api/v1/admin/product`, product);

    dispatch({ type: PRODUCT_CREATE_SUCCESS });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const updateProduct = (productID, product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const accessToken = getAccessToken();
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };

    await axios.put(`/api/v1/admin/product/${productID}`, product, config);

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const createProductReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const accessToken = getAccessToken();
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };

    await axios.post(`/api/v1/review`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get("/api/v1/product/top");

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data.data || [],
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
