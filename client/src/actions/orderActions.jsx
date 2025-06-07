import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  const currentUser = getState().userLoginReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  dispatch({ type: "PLACE_ORDER_REQUEST" });
  try {
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    const response = await axios.post("/api/orders/placeorder", {
      token,
      subtotal,
      currentUser,
      cartItems,
    });
    console.log(response);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAILURE" });
    console.log(error);
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().userLoginReducer.currentUser;
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

  try {
    const response = await axios.post("/api/orders/getuserorders", {
      userid: currentUser._id,
    });
    console.log(response);
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
  }
};
