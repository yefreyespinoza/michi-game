import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "./../../../../config/config";

const Friend = ({
  conversation,
  currentUser,
  click,
  chatNow,
}: {
  conversation: string;
  currentUser: string;
  click?: () => void;
  chatNow?: boolean;
}) => {
  const [friend, setFriend] = useState<any>();
  useEffect(() => {
    axios.get(`${config.API}/api/user/${conversation}`).then((res) => {
      setFriend(res.data);
    });
  }, [conversation]);
  return (
    <>
      {friend && (
        <Container
          className={chatNow ? "chatNow" : ""}
          onClick={click}
          to={`/chat/${currentUser}${friend._id}`}
        >
          <Username>{friend.username} </Username>
        </Container>
      )}
    </>
  );
};

export default Friend;

const Container = styled(Link)`
  postion: relative;
  width: 80%;
  margin: 5px 0;
  box-shadow: 5px 5px 5px #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 7px;
  border-radius: 10px;
  border-left: 1px solid #999;
  text-decoration: none;
  margin: 10px auto;
  @media screen and (min-width: 900px) {
    width: 80%;
  }
  &:hover {
    background: #0001;
  }
  &.chatNow {
    background: #faf;
  }
`;
const Username = styled.span`
  color: #f0f;
  box-shadow: 5px 5px 5px #999;
  font-weight: bold;
`;
