import React, { useState } from "react";
import ArticleList from "./ArticleList"; // Importa il componente ArticleList

function App() {
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
    <div>
      <h1>Inventory App v.0.1</h1>
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
      <ArticleList /> {/* qui è inclusa la componente Article List */}
    </div>
  );
}

export default App;
