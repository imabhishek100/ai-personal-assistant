import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Personal Assistant",
  description: "A practical AI assistant for planning tasks, notes, and reminders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
