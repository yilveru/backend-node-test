# 🧪 Technical Test – Rick & Morty API (TypeScript)

## 📌 Description

This project demonstrates how to integrate external REST APIs to manipulate, store, and cache data effectively, ensuring proper information management and optimal performance for end users.

The service uses **SQLite** as a database and stores data locally. You must configure the correct environment variables as defined in the `.env.example` file. If you rename any variables, be sure to update the code accordingly.

## ⚙️ Requirements

- Node.js v18 or higher
- npm

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yilveru/backend-node-test.git
cd backend-node-test
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment configuration file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## 📦 Available Commands

- `npm run build` – Compiles TypeScript files to JavaScript
- `npm start` – Starts the server in production mode (requires prior build)
- `npm run dev` – Starts the server in development mode with auto-reload
- `npm test` – Runs unit tests

## 🔍 API Usage

To test the service locally, navigate to: [http://localhost:3000/characters](http://localhost:3000/characters)

### Query Parameters

- `name` (required): Name of the character to search for
- `species` (optional): Filter by species
- `gender` (optional): Filter by gender

### Example Usage

```
GET /characters?name=rick&species=human&gender=male
```

### 🔁 Workflow

1. Receive a required `name` parameter to search for characters
2. Optionally receive `species` and `gender` parameters to filter results
3. Search the local database first
4. If no results are found, query the public API and store the results
5. Use a caching system to optimize repeated queries
6. Return results in JSON format
