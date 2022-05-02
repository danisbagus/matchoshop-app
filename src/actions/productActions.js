import axios from "../utils/axios";

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
} from "../constants/productConstants";

export const getListProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("api/v1/product");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data || [] });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: "Failed get list product",
    });
  }
};

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.data || {} });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: "Failed get detail product",
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    await axios.delete(`/api/v1/admin/product/${id}`, config);

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

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    await axios.post(`/api/v1/admin/product`, product, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
    });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const updateProduct =
  (productID, product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`,
        },
      };

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
