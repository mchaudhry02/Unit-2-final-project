import { useState } from "react"

function ExpenseItem({ expense, deleteExpense, editExpense }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(expense.title)
  const [editAmount, setEditAmount] = useState(expense.amount)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleSave = () => {
  if (!editTitle.trim() || editAmount === "" || editAmount === null) return
      editExpense({ ...expense, title: editTitle, amount: parseFloat(editAmount) })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirmDelete) {
      deleteExpense(expense.id)
    } else {
      setConfirmDelete(true)
    }
  }

  if (isEditing) {
    return (
      <li className="expense-item editing">
        <div className="edit-row">
          <input
            className="edit-input"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <input
            className="edit-input edit-amount"
            type="number"
            value={editAmount}
            onChange={e => setEditAmount(e.target.value)}
          />
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </li>
    )
  }

  return (
    <li className="expense-item">
      <div className="expense-left">
        <span className="expense-name">{expense.title}</span>
        {expense.category && (
          <span className="expense-category">{expense.category}</span>
        )}
      </div>
      <div className="expense-right">
        <span className="expense-amount">${parseFloat(expense.amount).toFixed(2)}</span>
        <button className="btn-edit" onClick={() => {
          setEditTitle(expense.title)
          setEditAmount(expense.amount)
          setIsEditing(true)
        }}>Edit</button>
        {confirmDelete ? (
          <div className="confirm-delete">
            <span className="confirm-text">Sure?</span>
            <button className="btn-delete" onClick={handleDelete}>Yes</button>
            <button className="btn-cancel-sm" onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        ) : (
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
        )}
      </div>
    </li>
  )
}

export default ExpenseItem