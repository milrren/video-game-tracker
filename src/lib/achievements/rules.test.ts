import { describe, expect, it } from "vitest";
import type { AchievementDefinition } from "../../types/achievement";
import {
  countMetric,
  evaluateAchievement,
  mergeAchievementProgress,
} from "./rules";

const games = [
  {
    title: "Mass Effect",
    status: "completed" as const,
    rating: 9,
    notes: "Great game",
  },
  {
    title: "Mass Effect 2",
    status: "playing" as const,
    rating: 10,
    notes: "A",
  },
  {
    title: "Mass Effect 3",
    status: "backlog" as const,
    notes: "   ",
  },
  {
    title: "Hades",
    status: "completed" as const,
  },
];

describe("achievement rules", () => {
  it("counts reviews in notes without minimum length", () => {
    expect(countMetric(games, "text_reviews")).toBe(2);
  });

  it("evaluates franchise progress with playing weight (75% scenario)", () => {
    const definition: AchievementDefinition = {
      code: "franchise.two-games",
      version: 1,
      title: "Two Game Franchise",
      description: "test",
      category: "franchise",
      ruleType: "franchise_checklist",
      rulePayload: {
        playingWeight: 0.5,
        items: [
          {
            id: "g1",
            label: "Game 1",
            aliases: ["mass effect"],
          },
          {
            id: "g2",
            label: "Game 2",
            aliases: ["mass effect 2"],
          },
        ],
      },
    };

    const result = evaluateAchievement(definition, games);
    expect(result.current).toBe(1.5);
    expect(result.progressPercent).toBe(75);
    expect(result.isCompleted).toBe(false);
  });

  it("requires all franchise items completed for 100% completion", () => {
    const definition: AchievementDefinition = {
      code: "franchise.three-games",
      version: 1,
      title: "Three Game Franchise",
      description: "test",
      category: "franchise",
      ruleType: "franchise_checklist",
      rulePayload: {
        playingWeight: 0.5,
        items: [
          { id: "g1", label: "g1", aliases: ["mass effect"] },
          { id: "g2", label: "g2", aliases: ["mass effect 2"] },
          { id: "g3", label: "g3", aliases: ["mass effect 3"] },
        ],
      },
    };

    const withPlaying = evaluateAchievement(definition, games);
    expect(withPlaying.progressPercent).toBe(50);
    expect(withPlaying.isCompleted).toBe(false);

    const allCompletedGames = games.map((game) => ({
      ...game,
      status: game.title.startsWith("Mass Effect") ? ("completed" as const) : game.status,
    }));
    const allCompleted = evaluateAchievement(definition, allCompletedGames);
    expect(allCompleted.progressPercent).toBe(100);
    expect(allCompleted.isCompleted).toBe(true);
  });

  it("keeps versioned mission progress isolated by code+version", () => {
    const definitions: AchievementDefinition[] = [
      {
        code: "global.complete-10-games",
        version: 1,
        title: "v1",
        description: "v1",
        category: "global",
        ruleType: "count",
        rulePayload: { metric: "completed_games", target: 10 },
      },
      {
        code: "global.complete-10-games",
        version: 2,
        title: "v2",
        description: "v2",
        category: "global",
        ruleType: "count",
        rulePayload: { metric: "completed_games", target: 15 },
      },
    ];

    const merged = mergeAchievementProgress(definitions, [
      {
        achievementCode: "global.complete-10-games",
        achievementVersion: 1,
        current: 8,
        target: 10,
        progressPercent: 80,
        isCompleted: false,
        completedAt: null,
      },
    ]);

    const v1 = merged.find((item) => item.version === 1);
    const v2 = merged.find((item) => item.version === 2);

    expect(v1?.current).toBe(8);
    expect(v2?.current).toBe(0);
    expect(v2?.target).toBe(15);
  });
});
