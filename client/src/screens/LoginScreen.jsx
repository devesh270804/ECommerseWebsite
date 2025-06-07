import React, { useState, useEffect } from "react";
import "./RegisterScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";

export default function LoginScreen() {
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function login(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    const user = {
      email,
      password,
    };
    console.log("User logged in:", user);
    dispatch(loginUser(user));
  }

  return (
    <div className="register-screen-container">
      <form className="register-form">
        <h2>Login Screen</h2>
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
        <button onClick={login} className="">
          Login
        </button>
        <a
          style={{
            textDecoration: "none",
            fontWeight: "600",
            color: "black",
            margin: "1rem auto",
            textAlign: "center",
          }}
          href="/register"
        >
          Click here to Register
        </a>
      </form>
    </div>
  );
}
