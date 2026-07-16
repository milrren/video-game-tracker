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
      <div className="page-shell">
        <section className="hero">
          <p className="hero-jp">接続エラー</p>
          <h1 className="hero-title">Achievements currently unavailable</h1>
          <p className="hero-subtitle">
            <strong>Database connection error.</strong> Please ensure
            <code> MONGODB_URI </code>
            is set in your
            <code> .env.local </code>
            file and your MongoDB instance is running.
          </p>
          <div className="cta-row">
            <Link href="/games" className="btn btn-secondary">
              Back to games
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return <AchievementsClient initialAchievements={achievements} />;
}
