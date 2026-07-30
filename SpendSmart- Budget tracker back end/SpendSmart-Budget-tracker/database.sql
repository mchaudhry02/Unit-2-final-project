-- ============================================
-- SpendSmart Budget Tracker - Database Script
-- ============================================

-- Create and select the database
CREATE DATABASE IF NOT EXISTS budget_tracker;
USE budget_tracker;

-- ============================================
-- DROP TABLES (in correct order due to FK)
-- ============================================
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- ============================================
-- CREATE TABLES
-- ============================================

CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            color VARCHAR(50)
);

CREATE TABLE transactions (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              description VARCHAR(255) NOT NULL,
                              amount DECIMAL(10, 2) NOT NULL,
                              type VARCHAR(50),
                              date DATE,
                              category_id BIGINT,
                              FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Sample users (passwords are BCrypt encoded — default password is "password123")
INSERT INTO users (username, email, password) VALUES
                                                  ('demo', 'demo@spendsmart.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8RRscf4ZGnENZ6eme6'),
                                                  ('testuser', 'test@spendsmart.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8RRscf4ZGnENZ6eme6');

-- Sample categories
INSERT INTO categories (name, color) VALUES
                                         ('Groceries', '#16a34a'),
                                         ('Transportation', '#2563eb'),
                                         ('Entertainment', '#8b5cf6'),
                                         ('Utilities', '#f59e0b'),
                                         ('Health', '#dc2626'),
                                         ('Rent', '#f97316'),
                                         ('Education', '#14b8a6'),
                                         ('Shopping', '#ec4899');

-- Sample transactions
INSERT INTO transactions (description, amount, type, date, category_id) VALUES
                                                                            ('Weekly groceries', 85.50, 'EXPENSE', '2026-07-01', 1),
                                                                            ('Monthly rent', 950.00, 'EXPENSE', '2026-07-01', 6),
                                                                            ('Bus pass', 45.00, 'EXPENSE', '2026-07-02', 2),
                                                                            ('Netflix subscription', 15.99, 'EXPENSE', '2026-07-03', 3),
                                                                            ('Electric bill', 72.30, 'EXPENSE', '2026-07-04', 4),
                                                                            ('Gym membership', 30.00, 'EXPENSE', '2026-07-05', 5),
                                                                            ('Online course', 29.99, 'EXPENSE', '2026-07-06', 7),
                                                                            ('New shoes', 65.00, 'EXPENSE', '2026-07-07', 8),
                                                                            ('Grocery run', 52.75, 'EXPENSE', '2026-07-08', 1),
                                                                            ('Uber ride', 12.50, 'EXPENSE', '2026-07-09', 2),
                                                                            ('Movie tickets', 24.00, 'EXPENSE', '2026-07-10', 3),
                                                                            ('Internet bill', 59.99, 'EXPENSE', '2026-07-11', 4);