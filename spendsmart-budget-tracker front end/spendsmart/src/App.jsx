import { useState, useEffect } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Summary from "./components/Summary"
import Chart from "./components/Chart"
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "./api/app.js"

function About() {
  const features = [
    { icon: "📊", title: "Visual Charts", desc: "Donut and bar charts show where your money goes at a glance." },
    { icon: "➕", title: "Quick Add", desc: "Log expenses in seconds with name, amount, and category." },
    { icon: "✏️", title: "Edit & Delete", desc: "Fix mistakes easily — update or remove any expense anytime." },
    { icon: "💾", title: "Auto-Save", desc: "Your data is saved to a real database — it's there on any device." },
    { icon: "🎯", title: "Budget Goals", desc: "Set a budget and track your progress with a live progress bar." },
    { icon: "🔍", title: "Search & Filter", desc: "Find any expense instantly by name or category." },
  ]

  return (
    <div className="about-card">
      <div className="about-hero">
        <div className="about-logo-circle">💰</div>
        <h2>SpendSmart</h2>
        <p className="about-tagline">Your simple, smart budget companion.</p>
      </div>
      <p className="about-description">
        SpendSmart helps students and young professionals take control of their finances —
        no spreadsheets, no steep learning curve. Just clear, real-time insight into where
        your money is going.
      </p>
      <div className="about-features">
        {features.map(f => (
          <div className="about-feature-card" key={f.title}>
            <span className="about-feature-icon">{f.icon}</span>
            <div>
              <p className="about-feature-title">{f.title}</p>
              <p className="about-feature-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="about-built-with">
        <span>Built with</span>
        <span className="about-badge">⚛️ React</span>
        <span className="about-badge">☕ Spring Boot</span>
        <span className="about-badge">🗄️ MySQL</span>
        <span className="about-badge">🎨 Canvas API</span>
      </div>
    </div>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !message) return
    const formData = new FormData()
    formData.append("form-name", "contact")
    formData.append("name", name)
    formData.append("email", email)
    formData.append("message", message)
    try {
      await fetch("/", { method: "POST", body: formData })
      setSent(true)
      setName(""); setEmail(""); setMessage("")
    } catch (error) {
      console.error("Form error:", error)
    }
  }

  return (
    <div className="contact-card">
      <h2>Contact Us</h2>
      <p className="contact-intro">
        Thank you for using SpendSmart! If you have any questions, feedback, or suggestions,
        we would love to hear from you.
      </p>
      <p className="contact-email">Email: <a href="mailto:qadimakhi@gmail.com">qadimakhi@gmail.com</a></p>
      <p className="contact-form-title">Contact Form</p>
      {sent ? (
        <p className="contact-sent">✓ Message sent! We'll get back to you soon.</p>
      ) : (
        <form name="contact" method="POST" data-netlify="true" className="contact-form" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <div className="contact-field">
            <label>Name</label>
            <input name="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="contact-field">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="contact-field">
            <label>Message</label>
            <textarea name="message" placeholder="Send Message" value={message} onChange={e => setMessage(e.target.value)} required />
          </div>
          <button type="submit" className="btn-send">Send</button>
        </form>
      )}
      <p className="contact-note">Our team will review your message and respond as soon as possible.</p>
    </div>
  )
}

function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("spendsmart-budget")
    return saved ? Number(saved) : 1000
  })
  const [page, setPage] = useState(() => localStorage.getItem("spendsmart-page") || "Dashboard")
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [editingBudget, setEditingBudget] = useState(false)
  const [budgetInput, setBudgetInput] = useState(budget)

  // Load transactions from API on mount
  useEffect(() => {
    getTransactions()
      .then(data => {
        // Map backend shape → frontend shape
        const mapped = data.map(t => ({
          id: t.id,
          title: t.description,
          amount: parseFloat(t.amount),
          category: t.category ? t.category.name : "Uncategorized",
          type: t.type,
          date: t.date,
        }))
        setExpenses(mapped)
      })
      .catch(err => console.error("Failed to load transactions:", err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { localStorage.setItem("spendsmart-budget", budget) }, [budget])
  useEffect(() => { localStorage.setItem("spendsmart-page", page) }, [page])

  const addExpense = async (expense) => {
    // Map frontend shape → backend shape
    const payload = {
      description: expense.title,
      amount: expense.amount,
      type: "EXPENSE",
      date: new Date().toISOString().split("T")[0],
    }
    try {
      const created = await createTransaction(payload)
      setExpenses(prev => [...prev, {
        id: created.id,
        title: created.description,
        amount: parseFloat(created.amount),
        category: created.category ? created.category.name : "Uncategorized",
        type: created.type,
        date: created.date,
      }])
    } catch (err) {
      console.error("Failed to add transaction:", err)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await deleteTransaction(id)
      setExpenses(prev => prev.filter(exp => exp.id !== id))
    } catch (err) {
      console.error("Failed to delete transaction:", err)
    }
  }

  const editExpense = async (updatedExpense) => {
    const payload = {
      description: updatedExpense.title,
      amount: updatedExpense.amount,
      type: updatedExpense.type || "EXPENSE",
      date: updatedExpense.date || new Date().toISOString().split("T")[0],
    }
    try {
      const updated = await updateTransaction(updatedExpense.id, payload)
      setExpenses(prev => prev.map(exp =>
        exp.id === updatedExpense.id
          ? { ...exp, title: updated.description, amount: parseFloat(updated.amount) }
          : exp
      ))
    } catch (err) {
      console.error("Failed to update transaction:", err)
    }
  }

  const saveBudget = () => {
    const parsed = parseFloat(budgetInput)
    if (!isNaN(parsed) && parsed > 0) {
      setBudget(parsed)
      localStorage.setItem("spendsmart-budget", parsed)
    }
    setEditingBudget(false)
  }

  const usedCategories = ["All", ...new Set(expenses.map(exp => exp.category))]

  const filteredExpenses = expenses
    .filter(exp => filterCategory === "All" || exp.category === filterCategory)
    .filter(exp => exp.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand" onClick={() => setPage("Dashboard")} style={{ cursor: "pointer" }}>SpendSmart</span>
        <div className="navbar-links">
          <button className={page === "Dashboard" ? "nav-btn active" : "nav-btn"} onClick={() => setPage("Dashboard")}>Dashboard</button>
          <button className={page === "About" ? "nav-btn active" : "nav-btn"} onClick={() => setPage("About")}>About</button>
          <button className={page === "Contact" ? "nav-btn active" : "nav-btn"} onClick={() => setPage("Contact")}>Contact</button>
        </div>
      </nav>

      <div className="app-container">
        {page === "Dashboard" && (
          <>
            <div className="page-header">
              <h1>SpendSmart</h1>
              {editingBudget ? (
                <div className="budget-edit">
                  <input type="number" value={budgetInput} onChange={e => setBudgetInput(e.target.value)} className="budget-input" />
                  <button onClick={saveBudget}>Save</button>
                  <button className="btn-cancel" onClick={() => setEditingBudget(false)}>Cancel</button>
                </div>
              ) : (
                <button className="btn-edit-budget" onClick={() => { setEditingBudget(true); setBudgetInput(budget) }}>Edit Budget</button>
              )}
            </div>

            {loading ? (
              <p style={{ textAlign: "center", padding: "2rem" }}>Loading transactions...</p>
            ) : (
              <>
                <Summary expenses={expenses} budget={budget} />
                <Chart expenses={expenses} />
                <ExpenseForm addExpense={addExpense} />
                <div className="search-filter">
                  <input className="search-input" placeholder="🔍 Search expenses..." value={search} onChange={e => setSearch(e.target.value)} />
                  <select className="filter-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                    {usedCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <ExpenseList expenses={filteredExpenses} deleteExpense={deleteExpense} editExpense={editExpense} />
              </>
            )}
          </>
        )}
        {page === "About" && <About />}
        {page === "Contact" && <Contact />}
      </div>

      <footer className="footer">
        <p className="footer-tagline">Spend less. Save more. Stay smart.</p>
        <p>© {new Date().getFullYear()} SpendSmart. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App