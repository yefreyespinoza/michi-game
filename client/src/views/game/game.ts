import { Socket } from "socket.io-client";
import * as interfaces from "./../../components/interfaces";
export default class game {
  constructor() {
    this.colorPaletSwitch = this.colorPaletSwitch.bind(this);
    this.colorPieceSwitch = this.colorPieceSwitch.bind(this);
    this.selectPiceandMovement = this.selectPiceandMovement.bind(this);
    this.selectPalet = this.selectPalet.bind(this);
    this.saveMovement = this.saveMovement.bind(this);
    this.savePieceAndMovement = this.savePieceAndMovement.bind(this);
  }
  /*
  verificar si ya estan todos insertados; like true;
  select piece in state return all pieces;
  if piece select save movement;
  -//send socket 
  */
  savePieceAndMovement(
    table: interfaces.Table,
    itemSelect: interfaces.IPieces,
    id: number,
    socket: Socket,
    tableId: string,
    userId: string,
    oponentId: string | undefined
  ) {
    //select and null;
    let findTable = table.game.pieces.find(
      (item) => item.piece === null && item.id === id
    );
    //send itemSelect, tableId, userId, oponentId, id:(insertPieceId)
    findTable &&
      socket.emit("piece-movement", {
        itemSelect,
        id: findTable.id,
        tableId,
        userId,
        oponentId,
      });
  }
  illuminatePiece(
    table: interfaces.Table,
    itemSelect: interfaces.IPieces,
    userId: string
  ) {
    return table.game.pieces.map((item) => {
      if (item.piece === "select" && item.id !== itemSelect.id) {
        item.piece = userId;
      } else if (item.id === itemSelect.id) {
        item.piece !== "select"
          ? (item.piece = "select")
          : (item.piece = userId);
      }
      return item;
    });
  }

  isInserted(pallete: interfaces.IPalette[], userId: string) {
    let returned: any[] = [];
    pallete.map((item) => {
      typeof item.users === "object" &&
        returned.push(item.users.find((i) => i === userId));
      return item;
    });
    let veri = returned.filter((i) => i === userId);
    return veri.length === 3;
  }
  selectPiceandMovement(table: interfaces.Table, id: number, userId: string) {
    let piece = table.game.pieces.find(
      (item) =>
        item.id === id && (item.piece === userId || item.piece === "select")
    );
    return piece;
  }
  colorPaletSwitch(color: string | boolean) {
    switch (color) {
      case "no-select":
        return "#5ac";
      case true:
        return "#346";
      case "select":
        return "#7ff";
      default:
        return "#5ac";
    }
  }
  colorPieceSwitch(color: string | null, userId: string, oponentId?: string) {
    switch (color) {
      case null:
        return "#fff";
      case userId:
        return "#5ac";
      case oponentId:
        return "#faf";
      case "select":
        return "#7ff";
      default:
        return "#fff";
    }
  }
  selectPalet(
    table: interfaces.Table,
    id: number,
    userId: string
  ): interfaces.IPalette[] {
    let tableFilter = table.game.palette.filter((item) => {
      return item.users === "select";
    });
    let itemSelect = table.game.palette.filter((item) => {
      return item.id === id && item.users !== "select";
    });
    let all: interfaces.IPalette[] = [...tableFilter, ...itemSelect];

    return all.map((item) => {
      if (item.users === "select") {
        item.users = "no-select";
      } else if (
        item.id === id &&
        !item.users.includes(userId) &&
        item.users !== "select"
      ) {
        item.users = "select";
      }
      return item;
    });
  }

  clearTable(
    socket: Socket,
    tableId: string | undefined,
    oponentId: string | undefined,
    userId: string
  ) {
    socket.emit("clear-table", { tableId, oponentId, userId });
  }
  saveMovement(
    itemSelect: interfaces.IPalette | undefined,
    socket: Socket,
    id: number,
    userId: string,
    tableId: string,
    oponentId?: string
  ) {
    if (itemSelect) {
      socket.emit("movement", {
        itemSelect,
        id,
        tableId,
        userId,
        oponentId,
      });
    }
    return true;
  }
}
