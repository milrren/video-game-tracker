import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ensureAchievementDefinitionsSeeded } from "@/lib/achievements/definitions";
import { recomputeAchievementsProgress } from "@/lib/achievements/engine";
import Game from "@/models/Game";
import type { CreateGameInput } from "@/types/game";

export async function GET() {
  try {
    await connectToDatabase();
    const games = await Game.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(games);
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
    await connectToDatabase();
    const body: CreateGameInput = await request.json();

    const game = await Game.create(body);
    await ensureAchievementDefinitionsSeeded();
    await recomputeAchievementsProgress();
    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error("POST /api/games error:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}
