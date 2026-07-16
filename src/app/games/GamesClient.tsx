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
    <div className="page-shell">
      <section className="hero">
        <p className="hero-jp">遊びの記録</p>
        <h1 className="hero-title">Your city-pop backlog in motion</h1>
        <p className="hero-subtitle">
          Capture what you play, what you finished, and what is next. Keep the
          mood bold while your game data stays simple.
        </p>
        <div className="cta-row">
          <Link href="/achievements" className="btn btn-secondary">
            View achievements
          </Link>
          <AddGameForm onAdd={handleAdd} />
        </div>
      </section>

      {error && <div className="error-banner">{error}</div>}

      <div className="stats-grid">
        <article className="stat">
          <p className="stat-number">{stats.total}</p>
          <p className="stat-label">Total</p>
        </article>
        <article className="stat">
          <p className="stat-number" style={{ color: "var(--tokyo-blue)" }}>
            {stats.playing}
          </p>
          <p className="stat-label">Playing</p>
        </article>
        <article className="stat">
          <p className="stat-number" style={{ color: "var(--success)" }}>
            {stats.completed}
          </p>
          <p className="stat-label">Completed</p>
        </article>
        <article className="stat">
          <p className="stat-number" style={{ color: "var(--warm-gray)" }}>
            {stats.backlog}
          </p>
          <p className="stat-label">Backlog</p>
        </article>
      </div>

      <div className="chip-row">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`chip ${statusFilter === f.value ? "active" : ""}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-box">
          {games.length === 0
            ? "No games yet. Add your first game!"
            : `No games with status "${statusFilter}".`}
        </div>
      ) : (
        <div className="cards-grid">
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

      <p className="page-footer">
        Keep CRUD simple, keep visuals expressive.
      </p>
    </div>
  );
}
