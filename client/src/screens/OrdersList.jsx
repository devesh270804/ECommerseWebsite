import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";

export default function OrdersList() {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.getAllOrdersReducer);
  const { loading, orders, error } = ordersState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const handleOrderDelivery = (id) => {
    dispatch(deliverOrder(id)).then(() => dispatch(getAllOrders()));
  };

  return (
    <div>
      <h1>Orders List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {orders &&
        orders.map((order) => (
          <div key={order._id}>
            <div>
              <p>Name : {order.name}</p>
              <p>Email : {order.email}</p>
              <p>Amount : {order.orderAmount}</p>
              <p>Delivered : {order.isDelivered ? "Yes" : "Not Yet"}</p>
            </div>
            {!order.isDelivered && (
              <button onClick={() => handleOrderDelivery(order._id)}>
                {" "}
                Deliver{" "}
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
