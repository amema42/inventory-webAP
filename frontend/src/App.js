import React, { useState, useContext } from "react";
import ArticleList from "./ArticleList"; // import: componente ArticleList, definito in src/ArticleList.js
import { FontProvider, FontContext } from "./FontContext";
import ChangeFontButton from "./ChangeFontButton";
import "./App.css"; //importing style in CSS

/* implementing the FontChange*/
const App = () => {
  return (
    <FontProvider>
      <MainApp />
    </FontProvider>
  );
};

const MainApp = () => {
  const { font } = useContext(FontContext); // rr.1 - added useContext

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("L");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArticle = { name, description, quantity, size };

    fetch("http://localhost:5000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    })
      .then((response) => response.json())
      .then(() => {
        setName("");
        setDescription("");
        setQuantity("");
        setSize("L");
      })
      .catch((error) => console.error("Error creating article:", error));
  };

  return (
    <div style={{ fontFamily: font }}>
      {" "}
      {/* applica il font dal contesto / rr. 1: useContext & ./changeFontButton */}
      <div className="container">
        <ChangeFontButton />
      </div>
      <h1>Inventory WebApp v1.0</h1>
      <div className="formSubmit">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Size:
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              >
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="S">S</option>
              </select>
            </label>
          </div>
          <button type="submit">Add Article</button>
        </form>
      </div>
      <ArticleList />
    </div>
  );
};

export default App;
