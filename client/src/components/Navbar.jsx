import React, { useState } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.userLoginReducer);
  const { currentUser } = userState;

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <a href="/" style={{ textDecoration: "none", color: "white" }}>
            <h1>Dev Pizza</h1>
          </a>
        </div>
        <div className="links">
          <ul>
            {currentUser ? (
              <li className="dropdown">
                <div className="dropdown-wrapper">
                  <button className="dropdown-btn" onClick={toggleDropDown}>
                    {currentUser.name}{" "}
                    <span style={{ fontSize: "0.7rem" }}>▼</span>
                  </button>

                  {isOpen && (
                    <div className="dropdown-content">
                      <a href="/orders">Orders</a>
                      <a onClick={dispatch(logoutUser)}>Logout</a>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
            <li>
              <a style={{ textDecoration: "none " }} href="/cart">
                Cart {cartState.cartItems.length}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
