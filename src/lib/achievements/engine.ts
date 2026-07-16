import {
  type AchievementDefinitionDocument,
  getAchievementDefinitionsCollection,
  getGamesCollection,
  getUserAchievementProgressCollection,
} from "@/lib/db/collections";
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
  definition: AchievementDefinitionDocument
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
  const definitionsCollection = await getAchievementDefinitionsCollection();
  const gamesCollection = await getGamesCollection();
  const progressCollection = await getUserAchievementProgressCollection();

  const [definitions, games] = await Promise.all([
    definitionsCollection.find({}).toArray(),
    gamesCollection
      .find({}, { projection: { title: 1, status: 1, rating: 1, notes: 1 } })
      .toArray(),
  ]);

  const calculatedAt = new Date();
  const updates = definitions.map(async (definitionDoc) => {
    const definition = toTypedDefinition(definitionDoc);
    const evaluated = evaluateAchievement(
      definition,
      games as unknown as GameForAchievementRule[]
    );

    const existing = await progressCollection.findOne({
      userId,
      achievementCode: definition.code,
      achievementVersion: definition.version,
    });

    const completedAt = evaluated.isCompleted
      ? existing?.completedAt ?? calculatedAt
      : null;

    await progressCollection.updateOne(
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
          updatedAt: calculatedAt,
        },
        $setOnInsert: {
          userId,
          achievementCode: definition.code,
          achievementVersion: definition.version,
          createdAt: calculatedAt,
        },
      },
      { upsert: true }
    );

    return { isCompleted: evaluated.isCompleted };
  });

  const updatedRows = await Promise.all(updates);

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
  const definitionsCollection = await getAchievementDefinitionsCollection();
  const progressCollection = await getUserAchievementProgressCollection();

  const [definitions, progressRows] = await Promise.all([
    definitionsCollection.find({}).toArray(),
    progressCollection.find({ userId }).toArray(),
  ]);

  const typedDefinitions = definitions.map((definitionDoc) =>
    toTypedDefinition(definitionDoc)
  );

  return mergeAchievementProgress(typedDefinitions, progressRows);
}
