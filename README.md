### Project Structure
##### a very repetitive one, I know
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

**Node.js**, a JavaScript runtime for server-side scripting ([Node.js Documentation](https://nodejs.org/en/docs/)). It uses **Express**, a framework to handle HTTP requests and set up API endpoints ([Express Documentation](https://expressjs.com/)).

**CORS**: Middleware for enabling cross-origin resource sharing, allowing frontend-backend communication from different origins ([CORS Documentation](https://expressjs.com/en/resources/middleware/cors.html)).

**pg**: A PostgreSQL client for Node.js, managing connections and queries ([pg Documentation](https://node-postgres.com/)).

The database is a **PostgreSQL** instance for storing inventory data ([PostgreSQL Documentation](https://www.postgresql.org/docs/)). The schema is initialized using SQL commands in `init.sql`.

**React**, a library for building user interfaces ([React Documentation](https://reactjs.org/docs/getting-started.html)). The main frontend components include `App.js` for routing using **React Router** ([React Router Documentation](https://reactrouter.com/)) and `ArticleList.js`.

The entire application is dockerized for consistency and ease of deployment. **Docker** is a platform for developing, shipping, and running applications in containers ([Docker Documentation](https://docs.docker.com/)).

#### 2. Project Structure
Detail the structure of the project directories and files.

**Example:**
```
## Project Structure
```
```
inventory-webAPP_v1.0/
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

An API (Application Programming Interface) is a set of rules and definitions that allows one software application to interact with another. In this project, the API is implemented using Node.js and Express to handle HTTP requests from the frontend and communicate with the PostgreSQL database.

Server Setup: The Express server is initialized and configured to use CORS and JSON parsing middleware.
The server listens on port 3001 for incoming requests.
Database Connection: A connection pool to the PostgreSQL database is established using the pg module.
This pool is used to execute queries against the database.
API Endpoints: The API exposes several endpoints to perform CRUD operations on the items table in the database.

### File: `index.js`
This file sets up the Express server and defines the API endpoints.

#### Key Sections:
- **Imports and Middleware:** Imports necessary modules and sets up middleware (CORS, JSON parsing).
- **Database Connection:** Establishes a connection to the PostgreSQL database.
- **API Endpoints:** Defines routes for handling API requests.
- **GET /api/items**: Purpose: Fetches all items from the `items` table in the database. Request: No parameters required. Response: JSON array of items.
Example Usage:
The React frontend sends a GET request to http://localhost:3001/api/items.
The server executes SELECT * FROM items and returns the result as a JSON array.
    - `pool.query('SELECT * FROM items')`: Executes a SQL query to get all items.
    - `res.json(result.rows)`: Sends the query results as a JSON response.

- ***app.listen(port, () => { ... })***: Starts the server on port 3001.

#### Example Code:
```javascript
// (Backend/ index.js)The backend initializes an Express server and sets up middleware - "This code creates an API endpoint that retrieves all items from the database."

// Import necessary dependencies
const express = require('express');  // Import the Express framework for handling HTTP requests
const cors = require('cors');  // Import CORS middleware to enable Cross-Origin Resource Sharing
const { Pool } = require('pg');  // Import Pool from pg to manage PostgreSQL connections

// Initialize Express app and specify the port
const app = express();  // Create an instance of Express
const port = 3001;  // Specify the port number on which the server will run

// Middleware to handle CORS requests and parse request body as JSON
app.use(cors());  // Use CORS middleware to allow cross-origin requests
app.use(express.json());  // Middleware to parse incoming request bodies as JSON

// Configure connection to PostgreSQL database
const pool = new Pool({
  user: 'user',         // Database user
  host: 'localhost',    // PostgreSQL server address
  database: 'inventory',// Database name
  password: 'password', // Password for database access
  port: 5432,           // Port PostgreSQL is listening on
});

// Handle GET request for endpoint /api/items
app.get('/api/items', async (req, res) => {
  try {
    // Execute SQL query to select all items from the 'items' table
    const result = await pool.query('SELECT * FROM items');

    // Send results as JSON response
    res.json(result.rows);  // Send a JSON response with the rows retrieved from the database
  } catch (err) {
    // Error handling: log the error and send an error response with status 500
    console.error(err);  // Log any errors to the console
    res.status(500).send('Server Error');  // Send an HTTP status 500 (Server Error) response
  }
});

// Start the Express server on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);  // Print a message to indicate the server is running
});

/*Detailed explanation, Again! 🥳:
Dependencies:

express: Framework for handling HTTP requests in Node.js.
cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
Pool from pg: Manages PostgreSQL connections using connection pooling.
Express Setup:

app.use(cors()): Middleware to handle CORS requests, allowing communication from different origins.
app.use(express.json()): Middleware to parse incoming request bodies as JSON.
PostgreSQL Connection:

const pool = new Pool({ ... }): Creates a connection pool to PostgreSQL with configuration details (user, host, database, password, port).
API Endpoint:

app.get('/api/items', async (req, res) => { ... }): Handles GET requests to /api/items.
Async Function: Handles asynchronous operations to avoid blocking the main thread.
Query Execution: Uses pool.query to execute a SQL query (SELECT * FROM items) to fetch all items from the database.
Response: Sends the retrieved items as a JSON response using res.json(result.rows).
Error Handling:

try-catch: Wraps the database query to catch any potential errors.
Error Logging: Logs errors to the console using console.error(err).
Error Response: Sends a generic 'Server Error' response with status 500 if an error occurs during query execution.
Server Start:

app.listen(port, () => { ... }): Starts the Express server on port 3001.
Console Log: Prints a message (Server running on port 3001) to indicate the server has started successfully. */
```
### API Interaction Flow
User Interaction: The user opens the React app, and the ArticleList component is mounted.
API Request: The useEffect hook of the ArticleList component triggers an API request to fetch items.
Backend Handling:
The Express server receives the request on the /api/items endpoint.
It uses the pg module to query the items table.
Database Query: The query SELECT * FROM items is executed.
Data Retrieval: The database returns the data to the backend.
API Response: The backend sends the data as a JSON response to the frontend.
Data Display: The ArticleList component receives the data and renders the list of items.

## Frontend

### Overview
The frontend is built using React. It provides a user interface for interacting with the inventory items.
React's graphics components are work in progress
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

## Summary

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
