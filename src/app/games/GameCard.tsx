"use client";

import { useState } from "react";
import type { IGame, GameStatus, UpdateGameInput } from "@/types/game";

const STATUS_OPTIONS: { value: GameStatus; label: string; color: string }[] = [
  { value: "backlog", label: "Backlog", color: "#64748b" },
  { value: "playing", label: "Playing", color: "#2563eb" },
  { value: "completed", label: "Completed", color: "#16a34a" },
  { value: "dropped", label: "Dropped", color: "#dc2626" },
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
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>{game.title}</h3>
          <p style={styles.platform}>{game.platform}</p>
        </div>
        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: statusInfo.color + "33",
            color: statusInfo.color,
            borderColor: statusInfo.color + "66",
          }}
        >
          {statusInfo.label}
        </span>
      </div>

      <div style={styles.meta}>
        {game.genre && <span style={styles.metaItem}>🎮 {game.genre}</span>}
        {game.rating && (
          <span style={styles.metaItem}>⭐ {game.rating}/10</span>
        )}
      </div>

      {game.notes && <p style={styles.notes}>{game.notes}</p>}

      {editing ? (
        <div style={styles.editRow}>
          <select
            style={styles.editSelect}
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
            style={styles.editInput}
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
          <button
            onClick={handleSave}
            disabled={saving}
            style={styles.saveButton}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={() => setEditing(false)} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      ) : (
        <div style={styles.actions}>
          <button onClick={() => setEditing(true)} style={styles.editButton}>
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={styles.deleteButton}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: "#1e1e2e",
    border: "1px solid #2e2e4e",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#e2e8f0",
  },
  platform: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "2px",
  },
  statusBadge: {
    fontSize: "12px",
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: "12px",
    border: "1px solid",
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  meta: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  metaItem: {
    fontSize: "13px",
    color: "#94a3b8",
  },
  notes: {
    fontSize: "13px",
    color: "#64748b",
    fontStyle: "italic",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "4px",
  },
  editRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "transparent",
    color: "#a78bfa",
    border: "1px solid #a78bfa55",
    borderRadius: "6px",
    padding: "5px 12px",
    fontSize: "13px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "transparent",
    color: "#f87171",
    border: "1px solid #f8717155",
    borderRadius: "6px",
    padding: "5px 12px",
    fontSize: "13px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#6d28d9",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "5px 12px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 600,
  },
  cancelBtn: {
    backgroundColor: "transparent",
    color: "#94a3b8",
    border: "1px solid #2e2e4e",
    borderRadius: "6px",
    padding: "5px 12px",
    fontSize: "13px",
    cursor: "pointer",
  },
  editSelect: {
    backgroundColor: "#0f0f1a",
    border: "1px solid #2e2e4e",
    borderRadius: "6px",
    padding: "5px 10px",
    color: "#e2e8f0",
    fontSize: "13px",
  },
  editInput: {
    backgroundColor: "#0f0f1a",
    border: "1px solid #2e2e4e",
    borderRadius: "6px",
    padding: "5px 10px",
    color: "#e2e8f0",
    fontSize: "13px",
    width: "80px",
  },
};
