import "./App.css";
import Navbar from "./components/Navbar.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import OrdersScreen from "./screens/OrdersScreen.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
          <Route path="/admin/*" element={<AdminScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
