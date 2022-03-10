import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../context/auth/AuthContext";
import { NotificationsContext } from "../../../context/notifications/NotificationsContext";
//components
import SearchBar from "../../search";
import SearchContainer from "./SearchContainer";
import User from "./User";
interface UserInt {
  loading: boolean;
  data: string[] | [];
}
const AllUsers = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { socketTable, addCurrentChat, addCurrentChatUser } =
    useContext(NotificationsContext);
  const [friends, setFriends] = useState<UserInt>({ loading: true, data: [] });

  useEffect(() => {
    socketTable.emit("get-friends", user.id);
    socketTable.on("friends", (dt: string[]) => {
      setFriends({ loading: false, data: dt.reverse() });
    });
    return () => {
      socketTable.off("get-friends");
      setFriends({ loading: false, data: [] });
    };
  }, [user, socketTable]);
  /*clear please */
  return (
    <Container>
      <SearchContainer>
        <SearchBar placeholder="search by username" />
      </SearchContainer>
      {friends?.data.map((id, i) => {
        return (
          <User
            key={i}
            click={(e) => {
              e.preventDefault();
              addCurrentChat(user.id, id);
              addCurrentChatUser(id);
              navigate(`/chat/${user.id}${id}`);
            }}
            id={id}
          />
        );
      })}
    </Container>
  );
};
export default AllUsers;

const { div } = styled;

const Container = div`
    width: 95%;
    margin: auto;
`;
