"use client";

import { useState } from "react";
import type { IGame, GameStatus, UpdateGameInput } from "@/types/game";

const STATUS_OPTIONS: { value: GameStatus; label: string; color: string }[] = [
  { value: "backlog", label: "Backlog", color: "#7a746c" },
  { value: "playing", label: "Playing", color: "#355c8c" },
  { value: "completed", label: "Completed", color: "#147a45" },
  { value: "dropped", label: "Dropped", color: "#ab2f45" },
];

interface GameCardProps {
  game: IGame;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: UpdateGameInput) => Promise<void>;
}

export default function GameCard({ game, onDelete, onUpdate }: GameCardProps) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editStatus, setEditStatus] = useState<GameStatus>(game.status);
  const [editRating, setEditRating] = useState<number | undefined>(game.rating);
  const [saving, setSaving] = useState(false);

  const statusInfo =
    STATUS_OPTIONS.find((s) => s.value === game.status) ?? STATUS_OPTIONS[0];

  const handleDelete = async () => {
    if (!confirm(`Delete "${game.title}"?`)) return;
    setDeleting(true);
    try {
      await onDelete(game._id);
    } finally {
      setDeleting(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(game._id, { status: editStatus, rating: editRating });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="game-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "0.7rem",
        }}
      >
        <div>
          <h3 className="card-title">{game.title}</h3>
          <p className="card-subtitle">{game.platform}</p>
        </div>
        <span
          className="badge"
          style={{ backgroundColor: statusInfo.color + "22", color: statusInfo.color }}
        >
          {statusInfo.label}
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {game.genre && <span className="badge">Genre: {game.genre}</span>}
        {game.rating && <span className="badge">Rating: {game.rating}/10</span>}
      </div>

      {game.notes && <p className="card-text">{game.notes}</p>}

      {editing ? (
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          <select
            className="field-select"
            style={{ maxWidth: "140px" }}
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value as GameStatus)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <input
            className="field"
            style={{ maxWidth: "92px" }}
            type="number"
            min={1}
            max={10}
            value={editRating ?? ""}
            onChange={(e) =>
              setEditRating(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            placeholder="Rating"
          />
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={() => setEditing(false)} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.45rem", marginTop: "0.1rem" }}>
          <button onClick={() => setEditing(true)} className="btn btn-secondary">
            Edit
          </button>
          <button onClick={handleDelete} disabled={deleting} className="btn btn-ghost">
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </article>
  );
}
