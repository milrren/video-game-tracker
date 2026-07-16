export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/mongodb";
import { getGamesCollection } from "@/lib/db/collections";
import { toGameResponse } from "@/lib/games";
import type { IGame } from "@/types/game";
import GamesClient from "./GamesClient";

async function getGames(): Promise<IGame[]> {
  await connectToDatabase();
  const gamesCollection = await getGamesCollection();
  const games = await gamesCollection.find({}).sort({ createdAt: -1 }).toArray();
  return games.map(toGameResponse);
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
