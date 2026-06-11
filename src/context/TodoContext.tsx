"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Todo = { id: number; text: string };

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  async function addTodo(text: string) {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const todo = await res.json();
    setTodos((prev) => [...prev, todo]);
  }

  async function deleteTodo(id: number) {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used inside TodoProvider");
  return ctx;
}
