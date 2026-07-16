import { Collection, ObjectId } from "mongodb";
import type {
  AchievementCategory,
  AchievementRuleType,
  CountRulePayload,
  FranchiseChecklistRulePayload,
} from "@/types/achievement";
import { connectToDatabase } from "@/lib/mongodb";
import type { GameStatus } from "@/types/game";

export interface GameDocument {
  _id?: ObjectId;
  title: string;
  platform: string;
  genre?: string;
  status: GameStatus;
  rating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AchievementDefinitionDocument {
  _id?: ObjectId;
  code: string;
  version: number;
  title: string;
  description: string;
  category: AchievementCategory;
  ruleType: AchievementRuleType;
  rulePayload: CountRulePayload | FranchiseChecklistRulePayload;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAchievementProgressDocument {
  _id: ObjectId;
  userId: string;
  achievementCode: string;
  achievementVersion: number;
  current: number;
  target: number;
  progressPercent: number;
  isCompleted: boolean;
  completedAt: Date | null;
  lastCalculatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export async function getGamesCollection(): Promise<Collection<GameDocument>> {
  const db = await connectToDatabase();
  return db.collection<GameDocument>("games");
}

export async function getAchievementDefinitionsCollection(): Promise<
  Collection<AchievementDefinitionDocument>
> {
  const db = await connectToDatabase();
  return db.collection<AchievementDefinitionDocument>("achievementdefinitions");
}

export async function getUserAchievementProgressCollection(): Promise<
  Collection<UserAchievementProgressDocument>
> {
  const db = await connectToDatabase();
  return db.collection<UserAchievementProgressDocument>(
    "userachievementprogresses"
  );
}
