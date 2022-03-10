import "./assets/css/App.css";
import Router from "./router/Router";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { NotificationsContextProvider } from "./context/notifications/NotificationsContext";
const App = () => {
  return (
    <AuthContextProvider>
      <NotificationsContextProvider>
        <Router />
      </NotificationsContextProvider>
    </AuthContextProvider>
  );
};

export default App;
