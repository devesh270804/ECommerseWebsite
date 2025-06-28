import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import "./PizzasList.css";
import { Link } from "react-router-dom";

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
                    <button onClick={() => dispatch(deletePizza(pizza._id))}>
                      Delete
                    </button>
                    <Link to={`/admin/editpizza/${pizza._id}`}>
                      <button>Update</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
