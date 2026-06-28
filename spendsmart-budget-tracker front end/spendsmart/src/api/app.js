const BASE_URL = "http://localhost:8080/api";

// Transactions
export const getTransactions = () =>
  fetch(`${BASE_URL}/transactions`).then(res => res.json());

export const createTransaction = (transaction) =>
  fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  }).then(res => res.json());

export const updateTransaction = (id, transaction) =>
  fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  }).then(res => res.json());

export const deleteTransaction = (id) =>
  fetch(`${BASE_URL}/transactions/${id}`, { method: "DELETE" });

// Categories
export const getCategories = () =>
  fetch(`${BASE_URL}/categories`).then(res => res.json());

export const createCategory = (category) =>
  fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  }).then(res => res.json());

export const deleteCategory = (id) =>
  fetch(`${BASE_URL}/categories/${id}`, { method: "DELETE" });