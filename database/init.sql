-- Creazione della tabella articles
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  quantity INT,
  size VARCHAR(1) CHECK (size IN ('L', 'S', 'M'))
);

-- Inserimento di alcuni articoli di esempio
INSERT INTO articles (name, description, quantity, size) VALUES
('Article 1', 'Description for Article 1', 10, 'L'),
('Article 2', 'Description for Article 2', 20, 'S'),
('Article 3', 'Description for Article 3', 30, 'M');
