export type AchievementCategory = "global" | "franchise";

export type AchievementRuleType = "count" | "franchise_checklist";

export type CountMetric = "ratings" | "text_reviews" | "completed_games";

export interface CountRulePayload {
  metric: CountMetric;
  target: number;
}

export interface FranchiseRequirement {
  id: string;
  label: string;
  aliases: string[];
}

export interface FranchiseChecklistRulePayload {
  items: FranchiseRequirement[];
  playingWeight: number;
}

export interface AchievementDefinitionBase {
  code: string;
  version: number;
  title: string;
  description: string;
  category: AchievementCategory;
  ruleType: AchievementRuleType;
}

export interface CountAchievementDefinition extends AchievementDefinitionBase {
  ruleType: "count";
  rulePayload: CountRulePayload;
}

export interface FranchiseAchievementDefinition
  extends AchievementDefinitionBase {
  ruleType: "franchise_checklist";
  rulePayload: FranchiseChecklistRulePayload;
}

export type AchievementDefinition =
  | CountAchievementDefinition
  | FranchiseAchievementDefinition;

export interface AchievementProgressResponse {
  code: string;
  version: number;
  title: string;
  description: string;
  category: AchievementCategory;
  ruleType: AchievementRuleType;
  target: number;
  current: number;
  progressPercent: number;
  isCompleted: boolean;
  completedAt: string | null;
}
