import { useState, useEffect } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Summary from "./components/Summary"
import Chart from "./components/Chart"


function About() {
  const features = [
    { icon: "📊", title: "Visual Charts", desc: "Donut and bar charts show where your money goes at a glance." },
    { icon: "➕", title: "Quick Add", desc: "Log expenses in seconds with name, amount, and category." },
    { icon: "✏️", title: "Edit & Delete", desc: "Fix mistakes easily — update or remove any expense anytime." },
    { icon: "💾", title: "Auto-Save", desc: "Your data is saved locally — it's still there when you come back." },
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
        <span className="about-badge">💾 localStorage</span>
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
    await fetch("/", {
      method: "POST",
      body: formData,
    })

    setSent(true)
    setName("")
    setEmail("")
    setMessage("")
  } catch (error) {
    console.error("Form error:", error)
  }
}

  return (
    <div className="contact-card">
      <h2>Contact US</h2>
      <p className="contact-intro">
        Thank you for using SpendSmart! If you have any questions, feedback, or suggestions,
        we would love to hear from you. You can reach us by email or by filling out the contact form below.
      </p>
      <p className="contact-email">
        Email: <a href="mailto:qadimakhi@gmail.com">qadimakhi@gmail.com</a>
      </p>

      <p className="contact-form-title">Contact Form</p>

      {sent ? (
        <p className="contact-sent">✓ Message sent! We'll get back to you soon.</p>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="contact-field">
            <label>Name</label>
            <input
              name="name"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="contact-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="contact-field">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Send Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-send">Send</button>
        </form>
              )}

              <p className="contact-note">
                Our team will review your message and respond as soon as possible. We appreciate your
                feedback and are always looking for ways to improve SpendSmart.
              </p>
    </div>
  )
}

function App() {
  // Load expenses from localStorage on first render
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("spendsmart-expenses")
    return saved ? JSON.parse(saved) : []
  })

  // Load budget from localStorage
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("spendsmart-budget")
    return saved ? Number(saved) : 1000
  })

  const [page, setPage] = useState(() => localStorage.getItem("spendsmart-page") || "Dashboard")
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [editingBudget, setEditingBudget] = useState(false)
  const [budgetInput, setBudgetInput] = useState(budget)

   // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("spendsmart-expenses", JSON.stringify(expenses))
  }, [expenses])

  // Save budget to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("spendsmart-budget", budget)
  }, [budget])

  useEffect(() => {
  localStorage.setItem("spendsmart-page", page)
  }, [page])

  const addExpense = (expense) => {
    setExpenses([...expenses, expense])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

   const editExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp))
  }

   const saveBudget = () => {
    const parsed = parseFloat(budgetInput)
    if (!isNaN(parsed) && parsed > 0) {
      setBudget(parsed)
      localStorage.setItem("spendsmart-budget", parsed)
    }
    setEditingBudget(false)
  }

  // Get unique categories from expenses for filter dropdown
  const usedCategories = ["All", ...new Set(expenses.map(exp => exp.category))]

  // Filter and search expenses
  const filteredExpenses = expenses
    .filter(exp => filterCategory === "All" || exp.category === filterCategory)
    .filter(exp => exp.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand" onClick={() => setPage("Dashboard")} style={{ cursor: "pointer" }}>SpendSmart</span> 
        <div className="navbar-links">
          <button
            className={page === "Dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("Dashboard")}
          >Dashboard</button>
          <button
            className={page === "About" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("About")}
          >About</button>
          <button
            className={page === "Contact" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("Contact")}
          >Contact</button>
        </div>
      </nav>

      <div className="app-container">
        {page === "Dashboard" && (
          <>
            <div className="page-header">
              <h1>SpendSmart</h1>
              {editingBudget ? (
                <div className="budget-edit">
                  <input
                    type="number"
                    value={budgetInput}
                    onChange={e => setBudgetInput(e.target.value)}
                    className="budget-input"
                  />
                  <button onClick={saveBudget}>Save</button>
                  <button className="btn-cancel" onClick={() => setEditingBudget(false)}>Cancel</button>
                </div>
              ) : (
                <button className="btn-edit-budget" onClick={() => { setEditingBudget(true); setBudgetInput(budget) }}>
                  Edit Budget
                </button>
              )}
            </div>
 
            <Summary expenses={expenses} budget={budget} />
 
            <Chart expenses={expenses} />
 
            <ExpenseForm addExpense={addExpense} />
 
            {/* Search and Filter */}
            <div className="search-filter">
              <input
                className="search-input"
                placeholder="🔍 Search expenses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                className="filter-select"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                {usedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
 
            <ExpenseList
              expenses={filteredExpenses}
              deleteExpense={deleteExpense}
              editExpense={editExpense}
            />
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