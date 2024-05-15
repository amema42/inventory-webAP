const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');  // Importa cors

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());  // Usa cors

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://user:password@database:5432/inventory'
});

// Rotta di esempio per testare il server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rotta per ottenere tutti gli articoli
app.get('/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rotta per creare un nuovo articolo
app.post('/articles', async (req, res) => {
  const { name, description, quantity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO articles (name, description, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, description, quantity]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rotta per aggiornare un articolo esistente
app.put('/articles/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description, quantity } = req.body;
  try {
    const result = await pool.query(
      'UPDATE articles SET name = $1, description = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [name, description, quantity, id]
    );
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send('Article not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rotta per eliminare un articolo
app.delete('/articles/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      'DELETE FROM articles WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send('Article not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
