import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ensureAchievementDefinitionsSeeded } from "@/lib/achievements/definitions";
import {
  getAchievementsForUser,
  recomputeAchievementsProgress,
} from "@/lib/achievements/engine";

export async function GET() {
  try {
    await connectToDatabase();
    await ensureAchievementDefinitionsSeeded();
    await recomputeAchievementsProgress();

    const achievements = await getAchievementsForUser();
    return NextResponse.json(achievements);
  } catch (error) {
    console.error("GET /api/achievements error:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    );
  }
}
