//models
import User from "../Models/User";
import Message from "../Models/Message";

//interfaces
import { Server, Socket } from "socket.io";
import { UserI } from "../types/appTypes";

//users for chat
let users: UserI[] = [];

//add user to users chat
const addUser = (userId: string, socket: Socket) => {
  users.push({ userId, socket, socketId: socket.id });
};

//get user of users chat
const getUser = (userId: string) => {
  let user = users.filter((user) => {
    return user.userId === userId;
  });
  return user;
};

//remove user of users chat
const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//chat sockets
const chatSockets = (io: Server) => {
  io.on("connection", (socket) => {
    //add user and recive socket
    socket.on("addUser", (userId) => {
      addUser(userId, socket);
    });

    //get messages
    socket.on("getMessages", async ({ firstUserId, secondUserId }) => {
      let messages = await Message.find({
        users: { $all: [firstUserId, secondUserId] },
      });
      socket.emit("messages", messages);
    });

    //send and save message
    socket.on("sendMessage", async ({ users, sender, reciverId, text }) => {
      let socketMessage = {
        users,
        sender,
        reciverId,
        text,
      };
      const user = await User.findById(sender);
      const userReciver = await User.findById(reciverId);
      let conversationFind = user.conversations.includes(reciverId);
      if (!conversationFind && user && userReciver) {
        //create new conversationns in boths users
        user.conversations.push(reciverId);
        await user.save();
        userReciver.conversations.push(sender);
        await userReciver.save();
      }

      //find user socket conversations
      let userFind = getUser(reciverId);
      let iamUser = getUser(sender);
      //get message
      iamUser?.map((item) => {
        item?.socket?.emit("getMessage", socketMessage);
      });
      userFind?.map((item) => {
        item?.socket?.emit("getMessage", socketMessage);
      });
      // save message
      let message = new Message({ users: [sender, reciverId], sender, text });
      await message.save();
    });
    ///get conversations
    socket.on("get-conversations", async (userId) => {
      let user = await User.findById(userId);
      if (user) {
        socket.emit("my-conversations", user.conversations);
      }
    });
    //disconnect meesage
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};

export default chatSockets;
