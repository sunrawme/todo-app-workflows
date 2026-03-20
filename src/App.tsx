import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="app">
      <h1>Todo App</h1>

      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${
              todo.completed ? 'completed' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            <span className="todo-text">{todo.text}</span>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App