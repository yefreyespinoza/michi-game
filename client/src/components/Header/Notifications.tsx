import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../config/config";

interface NotificationIn {
  content: string;
  sender: string;
  click?: () => void;
  accept?: () => void;
  contextId?: string;
  buttonContent?: string;
}
const Notification = (n: NotificationIn) => {
  const [user, setUser] = useState<any>(null);
  const { content, sender, click, accept, buttonContent } = n;
  useEffect(() => {
    const getUser = async () => {
      await axios.get(`${config.API}/api/user/${sender}`).then((res) => {
        setUser(res.data);
      });
    };
    getUser();
  }, [sender]);
  return (
    <NotificationDiv>
      <span>
        <b>{user && user.username} </b>
        {content}
      </span>
      <button className="clear" onClick={click}>
        clear
      </button>
      <button className="accept" onClick={accept}>
        {buttonContent}
      </button>
    </NotificationDiv>
  );
};

export default Notification;

const NotificationDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  min-height: 30px;
  background: #777;
  border-bottom: 1px solid #fff;
  padding: 5px;
  &:hover {
    background: #999;
  }
  & span {
    width: 100%;
    color: #fff;
    font-weight: 100;
    overflow-wrap: break-word;
  }
  & .accept {
    background: #5ac;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    padding: 2px 10px;
    border: 2px solid #7ff;
    font-weight: 900;
  }
  & .clear {
    background: #f00;
    color: #fff;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
    padding: 2px 10px;
    border: 2px solid #000;
  }
`;
