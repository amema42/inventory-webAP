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
Node.js, a JavaScript runtime for server-side scripting (Node.js Documentation). It uses Express, a framework to handle HTTP requests and set up API endpoints (Express Documentation).

CORS: Middleware for enabling cross-origin resource sharing, allowing frontend-backend communication from different origins (CORS Documentation).

pg: A PostgreSQL client for Node.js, managing connections and queries (pg Documentation).

The database is a PostgreSQL instance for storing inventory data (PostgreSQL Documentation). The schema is initialized using SQL commands in init.sql.

React, a library for building user interfaces (React Documentation). The main frontend components include App.js for routing using React Router (React Router Documentation) and ArticleList.js.

The entire application is dockerized for consistency and ease of deployment. Docker is a platform for developing, shipping, and running applications in containers (Docker Documentation).

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
    │   ├── App.js
    │   ├── index.js
    │   └── Articlelist.js
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

## Backend

### Overview
The backend is built using Node.js and Express. It handles API requests from the frontend and interacts with the PostgreSQL database.
- **express**: A web framework for Node.js to handle HTTP requests.
- **cors**: Middleware to enable Cross-Origin Resource Sharing, allowing your frontend to communicate with the backend from a different origin.
- **pg**: PostgreSQL client for Node.js to interact with the database.

### File: `index.js`
This file sets up the Express server and defines the API endpoints.

#### Key Sections:
- **Imports and Middleware:** Imports necessary modules and sets up middleware (CORS, JSON parsing).
- **Database Connection:** Establishes a connection to the PostgreSQL database.
- **API Endpoints:** Defines routes for handling API requests.
- **GET /api/items**: Fetches all items from the `items` table in the database.
    - `pool.query('SELECT * FROM items')`: Executes a SQL query to get all items.
    - `res.json(result.rows)`: Sends the query results as a JSON response.
- ***app.listen(port, () => { ... })***: Starts the server on port 3001.

#### Example Code:
```javascript
// The backend initializes an Express server and sets up middleware
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// sets up a connection to the PostgreSQL database using pg
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'inventory',
  password: 'password',
  port: 5432,
}); // Pool: Manages connections to the PostgreSQL database. It uses connection pooling to efficiently manage multiple database connections.

// Example endpoint: Defines endpoints to handle API requests. For example, fetching inventory items.
app.get('/api/items', async (req, res) => { // Fetches all items from the items table in the database.
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows); // Executes a SQL query to get all items.
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Starts the server on port 3001.
});
```

## Frontend

### Overview
The frontend is built using React. It provides a user interface for interacting with the inventory items.

### Components

#### 1. `app.js`
This is the main component that sets up the overall layout and routing for the application.
- **BrowserRouter**, **Route**, **Switch**: Components from `react-router-dom` to handle routing.
- **ArticleList**: A component that lists articles.
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
This component fetches and displays a list of inventory items from the Backend

- **useState**: React hook to manage state.
- **useEffect**: React hook to perform side effects (fetching data) on component mount.
- **fetch('http://localhost:3001/api/items')**: Makes an HTTP GET request to the backend to fetch items.
- **setArticles(data)**: Updates the state with fetched data.
- **articles.map(article => ...)**: Renders a list of articles.

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

## Database

### Overview
The database is a PostgreSQL instance that stores inventory items.

#### File: `database/init.sql`
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

### Summary

- **Backend**: Node.js with Express handles API requests and interacts with PostgreSQL.
    - **Express Server**: Receives API requests from the frontend.
    - **Database Connection**: Uses **`pg`** module to connect to the PostgreSQL database.
    - **API Endpoints**: Handle CRUD (create, read, update, e delete) operations (e.g., fetching items from the database).
- **Frontend**: React components display inventory items and interact with the backend. (ArticleList Component: Makes API requests to the backend to fetch data and displays it )
- **Database**: PostgreSQL stores inventory data, initialized with `init.sql`.

This setup ensures a seamless flow of data between the frontend, backend, and database, providing a functional and interactive inventory management application.

### **Detailed Interaction Example**

1. **User Interaction**: User opens the application and the **`ArticleList`** component is mounted.
2. **API Request**: The **`ArticleList`** component's **`useEffect`** hook triggers an API request to **`http://localhost:3001/api/items`**.
3. **Backend Handling**:
    - The Express server listens for the request on the **`/api/items`** endpoint.
    - It uses the **`pg`** module to query the **`items`** table in the PostgreSQL database.
4. **Database Query**: The query **`SELECT * FROM items`** is executed on the **`items`** table.
5. **Data Retrieval**: The database returns the result set to the backend.
6. **API Response**: The backend sends the result set as a JSON response back to the frontend.
7. **Data Display**: The **`ArticleList`** component receives the data and renders the list of items.
