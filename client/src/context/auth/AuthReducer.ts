const AuthReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
