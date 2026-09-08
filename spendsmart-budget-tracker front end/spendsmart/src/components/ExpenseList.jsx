import ExpenseItem from "./ExpenseItem"

function ExpenseList({ expenses, deleteExpense, editExpense }) {
  return (
    <div className="list-section">
      <h3 className="section-title">Expense List</h3>
      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add one above!</p>
      ) : (
        <ul className="expense-list">
          {expenses.map(exp => (
            <ExpenseItem
              key={exp.id}
              expense={exp}
              deleteExpense={deleteExpense}
              editExpense={editExpense}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList