# Video Game Tracker

A full-stack Next.js app with TypeScript and server-side MongoDB integration to track your video game collection.

## Features

- 📋 **Track games** with title, platform, genre, status, rating, and notes
- 🔄 **CRUD API** — RESTful JSON API routes (`/api/games`, `/api/games/[id]`)
- 🖥️ **Server-side rendering** — games page fetches data directly from MongoDB on the server
- 📊 **Stats dashboard** — quick overview of your collection by status
- 🔍 **Filter by status** — Playing, Completed, Backlog, Dropped

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/) / [MongoDB](https://www.mongodb.com/)

## Getting Started

### Prerequisites

- Node.js 20.19+
- A running MongoDB instance (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://localhost:27017/video-game-tracker
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/games`     | List all games    |
| POST   | `/api/games`     | Create a new game |
| GET    | `/api/games/:id` | Get a single game |
| PUT    | `/api/games/:id` | Update a game     |
| DELETE | `/api/games/:id` | Delete a game     |

### Game schema

```json
{
  "title": "string (required)",
  "platform": "string (required)",
  "genre": "string (optional)",
  "status": "playing | completed | backlog | dropped (required)",
  "rating": "number 1–10 (optional)",
  "notes": "string (optional)"
}
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |