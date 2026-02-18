# Tann Mann Foundation - Backend Server

Express.js REST API server for the Tann Mann Foundation registration system.

## Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js              # PostgreSQL connection
│   ├── controllers/
│   │   └── submission.controller.js  # Form submission logic
│   ├── routes/
│   │   └── submission.routes.js      # API routes
│   └── index.js               # Server entry point
├── .env                       # Environment variables
└── package.json
```

## Setup Instructions

### 1. Configure Environment Variables

Edit `server/.env` with your PostgreSQL credentials:

```env
PORT=5000
DB_USER=your_pg_username
DB_PASSWORD=your_pg_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tannmann_db
```

### 2. Set Up PostgreSQL Database

```bash
# Start PostgreSQL service
sudo service postgresql start

# Create database
psql -U postgres -c "CREATE DATABASE tannmann_db;"

# Run schema
psql -U postgres -d tannmann_db -f ../database/schema.sql
```

### 3. Start the Server

```bash
cd server
npm run dev
```

Server will run at: `http://localhost:5000`

## API Endpoints

### POST /api/submit

Submit registration form data.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "phone": "9876543210",
  "email": "jane@example.com"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "phone": "9876543210",
    "email": "jane@example.com",
    "created_at": "2026-02-19T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name must be at least 2 characters long",
    "Invalid email format"
  ]
}
```

### GET /

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Tann Mann Foundation API is running",
  "timestamp": "2026-02-19T10:30:00.000Z"
}
```

## Validation Rules

- **Name:** Minimum 2 characters
- **Phone:** Exactly 10 digits
- **Email:** Valid email format, must be unique

## Testing with curl

```bash
# Health check
curl http://localhost:5000

# Submit form
curl -X POST http://localhost:5000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "9876543210",
    "email": "test@example.com"
  }'
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
