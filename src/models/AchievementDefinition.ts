import mongoose, { Document, Schema } from "mongoose";
import type {
  AchievementCategory,
  AchievementRuleType,
  CountRulePayload,
  FranchiseChecklistRulePayload,
} from "@/types/achievement";

type RulePayload = CountRulePayload | FranchiseChecklistRulePayload;

export interface IAchievementDefinitionDocument extends Document {
  code: string;
  version: number;
  title: string;
  description: string;
  category: AchievementCategory;
  ruleType: AchievementRuleType;
  rulePayload: RulePayload;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementDefinitionSchema = new Schema<IAchievementDefinitionDocument>(
  {
    code: { type: String, required: true, trim: true },
    version: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["global", "franchise"],
      required: true,
    },
    ruleType: {
      type: String,
      enum: ["count", "franchise_checklist"],
      required: true,
    },
    rulePayload: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

AchievementDefinitionSchema.index({ code: 1, version: 1 }, { unique: true });

const AchievementDefinition =
  (mongoose.models.AchievementDefinition as mongoose.Model<IAchievementDefinitionDocument>) ||
  mongoose.model<IAchievementDefinitionDocument>(
    "AchievementDefinition",
    AchievementDefinitionSchema
  );

export default AchievementDefinition;
