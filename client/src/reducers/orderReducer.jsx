export const placeOrderReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "PLACE_ORDER_REQUEST":
      return {
        loading: true,
      };
    case "PLACE_ORDER_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "PLACE_ORDER_FAILED":
      return {
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
  }
};

export const getUserOrdersReducer = (state = { orders: [] }, actions) => {
  switch (actions.type) {
    case "GET_USER_ORDERS_REQUEST":
      return {
        loading: true,
      };
    case "GET_USER_ORDERS_SUCCESS":
      return {
        success: true,
        loading: false,
        orders: actions.payload,
      };
    case "GET_USER_ORDERS_FAILED":
      return {
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = { orders: [] }, actions) => {
  switch (actions.type) {
    case "GET_ALL_ORDERS_REQUEST":
      return {
        loading: true,
      };
    case "GET_ALL_ORDERS_SUCCESS":
      return {
        loading: false,
        success: true,
        orders: actions.payload,
      };
    case "GET_ALL_ORDERS_FAILED":
      return {
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
  }
};

export const deliverOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELIVER_ORDER_REQUEST":
      return { loading: true };
    case "DELIVER_ORDER_SUCCESS":
      return { loading: false, success: true };
    case "DELIVER_ORDER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
