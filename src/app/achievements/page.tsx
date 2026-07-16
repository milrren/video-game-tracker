export const dynamic = "force-dynamic";

import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { ensureAchievementDefinitionsSeeded } from "@/lib/achievements/definitions";
import {
  getAchievementsForUser,
  recomputeAchievementsProgress,
} from "@/lib/achievements/engine";
import type { AchievementProgressResponse } from "@/types/achievement";
import AchievementsClient from "./AchievementsClient";

async function getAchievements(): Promise<AchievementProgressResponse[]> {
  await connectToDatabase();
  await ensureAchievementDefinitionsSeeded();
  await recomputeAchievementsProgress();
  return getAchievementsForUser();
}

export default async function AchievementsPage() {
  let achievements: AchievementProgressResponse[] = [];
  let dbError = false;

  try {
    achievements = await getAchievements();
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
          Achievements
        </h1>
        <div
          style={{
            backgroundColor: "#dc262633",
            border: "1px solid #dc262666",
            color: "#f87171",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <strong>Database connection error.</strong> Please ensure
          <code> MONGODB_URI </code>
          is set in your
          <code> .env.local </code>
          file and your MongoDB instance is running.
        </div>
        <Link
          href="/games"
          style={{
            color: "#a78bfa",
            textDecoration: "underline",
            fontWeight: 600,
          }}
        >
          Back to games
        </Link>
      </div>
    );
  }

  return <AchievementsClient initialAchievements={achievements} />;
}
