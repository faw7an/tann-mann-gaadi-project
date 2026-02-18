-- Tann Mann Foundation - Database Schema

-- Create database (run this in psql or pgAdmin first)
-- CREATE DATABASE tannmann_db;

-- Connect to the database
-- \c tannmann_db

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

-- Display table structure
\d submissions;

-- Sample query to view all submissions
-- SELECT * FROM submissions ORDER BY created_at DESC;
