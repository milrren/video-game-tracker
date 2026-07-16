import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ensureAchievementDefinitionsSeeded } from "@/lib/achievements/definitions";
import { recomputeAchievementsProgress } from "@/lib/achievements/engine";
import Game from "@/models/Game";
import type { UpdateGameInput } from "@/types/game";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const game = await Game.findById(id).lean();

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    await ensureAchievementDefinitionsSeeded();
    await recomputeAchievementsProgress();

    return NextResponse.json(game);
  } catch (error) {
    console.error("GET /api/games/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body: UpdateGameInput = await request.json();

    const game = await Game.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error("PUT /api/games/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const game = await Game.findByIdAndDelete(id).lean();

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    await ensureAchievementDefinitionsSeeded();
    await recomputeAchievementsProgress();

    return NextResponse.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/games/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
}
