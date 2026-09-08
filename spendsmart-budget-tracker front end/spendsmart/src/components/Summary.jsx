function Summary({ expenses, budget }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const remaining = budget - total
  const pct = Math.min((total / budget) * 100, 100)
  const fillClass = pct > 90 ? "progress-fill danger" : pct > 70 ? "progress-fill warn" : "progress-fill"

  return (
    <div className="summary-card">
      <div className="summary-row">
        <div className="summary-stat">
          <span className="summary-label">Total Spent:</span>
          <span className="summary-value">${total.toFixed(2)}</span>
        </div>
        <div className="summary-stat">
          <span className="summary-label">Remaining:</span>
          <span className={`summary-value ${remaining < 0 ? "over-budget" : "remaining"}`}>
            ${remaining.toFixed(2)}
          </span>
        </div>
        <div className="summary-stat">
          <span className="summary-label">Budget:</span>
          <span className="summary-value">${Number(budget).toFixed(2)}</span>
        </div>
      </div>

      <div className="progress-wrap">
        <div className="progress-track">
          <div className={fillClass} style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-label">
          <span>{pct.toFixed(0)}% of ${Number(budget).toFixed(2)} budget used</span>
        </div>
      </div>
    </div>
  )
}

export default Summary