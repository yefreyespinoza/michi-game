import { model, Schema } from "mongoose";
import { ITable } from "../types/models/Table";

const TableSchema = new Schema<ITable>({
  turn: {
    type: String,
    required: false,
  },
  win: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: [String, String],
      default: [],
    },
  ],
  game: {
    palette: {
      type: Array,
      default: [
        {
          id: 1,
          users: [],
        },
        {
          id: 2,
          users: [],
        },
        {
          id: 3,
          users: [],
        },
      ],
    },
    pieces: {
      type: Array,
      default: [
        {
          id: 1,
          piece: null,
        },
        {
          id: 2,
          piece: null,
        },
        {
          id: 3,
          piece: null,
        },
        {
          id: 4,
          piece: null,
        },
        {
          id: 5,
          piece: null,
        },
        {
          id: 6,
          piece: null,
        },
        {
          id: 7,
          piece: null,
        },
        {
          id: 8,
          piece: null,
        },
        {
          id: 9,
          piece: null,
        },
      ],
    },
  },
  createdAt: {
    type: String,
    default: Date.now().toString(),
  },
  updatedAt: {
    type: String,
    default: Date.now().toString(),
  },
});
const Table = model<ITable>("Table", TableSchema);

export default Table;
