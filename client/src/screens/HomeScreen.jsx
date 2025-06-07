import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PizzaComponent from "../components/PizzaComponent.jsx";
import "./HomeScreen.css";
import { getAllPizzas } from "../actions/pizzaActions.jsx";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const pizzaState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzaState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);
  return (
    <div className="pizzas">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : pizzas && pizzas.length > 0 ? (
        pizzas.map((pizza) => <PizzaComponent pizza={pizza} key={pizza._id} />)
      ) : (
        <h2>No pizzas found</h2>
      )}
    </div>
  );
}
