const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors"); // Importo cors: [DOCUMENTAZIONE] https://www.npmjs.com/package/cors
const validSizes = ["L", "S", "M"]; // definizione valori validi per size

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Usa cors [reference: linea 4 di questa pagina]

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://user:password@database:5432/inventory",
});

// Rotta (route; ) di esempio per testare il server // il file route.js rimosso (non so fare/non funziona l'integrazione :)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// route per: ottenere tutti gli articoli
app.get("/articles", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM articles");
    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//route per: creare un nuovo articolo // [INTEGRATA :) ]
app.post("/articles", async (req, res) => {
  const { name, description, quantity, size } = req.body;
  if (!validSizes.includes(size)) {
    return res.status(400).send("Invalid size");
  }
  try {
    const result = await pool.query(
      "INSERT INTO articles (name, description, quantity, size) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, quantity, size],
    );
    await pool.query(
      "INSERT INTO history (article_id, action_type, details) VALUES ($1, 'create', $2)",
      [
        result.rows[0].id,
        `Created article with quantity ${quantity} and size ${size}`,
      ],
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// route per:  per aggiornare un articolo esistente //da integrare in BackEend e db
app.put("/articles/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, quantity, size } = req.body;
  //aggiungo: controllo su: SIZE
  if (!validSizes.includes(size)) {
    return res.status(400).send("Invalid size");
  }
  try {
    const result = await pool.query(
      "UPDATE articles SET name = $1, description = $2, quantity = $3, size = $4 WHERE id = $5 RETURNING *",
      [name, description, quantity, size, id],
    );
    if (result.rows.length > 0) {
      await pool.query(
        "INSERT INTO history (article_id, action_type, details) VALUES ($1, 'update', $2)",
        [id, `Updated article to quantity ${quantity} and size ${size}`],
      );
      res.send(result.rows[0]);
    } else {
      res.status(404).send("Article not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//app.delete updated && database/init.sql updated - aggiunto controllo per app.delete
app.delete("/articles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // cerco di trovare l'articolo l'articolo prima di eliminarlo
    const articleResult = await pool.query(
      "SELECT * FROM articles WHERE id = $1",
      [id],
    );

    if (articleResult.rows.length === 0) {
      return res.status(404).send("Article not found");
    }

    const article = articleResult.rows[0];

    // inserisco un record nella tabella history prima di eliminare l'articolo
    await pool.query(
      "INSERT INTO history (article_id, action_type, details) VALUES ($1, 'delete', $2)",
      [id, `Deleted article with name ${article.name}`],
    );

    // elimino l'articolo
    const deleteResult = await pool.query(
      "DELETE FROM articles WHERE id = $1 RETURNING *",
      [id],
    );

    res.send(deleteResult.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Storico (1) e statistiche (2)

app.get("/articles/:id/history", async (req, res) => {
  const articleId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM history WHERE article_id = $1 ORDER BY action_date DESC",
      [articleId],
    );
    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//(2) statistiche
app.get("/articles/:id/statistics", async (req, res) => {
  const id = req.params.id;
  try {
    const totalActions = await pool.query(
      "SELECT COUNT(*) FROM history WHERE article_id = $1",
      [id],
    );
    const totalCreated = await pool.query(
      "SELECT COUNT(*) FROM history WHERE article_id = $1 AND action_type = 'created'",
      [id],
    );
    const totalUpdated = await pool.query(
      "SELECT COUNT(*) FROM history WHERE article_id = $1 AND action_type = 'updated'",
      [id],
    );
    const totalDeleted = await pool.query(
      "SELECT COUNT(*) FROM history WHERE article_id = $1 AND action_type = 'deleted'",
      [id],
    );
    const statistics = {
      total_actions: totalActions.rows[0].count,
      total_created: totalCreated.rows[0].count,
      total_updated: totalUpdated.rows[0].count,
      total_deleted: totalDeleted.rows[0].count,
    };
    res.send(statistics);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
