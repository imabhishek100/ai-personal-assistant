import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, dueDate } = body;

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Task title is required" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      description: description || "",
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  return NextResponse.json({ success: true, task });
}
