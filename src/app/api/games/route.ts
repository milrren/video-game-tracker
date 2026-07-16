import { NextRequest, NextResponse } from "next/server";
import { ensureAchievementDefinitionsSeeded } from "@/lib/achievements/definitions";
import { recomputeAchievementsProgress } from "@/lib/achievements/engine";
import { getGamesCollection } from "@/lib/db/collections";
import { buildGameInsert, toGameResponse } from "@/lib/games";
import type { CreateGameInput } from "@/types/game";

export async function GET() {
  try {
    const gamesCollection = await getGamesCollection();
    const games = await gamesCollection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(games.map(toGameResponse));
  } catch (error) {
    console.error("GET /api/games error:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateGameInput = await request.json();
    const parsed = buildGameInsert(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const gamesCollection = await getGamesCollection();
    const insertResult = await gamesCollection.insertOne(parsed.doc);
    const game = await gamesCollection.findOne({ _id: insertResult.insertedId });
    if (!game) {
      return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
    }

    await ensureAchievementDefinitionsSeeded();
    await recomputeAchievementsProgress();
    return NextResponse.json(toGameResponse(game), { status: 201 });
  } catch (error) {
    console.error("POST /api/games error:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}
