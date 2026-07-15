export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/mongodb";
import Game from "@/models/Game";
import type { IGame } from "@/types/game";
import GamesClient from "./GamesClient";

async function getGames(): Promise<IGame[]> {
  await connectToDatabase();
  const games = await Game.find().sort({ createdAt: -1 }).lean();
  return games.map((g) => ({
    _id: g._id.toString(),
    title: g.title,
    platform: g.platform,
    genre: g.genre,
    status: g.status,
    rating: g.rating,
    notes: g.notes,
    createdAt: g.createdAt.toISOString(),
    updatedAt: g.updatedAt.toISOString(),
  }));
}

export default async function GamesPage() {
  let games: IGame[] = [];
  let dbError = false;

  try {
    games = await getGames();
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "32px 20px",
        }}
      >
        <h1
          style={{ fontSize: "28px", fontWeight: 800, marginBottom: "16px" }}
        >
          🎮 Video Game Tracker
        </h1>
        <div
          style={{
            backgroundColor: "#dc262633",
            border: "1px solid #dc262666",
            color: "#f87171",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <strong>Database connection error.</strong> Please ensure{" "}
          <code>MONGODB_URI</code> is set in your <code>.env.local</code> file
          and your MongoDB instance is running.
        </div>
      </div>
    );
  }

  return <GamesClient initialGames={games} />;
}
