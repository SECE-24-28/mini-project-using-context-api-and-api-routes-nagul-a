"use client";
import { useState } from "react";
import { useTodos } from "@/context/TodoContext";

export default function Home() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState("");

  async function handleAdd() {
    if (!input.trim()) return;
    await addTodo(input.trim());
    setInput("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
