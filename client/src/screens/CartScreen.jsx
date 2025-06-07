import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CartScreen.css";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-screen-container">
      <h1>Cart ({cartItems.length} items)</h1>
      <div className="cart-screen">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={`${item._id}-${item.varient}`}>
              <div className="cart-item-details">
                <h2>
                  {item.name} [{item.varient}]
                </h2>
                <p>
                  Price: {item.quantity} × ₹{item.prices[0][item.varient]} = ₹
                  {item.price}
                </p>
                <div className="quantity-control">
                  Quantity:{" "}
                  <span
                    onClick={() =>
                      dispatch(addToCart(item, item.quantity - 1, item.varient))
                    }
                  >
                    -
                  </span>
                  {item.quantity}
                  <span
                    onClick={() =>
                      dispatch(addToCart(item, item.quantity + 1, item.varient))
                    }
                  >
                    +
                  </span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  ❌ Remove
                </button>
              </div>
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Subtotal: ₹{subtotal}</h2>
          <Checkout subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
