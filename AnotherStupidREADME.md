# `inventory WebAPP` v1.0

### another stupid readme - the logic behind this project

### Struttura Generale del Progetto

```
inventory-webAPP_v1.0/
│
├── database
│   └── init.sql
│
├── back
│   └── index.js
│
└── front
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   └── ArticleList.js
    │   ├── index.js
```

### Mappa Mentale Dettagliata

1. **Directory `database`**
    - **init.sql**
        - Creazione tabelle `articles` e `history`
        - Tabelle
            - `articles`: Gestisce gli articoli dell'inventario
                - **id**: Chiave primaria autoincrementante
                - **name**: Nome dell'articolo (`VARCHAR(255)`)
                - **description**: Descrizione dell'articolo (`TEXT`)
                - **quantity**: Quantità dell'articolo (`INT`)
                - **size**: Taglia dell'articolo (`VARCHAR(1)` con vincolo `CHECK`)
            - `history`: Traccia le azioni sugli articoli
                - **id**: Chiave primaria autoincrementante
                - **article_id**: Chiave esterna che fa riferimento a `articles(id)`
                - **action_type**: Tipo di azione (`VARCHAR(50)`)
                - **action_date**: Data e ora dell'azione (`TIMESTAMP` con default `CURRENT_TIMESTAMP`)
                - **details**: Dettagli aggiuntivi sull'azione (`TEXT`)
        - Preinserimento di articoli di esempio
        - Vincoli di chiave esterna con `ON DELETE CASCADE`
2. **Directory `back`**
    - **index.js**
        - Setup Server
            - Moduli: Express, body-parser, cors
            - Configurazione della porta (5000)
        - Middleware
            - CORS, body-parser per JSON
        - Database
            - Pool di connessione PostgreSQL
        - Rotte (Routes)
            - `GET /`: Rotta di test
            - `GET /articles`: Recupera tutti gli articoli
            - `POST /articles`: Crea un nuovo articolo
                - Controlla la validità della taglia (`size`)
                - Inserisce una voce nella tabella `history`
            - `PUT /articles/:id`: Aggiorna i dettagli di un articolo
                - Controlla la validità della taglia (`size`)
                - Inserisce una voce nella tabella `history`
            - `DELETE /articles/:id`: Elimina un articolo
                - Controlla l'esistenza dell'articolo
                - Inserisce una voce nella tabella `history`
            - `GET /articles/:id/history`: Recupera lo storico delle azioni di un articolo
            - `GET /articles/:id/statistics`: Recupera le statistiche delle azioni di un articolo
        - Avvio del Server
            - `app.listen(port, ...)`
3. **Directory `front`**
    - **src**
        - **App.js**
            - Stato interno per i moduli di input: `name`, `description`, `quantity`, `size`
            - Gestione del form di invio (`handleSubmit`)
                - Invio richiesta `POST` per creare un nuovo articolo
                - Reset dei valori del form
            - Renderizzazione del form di inserimento
            - Inclusione del componente `ArticleList`
        - **ArticleList.js**
            - Stato interno per la lista degli articoli, articoli in fase di modifica, storico, statistiche e ID dell’articolo “attivo” - rispettivamente - : `articles`, `editingArticle`, `history`, `statistics`, `activeArticleId`
            - Effetto per caricare gli articoli (`useEffect`)
                - Invio richiesta `GET` per recuperare gli articoli
            - Funzioni di gestione
                - `viewHistory`: Visualizza lo storico di un articolo
                - `viewStatistics`: Visualizza le statistiche di un articolo
                - `handleDelete`: Elimina un articolo
                - `handleEdit`: Modifica un articolo
                - `handleUpdate`: Aggiorna un articolo
                - `handleChange`: Gestisce le modifiche degli input del form di modifica
            - Renderizzazione della lista degli articoli
                - Include pulsanti per `Edit`, `Delete`, `View History`, `View Statistics`
                - Condizionalmente renderizza il form di modifica
                - Condizionalmente renderizza i dettagli di storico e statistiche
        - **App.css**
            - Stili CSS per migliorare l'aspetto e la disposizione degli elementi

### **Interazione tra Componenti**

