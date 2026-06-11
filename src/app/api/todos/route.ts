import { NextRequest, NextResponse } from "next/server";

type Todo = { id: number; text: string };

const todos: Todo[] = [];
let nextId = 1;

export function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const todo = { id: nextId++, text };
  todos.push(todo);
  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) todos.splice(index, 1);
  return NextResponse.json({ success: true });
}
