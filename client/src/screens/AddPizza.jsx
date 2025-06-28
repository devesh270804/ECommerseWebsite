import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../actions/pizzaActions";

export default function AddPizza() {
  const dispatch = useDispatch();
  const addpizzastate = useSelector((state) => state.addPizzaReducer);
  const { loading, success, error } = addpizzastate;

  const [name, setName] = useState("");
  const [variants, setVariants] = useState({
    small: false,
    medium: false,
    large: false,
  });
  const [prices, setPrices] = useState({
    small: "",
    medium: "",
    large: "",
  });
  const [category, setCategory] = useState("veg");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleVariantChange = (e) => {
    const { name, checked } = e.target;
    setVariants((prev) => ({
      ...prev,
      [name]: checked,
    }));

    if (!checked) {
      setPrices((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setPrices((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedVariants = Object.entries(variants)
      .filter(([key, val]) => val)
      .map(([key]) => key);

    if (!name) return alert("Please enter pizza name");
    if (selectedVariants.length === 0)
      return alert("Select at least one variant");
    for (const v of selectedVariants) {
      if (!prices[v]) {
        return alert(`Please enter price for ${v} variant`);
      }
    }
    if (!image) return alert("Please enter image URL");
    if (!description) return alert("Please enter description");

    const pizzaData = {
      name: name,
      varients: selectedVariants,
      prices: [
        {
          small: Number(prices.small) || 0,
          medium: Number(prices.medium) || 0,
          large: Number(prices.large) || 0,
        },
      ],
      catergory: category,
      image: image,
      description: description,
    };

    console.log("Pizza Data:", pizzaData);
    dispatch(addPizza(pizzaData));
    alert("Pizza added! (Check console)");

    setName("");
    setVariants({ small: false, medium: false, large: false });
    setPrices({ small: "", medium: "", large: "" });
    setCategory("veg");
    setImage("");
    setDescription("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Add New Pizza</h1>

      {loading && <h1> loading...</h1>}
      {error && <h1>Something went wrong</h1>}
      {success && <h1>Pizza added successfully</h1>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name">Pizza Name:</label>
          <br />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Margherita"
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Variants:</label>
          <br />
          {["small", "medium", "large"].map((v) => (
            <label key={v} style={{ marginRight: 15 }}>
              <input
                type="checkbox"
                name={v}
                checked={variants[v]}
                onChange={handleVariantChange}
              />{" "}
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </label>
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Prices (₹):</label>
          <br />
          {["small", "medium", "large"].map((v) => (
            <input
              key={v}
              type="text"
              name={v}
              value={prices[v]}
              onChange={handlePriceChange}
              placeholder={`${v.charAt(0).toUpperCase() + v.slice(1)} price`}
              disabled={!variants[v]}
              style={{
                width: "30%",
                padding: 8,
                marginRight: "4%",
                fontSize: 16,
              }}
            />
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="category">Category:</label>
          <br />
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="image">Image URL:</label>
          <br />
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Classic Margherita pizza with fresh basil and mozzarella cheese."
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#666",
            color: "white",
            padding: "12px 20px",
            fontSize: 16,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Add Pizza
        </button>
      </form>
    </div>
  );
}