1. **Frontend (`App.js` , `ArticleList.js` e `App.css`)**
    - **`App.js`**: Stato interno, gestione del form di invio, inclusione di `ArticleList`.
    - **`ArticleList.js`**:
        - Stato interno per gli articoli, l'articolo in fase di modifica, lo storico, le statistiche e l'ID dell'articolo attivo.
        - Effetto per caricare gli articoli al montaggio del componente.
        - Funzioni per la gestione degli articoli: modifica "in-place", cancellazione, visualizzazione storico/statistiche.
        - Renderizzazione della lista di articoli con il supporto per la modifica "in-place". (guardare anche : **`App.css`**)
2. **Backend (`index.js`)**
    - Gestisce le richieste HTTP provenienti dal frontend.
    - Interagisce con il database per recuperare, creare, aggiornare e eliminare articoli. (CRUD)
    - Registra le azioni nella tabella `history`.
3. **Database (`init.sql`)**
    - Memorizza i dati degli articoli e le azioni su di essi.
    - Utilizza vincoli di integrità e chiavi esterne per garantire la coerenza dei dati.

### Diagramma Logico Completo

```markdown
inventory-webAPP_v1.0/
│
├── database
│   └── init.sql
│       └── Creazione tabelle `articles` e `history`
│           └── `articles`: Gestisce gli articoli dell'inventario
│               └── id: Chiave primaria autoincrementante
│               └── name: Nome dell'articolo (`VARCHAR(255)`)
│               └── description: Descrizione dell'articolo (`TEXT`)
│               └── quantity: Quantità dell'articolo (`INT`)
│               └── size: Taglia dell'articolo (`VARCHAR(1)` con vincolo `CHECK`)
│           └── `history`: Traccia le azioni sugli articoli
│               └── id: Chiave primaria autoincrementante
│               └── article_id: Chiave esterna che fa riferimento a `articles(id)`
│               └── action_type: Tipo di azione (`VARCHAR(50)`)
│               └── action_date: Data e ora dell'azione (`TIMESTAMP` con default `CURRENT_TIMESTAMP`)
│               └── details: Dettagli aggiuntivi sull'azione (`TEXT`)
│           └── Preinserimento di articoli di esempio
│           └── Vincoli di chiave esterna con `ON DELETE CASCADE`
│
├── back
│   └── index.js
│       └── Setup Server
│           └── Moduli: Express, body-parser, cors
│           └── Configurazione della porta (5000)
│       └── Middleware
│           └── CORS, body-parser per JSON
│       └── Database
│           └── Pool di connessione PostgreSQL
│       └── Rotte (Routes)
│           └── `GET /`: Rotta di test
│           └── `GET /articles`: Recupera tutti gli articoli
│           └── `POST /articles`: Crea un nuovo articolo
│               └── Controlla la validità della taglia (`size`)
│               └── Inserisce una voce nella tabella `history`
│           └── `PUT /articles/:id`: Aggiorna i dettagli di un articolo
│               └── Controlla la validità della taglia (`size`)
│               └── Inserisce una voce nella tabella `history`
│           └── `DELETE /articles/:id`: Elimina un articolo
│               └── Controlla l'esistenza dell'articolo
│               └── Inserisce una voce nella tabella `history`
│           └── `GET /articles/:id/history`: Recupera lo storico delle azioni di un articolo
│           └── `GET /articles/:id/statistics`: Recupera le statistiche delle azioni di un articolo
│       └── Avvio del Server
│           └── `app.listen(port, ...)`
│
└── front
    ├── src
    │   ├── App.js
    │   │   └── Stato interno: `name`, `description`, `quantity`, `size`
    │   │   └── Gestione del form di invio (`handleSubmit`)
    │   │       └── Invio richiesta `POST` per creare un nuovo articolo
    │   │       └── Reset dei valori del form
    │   │   └── Renderizzazione del form di inserimento
    │   │   └── Inclusione del componente `ArticleList`
    │   ├── ArticleList.js
    │   │   └── Stato interno: `articles`, `editingArticle`, `history`, `statistics`, `activeArticleId`
    │   │   └── Effetto per caricare gli articoli (`useEffect`)
    │   │       └── Invio richiesta `GET` per recuperare gli articoli
    │   │   └── Funzioni di gestione
    │   │       └── `viewHistory`: Visualizza lo storico di un articolo
    │   │       └── `viewStatistics`: Visualizza le statistiche di un articolo
    │   │       └── `handleDelete`: Elimina un articolo
    │   │       └── `handleEdit`: Modifica un articolo
    │   │       └── `handleUpdate`: Aggiorna un articolo
    │   │       └── `handleChange`: Gestisce le modifiche degli input del form di modifica
    │   │   └── Renderizzazione della lista degli articoli
    │   │       └── Include pulsanti per `Edit`, `Delete`, `View History`, `View Statistics`
    │   │       └── Condizionalmente renderizza il form di modifica
    │   │       └── Condizionalmente renderizza i dettagli di storico e statistiche
    ├── App.css
    │   └── Stili CSS per migliorare l'aspetto e la disposizione degli elementi

```

