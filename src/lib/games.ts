import type { CreateGameInput, GameStatus, IGame, UpdateGameInput } from "@/types/game";
import type { GameDocument } from "@/lib/db/collections";

const VALID_STATUSES: ReadonlyArray<GameStatus> = [
  "playing",
  "completed",
  "backlog",
  "dropped",
];

function normalizeRequiredText(value: string | undefined, field: string) {
  const normalized = value?.trim();
  if (!normalized) {
    return { error: `${field} is required` as const };
  }
  return { value: normalized };
}

function normalizeOptionalText(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeStatus(status: GameStatus | undefined) {
  if (!status) {
    return { value: "backlog" as GameStatus };
  }
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Invalid status value" as const };
  }
  return { value: status };
}

function normalizeRating(rating: number | undefined | null) {
  if (rating === undefined || rating === null) {
    return { value: undefined };
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 10) {
    return { error: "Rating must be a number between 1 and 10" as const };
  }
  return { value: rating };
}

export function toGameResponse(game: GameDocument): IGame {
  if (!game._id) {
    throw new Error("Game document is missing _id");
  }

  return {
    _id: game._id.toString(),
    title: game.title,
    platform: game.platform,
    genre: game.genre,
    status: game.status,
    rating: game.rating,
    notes: game.notes,
    createdAt: game.createdAt.toISOString(),
    updatedAt: game.updatedAt.toISOString(),
  };
}

export function buildGameInsert(input: CreateGameInput) {
  const title = normalizeRequiredText(input.title, "Title");
  if ("error" in title) return { error: title.error };

  const platform = normalizeRequiredText(input.platform, "Platform");
  if ("error" in platform) return { error: platform.error };

  const status = normalizeStatus(input.status);
  if ("error" in status) return { error: status.error };

  const rating = normalizeRating(input.rating);
  if ("error" in rating) return { error: rating.error };

  const now = new Date();

  return {
    doc: {
      title: title.value,
      platform: platform.value,
      genre: normalizeOptionalText(input.genre),
      status: status.value,
      rating: rating.value,
      notes: normalizeOptionalText(input.notes),
      createdAt: now,
      updatedAt: now,
    },
  };
}

export function buildGameUpdate(input: UpdateGameInput) {
  const set: Partial<Omit<GameDocument, "_id" | "createdAt">> = {};
  const unset: Record<string, ""> = {};

  if (input.title !== undefined) {
    const normalized = normalizeRequiredText(input.title, "Title");
    if ("error" in normalized) return { error: normalized.error };
    set.title = normalized.value;
  }

  if (input.platform !== undefined) {
    const normalized = normalizeRequiredText(input.platform, "Platform");
    if ("error" in normalized) return { error: normalized.error };
    set.platform = normalized.value;
  }

  if (input.status !== undefined) {
    const status = normalizeStatus(input.status);
    if ("error" in status) return { error: status.error };
    set.status = status.value;
  }

  if (input.rating !== undefined || input.rating === null) {
    const rating = normalizeRating(input.rating as number | undefined | null);
    if ("error" in rating) return { error: rating.error };
    if (rating.value === undefined) {
      unset.rating = "";
    } else {
      set.rating = rating.value;
    }
  }

  if (input.genre !== undefined || input.genre === null) {
    const genre = normalizeOptionalText(input.genre as string | undefined);
    if (genre) {
      set.genre = genre;
    } else {
      unset.genre = "";
    }
  }

  if (input.notes !== undefined || input.notes === null) {
    const notes = normalizeOptionalText(input.notes as string | undefined);
    if (notes) {
      set.notes = notes;
    } else {
      unset.notes = "";
    }
  }

  const hasChanges = Object.keys(set).length > 0 || Object.keys(unset).length > 0;
  if (!hasChanges) {
    return { error: "No valid fields provided for update" };
  }

  set.updatedAt = new Date();
  return { set, unset };
}
