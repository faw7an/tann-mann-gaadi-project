# Tann Mann Foundation - Registration System

A full-stack web application developed as part of the volunteer technical assessment for The Tann Mann Foundation, a registered charitable Trust in Bangalore, India.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)

## Overview

This application provides a registration system for The Tann Mann Foundation, featuring a "Good Morning" themed landing page where visitors can submit their contact information. The system consists of:

- A responsive frontend built with Next.js
- A RESTful API backend powered by Node.js and Express
- A PostgreSQL database for persistent data storage
- Comprehensive form validation on both client and server sides

**Live Application:** [Production URL]

## Technology Stack

### Frontend
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Typography:** Google Fonts (Playfair Display, Geist Sans, Geist Mono)
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database Driver:** node-postgres (pg)
- **Middleware:** CORS, body-parser
- **Environment Management:** dotenv

### Database
- **System:** PostgreSQL 12+
- **Features:** Indexed queries, unique constraints, timestamps

### Development Tools
- **Process Manager:** Nodemon
- **Version Control:** Git
- **Code Quality:** ESLint

## Project Structure

```
tann-mann-project/
├── client/                           # Frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js              # Main landing page
│   │   │   ├── layout.js            # Root layout with font configuration
│   │   │   └── globals.css          # Global styles and Tailwind configuration
│   │   └── components/
│   │       ├── Registration.jsx     # Registration form component
│   │       └── ui/                  # Reusable UI components
│   ├── public/
│   │   └── assets/                  # Static assets (images, etc.)
│   ├── .env.local                   # Environment variables
│   ├── next.config.mjs              # Next.js configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── package.json
│
├── server/                           # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # PostgreSQL connection pool
│   │   ├── controllers/
│   │   │   └── submission.controller.js  # Business logic
│   │   ├── routes/
│   │   │   └── submission.routes.js      # API route definitions
│   │   └── index.js                 # Application entry point
│   ├── .env                         # Environment variables
│   └── package.json
│
├── database/
│   └── schema.sql                   # Database schema definition
│
└── README.md                        # This file
```

## Features

### User Interface
- Responsive design optimized for desktop, tablet, and mobile devices
- Sunrise-themed visual design with gradient effects
- Glassmorphism UI elements with backdrop blur
- Real-time form validation feedback
- Loading states during form submission
- Success and error notification banners
- Accessible form inputs with icon indicators

### Form Validation
- **Name Field:**
  - Minimum 2 characters required
  - Only alphabetic characters and spaces allowed
  
- **Phone Field:**
  - Exactly 10 digits required
  - Numeric characters only
  - Specific error messages indicating digit count discrepancies
  
- **Email Field:**
  - Standard email format validation
  - Uniqueness constraint enforced at database level

### API Features
- RESTful endpoint design
- CORS enabled for cross-origin requests
- Comprehensive input validation
- Structured error responses with specific messages
- Database connection pooling for optimal performance
- Duplicate email detection and prevention

### Database Features
- Normalized schema design
- Auto-incrementing primary keys
- Email uniqueness constraints
- Indexed columns for improved query performance
- Automatic timestamp tracking

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js:** Version 18.x or higher
- **npm:** Version 9.x or higher (comes with Node.js)
- **PostgreSQL:** Version 12.x or higher
- **Git:** For version control

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tann-mann-project
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

## Configuration

### Database Setup

1. **Start PostgreSQL service:**

```bash
# On Linux
sudo service postgresql start

# On macOS with Homebrew
brew services start postgresql

# On Windows
# Use pgAdmin or Services panel
```

2. **Create the database:**

```bash
psql -U postgres -c "CREATE DATABASE tannmann_db;"
```

3. **Run the schema script:**

```bash
psql -U postgres -d tannmann_db -f ../database/schema.sql
```

### Environment Variables

#### Frontend Configuration

Create a `.env.local` file in the `client` directory:

```env
# Local Development
NEXT_PUBLIC_API_URL=http://localhost:5000

# Production
# NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

#### Backend Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tannmann_db
```

**Important:** Never commit `.env` files to version control. They are included in `.gitignore`.

## Running the Application

### Development Mode

**Terminal 1 - Backend Server:**

```bash
cd server
npm run dev
```

The backend server will start at `http://localhost:5000`

**Terminal 2 - Frontend Application:**

```bash
cd client
npm run dev
```

The frontend application will start at `http://localhost:3000`

### Production Mode

**Backend:**

```bash
cd server
npm start
```

**Frontend:**

```bash
cd client
npm run build
npm start
```

## API Documentation

### Base URL

- **Local:** `http://localhost:5000`
- **Production:** `https://tannmann-backend.vercel.app`

### Endpoints

#### Health Check

```http
GET /
```

**Response:**

```json
{
  "success": true,
  "message": "Tann Mann Foundation API is running",
  "timestamp": "2026-02-19T10:30:00.000Z"
}
```

#### Submit Registration

```http
POST /api/submit
```

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john.doe@example.com"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john.doe@example.com",
    "created_at": "2026-02-19T10:30:00.000Z"
  }
}
```

**Validation Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name must contain only letters and spaces",
    "Phone number must be 10 digits (you entered 8)",
    "Invalid email format"
  ]
}
```

**Duplicate Email Error (409 Conflict):**

```json
{
  "success": false,
  "message": "This email is already registered"
}
```

**Server Error (500 Internal Server Error):**

```json
{
  "success": false,
  "message": "Server error. Please try again later."
}
```

## Database Schema

### Submissions Table

```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**

- Primary key index on `id`
- Unique index on `email`
- Index on `created_at` for sorting queries

**Constraints:**

- `name`: Required, maximum 100 characters
- `phone`: Required, maximum 20 characters
- `email`: Required, unique, maximum 150 characters
- `created_at`: Automatically set to current timestamp

### Sample Queries

**View all submissions:**

```sql
SELECT * FROM submissions ORDER BY created_at DESC;
```

**Count total submissions:**

```sql
SELECT COUNT(*) FROM submissions;
```

**Search by email:**

```sql
SELECT * FROM submissions WHERE email = 'example@domain.com';
```

## Deployment

### Frontend (Vercel)

1. **Connect GitHub repository to Vercel**
2. **Configure environment variables:**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

3. **Deploy:**
   - Vercel will automatically build and deploy on each push

### Backend (Vercel)

1. **Add `vercel.json` configuration:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```

2. **Configure environment variables in Vercel dashboard**
3. **Deploy from GitHub repository**

### Database (Production)

Consider using managed PostgreSQL services:

- **Neon:** Serverless PostgreSQL
- **Supabase:** Open-source Firebase alternative
- **Railway:** Deploy PostgreSQL with automatic backups
- **AWS RDS:** Managed relational database service

## Testing

### Manual Testing

1. **Start both frontend and backend servers**
2. **Navigate to** `http://localhost:3000`
3. **Test valid submission:**
   - Name: "John Doe"
   - Phone: "9876543210"
   - Email: "john@example.com"
   - Expected: Success message, form clears

4. **Test validation errors:**
   - Name with numbers: Should show error
   - Phone with 8 digits: Should show specific digit count error
   - Invalid email format: Should show error
   - Duplicate email: Should show "already registered" error

### API Testing with cURL

**Health check:**

```bash
curl http://localhost:5000
```

**Submit registration:**

```bash
curl -X POST http://localhost:5000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "phone": "9876543210",
    "email": "jane@example.com"
  }'
```

**Test validation error:**

```bash
curl -X POST http://localhost:5000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John123",
    "phone": "12345",
    "email": "invalid-email"
  }'
```
