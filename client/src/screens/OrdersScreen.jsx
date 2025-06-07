import React from "react";
import "./OrdersScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserOrders } from "../actions/orderActions";

export default function OrdersScreen() {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, loading, error } = orderState;

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      <div className="orders-container">
        {loading && <h2>Loading...</h2>}
        {error && <h2>Something went wrong</h2>}
        {orders &&
          orders.map((order) => (
            <div key={order._id} className="order-card">
              {/* Product Details */}
              <div className="order-column">
                <h3>Product Details</h3>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="item-block">
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Product ID:</strong> {item._id}
                    </p>
                    <p>
                      <strong>Varient:</strong> {item.varient}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                    <hr />
                  </div>
                ))}
              </div>

              {/* User Info */}
              <div className="order-column">
                <h3>User Info</h3>
                <p>
                  <strong>User ID:</strong> {order.userid}
                </p>
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Transaction ID:</strong> {order.transactionId}
                </p>
              </div>

              {/* Address + Status */}
              <div className="order-column">
                <h3>Shipping & Status</h3>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country} - ${order.shippingAddress.zip}`}
                </p>
                <p>
                  <strong>Order Amount:</strong> ₹{order.orderAmount}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {order.isDelivered ? (
                    <span className="delivered">Delivered</span>
                  ) : (
                    <span className="not-delivered">Not Delivered</span>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
