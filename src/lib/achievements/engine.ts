import AchievementDefinition, {
  IAchievementDefinitionDocument,
} from "@/models/AchievementDefinition";
import Game, { IGameDocument } from "@/models/Game";
import UserAchievementProgress from "@/models/UserAchievementProgress";
import type {
  AchievementDefinition as AchievementDefinitionType,
  AchievementProgressResponse,
} from "@/types/achievement";
import {
  evaluateAchievement,
  GameForAchievementRule,
  mergeAchievementProgress,
} from "./rules";

export const DEFAULT_USER_ID = "local-user";

function toTypedDefinition(
  definition: IAchievementDefinitionDocument
): AchievementDefinitionType {
  return {
    code: definition.code,
    version: definition.version,
    title: definition.title,
    description: definition.description,
    category: definition.category,
    ruleType: definition.ruleType,
    rulePayload: definition.rulePayload,
  } as AchievementDefinitionType;
}

export async function recomputeAchievementsProgress(userId = DEFAULT_USER_ID) {
  const startedAt = Date.now();
  const [definitions, games] = await Promise.all([
    AchievementDefinition.find().lean(),
    Game.find().lean(),
  ]);

  const calculatedAt = new Date();
  const upserts = definitions.map((definitionDoc) => {
    const definition = toTypedDefinition(
      definitionDoc as unknown as IAchievementDefinitionDocument
    );
    const evaluated = evaluateAchievement(
      definition,
      games as unknown as GameForAchievementRule[]
    );

    return UserAchievementProgress.findOne({
      userId,
      achievementCode: definition.code,
      achievementVersion: definition.version,
    }).then((existing) => {
      const completedAt = evaluated.isCompleted
        ? existing?.completedAt ?? calculatedAt
        : null;

      return UserAchievementProgress.findOneAndUpdate(
        {
          userId,
          achievementCode: definition.code,
          achievementVersion: definition.version,
        },
        {
          $set: {
            current: evaluated.current,
            target: evaluated.target,
            progressPercent: evaluated.progressPercent,
            isCompleted: evaluated.isCompleted,
            completedAt,
            lastCalculatedAt: calculatedAt,
          },
          $setOnInsert: {
            userId,
            achievementCode: definition.code,
            achievementVersion: definition.version,
          },
        },
        { upsert: true, new: true }
      ).lean();
    });
  });

  const updatedRows = await Promise.all(upserts);

  const completedCount = updatedRows.filter((row) => row?.isCompleted).length;
  const durationMs = Date.now() - startedAt;

  console.info("[achievements.recompute]", {
    userId,
    definitionsCount: definitions.length,
    gamesCount: games.length,
    updatedRows: updatedRows.length,
    completedCount,
    durationMs,
  });
}

export async function getAchievementsForUser(
  userId = DEFAULT_USER_ID
): Promise<AchievementProgressResponse[]> {
  const [definitions, progressRows] = await Promise.all([
    AchievementDefinition.find().lean(),
    UserAchievementProgress.find({ userId }).lean(),
  ]);

  const typedDefinitions = definitions.map((definitionDoc) =>
    toTypedDefinition(definitionDoc as unknown as IAchievementDefinitionDocument)
  );

  return mergeAchievementProgress(typedDefinitions, progressRows);
}
