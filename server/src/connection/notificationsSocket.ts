import { Server, Socket } from "socket.io";
import { UserI } from "../types/appTypes";
import Notification from "./../Models/Notification";
import User from "./../Models/User";

interface NotiType {
  type: string;
  context: string; //context || id
}
interface NotificationIn {
  content: string;
  sender: string;
  reciver: string;
  idGenerateUnique: string;
  typeNotification: NotiType;
}
let usersOnline: UserI[] = [];
const addUser = (userId: string, socket: Socket) => {
  usersOnline.push({ userId, socket, socketId: socket.id });
};

const getUser = (userId: string) => {
  return usersOnline.filter((i) => i.userId === userId);
};
const removeUser = (socketId: string) => {
  usersOnline = usersOnline.filter((user) => user.socketId !== socketId);
};

const notificationsSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("add-user", (userId: string) => {
      addUser(userId, socket);
    });
    socket.on("get-notifications", async (userId: string) => {
      let notifications = await Notification.find({ reciver: userId });
      notifications && socket.emit("notifications", notifications);
    });
    socket.on("new-notification", async (dt: NotificationIn) => {
      let user = getUser(dt.reciver);
      try {
        let N = new Notification(dt);
        user?.map(async (i) => {
          if (i.userId !== dt.sender) {
            i.socket?.emit("notification", dt);
            try {
              N && (await N.save());
            } catch (e) {
              console.log(e);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
    //add friend
    socket.on("add-friend", async (dt: NotificationIn) => {
      try {
        let user = await User.findById(dt.sender);
        let userOnline = getUser(dt.reciver);
        let N = new Notification(dt);
        //save notification
        N &&
          dt.sender !== dt.reciver &&
          !user.friends.includes(dt.reciver) &&
          (await N.save());
        //send notification to user in real time
        userOnline?.map((i) => {
          if (i.userId !== dt.sender && !user.friends.includes(dt.reciver)) {
            i.socket?.emit("notification", N);
            console.log("send a notification");
          }
        });
      } catch (err) {
        return err;
      }
    });

    socket.on("delete-notification", async (uniqueId: string) => {
      try {
        const notification = await Notification.findOneAndDelete({
          idGenerateUnique: uniqueId,
        });
        !notification && "notification not found";
        notification && "delete succesfull";
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};

export default notificationsSocket;
