export type GameStatus = "playing" | "completed" | "backlog" | "dropped";

export interface IGame {
  _id: string;
  title: string;
  platform: string;
  genre?: string;
  status: GameStatus;
  rating?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateGameInput = Omit<IGame, "_id" | "createdAt" | "updatedAt">;
export type UpdateGameInput = Partial<CreateGameInput>;
