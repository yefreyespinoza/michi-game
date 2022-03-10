import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import config from "../../../../config/config";
const Friend = ({ username }: { username: string }) => {
  return (
    <Container to="/chat/jslksj">
      <Username>{username}</Username>
      <Online>online</Online>
    </Container>
  );
};
const Friends = () => {
  const cookies = new Cookies();
  const myUserId = cookies.get("id");
  const [conversation, setConversation] = useState<String[] | null>(null);
  const getConversation = async (userId: string) => {
    axios
      .get(`${config.API}/api/conversation/${userId}`)
      .then((res) => {
        setConversation(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getConversation(myUserId);
  }, [myUserId]);
  return (
    <ContainerFriends>
      {conversation?.map((friend: any, i) => {
        return <Friend key={i} username={friend.members[1]} />;
      })}
      <Friend username="carlos" />
      <Friend username="carlos" />
      <Friend username="carlos" />
      <Friend username="carlos" />
    </ContainerFriends>
  );
};
export default Friends;
const ContainerFriends = styled.div`
  position: relative;
  padding: 5px;
  width: 30%;
  height: calc(100vh - 50px);
  overflow: auto;
  border-right: 2px solid #000;
`;

const Container = styled(Link)`
  postion: relative;
  width: 100%;
  margin: 5px 0;
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background: #ac5;
  }
`;
const Username = styled.span`
  color: #5ac;
`;
const Online = styled.span`
  margin-left: 3px;
  height: fit-content;
  flex-shrink: 0;
  font-size: 7px;
`;
