const BASE_URL = "http://localhost:8080/api";

// Transactions
export const getTransactions = () =>
  fetch(`${BASE_URL}/transactions`, {
    credentials: "include"
  }).then(res => res.json());

export const createTransaction = (transaction) =>
  fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(transaction),
  }).then(res => res.json());

export const updateTransaction = (id, transaction) =>
  fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(transaction),
  }).then(res => res.json());

export const deleteTransaction = (id) =>
  fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

// Categories
export const getCategories = () =>
  fetch(`${BASE_URL}/categories`, {
    credentials: "include"
  }).then(res => res.json());

export const createCategory = (category) =>
  fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(category),
  }).then(res => res.json());

export const deleteCategory = (id) =>
  fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    credentials: "include"
  });