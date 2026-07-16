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
      <div className="page-shell">
        <section className="hero">
          <p className="hero-jp">接続エラー</p>
          <h1 className="hero-title">Database unavailable</h1>
          <p className="hero-subtitle">
          <strong>Database connection error.</strong> Please ensure{" "}
          <code>MONGODB_URI</code> is set in your <code>.env.local</code> file
          and your MongoDB instance is running.
          </p>
        </section>
      </div>
    );
  }

  return <GamesClient initialGames={games} />;
}
