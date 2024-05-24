### Project Structure
This project is organized into three main directories:
1. `database` - Contains `init.sql` for setting up a PostgreSQL database.
2. `back` - Contains `index.js`, the backend code using Node.js, Express, and CORS.
3. `front` - Contains the React frontend code (in src/ `app.js`, `index.js`, and `articlelist.js`).

### Technical Documentation Outline

#### 1. Overview
A high-level overview of the project, including its purpose, main features, and technologies used.

**Example:**
```
# Inventory Web Application

## Overview
This inventory web application allows users to manage and track their inventory items. It includes a frontend built with React, a backend using Node.js and Express, and a PostgreSQL database. The application is dockerized for easy deployment.

### Technologies Used
- Node.js
- Express
- CORS
- PostgreSQL
- React
- Docker
```

#### 2. Project Structure
Detail the structure of the project directories and files.

**Example:**
```
## Project Structure
```
```
inventory-webAPP_v0/
│
├── database/
│   └── init.sql
│
├── back/
│   └── index.js
│
└── front/
    ├── src/
    │   ├── app.js
    │   ├── index.js
    │   └── articlelist.js
```
```

#### 3. Setting Up the Project
Instructions on how to set up and run the project locally, including Docker setup.

**Example:**
```
## Setting Up the Project

### Prerequisites
- Docker
- Docker Compose

### Steps
1. Clone the repository.
2. Navigate to the project directory.
3. Build and run the Docker containers:
   ```sh
   docker-compose up --build
   ```
4. Access the application at `http://localhost:3000`.

### Database Setup
The `init.sql` file in the `database` directory initializes the PostgreSQL database with the required schema.
```

#### 4. Backend (Node.js with Express)
Detailed explanation of the backend setup and functionality.

**Example:**
```
## Backend

### Overview
The backend is built using Node.js and Express. It handles API requests from the frontend and interacts with the PostgreSQL database.

### File: `back/index.js`
This file sets up the Express server and defines the API endpoints.

#### Key Sections:
- **Imports and Middleware:** Imports necessary modules and sets up middleware (CORS, JSON parsing).
- **Database Connection:** Establishes a connection to the PostgreSQL database.
- **API Endpoints:** Defines routes for handling API requests.

#### Example Code:
```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'inventory',
  password: 'password',
  port: 5432,
});

// Example endpoint
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```
```

#### 5. Frontend (React)
Explanation of the frontend components and their roles.

**Example:**
```
## Frontend

### Overview
The frontend is built using React. It provides a user interface for interacting with the inventory items.

### Components

#### 1. `app.js`
This is the main component that sets up the overall layout and routing for the application.

#### Example Code:
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './ArticleList';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={ArticleList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

#### 2. `articlelist.js`
This component fetches and displays a list of inventory items.

#### Example Code:
```javascript
import React, { useState, useEffect } from 'react';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/items')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Article List</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>{article.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
```
```

#### 6. Database (PostgreSQL)
Details on the database schema and initialization.

**Example:**
```
## Database

### Overview
The database is a PostgreSQL instance that stores inventory items.

### File: `database/init.sql`
This file contains the SQL commands to set up the initial database schema.

#### Example Code:
```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    quantity INTEGER,
    price NUMERIC
);

INSERT INTO items (name, quantity, price) VALUES
('Item1', 10, 9.99),
('Item2', 20, 19.99),
('Item3', 30, 29.99);
```
```
