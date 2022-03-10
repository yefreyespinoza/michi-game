import { Server, Socket } from "socket.io";
import Table from "../Models/Table";
import User from "../Models/User";
interface IPalette {
  id: number;
  users: [string, string] | [];
}
interface IPieces {
  id: number;
  piece: string | null;
}

interface IUser {
  userId: string;
  socket: Socket;
  socketId: string;
}
interface userData {
  username: string;
  id: string;
}
interface RestartGame {
  pieces: IPieces[];
  palette: IPalette[];
}
//get users
let onlyUsers: userData[] = [];

let restartGameNow: RestartGame = {
  palette: [
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
  pieces: [
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
      id: 0,
      piece: null,
    },
  ],
};
let usersOnline: IUser[] = [];

const removeUser = (socketId: string) => {
  usersOnline = usersOnline.filter((user) => user.socketId !== socketId);
};
const getUser = (userId: string) =>
  usersOnline.filter((user) => user.userId === userId);

const tableSockets = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("add-user", (userId: string) => {
      const getAllUsers = async () => {
        try {
          let users = await User.find({});
          let usersOnly = users.map((user) => {
            user = {
              username: user.username,
              id: user._id,
            };
            return user;
          });
          onlyUsers = usersOnly;
        } catch (err) {
          return err;
        }
      };
      getAllUsers();
      usersOnline.push({ userId, socket, socketId: socket.id });
    });
    socket.on("get-table", async (tableId) => {
      try {
        let table = await Table.findById(tableId);
        table ? socket.emit("table", table) : socket.emit("table", null);
      } catch (err) {
        socket.emit("table", null);
      }
    });
    socket.on("accept-invitation", async ({ userId, tableId, senderId }) => {
      const table = await Table.findById(tableId);
      try {
        let user = getUser(senderId);
        if (table) {
          table.users.length < 2 && table.users.push(userId);
          await table.save();
          user.map((i) => i.socket.emit("update-table", table));
          getUser(userId).map((i) =>
            i.socket.emit("invitation-accepted", table)
          );
        }
      } catch (err) {
        console.log(err);
      }
    });
    ///game socket
    socket.on("movement", async (data) => {
      let table = await Table.findById(data.tableId);
      try {
        if (table) {
          let turn = table.users.find((user) => user !== table?.turn);
          let NewPalette = table.game.palette.map((item) => {
            if (item.id === data.itemSelect.id) {
              !item.users[0]
                ? (item.users[0] = data.userId)
                : (item.users[1] = data.userId);
            }
            return item;
          });
          let newPiece = table.game.pieces.map((item) => {
            if (item.id === data.id) {
              item.piece = data.userId;
            }
            return item;
          });
          let newGame = {
            palette: NewPalette,
            pieces: newPiece,
          };
          let res = await Table.findOneAndUpdate(
            { _id: data.tableId },
            { game: newGame, turn: turn },
            { new: true, upsert: true, rawResult: true }
          );
          let user = getUser(data.oponentId);
          //send movement
          if (res.value) {
            user.map((i) => i.socket.emit("movement", res.value));
            getUser(data.userId).map((i) =>
              i.socket.emit("movement", res.value)
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
    //save piece
    socket.on("piece-movement", async (dt) => {
      try {
        let table = await Table.findById(dt.tableId);
        if (table) {
          let turn = table.users.find((user) => user !== table?.turn);
          let palette = table.game.palette.map((item) => item);
          let newPiece = table.game.pieces.map((item) => {
            if (item.id === dt.id) {
              item.piece = dt.userId;
            }
            if (item.id === dt.itemSelect.id) {
              item.piece = null;
            }
            return item;
          });
          let newGame = {
            palette: palette,
            pieces: newPiece,
          };
          let res = await Table.findOneAndUpdate(
            { _id: dt.tableId },
            { game: newGame, turn: turn },
            { new: true, upsert: true, rawResult: true }
          );
          let user = getUser(dt.oponentId);
          if (res.value) {
            user.map((i) => i.socket.emit("piece-movement", res.value));
            getUser(dt.userId).map((i) =>
              i.socket.emit("piece-movement", res.value)
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
    //clear table
    socket.on("clear-table", async ({ tableId, oponentId, userId }) => {
      let table = await Table.findById(tableId);
      if (table) {
        let newGame = {
          palette: restartGameNow.palette,
          pieces: restartGameNow.pieces,
        };
        let res = await Table.findOneAndUpdate(
          { _id: tableId },
          { game: newGame },
          { new: true, upsert: true, rawResult: true }
        );
        let user = getUser(oponentId);

        //send socket
        if (res.value) {
          user.map((i) => i.socket.emit("clear-table", res.value));
          getUser(userId).map((i) => i.socket.emit("clear-table", res.value));
        }
      }
    });

    //get users and socket for filter users for add a friend
    socket.on("search-user", async (username: string) => {
      if (onlyUsers) {
        let filterUsers = onlyUsers.filter((value: userData) => {
          return value.username
            .toLocaleLowerCase()
            .includes(username.toLocaleLowerCase());
        });
        socket.emit("filter-users", filterUsers);
      }
    });
    //get friends
    socket.on("get-friends", async (userId) => {
      let user = await User.findById(userId);
      if (user) {
        socket.emit("friends", user.friends);
      }
    });
    //add friend
    socket.on("accept-request", async (dt) => {
      try {
        const user = await User.findById(dt.myId);
        const userFriend = await User.findById(dt.friendId);
        let userFind = getUser(dt.friendId);
        let friendInclude = user.friends.includes(dt.friendId);
        if (!friendInclude && userFriend && user) {
          user.friends.push(dt.friendId);
          userFriend.friends.push(dt.myId);
          user.save();
          userFriend.save();
          userFind.map((i) => i.socket.emit("friends", userFriend.friends));
          getUser(dt.myId).map((i) => i.socket.emit("friends", user.friends));
        }
      } catch (err) {
        console.log(err);
      }
    });
    //get conversations
    socket.on("get-conversations", async (userId) => {
      let user = await User.findById(userId);
      if (user) {
        socket.emit("my-conversations", user.conversations);
      } else {
        socket.emit("my-conversations", null);
      }
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};

export default tableSockets;