Questa rappresentazione rappresenta al meglio il flusso e la struttura del progetto `inventoryWebApp`

### **Docker**

- Come Funziona Docker?
    - Docker utilizza un file di configurazione chiamato `Dockerfile` per definire l'immagine del container, che include il sistema operativo, le dipendenze dell'applicazione e l'applicazione stessa. Una volta creata l'immagine, Docker può eseguire un container basato su quell'immagine.
- Esempio di Applicazione con Docker Compose
    - Docker Compose è uno strumento per definire e gestire applicazioni Docker multi-container.  (Consulta la documentazione ufficiale: [Docker overview | Docker Docs](https://docs.docker.com/get-started/overview/))

    Questa web app utilizza (ofc) un file `docker-compose.yml` per configurare i servizi (backend, database e frontend) dell'applicazione.

    ---


```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - database
    environment:
      DATABASE_URL: postgres://user:password@database:5432/inventory

  database:
    image: postgres:latest
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: inventory
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  db_data:

```

### Spiegazione dei Servizi

1. **Frontend**
    - **Build**: Costruisce l'immagine Docker per il frontend dalla directory `./frontend`.
    - **Ports**: Mappa la porta 3000 del container alla porta 3000 della macchina host.
    - **depends_on**: Assicura che il servizio `backend` sia avviato prima del `frontend`.
2. **Backend**
    - **Build**: Costruisce l'immagine Docker per il backend dalla directory `./backend`.
    - **Ports**: Mappa la porta 5000 del container alla porta 5000 della macchina host.
    - **depends_on**: Assicura che il servizio `database` sia avviato prima del `backend`.
    - **Environment**: Imposta la variabile d'ambiente `DATABASE_URL` necessaria per connettersi al database PostgreSQL.
3. **Database**
    - **Image**: Utilizza l'immagine Docker ufficiale di PostgreSQL.
    - **Environment**: Configura le variabili d'ambiente per PostgreSQL (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`).
    - **Volumes**: Utilizza un volume Docker per persistere i dati del database e monta lo script SQL di inizializzazione.

### Volumi

- **db_data**: Un volume Docker per persistere i dati del database PostgreSQL tra i riavvii dei container.

---

Per eseguire l'applicazione, basta usare il comando:

```bash

docker-compose up
```

Questo comando:

1. Costruirà le immagini Docker per il frontend e il backend.
2. Eseguirà i container per il frontend, il backend e il database.
3. Configurerà le connessioni e i volumi necessari.

Quando tutti i container sono in esecuzione, puoi accedere all'applicazione tramite il browser sulla porta 3000 per il frontend e interagire con l'API backend sulla porta 5000.

Alcuni comandi utili per gestire i container Docker e Docker Compose:

1. **docker-compose up -d**: Avvia i container in background (detached mode).
2. **docker-compose down**: Arresta e rimuove i container, le reti e i volumi associati all'applicazione definita in `docker-compose.yml`.
3. **docker ps**: Mostra i container in esecuzione.
4. **docker-compose logs [service_name]**: Visualizza i log di un servizio specifico.
5. **docker-compose exec [service_name] [command]**: Esegue un comando all'interno di un servizio Docker.
6. **docker-compose build**: Costruisce o ricostruisce le immagini dei servizi definiti in `docker-compose.yml`.
7. **docker-compose restart [service_name]**: Riavvia un servizio specifico.
8. **docker-compose stop**: Arresta i container senza rimuoverli.
9. **docker-compose rm**: Rimuove i container non in esecuzione.
10. **docker-compose pull**: Aggiorna le immagini dei servizi definiti in `docker-compose.yml` scaricando le versioni più recenti disponibili da Docker Hub.

w love <134 by Ani Mema (amema) - w a lot of help by [taskade.com](https://www.taskade.com/)
