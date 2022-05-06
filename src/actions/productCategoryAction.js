import axios from "../utils/axios";
import { getAccessToken } from "../utils/localStorage";

import {
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
} from "../constants/productCategoryConstants";

export const getListProductCategory = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST });

    const { data } = await axios.get("api/v1/product-category");

    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data.data || [] });
  } catch (error) {
    console.log(error.response.data.message || error.message);

    dispatch({
      type: PRODUCT_CATEGORY_LIST_FAIL,
      payload: "Failed get list product category",
    });
  }
};
