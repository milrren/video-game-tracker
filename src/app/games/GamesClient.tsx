"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import type { IGame, CreateGameInput, UpdateGameInput } from "@/types/game";
import AddGameForm from "./AddGameForm";
import GameCard from "./GameCard";

interface GamesClientProps {
  initialGames: IGame[];
}

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "playing", label: "Playing" },
  { value: "completed", label: "Completed" },
  { value: "backlog", label: "Backlog" },
  { value: "dropped", label: "Dropped" },
];

export default function GamesClient({ initialGames }: GamesClientProps) {
  const [games, setGames] = useState<IGame[]>(initialGames);
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = useCallback(async (input: CreateGameInput) => {
    setError(null);
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to add game");
      return;
    }
    const newGame: IGame = await res.json();
    setGames((prev) => [newGame, ...prev]);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setError(null);
    const res = await fetch(`/api/games/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to delete game");
      return;
    }
    setGames((prev) => prev.filter((g) => g._id !== id));
  }, []);

  const handleUpdate = useCallback(
    async (id: string, data: UpdateGameInput) => {
      setError(null);
      const res = await fetch(`/api/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json();
        setError(body.error ?? "Failed to update game");
        return;
      }
      const updated: IGame = await res.json();
      setGames((prev) => prev.map((g) => (g._id === updated._id ? updated : g)));
    },
    []
  );

  const filtered =
    statusFilter === "all"
      ? games
      : games.filter((g) => g.status === statusFilter);

  const stats = {
    total: games.length,
    playing: games.filter((g) => g.status === "playing").length,
    completed: games.filter((g) => g.status === "completed").length,
    backlog: games.filter((g) => g.status === "backlog").length,
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>🎮 Video Game Tracker</h1>
          <p style={styles.subheading}>Track your gaming journey</p>
        </div>
        <div style={styles.headerActions}>
          <Link href="/achievements" style={styles.achievementsLink}>
            View achievements
          </Link>
          <AddGameForm onAdd={handleAdd} />
        </div>
      </header>

      {error && <div style={styles.errorBanner}>{error}</div>}

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <span style={styles.statNumber}>{stats.total}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: "#2563eb" }}>
            {stats.playing}
          </span>
          <span style={styles.statLabel}>Playing</span>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: "#16a34a" }}>
            {stats.completed}
          </span>
          <span style={styles.statLabel}>Completed</span>
        </div>
        <div style={styles.statCard}>
          <span style={{ ...styles.statNumber, color: "#64748b" }}>
            {stats.backlog}
          </span>
          <span style={styles.statLabel}>Backlog</span>
        </div>
      </div>

      <div style={styles.filterRow}>
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            style={{
              ...styles.filterButton,
              ...(statusFilter === f.value ? styles.filterButtonActive : {}),
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          {games.length === 0
            ? "No games yet. Add your first game!"
            : `No games with status "${statusFilter}".`}
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((game) => (
            <GameCard
              key={game._id}
              game={game}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
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
    marginBottom: "32px",
    flexWrap: "wrap" as const,
    gap: "16px",
  },
  headerActions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap" as const,
    justifyContent: "flex-end",
  },
  achievementsLink: {
    color: "#a78bfa",
    border: "1px solid #a78bfa55",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: 600,
  },
  heading: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#e2e8f0",
  },
  subheading: {
    fontSize: "14px",
    color: "#64748b",
    marginTop: "4px",
  },
  errorBanner: {
    backgroundColor: "#dc262633",
    border: "1px solid #dc262666",
    color: "#f87171",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  statsRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap" as const,
  },
  statCard: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e4e",
    borderRadius: "10px",
    padding: "16px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    minWidth: "80px",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#a78bfa",
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: 500,
  },
  filterRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    flexWrap: "wrap" as const,
  },
  filterButton: {
    backgroundColor: "transparent",
    color: "#94a3b8",
    border: "1px solid #2e2e4e",
    borderRadius: "20px",
    padding: "6px 16px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  filterButtonActive: {
    backgroundColor: "#6d28d9",
    color: "#fff",
    borderColor: "#6d28d9",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  empty: {
    textAlign: "center" as const,
    color: "#64748b",
    padding: "48px 0",
    fontSize: "15px",
  },
};
