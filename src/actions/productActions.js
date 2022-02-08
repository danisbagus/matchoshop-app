import axios from "../utils/axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
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
