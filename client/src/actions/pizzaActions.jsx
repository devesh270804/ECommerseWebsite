const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";
export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const response = await axios.get(`${API_URL}/api/pizzas/getpizzas`);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error.message });
  }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });
  try {
    const response = await axios.post(`${API_URL}/api/pizzas/getpizzabyid`, {
      pizzaid,
    });
    console.log("Dispatched GET_PIZZAS_SUCCESS with data:", response.data);
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Dispatched GET_PIZZAS_FAILED with error:", error.message);
    dispatch({ type: "GET_PIZZABYID_FAILED", payload: error.message });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const response = await axios.post(`${API_URL}/api/pizzas/addpizza`, pizza);
    console.log(response);
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};

export const editPizza = (editedPizza) => async (dispatch) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {
    const response = await axios.post(`${API_URL}/api/pizzas/editpizza`, {
      editedPizza,
    });
    console.log(response);
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
    window.location.href = "/admin/pizzaslist";
  } catch (error) {
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: error });
  }
};

export const deletePizza = (pizzaid) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/pizzas/deletepizza`, {
      pizzaid,
    });
    alert("Pizza deleted successfully");
    console.log(response);
    window.location.reload();
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};
