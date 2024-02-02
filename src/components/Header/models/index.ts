export interface IHeader {
  score: number;
  moves: number;
  onReset: () => void;
  onBack: () => void;
  onMenu: () => void;
}
