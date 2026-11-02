import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const isDummyKey = (key?: string) => !key || key === "sk-dummy-key";

export async function POST(request: Request) {
  const body = await request.json();
  const message = body.message as string;

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (isDummyKey(apiKey)) {
    const userMessage = message.trim();
    const lower = userMessage.toLowerCase();

    if (lower.includes("task") || lower.includes("reminder") || lower.includes("plan")) {
      return NextResponse.json({
        reply: "Mock assistant: I can help you create a task, set a reminder, or plan your day. Use your real OpenAI key to enable live AI responses.",
      });
    }

    return NextResponse.json({
      reply: "Mock assistant: I’m ready to help with tasks, notes, and planning. Add your real OpenAI key to enable live chat responses.",
    });
  }

  const openai = new OpenAI({ apiKey });

  const recentTasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentNotes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful personal assistant. Use the tasks and notes provided as context. Keep replies concise, useful, and action-oriented.",
      },
      {
        role: "user",
        content: `User message: ${message}\n\nRecent tasks:\n${recentTasks
          .map((task) => `- ${task.title}${task.dueDate ? ` (due ${new Date(task.dueDate).toLocaleDateString()})` : ""}`)
          .join("\n") || "No tasks yet."}\n\nRecent notes:\n${recentNotes
          .map((note) => `- ${note.title}: ${note.content}`)
          .join("\n") || "No notes yet."}`,
      },
    ],
  });

  const reply = completion.choices[0]?.message?.content || "I’m here to help.";

  return NextResponse.json({ reply });
}
