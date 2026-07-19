SELECT * FROM categories;
SELECT * FROM transactions;
Open this
SELECT * FROM transaction_details;

USE budget_tracker;
SHOW TABLES;


SELECT 
  t.id,
  t.description,
  t.amount,
  t.type,
  t.date,
  c.name AS category_name
FROM transactions t
LEFT JOIN categories c ON t.category_id = c.id;
SET SQL_SAFE_UPDATES = 0;
DELETE FROM transactions;
SET SQL_SAFE_UPDATES = 1;

SELECT 
  t.id,
  t.description,
  t.amount,
  t.type,
  t.date,
  c.name AS category_name
FROM transactitransactionsons t
LEFT JOIN categories c ON t.category_id = c.id;

CREATE OR REPLACE VIEW transaction_details AS
SELECT
  t.id,
  t.description,
  t.amount,
  t.type,
  t.date,
  c.name AS category_name
FROM transactions t
LEFT JOIN categories c ON t.category_id = c.id;