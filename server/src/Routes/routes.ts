import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  validateUser,
  addFriend,
} from "./../Controllers/user.controller";
import {
  createConversation,
  getConversation,
  getConversationActual,
} from "../Controllers/Conversations";
import { Router } from "express";
import {
  createTable,
  getMyTables,
  getTableNow,
  updateTable,
  deleteTable,
} from "./../Controllers/table.controller";
//messags
import { createMessage, getMessages } from "./../Controllers/chat.controller";
const router = Router();

//user auth api
router.post("/api/user", createUser);
router.post("/api/user/validate", validateUser);
router.get("/api/users", getUsers);
router.get("/api/user/:id", getUser);
router.put("/api/user/:id", updateUser);
router.delete("/api/user/:id", deleteUser);
router.put("/api/user/add-friend/:id", addFriend);

//conversation routes
router.post("/api/conversation", createConversation);
router.get("/api/conversation/:userId", getConversation);
router.get("/api/find/:firstUserId/:secondUserId", getConversationActual);
//table routes
router.post("/api/tables/", createTable);
router.get("/api/tables/:userId", getMyTables);
router.get("/api/table/:id", getTableNow);
router.put("/api/table/:id", updateTable);
router.delete("/api/table/:id", deleteTable);

//messages routes
router.post("/api/messages/", createMessage);
router.get("/api/messages/:conversationId", getMessages);
export default router;
