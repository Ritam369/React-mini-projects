import { useState, type FormEvent } from "react"
import "./App.css"

interface Todo {
  id: string
  title: string
  isCompleted: boolean
}

function App() {
  const [currentValue, setCurrentValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  function handleAddButton() {
    const trimmedValue = currentValue.trim()

    if (!trimmedValue) {
      return
    }

    setTodos((previousTodos) => [
      ...previousTodos,
      {
        id: `todo-${Date.now()}`,
        title: trimmedValue,
        isCompleted: false,
      },
    ])
    setCurrentValue("")
  }

  function handleRemove(id: string) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id))
  }

  function handleToggle(id: string) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleAddButton()
  }

  const completedCount = todos.filter((todo) => todo.isCompleted).length

  return (
    <main className="app-shell">
      <section className="todo-card">
        <div className="hero">
          <p className="eyebrow">Daily planner</p>
          <h1>Todo List</h1>
          <p className="subtitle">
            Capture your tasks, tick them off, and keep the day moving.
          </p>
        </div>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={currentValue}
            onChange={(event) => setCurrentValue(event.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="stats">
          <span>{todos.length} tasks</span>
          <span>{completedCount} done</span>
        </div>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">No todos yet. Add your first one above.</li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={todo.isCompleted ? "todo-item completed" : "todo-item"}
              >
                <button
                  type="button"
                  className="todo-toggle"
                  onClick={() => handleToggle(todo.id)}
                  aria-label={
                    todo.isCompleted
                      ? "Mark todo as incomplete"
                      : "Mark todo as complete"
                  }
                >
                  <span className="checkmark">✓</span>
                </button>

                <span className="todo-text">{todo.title}</span>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemove(todo.id)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  )
}

export default App
