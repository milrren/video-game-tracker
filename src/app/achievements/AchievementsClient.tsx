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
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>Achievements</h1>
          <p style={styles.subheading}>
            Track your progress across ratings, reviews, and franchises.
          </p>
        </div>
        <Link href="/games" style={styles.backLink}>
          Back to games
        </Link>
      </header>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <span style={styles.statNumber}>{stats.total}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: "#16a34a" }}>
            {stats.completed}
          </span>
          <span style={styles.statLabel}>Completed</span>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: "#2563eb" }}>
            {stats.inProgress}
          </span>
          <span style={styles.statLabel}>In progress</span>
        </div>
      </div>

      {initialAchievements.length === 0 ? (
        <div style={styles.empty}>
          No achievements yet. Add games to start your progress.
        </div>
      ) : (
        <div style={styles.grid}>
          {initialAchievements.map((achievement) => (
            <article
              key={`${achievement.code}:${achievement.version}`}
              style={{
                ...styles.card,
                ...(achievement.isCompleted ? styles.cardCompleted : {}),
              }}
            >
              <div style={styles.cardHeader}>
                <div>
                  <h2 style={styles.cardTitle}>{achievement.title}</h2>
                  <p style={styles.cardDescription}>{achievement.description}</p>
                </div>
                <span
                  style={{
                    ...styles.badge,
                    ...(achievement.isCompleted
                      ? styles.completedBadge
                      : styles.progressBadge),
                  }}
                >
                  {achievement.isCompleted ? "Completed" : "In progress"}
                </span>
              </div>

              <div style={styles.progressRow}>
                <span style={styles.progressText}>
                  {formatProgress(achievement.current)}/
                  {formatProgress(achievement.target)}
                </span>
                <span style={styles.percentText}>
                  {achievement.progressPercent.toFixed(0)}%
                </span>
              </div>

              <div style={styles.progressTrack}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${Math.max(
                      0,
                      Math.min(100, achievement.progressPercent)
                    )}%`,
                  }}
                />
              </div>

              <div style={styles.footerRow}>
                <span style={styles.metaPill}>{achievement.category}</span>
                {achievement.completedAt ? (
                  <span style={styles.completedAt}>
                    Completed on {new Date(achievement.completedAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span style={styles.completedAt}>Not completed yet</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "32px 20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "28px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#e2e8f0",
  },
  subheading: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#94a3b8",
  },
  backLink: {
    color: "#a78bfa",
    border: "1px solid #a78bfa55",
    borderRadius: "999px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: 600,
  },
  statsRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  statCard: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e4e",
    borderRadius: "10px",
    padding: "14px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    minWidth: "100px",
  },
  statNumber: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#a78bfa",
  },
  statLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  empty: {
    textAlign: "center",
    color: "#94a3b8",
    padding: "48px 0",
    fontSize: "15px",
    border: "1px dashed #2e2e4e",
    borderRadius: "12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e4e",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  cardCompleted: {
    borderColor: "#16a34a66",
    boxShadow: "0 0 0 1px #16a34a33 inset",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#e2e8f0",
  },
  cardDescription: {
    marginTop: "4px",
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: 1.4,
  },
  badge: {
    borderRadius: "999px",
    padding: "4px 10px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    border: "1px solid",
    whiteSpace: "nowrap",
  },
  completedBadge: {
    backgroundColor: "#16a34a33",
    color: "#4ade80",
    borderColor: "#16a34a66",
  },
  progressBadge: {
    backgroundColor: "#2563eb33",
    color: "#60a5fa",
    borderColor: "#2563eb66",
  },
  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
  },
  progressText: {
    color: "#e2e8f0",
    fontWeight: 600,
  },
  percentText: {
    color: "#94a3b8",
  },
  progressTrack: {
    height: "8px",
    backgroundColor: "#0f0f1a",
    borderRadius: "999px",
    overflow: "hidden",
    border: "1px solid #2e2e4e",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2563eb 0%, #16a34a 100%)",
    transition: "width 200ms ease",
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  metaPill: {
    border: "1px solid #2e2e4e",
    borderRadius: "999px",
    padding: "3px 9px",
    fontSize: "11px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  completedAt: {
    fontSize: "12px",
    color: "#64748b",
  },
};
