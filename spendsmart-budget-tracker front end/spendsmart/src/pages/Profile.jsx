import { useState, useEffect } from "react"
import { getProfile, changePassword } from "../api/api"

function Profile({ expenses }) {
  const [profile, setProfile] = useState(null)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfile()
      .then(data => setProfile(data))
      .catch(err => console.error("Failed to load profile:", err))
      .finally(() => setLoading(false))
  }, [])

  // Spending stats
  const totalSpent = expenses
    .filter(e => e.type === "EXPENSE" || !e.type)
    .reduce((sum, e) => sum + e.amount, 0)

  const totalTransactions = expenses.length

  const topCategory = expenses.length > 0
    ? Object.entries(
        expenses.reduce((acc, e) => {
          acc[e.category] = (acc[e.category] || 0) + e.amount
          return acc
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0]
    : "None"

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters")
      return
    }

    try {
      const data = await changePassword(currentPassword, newPassword)
      if (data.error) {
        setError(data.error)
      } else {
        setMessage("✓ Password changed successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (err) {
      setError("Failed to change password")
    }
  }

  if (loading) return <p style={{ textAlign: "center", padding: "2rem" }}>Loading profile...</p>

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {profile?.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="profile-name">{profile?.username}</h2>
          <p className="profile-email">{profile?.email}</p>
        </div>
      </div>

      {/* Spending Stats */}
      <div className="profile-stats">
        <div className="profile-stat-card">
          <span className="profile-stat-icon">💸</span>
          <p className="profile-stat-value">${totalSpent.toFixed(2)}</p>
          <p className="profile-stat-label">Total Spent</p>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-icon">📋</span>
          <p className="profile-stat-value">{totalTransactions}</p>
          <p className="profile-stat-label">Transactions</p>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-icon">🏆</span>
          <p className="profile-stat-value" style={{ fontSize: "1rem" }}>{topCategory}</p>
          <p className="profile-stat-label">Top Category</p>
        </div>
      </div>

      {/* Change Password */}
      <div className="profile-section">
        <h3>Change Password</h3>

        {message && <p className="auth-sent">{message}</p>}
        {error && <p className="auth-error">⚠ {error}</p>}

        <form className="auth-form" onSubmit={handlePasswordChange}>
          <div className="auth-field">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-auth">
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile