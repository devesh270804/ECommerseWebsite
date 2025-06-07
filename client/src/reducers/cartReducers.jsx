export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (x) => x._id === item._id && x.varient === item.varient
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === item._id && x.varient === item.varient
              ? {
                  ...x,
                  quantity: item.quantity,
                  price: item.quantity * x.prices[0][x.varient],
                }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) =>
            !(
              x._id === action.payload._id &&
              x.varient === action.payload.varient
            )
        ),
      };

    case "SET_CART":
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
