"use client";

import { useState } from "react";
import type { CreateGameInput, GameStatus } from "@/types/game";

const PLATFORMS = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X/S",
  "Xbox One",
  "Nintendo Switch",
  "Mobile",
  "Other",
];

const GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Racing",
  "Puzzle",
  "Horror",
  "Fighting",
  "Shooter",
  "Other",
];

const STATUS_OPTIONS: { value: GameStatus; label: string }[] = [
  { value: "backlog", label: "Backlog" },
  { value: "playing", label: "Playing" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" },
];

interface AddGameFormProps {
  onAdd: (game: CreateGameInput) => Promise<void>;
}

export default function AddGameForm({ onAdd }: AddGameFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateGameInput>({
    title: "",
    platform: "",
    genre: "",
    status: "backlog",
    rating: undefined,
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAdd({
        ...form,
        rating: form.rating ? Number(form.rating) : undefined,
        genre: form.genre || undefined,
        notes: form.notes || undefined,
      });
      setForm({
        title: "",
        platform: "",
        genre: "",
        status: "backlog",
        rating: undefined,
        notes: "",
      });
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} style={styles.addButton}>
        + Add Game
      </button>
    );
  }

  return (
    <div style={styles.formCard}>
      <h2 style={styles.formTitle}>Add New Game</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Title *</label>
            <input
              style={styles.input}
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="e.g. The Legend of Zelda"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Platform *</label>
            <select
              style={styles.select}
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              required
            >
              <option value="">Select platform</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={styles.formRow}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Genre</label>
            <select
              style={styles.select}
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
            >
              <option value="">Select genre</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Status *</label>
            <select
              style={styles.select}
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as GameStatus })
              }
              required
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={styles.formRow}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Rating (1–10)</label>
            <input
              style={styles.input}
              type="number"
              min={1}
              max={10}
              value={form.rating ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  rating: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Optional"
            />
          </div>
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Notes</label>
          <textarea
            style={styles.textarea}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Optional notes..."
            rows={3}
          />
        </div>
        <div style={styles.formActions}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} style={styles.submitButton}>
            {loading ? "Adding..." : "Add Game"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  addButton: {
    backgroundColor: "#6d28d9",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: 600,
  },
  formCard: {
    backgroundColor: "#1e1e2e",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    border: "1px solid #2e2e4e",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "20px",
    color: "#a78bfa",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap" as const,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
    minWidth: "200px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#94a3b8",
  },
  input: {
    backgroundColor: "#0f0f1a",
    border: "1px solid #2e2e4e",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
  },
  select: {
    backgroundColor: "#0f0f1a",
    border: "1px solid #2e2e4e",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    backgroundColor: "#0f0f1a",
    border: "1px solid #2e2e4e",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
    resize: "vertical" as const,
  },
  formActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  cancelButton: {
    backgroundColor: "transparent",
    color: "#94a3b8",
    border: "1px solid #2e2e4e",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#6d28d9",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
