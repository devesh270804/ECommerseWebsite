import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import PizzasList from "./PizzasList";
import OrdersList from "./OrdersList";
import AddPizza from "./AddPizza";
import "./AdminScreen.css";

export default function AdminScreen() {
  const userState = useSelector((state) => state.userLoginReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser]);

  return (
    <div className="admin-container">
      <h3 className="admin-title">Admin Panel</h3>
      <ul className="admin-nav">
        <li>
          <Link to="/admin/userslist">Users List</Link>
        </li>
        <li>
          <Link to="/admin/pizzaslist">Pizzas List</Link>
        </li>
        <li>
          <Link to="/admin/addpizza">Add New Pizza</Link>
        </li>
        <li>
          <Link to="/admin/orderslist">Orders List</Link>
        </li>
      </ul>

      <Routes>
        <Route index element={<UsersList />} />
        <Route path="userslist" element={<UsersList />} />
        <Route path="pizzaslist" element={<PizzasList />} />
        <Route path="addpizza" element={<AddPizza />} />
        <Route path="orderslist" element={<OrdersList />} />
      </Routes>
    </div>
  );
}
