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
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        + Add Game
      </button>
    );
  }

  return (
    <section className="section-card form-wrap">
      <h2 className="card-title">Add New Game</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "0.85rem" }}>
        <div className="form-grid">
          <div className="field-group">
            <label className="field-label">Title *</label>
            <input
              className="field"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="e.g. The Legend of Zelda"
            />
          </div>
          <div className="field-group">
            <label className="field-label">Platform *</label>
            <select
              className="field-select"
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
          <div className="field-group">
            <label className="field-label">Genre</label>
            <select
              className="field-select"
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
          <div className="field-group">
            <label className="field-label">Status *</label>
            <select
              className="field-select"
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
          <div className="field-group">
            <label className="field-label">Rating (1-10)</label>
            <input
              className="field"
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
          <div className="field-group">
            <label className="field-label">Notes</label>
            <textarea
              className="field-textarea"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Optional notes..."
            />
          </div>
        </div>

        <div className="form-actions" style={{ marginTop: "0.85rem" }}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Adding..." : "Add Game"}
          </button>
        </div>
      </form>
    </section>
  );
}
