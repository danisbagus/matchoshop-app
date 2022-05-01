import axios from "../utils/axios";

import {
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
} from "../constants/productCategoryConstants";

export const getListProductCategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.get("api/v1/product-category", config);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data.data || [] });
  } catch (error) {
    console.log(error.response.data.message || error.message);
    dispatch({
      type: PRODUCT_CATEGORY_LIST_FAIL,
      payload: "Failed get list product category",
    });
  }
};
