import { Server, Socket } from "socket.io";
import { UserI } from "../types/appTypes";
interface User {
  socketId: string;
  socket: Socket;
  id: string;
  username: string;
}
let users: UserI[] = [];

let socketsConnected: User[] = [];

const addUserToUsers = (userId: string, socketId: string, username: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId, username });
};

const addUserToSocketsConnected = (
  id: string,
  socket: Socket,
  socketId: string,
  username: string
) => {
  socketsConnected.push({ id, socket, socketId, username });
};
const removeuser = (socketId: string) => {
  let filterUser = socketsConnected.filter(
    (user) => user.socketId === socketId
  );
  if (filterUser.length <= 1) {
    users = users.filter((user) => user.socketId !== socketId);
  }
  socketsConnected = socketsConnected.filter(
    (user) => user.socketId !== socketId
  );
};
const lobbySockets = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("add-user", (user) => {
      addUserToUsers(user.id, socket.id, user.username);
      addUserToSocketsConnected(user.id, socket, socket.id, user.username);
      io.emit("users", users);
    });
    socket.on("disconnect", () => {
      removeuser(socket.id);
      io.emit("users", users);
    });
  });
};

export default lobbySockets;
