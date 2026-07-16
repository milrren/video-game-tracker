import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { ensureAchievementDefinitionsSeeded } from "@/lib/achievements/definitions";
import { recomputeAchievementsProgress } from "@/lib/achievements/engine";
import { getGamesCollection } from "@/lib/db/collections";
import { buildGameUpdate, toGameResponse } from "@/lib/games";
import type { UpdateGameInput } from "@/types/game";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid game id" }, { status: 400 });
    }

    const gamesCollection = await getGamesCollection();
    const game = await gamesCollection.findOne({ _id: new ObjectId(id) });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    await ensureAchievementDefinitionsSeeded();
    await recomputeAchievementsProgress();

    return NextResponse.json(toGameResponse(game));
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
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid game id" }, { status: 400 });
    }

    const body: UpdateGameInput = await request.json();
    const parsed = buildGameUpdate(body);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const gamesCollection = await getGamesCollection();
    const update = {
      ...(Object.keys(parsed.set).length > 0 ? { $set: parsed.set } : {}),
      ...(Object.keys(parsed.unset).length > 0 ? { $unset: parsed.unset } : {}),
    };

    const result = await gamesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      update,
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    await ensureAchievementDefinitionsSeeded();
    await recomputeAchievementsProgress();

    return NextResponse.json(toGameResponse(result));
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
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid game id" }, { status: 400 });
    }

    const gamesCollection = await getGamesCollection();
    const result = await gamesCollection.findOneAndDelete({ _id: new ObjectId(id) });

    if (!result) {
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
