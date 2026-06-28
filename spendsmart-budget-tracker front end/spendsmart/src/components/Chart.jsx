import { useEffect, useRef } from "react"
import spendSmartLogo from "../assets/spend_smart.jpg"

const COLORS = [
  "#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16"
]

function Chart({ expenses }) {
    const pieRef = useRef(null)
    const barRef = useRef(null)
  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  const labels = Object.keys(categoryTotals)
  const values = Object.values(categoryTotals)
  const total = values.reduce((s, v) => s + v, 0)
  const maxValue = Math.max(...values)

  //Draw pie/donut chart
  useEffect(() => {
    if (!pieRef.current || labels.length === 0) return
    const canvas = pieRef.current
    const ctx = canvas.getContext("2d")
    const size = canvas.width
    const cx = size / 2
    const cy = size / 2
    const radius = size / 2 - 10

    ctx.clearRect(0, 0, size, size)

    let startAngle = -Math.PI / 2
    values.forEach((val, i) => {
      const slice = (val / total) * 2 * Math.PI
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, startAngle, startAngle + slice)
      ctx.closePath()
      ctx.fillStyle = COLORS[i % COLORS.length]
      ctx.fill()
      startAngle += slice
    })

    // White circle in center for donut effect
    ctx.beginPath()
    ctx.arc(cx, cy, radius * 0.55, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
  }, [expenses])

  // Draw bar chart
  useEffect(() => {
    if (!barRef.current || labels.length === 0) return
    const canvas = barRef.current
    const ctx = canvas.getContext("2d")
    const W = canvas.width
    const H = canvas.height
    const paddingTop = 16
    const paddingBottom = 40
    const paddingLeft = 8
    const paddingRight = 8
    const chartH = H - paddingTop - paddingBottom
    const chartW = W - paddingLeft - paddingRight
 
    ctx.clearRect(0, 0, W, H)
 
    const barCount = labels.length
    const barWidth = Math.min((chartW / barCount) * 0.6, 40)
    const gap = chartW / barCount
 
    labels.forEach((label, i) => {
      const val = values[i]
      const barH = (val / maxValue) * chartH
      const x = paddingLeft + i * gap + gap / 2 - barWidth / 2
      const y = paddingTop + chartH - barH

    // Draw bar
      ctx.fillStyle = COLORS[i % COLORS.length]
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0])
      ctx.fill()
 
      // Draw amount on top of bar
      ctx.fillStyle = "#6b7280"
      ctx.font = "bold 9px Arial"
      ctx.textAlign = "center"
      ctx.fillText("$" + val.toFixed(0), x + barWidth / 2, y - 4)
 
      // Draw label below bar
      ctx.fillStyle = "#9ca3af"
      ctx.font = "9px Arial"
      ctx.textAlign = "center"
      const shortLabel = label.length > 8 ? label.slice(0, 7) + "…" : label
      ctx.fillText(shortLabel, x + barWidth / 2, H - paddingBottom + 14)
    })
  }, [expenses])

  if (expenses.length === 0) return null

  return (
    <div className="chart-card">
      <h3 className="section-title">Spending by Category</h3>
        <div className="charts-row" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "20px", flexWrap: "nowrap", overflowX: "auto" }}>
      {/* Pie/Donut Chart */}
        <div className="chart-block" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p className="chart-label">By Share</p>
          <div className="chart-wrap" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
            <canvas ref={pieRef} width={160} height={160} />
            <div className="chart-legend">
              {labels.map((label, i) => (
                <div key={label} className="legend-item">
                  <span className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="legend-label">{label}</span>
                  <span className="legend-amount">${categoryTotals[label].toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="chart-divider" />
 
        {/* Bar Chart */}
        <div className="chart-block" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p className="chart-label">By Amount</p>
          <canvas ref={barRef} width={260} height={200} />
        </div>
        {/* Divider */}
        <div className="chart-divider" />
        {/* Logo Image */}
        <div className="chart-block" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img
            src={spendSmartLogo}
            alt="SpendSmart Logo"
            style={{ width: 130, height: 130, borderRadius: "50%", objectFit: "cover", boxShadow: "0 4px 12px rgba(37,99,235,0.18)" }}
          />
        </div>
 
      </div>
    </div>
  )
}

export default Chart