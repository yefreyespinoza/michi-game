import express from "express";
// import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Router } from "express";
import mongoose from "mongoose";
//scokets
import lobbySockets from "./connection/lobbySockets";
import chatSockets from "./connection/chatSockets";
import notificationsSocket from "./connection/notificationsSocket";
import tableSockets from "./connection/tableSockets";
//import router user
import userRoutes from "./Routes/routes";
//database connection
const DB = process.env.MONGODB_URI || "mongodb://localhost/lpchat-db";
const APIOrigin = process.env.API_ORIGIN || "*";
mongoose
  .connect(DB)
  .then((db) => console.log("DB is connected"))
  .catch((e) => console.log(e));
//app server with express
const app = express();

//cors options
const corsOptions = {
  origin: APIOrigin,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//app uses importants
app.use(express.json());
// app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);

//routes
const routes = Router();
app.use(routes);

// http server for app and sockets
const httpServer = createServer(app);

//socket server
const io = new Server(httpServer, {
  cors: {
    origin: APIOrigin,
  },
});
//socket server for game socket
lobbySockets(io);
//server for chat sockets
const ioChat = new Server(httpServer, {
  path: "/chat/",
  cors: {
    origin: "*",
  },
});
chatSockets(ioChat);
//server for notifications sockets
const ioNotifications = new Server(httpServer, {
  path: "/notifications/",
  cors: {
    origin: APIOrigin,
  },
});
notificationsSocket(ioNotifications);
//server for tables sockets
const ioTables = new Server(httpServer, {
  path: "/tables/",
  cors: {
    origin: APIOrigin,
  },
});
tableSockets(ioTables);
//server for michi game sockets

//exort http server
export default httpServer;
