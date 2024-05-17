import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  //history & statistics
  const [history, setHistory] = useState(null);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const viewHistory = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/articles/${id}/history`,
      );
      setHistory(response.data); // imposta lo storico nello stato (history) (non sono sicuro serva)
      console.log(response.data); // Visualizza/in output lo storico su console (non sono sicuro serva)
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const viewStatistics = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/articles/${id}/statistics`,
      );
      setStatistics(response.data); // imposta statistiche nello stato; (non sono sicuro serva)
      console.log(response.data); // statistiche in output su console ((non sono sicuro serva))
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, name, description, quantity, size } = editingArticle;
    try {
      const response = await axios.put(`http://localhost:5000/articles/${id}`, {
        name,
        description,
        quantity,
        size,
      });
      setArticles(
        articles.map((article) => {
          if (article.id === id) {
            return response.data; // if l'articolo ha lo stesso :id di quello che vogliamo aggiornare -> sostituiamo con i nuovi dati.
          } else {
            return article; // altrimenti ltrimenti: -> manteniamo l'articolo così com'era.
          }
        }),
      );
      setEditingArticle(null);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingArticle({
      ...editingArticle,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.name}</h2>
            <p>{article.description}</p>
            <p>Quantity: {article.quantity}</p>
            <p>Size: {article.size}</p>
            <button onClick={() => handleEdit(article)}>Edit</button>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
            <button onClick={() => viewHistory(article.id)}>
              View History
            </button>
            <button onClick={() => viewStatistics(article.id)}>
              View Statistics
            </button>
          </li>
        ))}
      </ul>
      {editingArticle && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editingArticle.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editingArticle.description}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={editingArticle.quantity}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Size:
              <select
                name="size"
                value={editingArticle.size}
                onChange={handleChange}
                required
              >
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="S">S</option>
              </select>
            </label>
          </div>
          <button type="submit">Update Article</button>
        </form>
      )}
      {history && (
        <div>
          <h2>History</h2>
          <ul>
            {history.map((entry) => (
              <li key={entry.id}>
                {entry.action_date}: {entry.action_type} - {entry.details}
              </li>
            ))}
          </ul>
        </div>
      )}
      {statistics && (
        <div>
          <h2>Statistics</h2>
          <p>Total Actions: {statistics.total_actions}</p>
          <p>Total Created: {statistics.total_created}</p>
          <p>Total Updated: {statistics.total_updated}</p>
          <p>Total Deleted: {statistics.total_deleted}</p>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
