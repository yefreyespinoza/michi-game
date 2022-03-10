interface IPalette {
  id: number;
  users: [string, string];
}
interface IPieces {
  id: number;
  piece: string | null;
}
export interface ITable {
  win: string | null;
  turn: string;
  name: string;
  users: [string, string];
  game: {
    palette: IPalette[];
    pieces: IPieces[];
  };
  createdAt: string;
  updatedAt: string;
}
