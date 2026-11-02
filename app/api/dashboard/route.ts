import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const reminders = await prisma.reminder.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return NextResponse.json({ tasks, notes, reminders });
}
