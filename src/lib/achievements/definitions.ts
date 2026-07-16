import AchievementDefinition from "@/models/AchievementDefinition";
import type { AchievementDefinition as AchievementDefinitionType } from "@/types/achievement";

export const DEFAULT_ACHIEVEMENT_DEFINITIONS: AchievementDefinitionType[] = [
  {
    code: "global.rate-10-games",
    version: 1,
    title: "Rate 10 Games",
    description: "Give a rating to 10 games in your collection.",
    category: "global",
    ruleType: "count",
    rulePayload: {
      metric: "ratings",
      target: 10,
    },
  },
  {
    code: "global.write-10-text-reviews",
    version: 1,
    title: "Write 10 Text Reviews",
    description: "Add text reviews in notes for 10 games.",
    category: "global",
    ruleType: "count",
    rulePayload: {
      metric: "text_reviews",
      target: 10,
    },
  },
  {
    code: "global.complete-10-games",
    version: 1,
    title: "Complete 10 Games",
    description: "Mark 10 games as completed.",
    category: "global",
    ruleType: "count",
    rulePayload: {
      metric: "completed_games",
      target: 10,
    },
  },
  {
    code: "franchise.mass-effect-trilogy",
    version: 1,
    title: "Mass Effect Trilogy",
    description:
      "Complete all three Mass Effect trilogy games. Playing counts as partial progress.",
    category: "franchise",
    ruleType: "franchise_checklist",
    rulePayload: {
      playingWeight: 0.5,
      items: [
        {
          id: "mass-effect-1",
          label: "Mass Effect",
          aliases: ["mass effect", "mass effect 1", "mass effect legendary edition"],
        },
        {
          id: "mass-effect-2",
          label: "Mass Effect 2",
          aliases: ["mass effect 2", "mass effect 2 legendary edition"],
        },
        {
          id: "mass-effect-3",
          label: "Mass Effect 3",
          aliases: ["mass effect 3", "mass effect 3 legendary edition"],
        },
      ],
    },
  },
];

export async function ensureAchievementDefinitionsSeeded() {
  await Promise.all(
    DEFAULT_ACHIEVEMENT_DEFINITIONS.map((definition) =>
      AchievementDefinition.findOneAndUpdate(
        { code: definition.code, version: definition.version },
        {
          $setOnInsert: {
            code: definition.code,
            version: definition.version,
            title: definition.title,
            description: definition.description,
            category: definition.category,
            ruleType: definition.ruleType,
            rulePayload: definition.rulePayload,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )
    )
  );
}
