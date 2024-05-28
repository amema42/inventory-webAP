import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; /* importing style in CSS, this should fix the articles on Screen (update: Not true, still have to fix)*/

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [history, setHistory] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [activeArticleId, setActiveArticleId] =
    useState(
      null,
    ); /* for history & statistics: modifica: stato per memorizzare l'id dell'articolo "attivo" */

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
      setHistory(response.data);
      setActiveArticleId(id); // imposto l'ID dell'articolo "attivo"
      setStatistics(null); // aggiungo: pulisco le statistiche per evitare sovrapposizioni
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const viewStatistics = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/articles/${id}/statistics`,
      );
      setStatistics(response.data);
      setActiveArticleId(id); // imposta l'ID dell'articolo attivo
      setHistory(null); // aggiungo: pulisce la cronologia per evitare sovvrapposizioni
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
    setEditingArticle(article); //id: articolo IN MODIFICA
    setActiveArticleId(article.id);
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
            return response.data;
          } else {
            return article;
          }
        }),
      );
      setEditingArticle(null);
      setActiveArticleId(null); // resetta l'articolo attivo
      setHistory(null); // reset cronologia
      setStatistics(null); // reset statistiche
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
      <div className="article-list">
        {articles.map((article) => (
          <div className="article" key={article.id}>
            {activeArticleId === article.id && editingArticle === article ? (
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
            ) : (
              <div className="article-content">
                <h2>{article.name}</h2>
                <p>{article.description}</p>
                <p>Quantity: {article.quantity}</p>
                <p>Size: {article.size}</p>
                <div className="article-buttons">
                  <button onClick={() => handleEdit(article)}>Edit</button>
                  <button onClick={() => handleDelete(article.id)}>
                    Delete
                  </button>
                  <button onClick={() => viewHistory(article.id)}>
                    View History
                  </button>
                  <button onClick={() => viewStatistics(article.id)}>
                    View Statistics
                  </button>
                </div>
              </div>
            )}
            {activeArticleId === article.id &&
              history &&
              Array.isArray(history) && (
                <div className="article-details">
                  <h3>History</h3>
                  <ul>
                    {history.map((entry) => (
                      <li key={entry.id}>
                        {entry.action_date}: {entry.action_type} -{" "}
                        {entry.details}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {activeArticleId === article.id && statistics && (
              <div className="article-details">
                <h3>Statistics</h3>
                <p>Total Actions: {statistics.total_actions}</p>
                <p>Total Created: {statistics.total_created}</p>
                <p>Total Updated: {statistics.total_updated}</p>
                <p>Total Deleted: {statistics.total_deleted}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;

//   return (
//     <div>
//       <h1>Articles</h1>
//       <div className="article-list">
//         {/*contenitore per la list degli articoli */}
//         {articles.map((article) => (
//           <div className="article" key={article.id}>
//             {/* "?classe" per ogni articolo */}
//             <div className="article-content">
//               {/* contenitore per il contenuto "principale" */}
//               <h2>{article.name}</h2>
//               <p>{article.description}</p>
//               <p>Quantity: {article.quantity}</p>
//               <p>Size: {article.size}</p>
//               <div className="article-buttons">
//                 {/*contenitore per i pulsanti */}
//                 <button onClick={() => handleEdit(article)}>Edit</button>
//                 <button onClick={() => handleDelete(article.id)}>Delete</button>
//                 <button onClick={() => viewHistory(article.id)}>
//                   View History
//                 </button>
//                 <button onClick={() => viewStatistics(article.id)}>
//                   View Statistics
//                 </button>
//               </div>
//             </div>
//             {activeArticleId === article.id &&
//               history &&
//               Array.isArray(history) && ( //mostra la cronologia solo per l'articolo attivo
//                 <div className="article-details">
//                   {/* Modifica: contenitore per i dettagli */}
//                   <h3>History</h3>
//                   <ul>
//                     {history.map((entry) => (
//                       <li key={entry.id}>
//                         {entry.action_date}: {entry.action_type} -{" "}
//                         {entry.details}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             {activeArticleId === article.id &&
//               statistics && ( //mostra le statistiche solo per l'articolo "attivo"
//                 <div className="article-details">
//                   {/* Modifica: contenitore per i dettagli */}
//                   <h3>Statistics</h3>
//                   <p>Total Actions: {statistics.total_actions}</p>
//                   <p>Total Created: {statistics.total_created}</p>
//                   <p>Total Updated: {statistics.total_updated}</p>
//                   <p>Total Deleted: {statistics.total_deleted}</p>
//                 </div>
//               )}
//           </div>
//         ))}
//       </div>
//       {editingArticle && (
//         <form onSubmit={handleUpdate}>
//           <div>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={editingArticle.name}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Description:
//               <input
//                 type="text"
//                 name="description"
//                 value={editingArticle.description}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Quantity:
//               <input
//                 type="number"
//                 name="quantity"
//                 value={editingArticle.quantity}
//                 onChange={handleChange}
//                 required
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Size:
//               <select
//                 name="size"
//                 value={editingArticle.size}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="L">L</option>
//                 <option value="M">M</option>
//                 <option value="S">S</option>
//               </select>
//             </label>
//           </div>
//           <button type="submit">Update Article</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ArticleList;
