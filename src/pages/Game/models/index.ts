export type IGameData = number[][];

export type IMovement = "up" | "down" | "left" | "right" | "";

export interface IOldData {
  data: IGameData;
  score: number;
}
