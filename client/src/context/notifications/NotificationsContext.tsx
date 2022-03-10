import axios from "axios";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { toast } from "react-toastify";
import io, { Socket } from "socket.io-client";
import config from "../../config/config";
import { AuthContext } from "../auth/AuthContext";
import NotificationsReducer from "./NotificationsReducer";
const initialState = {
  notifications: [],
  tables: [],
  usersOnline: [],
  currentChat: [],
  currentChatUser: null,
  table: null, //object table
  socketTable: null,
  socketUsers: null,
  socket: null,
};
//socket table
const socketTable: Socket = io(`${config.API}/`, {
  path: "/tables/",
});
const socketUsers: Socket = io(`${config.API}/`);
//auth context
const socket: Socket = io(`${config.API}`, {
  path: "/notifications/",
});
export const NotificationsContext = createContext<any>(initialState);

export const NotificationsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(NotificationsReducer, initialState);
  //users online
  useEffect(() => {
    user &&
      socketUsers.emit("add-user", { username: user.username, id: user.id });
    user && socketTable.emit("add-user", user.id);
    socketUsers.on("users", (dt: any) => {
      dispatch({
        type: "GET_USERS_ONLINE",
        payload: dt,
      });
    });
    return () => {
      socketUsers.off("add-user");
    };
  }, [user]);

  //send Invitation
  function sendInvitation(noti: any) {
    socket.emit("new-notification", noti);
  }

  //getNotifications
  const getNotifications = (eName: string) => {
    socket.on(eName, (dt) => {
      dispatch({
        type: "GET_NOTIFICATIONS",
        payload: dt,
      });
    });
  };

  const deleteNotification = (uniqueId: string, index: string | number) => {
    socket.emit("delete-notification", uniqueId);
    delete state.notifications[index];
    dispatch({
      type: "DELETE_NOTIFICATION",
      payload: state.notifications,
    });
    socket.off("delete-notification");
  };

  useEffect(() => {
    socket.on("notification", (dt) => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: dt,
      });
    });
  }, []);

  //tables

  //tables socket
  //accept invitation
  const acceptInvitation = (
    tableId: string,
    userId: string,
    senderId: string,
    index: string | number
  ) => {
    socketTable.emit("accept-invitation", { userId, tableId, senderId });
    socketTable.off("accept-invitation");
    delete state.notifications[index];
    dispatch({
      type: "DELETE_NOTIFICATION",
      payload: state.notifications,
    });
  };

  //select table
  const selectTable = async (tableId: string) => {
    let table = state.tables.find((t: any) => t._id === tableId);
    table && dispatch({ type: "SELECT_TABLE", payload: table });
  };

  //add table
  const addTable = async (tableName: string, userId: string) => {
    await axios
      .post(`${config.API}/api/tables/`, {
        tableName,
        userId,
      })
      .then(async (res) => {
        dispatch({
          type: "ADD_TABLE",
          payload: res.data,
        });
        toast.success("table created succefull");
      })
      .catch((err) => {
        toast.error("error creating table");
      });
  };

  //clear table
  const clearTable = () => {
    dispatch({ type: "CLEAR_TABLE" });
  };

  //add current chat
  const addCurrentChat = (firstUserId: string, secondUserId: string) => {
    dispatch({
      type: "ADD_CURRENT_CHAT",
      payload: [firstUserId, secondUserId],
    });
  };
  //clear curren chat
  const clearCurrentChat = () => {
    dispatch({
      type: "CLEAR_CURRENT_CHAT",
    });
  };

  //add current chat user
  const addCurrentChatUser = (id: string) => {
    dispatch({
      type: "ADD_CURRENT_CHAT_USER",
      payload: id,
    });
  };
  //clear current chat user
  const clearCurrentChatUser = () => {
    dispatch({
      type: "CLEAR_CURRENT_CHAT_USER",
    });
  };
  return (
    <NotificationsContext.Provider
      value={{
        notifications: state.notifications,
        socket,
        socketUsers,
        usersOnline: state.usersOnline,
        currentChat: state.currentChat,
        currentChatUser: state.currentChatUser,
        addCurrentChat,
        clearCurrentChat,
        addCurrentChatUser,
        clearCurrentChatUser,
        getNotifications,
        sendInvitation,
        deleteNotification,
        socketTable,
        tables: state.tables,
        table: state.table,
        acceptInvitation,
        addTable,
        selectTable,
        clearTable,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
