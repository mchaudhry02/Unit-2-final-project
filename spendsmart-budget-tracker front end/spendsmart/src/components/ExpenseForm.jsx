import { useState, useEffect } from "react"

const CUSTOM_CATEGORIES = [
  "Transportation",
  "Entertainment",
  "Health",
  "Shopping",
  "Utilities",
  "Rent",
  "Education",
  "Others"
]
function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //API
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories")
        return res.json()
      })
      .then((data) => {
        const foodCategories = data.categories
          .map((cat) => cat.strCategory)
          .filter((cat) => !cat.toLowerCase().includes("pork"))
        const allCategories = [...CUSTOM_CATEGORIES, ...foodCategories]

        setCategories(allCategories)
        setCategory(allCategories[0])
        setLoading(false)
      })
      .catch((err) => {
      setCategories(CUSTOM_CATEGORIES)
      setCategory(CUSTOM_CATEGORIES[0])
      setError(err.message)
      setLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !amount) return

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category
    }

    addExpense(newExpense)
    setTitle("")
    setAmount("")
    setCategory(categories[0])
  }

  return (
    <div className="form-section">
      <h3 className="section-title">Add Expense</h3>
      {error && (
        <p className="fetch-error">⚠ Could not load categories: {error}</p>
      )}
      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          placeholder="Expense Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {loading ? (
          <select className="category-select" disabled>
            <option>Loading categories...</option>
          </select>
        ) : (
          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
             <optgroup label="General">
              {CUSTOM_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </optgroup>
            <optgroup label="Food & Meals">
              {categories
                .filter((cat) => !CUSTOM_CATEGORIES.includes(cat))
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </optgroup>
          </select>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Add Expense"}
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm