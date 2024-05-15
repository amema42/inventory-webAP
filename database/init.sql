-- CREATE TABLE articles (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   description TEXT,
--   quantity INTEGER NOT NULL
-- );

-- INSERT INTO articles (name, description, quantity) VALUES
-- ('Article 1', 'Description for Article 1', 10),
-- ('Article 2', 'Description for Article 2', 20),
-- ('Article 3', 'Description for Article 3', 30);


-- Creazione della tabella articles
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL
);

-- Inserimento di dati di esempio nella tabella articles
INSERT INTO articles (name, description, quantity) VALUES
('Article 1', 'Description for Article 1', 10),
('Article 2', 'Description for Article 2', 20),
('Article 3', 'Description for Article 3', 30);

-- Creazione della tabella options
CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  article_id INT NOT NULL,
  option_name VARCHAR(100) NOT NULL,
  option_value VARCHAR(100) NOT NULL,
  CONSTRAINT fk_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- Inserimento di dati di esempio nella tabella options
INSERT INTO options (article_id, option_name, option_value) VALUES
(1, 'Size', 'Small'),
(1, 'Size', 'Medium'),
(1, 'Size', 'Large');

-- Creazione della tabella history
CREATE TABLE history (
  id SERIAL PRIMARY KEY,
  article_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- Inserimento di dati di esempio nella tabella history
INSERT INTO history (article_id, action) VALUES
(1, 'Added'),
(1, 'Updated'),
(2, 'Removed');

-- Creazione della tabella statistics
CREATE TABLE statistics (
  id SERIAL PRIMARY KEY,
  article_id INT NOT NULL,
  quantity INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_article_id FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- Inserimento di dati di esempio nella tabella statistics
INSERT INTO statistics (article_id, quantity) VALUES
(1, 50),
(2, 100);

