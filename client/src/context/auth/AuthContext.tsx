import { createContext, ReactNode, useReducer } from "react";
import AuthReducer from "./AuthReducer";
let user = localStorage.getItem("user");
const initialState = {
  user: user !== null ? JSON.parse(user) : null,
};

//auth context
export const AuthContext = createContext<any>(initialState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const updateUser = (id: string, username: string) => {
    dispatch({
      type: "UPDATE_USER",
      payload: { id, username },
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
