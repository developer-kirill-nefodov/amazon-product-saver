# Amazon Product Scraper Backend

A backend service for collecting, validating, and storing product data from Amazon. The application is built with Node.js (ESM), PostgreSQL, Sequelize ORM, and integrates with the OpenAI API for data validation and enrichment.

## Features

- Product data ingestion and structured storage
- Extraction of key product fields:
  - Title, brand, model
  - Price and currency
  - Specifications and variants
  - Ratings and reviews
  - Product identifiers (ASIN, URL)
- Optional image upload (base64-encoded)
- Data validation and enrichment via OpenAI
- PostgreSQL database with Sequelize ORM
- Soft delete support (`paranoid: true`)
- Modular architecture and ES module support

## Prerequisites

- Node.js >= 20
- PostgreSQL >= 13
- OpenAI API key

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/developer-kirill-nefodov/amazon-product-saver.git && cd amazon-product-saver
```

### 2. Install dependencies

```bash
cd ./backend && npm install
```

### 3. Set up environment variables

Create a `.env` file at the root of the backend:

```
# Server Configuration
PORT=4000
NODE_ENV=development
HOST=localhost

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=debug
LOG_FILE_PATH=./logs/app.log
LOG_MAX_SIZE=5242880  # 5MB

# API Configuration
API_PREFIX=/api/v1
API_VERSION=v1

# Request Limits
REQUEST_BODY_LIMIT=10mb
REQUEST_URL_LIMIT=100kb

# Database Configuration
DB_NAME=amazon_scraper
DB_USER=postgres
DB_PASSWORD=postgres 
DB_HOST=localhost
DB_PORT=5432

OPENAI_API_KEY=
```

### 4. Create the PostgreSQL database
   Make sure the database amazon_scraper exists before running migrations.
   You can create it from the terminal:

```bash
sudo -u postgres createdb amazon_scraper
```

### 5 Run database migrations

> Note: All migrations are written in CommonJS (`.cjs`) for compatibility with Sequelize CLI.

```bash
npm run migrate
```

To undo the last migration:

```bash
npm run migrate:undo
```

## Scripts

Available `npm` scripts:

```bash
npm run migrate         # Apply all pending migrations
npm run migrate:undo    # Undo the last applied migration
npm run dev             # Start development server (if applicable)
```

## Frontend Setup

The frontend is a Chrome extension built with Vue.js 3. Here's how to set it up:

1. Build the extension:
   ```bash
    cd ./frontend && npm install && npm run build
   ```

2. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `frontend/dist` directory

3. Configure the extension:
   - Click on the extension icon in Chrome
   - Set the backend URL in the extension settings
   - The extension is now ready to use on Amazon product pages

4. Using the extension:
   - Navigate to any Amazon product page (e.g., amazon.com/dp/ASIN)
   - Click the button "Save Produc" to save
   - The product data will be sent to your backend server

## Contributing

