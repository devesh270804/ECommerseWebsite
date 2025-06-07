import React, { useState, useEffect } from "react";
import "./RegisterScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  function register(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const user = {
      name,
      email,
      password,
    };
    console.log("User registered:", user);
    dispatch(registerUser(user));
  }

  return (
    <div className="register-screen-container">
      <form className="register-form">
        <h2>Register Screen</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={register} className="">
          Register
        </button>
        <a
          style={{
            textDecoration: "none",
            fontWeight: "600",
            color: "black",
            margin: "1rem auto",
            textAlign: "center",
          }}
          href="/login"
        >
          Click here to Login
        </a>
      </form>
    </div>
  );
}
