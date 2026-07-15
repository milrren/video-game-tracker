import mongoose, { Document, Schema } from "mongoose";
import type { GameStatus } from "@/types/game";

export interface IGameDocument extends Document {
  title: string;
  platform: string;
  genre?: string;
  status: GameStatus;
  rating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<IGameDocument>(
  {
    title: { type: String, required: true, trim: true },
    platform: { type: String, required: true, trim: true },
    genre: { type: String, trim: true },
    status: {
      type: String,
      enum: ["playing", "completed", "backlog", "dropped"],
      required: true,
      default: "backlog",
    },
    rating: { type: Number, min: 1, max: 10 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const Game =
  (mongoose.models.Game as mongoose.Model<IGameDocument>) ||
  mongoose.model<IGameDocument>("Game", GameSchema);

export default Game;
