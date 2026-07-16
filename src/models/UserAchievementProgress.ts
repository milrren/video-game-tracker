import mongoose, { Document, Schema } from "mongoose";

export interface IUserAchievementProgressDocument extends Document {
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

const UserAchievementProgressSchema =
  new Schema<IUserAchievementProgressDocument>(
    {
      userId: { type: String, required: true, trim: true },
      achievementCode: { type: String, required: true, trim: true },
      achievementVersion: { type: Number, required: true, min: 1 },
      current: { type: Number, required: true, min: 0 },
      target: { type: Number, required: true, min: 1 },
      progressPercent: { type: Number, required: true, min: 0, max: 100 },
      isCompleted: { type: Boolean, required: true, default: false },
      completedAt: { type: Date, default: null },
      lastCalculatedAt: { type: Date, required: true },
    },
    { timestamps: true }
  );

UserAchievementProgressSchema.index(
  { userId: 1, achievementCode: 1, achievementVersion: 1 },
  { unique: true }
);

const UserAchievementProgress =
  (mongoose.models.UserAchievementProgress as mongoose.Model<IUserAchievementProgressDocument>) ||
  mongoose.model<IUserAchievementProgressDocument>(
    "UserAchievementProgress",
    UserAchievementProgressSchema
  );

export default UserAchievementProgress;
