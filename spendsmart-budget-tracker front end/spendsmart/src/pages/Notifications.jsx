function Notifications({ expenses, budget }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budget - total
  const pct = (total / budget) * 100

  // Group spending by category
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  // Build notifications list
  const notifications = []

  // Over budget alert
  if (total > budget) {
    notifications.push({
      type: "danger",
      icon: "🔴",
      title: "Over Budget!",
      message: `You have exceeded your budget by $${Math.abs(remaining).toFixed(2)}. Consider reviewing your expenses.`
    })
  }

  // Close to budget warning
  if (pct >= 70 && pct < 100) {
    notifications.push({
      type: "warning",
      icon: "🟡",
      title: "Approaching Budget Limit",
      message: `You have used ${pct.toFixed(0)}% of your $${budget} budget. Only $${remaining.toFixed(2)} remaining.`
    })
  }

  // Category overspending alerts (any category over 30% of budget)
  Object.entries(categoryTotals).forEach(([category, amount]) => {
    const categoryPct = (amount / budget) * 100
    if (categoryPct >= 30) {
      notifications.push({
        type: "warning",
        icon: "⚠️",
        title: `High Spending in ${category}`,
        message: `You have spent $${amount.toFixed(2)} on ${category}, which is ${categoryPct.toFixed(0)}% of your total budget.`
      })
    }
  })

  // Many transactions warning
  if (expenses.length >= 10) {
    notifications.push({
      type: "info",
      icon: "📊",
      title: "High Transaction Volume",
      message: `You have logged ${expenses.length} transactions. Consider reviewing if all are necessary.`
    })
  }

  // All good message
  if (pct < 70 && notifications.length === 0) {
    notifications.push({
      type: "success",
      icon: "🟢",
      title: "You're on Track!",
      message: `Great job! You have only used ${pct.toFixed(0)}% of your budget. Keep it up!`
    })
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ color: "#1e3a5f", marginBottom: "0.5rem" }}>🔔 Notifications</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Alerts and insights based on your current spending.
      </p>

      {/* Budget overview bar */}
      <div className="notif-budget-bar">
        <div className="notif-budget-info">
          <span>Budget: ${budget}</span>
          <span>Spent: ${total.toFixed(2)}</span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${pct > 100 ? "danger" : pct > 70 ? "warn" : ""}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.5rem 0 0 0" }}>
          {pct.toFixed(0)}% of budget used
        </p>
      </div>

      {/* Notification cards */}
      <div className="notif-list">
        {notifications.map((notif, i) => (
          <div key={i} className={`notif-card notif-${notif.type}`}>
            <span className="notif-icon">{notif.icon}</span>
            <div>
              <p className="notif-title">{notif.title}</p>
              <p className="notif-message">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications