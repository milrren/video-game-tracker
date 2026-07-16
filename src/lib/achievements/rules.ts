import type {
  AchievementDefinition,
  AchievementProgressResponse,
  CountMetric,
  FranchiseChecklistRulePayload,
} from "../../types/achievement";

export interface GameForAchievementRule {
  title: string;
  status: "playing" | "completed" | "backlog" | "dropped";
  rating?: number;
  notes?: string;
}

export interface AchievementProgressRowLike {
  achievementCode: string;
  achievementVersion: number;
  current: number;
  target: number;
  progressPercent: number;
  isCompleted: boolean;
  completedAt: Date | null;
}

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countMetric(games: GameForAchievementRule[], metric: CountMetric) {
  switch (metric) {
    case "ratings":
      return games.filter((game) => typeof game.rating === "number").length;
    case "text_reviews":
      return games.filter((game) => Boolean(game.notes?.trim())).length;
    case "completed_games":
      return games.filter((game) => game.status === "completed").length;
    default:
      return 0;
  }
}

function scoreFranchiseItem(
  games: GameForAchievementRule[],
  aliases: string[],
  playingWeight: number
) {
  const normalizedAliases = aliases.map(normalizeText);
  const matchingGames = games.filter((game) => {
    const normalizedTitle = normalizeText(game.title);
    return normalizedAliases.some(
      (alias) => normalizedTitle === alias || normalizedTitle.includes(alias)
    );
  });

  if (matchingGames.some((game) => game.status === "completed")) {
    return 1;
  }
  if (matchingGames.some((game) => game.status === "playing")) {
    return playingWeight;
  }
  return 0;
}

export function evaluateFranchiseChecklist(
  games: GameForAchievementRule[],
  payload: FranchiseChecklistRulePayload
) {
  const target = payload.items.length;
  const perItemScores = payload.items.map((item) =>
    scoreFranchiseItem(games, item.aliases, payload.playingWeight)
  );
  const current = Number(
    perItemScores.reduce((sum, score) => sum + score, 0).toFixed(2)
  );
  const progressPercent = Number(((current / target) * 100).toFixed(2));
  const isCompleted = perItemScores.every((score) => score >= 1);

  return {
    target,
    current,
    progressPercent,
    isCompleted,
  };
}

export function evaluateAchievement(
  definition: AchievementDefinition,
  games: GameForAchievementRule[]
) {
  if (definition.ruleType === "count") {
    const current = countMetric(games, definition.rulePayload.metric);
    const target = definition.rulePayload.target;
    const progressPercent = Math.min(
      100,
      Number(((current / target) * 100).toFixed(2))
    );

    return {
      target,
      current,
      progressPercent,
      isCompleted: current >= target,
    };
  }

  return evaluateFranchiseChecklist(games, definition.rulePayload);
}

export function sortAchievements(
  achievements: AchievementProgressResponse[]
): AchievementProgressResponse[] {
  return achievements.sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    if (!a.isCompleted && !b.isCompleted) {
      return b.progressPercent - a.progressPercent;
    }
    const aTime = a.completedAt ? new Date(a.completedAt).getTime() : 0;
    const bTime = b.completedAt ? new Date(b.completedAt).getTime() : 0;
    return bTime - aTime;
  });
}

export function mergeAchievementProgress(
  definitions: AchievementDefinition[],
  progressRows: AchievementProgressRowLike[]
) {
  const progressByKey = new Map(
    progressRows.map((row) => [
      `${row.achievementCode}:${row.achievementVersion}`,
      row,
    ])
  );

  const merged = definitions.map((definition) => {
    const key = `${definition.code}:${definition.version}`;
    const progress = progressByKey.get(key);
    const fallbackTarget =
      definition.ruleType === "count"
        ? definition.rulePayload.target
        : definition.rulePayload.items.length;

    return {
      code: definition.code,
      version: definition.version,
      title: definition.title,
      description: definition.description,
      category: definition.category,
      ruleType: definition.ruleType,
      target: progress?.target ?? fallbackTarget,
      current: progress?.current ?? 0,
      progressPercent: progress?.progressPercent ?? 0,
      isCompleted: progress?.isCompleted ?? false,
      completedAt: progress?.completedAt?.toISOString() ?? null,
    } satisfies AchievementProgressResponse;
  });

  return sortAchievements(merged);
}
