import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";

export default function Checkout({ subtotal }) {
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  const dispatch = useDispatch();

  function tokenHandler(token) {
    dispatch(placeOrder(token, subtotal));
  }

  return (
    <div>
      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        token={tokenHandler}
        currency="INR"
        stripeKey="pk_test_51RWarPPVSpjB8PbVk2ElWDrCwCUKFCsZYAsZHJJ4E4M6kIt9cx4rLR8QsuEDhsRm1a626qkzaWrUyDoDvQjdWEp7002IMRYSJw"
      >
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Pay ₹{subtotal}
        </button>
      </StripeCheckout>
    </div>
  );
}
