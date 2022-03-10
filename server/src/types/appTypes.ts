import { Socket } from "socket.io";

export interface UserI {
  username?: string;
  _id?: string;
  userId: string;
  socket?: Socket;
  password?: string;
  socketId?: string;
}
