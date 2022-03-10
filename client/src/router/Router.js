import { Routes, Route } from "react-router-dom";
import Lobby from "../views/lobby";
import HeaderLogin from "../components/header-login";
import Header from "../components/Header";
import Chat from "../components/v1/chat/messenger";
// import Conversations from "../components/v1/conversations";
import Friends from "../components/v1/friends";
import Table from "../views/table";
import Game from "../views/game";

// sigin
import Login from "../views/login";
import Register from "../views/register";
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HeaderLogin />} />
        <Route path="/register" element={<HeaderLogin />} />
        <Route path="*" element={<Header />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Lobby />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="/chat/" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="*" element={<h1>page not found</h1>} />
      </Routes>
    </div>
  );
};

export default Router;
