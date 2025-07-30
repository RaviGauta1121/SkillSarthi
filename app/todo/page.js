"use client"
import { useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-700"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
          <button
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-5">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2"
            >
              <span>{todo}</span>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
