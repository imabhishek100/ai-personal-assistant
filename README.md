# AI Personal Assistant

A practical MVP for an AI-powered personal assistant that helps you manage tasks, notes, reminders, and daily planning through conversational prompts.

## Features

- AI chat assistant
- Create tasks from natural language
- Add notes and summaries
- View upcoming reminders
- Manage a simple dashboard
- Persists data with Prisma and a Postgres database

## Tech Stack

- Next.js 14
- TypeScript
- Prisma
- OpenAI API
- Postgres

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your database URL and real OpenAI key when ready.
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
6. Start the app:
   ```bash
   npm run dev
   ```

Then open http://localhost:3000.

## Deployment to Vercel

- Push this repo to GitHub.
- Import it in Vercel.
- Add the environment variables from `.env.example` in the Vercel project settings.
- Use a Postgres DB provider or connect your existing Vercel Postgres instance.

## Notes

This is a clean MVP focused on assistant workflows rather than enterprise features.
