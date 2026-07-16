"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { AchievementProgressResponse } from "@/types/achievement";

interface AchievementsClientProps {
  initialAchievements: AchievementProgressResponse[];
}

function formatProgress(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

export default function AchievementsClient({
  initialAchievements,
}: AchievementsClientProps) {
  const stats = useMemo(() => {
    const completed = initialAchievements.filter((a) => a.isCompleted).length;
    const inProgress = initialAchievements.filter(
      (a) => !a.isCompleted && a.progressPercent > 0
    ).length;

    return {
      total: initialAchievements.length,
      completed,
      inProgress,
    };
  }, [initialAchievements]);

  return (
    <div className="page-shell">
      <section className="hero">
        <p className="hero-jp">達成の記録</p>
        <h1 className="hero-title">Progress mapped like a mixtape</h1>
        <p className="hero-subtitle">
            Track your progress across ratings, reviews, and franchises.
        </p>
        <div className="cta-row">
          <Link href="/games" className="btn btn-secondary">
          Back to games
          </Link>
        </div>
      </section>

      <div className="stats-grid">
        <article className="stat">
          <p className="stat-number">{stats.total}</p>
          <p className="stat-label">Total</p>
        </article>
        <article className="stat">
          <p className="stat-number" style={{ color: "var(--success)" }}>
            {stats.completed}
          </p>
          <p className="stat-label">Completed</p>
        </article>
        <article className="stat">
          <p className="stat-number" style={{ color: "var(--tokyo-blue)" }}>
            {stats.inProgress}
          </p>
          <p className="stat-label">In progress</p>
        </article>
      </div>

      {initialAchievements.length === 0 ? (
        <div className="empty-box">
          No achievements yet. Add games to start your progress.
        </div>
      ) : (
        <div className="cards-grid">
          {initialAchievements.map((achievement) => (
            <article
              key={`${achievement.code}:${achievement.version}`}
              className="achievement-card"
              style={
                achievement.isCompleted
                  ? { borderColor: "color-mix(in srgb, var(--success) 45%, transparent)" }
                  : undefined
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.8rem",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h2 className="card-title">{achievement.title}</h2>
                  <p className="card-text">{achievement.description}</p>
                </div>
                <span className="badge">
                  {achievement.isCompleted ? "Completed" : "In progress"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.84rem",
                }}
              >
                <span style={{ fontWeight: 700 }}>
                  {formatProgress(achievement.current)}/
                  {formatProgress(achievement.target)}
                </span>
                <span className="card-subtitle">
                  {achievement.progressPercent.toFixed(0)}%
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.max(0, Math.min(100, achievement.progressPercent))}%` }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                }}
              >
                <span className="badge">{achievement.category}</span>
                {achievement.completedAt ? (
                  <span className="card-subtitle">
                    Completed on {new Date(achievement.completedAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="card-subtitle">Not completed yet</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="page-footer">
        Focus states, legibility, and responsive cards aligned across both themes.
      </p>
    </div>
  );
}
