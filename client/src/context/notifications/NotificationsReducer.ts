const AuthReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: payload.reverse(),
      };
    case "GET_USERS_ONLINE":
      return {
        ...state,
        usersOnline: payload.reverse(),
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [payload, ...state.notifications],
      };
    case "DELETE_NOTIFICATION":
      return {
        ...state,
        notifications: payload,
      };
    //tables
    case "GET_TABLES":
      return {
        ...state,
        tables: payload,
      };
    case "ADD_TABLE":
      return {
        ...state,
        tables: [payload, ...state.tables],
      };
    case "SELECT_TABLE":
      return {
        ...state,
        table: payload,
      };
    case "CLEAR_TABLE":
      return {
        ...state,
        table: null,
      };
    case "ADD_CURRENT_CHAT":
      return {
        ...state,
        currentChat: payload,
      };
    case "CLEAR_CURRENT_CHAT":
      return {
        ...state,
        currentChat: [],
      };
    case "ADD_CURRENT_CHAT_USER":
      return {
        ...state,
        currentChatUser: payload,
      };
    case "CLEAR_CURRENT_CHAT_USER":
      return {
        ...state,
        currentChatUser: "",
      };
    default:
      return state;
  }
};

export default AuthReducer;
