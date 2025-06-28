import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPizza, getPizzaById } from "../actions/pizzaActions";

export default function EditPizza() {
  const { pizzaid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPizzaById(pizzaid));
  }, []);

  const getPizzaByIdState = useSelector((state) => state.getPizzaByIdReducer);
  const editPizzaState = useSelector((state) => state.editPizzaReducer);
  const { loading, pizza, error } = getPizzaByIdState;
  const { editloading, editsuccess, editerror } = editPizzaState;

  if (pizza) {
    console.log(pizza);
  }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [prices, setPrices] = useState({
    small: "",
    medium: "",
    large: "",
  });

  useEffect(() => {
    if (pizza) {
      setName(pizza.name);
      setDescription(pizza.description);
      setImage(pizza.image);
      setCategory(pizza.catergory);
      setPrices({
        small: pizza.prices[0].small,
        medium: pizza.prices[0].medium,
        large: pizza.prices[0].large,
      });
    }
  }, [pizza]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedPizza = {
      _id: pizzaid,
      name,
      description,
      image,
      category,
      prices,
    };
    dispatch(editPizza(updatedPizza));
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Edit Pizza</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>Error loading pizza</h3>
      ) : editsuccess ? (
        <h3> Update Successful</h3>
      ) : (
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: 12 }}>
            <label>Pizza Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Prices (₹):</label>
            <input
              type="text"
              value={prices.small}
              onChange={(e) => setPrices({ ...prices, small: e.target.value })}
              placeholder="Small"
              style={{ width: "30%", marginRight: 8, padding: 8 }}
            />
            <input
              type="text"
              value={prices.medium}
              onChange={(e) => setPrices({ ...prices, medium: e.target.value })}
              placeholder="Medium"
              style={{ width: "30%", marginRight: 8, padding: 8 }}
            />
            <input
              type="text"
              value={prices.large}
              onChange={(e) => setPrices({ ...prices, large: e.target.value })}
              placeholder="Large"
              style={{ width: "30%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            >
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Description:</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Update Pizza
          </button>
        </form>
      )}
    </div>
  );
}
