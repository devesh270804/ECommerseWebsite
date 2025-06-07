import React, { useState } from "react";
import "./PizzaComponents.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function PizzaComponent({ pizza }) {
  const [varient, setVarient] = useState(pizza.varients[0]);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const totalPrice = pizza.prices[0][varient] * quantity;

  const dispatch = useDispatch();

  function AddtoCart() {
    dispatch(addToCart(pizza, quantity, varient));
    alert("Pizza added to cart");
  }

  return (
    <div className="pizza-component-container">
      <div className="pizza">
        <h1>{pizza.name}</h1>

        <div
          className="pizza-image"
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer" }}
        >
          <img src={pizza.image} alt={pizza.name} />
        </div>

        <div className="flex-box">
          <div className="pizza-varients">
            <span>Varients</span>
            <select
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
            >
              {pizza.varients.map((variant, index) => (
                <option key={index} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>

          <div className="pizza-prices">
            <span>Quantity</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(10).keys()].map((val, index) => (
                <option key={index} value={val + 1}>
                  {val + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pizza-info">
          <span>₹ {totalPrice} </span>
          <button className="btn" onClick={() => AddtoCart()}>
            Add to Cart
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>{pizza.name}</h5>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <img src={pizza.image} alt={pizza.name} className="modal-image" />
              <p>{pizza.description}</p>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
