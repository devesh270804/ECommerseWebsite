import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  getAllPizzasReducer,
  addPizzaReducer,
  getPizzaByIdReducer,
  editPizzaReducer,
} from "./reducers/pizzaReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisterReducer } from "./reducers/userReducer";
import { userLoginReducer } from "./reducers/userReducer";
import { getAllUsersReducer } from "./reducers/userReducer";
import { placeOrderReducer } from "./reducers/orderReducer";
import {
  getUserOrdersReducer,
  getAllOrdersReducer,
  deliverOrderReducer,
} from "./reducers/orderReducer";

const finalReducer = combineReducers({
  getAllPizzasReducer: getAllPizzasReducer,
  cartReducer: cartReducer,
  userRegisterReducer: userRegisterReducer,
  userLoginReducer: userLoginReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  addPizzaReducer: addPizzaReducer,
  getPizzaByIdReducer: getPizzaByIdReducer,
  editPizzaReducer: editPizzaReducer,
  getAllUsersReducer: getAllUsersReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  deliverOrderReducer: deliverOrderReducer,
});

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  userLoginReducer: {
    currentUser: currentUser,
  },
};

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
