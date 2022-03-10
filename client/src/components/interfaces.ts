export interface IPalette {
  id: number;
  users: string[] | string;
}
export interface IPieces {
  id: number;
  piece: string;
}
export interface Table {
  turn: string;
  _id: string;
  name: string;
  users: [string, string];
  game: {
    palette: IPalette[];
    pieces: IPieces[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface GetTables {
  tables: Table[] | null;
  loading: boolean;
  error: boolean;
}

export interface GetTable {
  table: Table | null;
  loading: boolean;
  error: boolean;
}
// game interfaces
export interface PaletteComponent {
  color?: string;
  id?: string;
  click?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export interface PieceComponent {
  number?: string;
  selected?: boolean;
  color?: string;
  click?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
