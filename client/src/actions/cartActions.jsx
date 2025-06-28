export const addToCart = (pizza, quantity, varient) => (dispatch, getState) => {
  if (quantity < 1) {
    return dispatch(removeFromCart({ _id: pizza._id, varient }));
  }

  if (quantity > 10) {
    alert("You cannot add more than 10 items of the same pizza.");
    return;
  }

  const cartItems = getState().cartReducer.cartItems;
  const existingItemIndex = cartItems.findIndex(
    (item) => item._id === pizza._id && item.varient === varient
  );

  let updatedCartItems = [...cartItems];

  if (existingItemIndex !== -1) {
    // Update quantity and price of existing item
    updatedCartItems[existingItemIndex] = {
      ...updatedCartItems[existingItemIndex],
      quantity,
      price: quantity * pizza.prices[0][varient],
    };
  } else {
    // Add new item to cart
    updatedCartItems.push({
      name: pizza.name,
      _id: pizza._id,
      image: pizza.image,
      varient,
      quantity,
      prices: pizza.prices,
      price: pizza.prices[0][varient] * quantity,
    });
  }

  dispatch({ type: "SET_CART", payload: updatedCartItems });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};

export const removeFromCart = (pizza) => (dispatch, getState) => {
  const updatedCartItems = getState().cartReducer.cartItems.filter(
    (item) => !(item._id === pizza._id && item.varient === pizza.varient)
  );

  dispatch({ type: "SET_CART", payload: updatedCartItems });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};
