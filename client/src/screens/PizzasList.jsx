import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import "./PizzasList.css";

export default function PizzasList() {
  const dispatch = useDispatch();
  const pizzaState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, loading, error } = pizzaState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  return (
    <div className="pizzas-list-container">
      <h2>Pizzas List</h2>
      {loading && <h3>Loading...</h3>}
      {error && <h3>Something went wrong..</h3>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <tr key={pizza._id}>
                  <td>{pizza.name}</td>
                  <td>
                    Small : {pizza.prices[0]["small"]} <br />
                    Medium : {pizza.prices[0]["medium"]} <br />
                    Large : {pizza.prices[0]["large"]}
                  </td>
                  <td>{pizza.catergory}</td>
                  <td>
                    <button>Delete</button>
                    <button>Update</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
