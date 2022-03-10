import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../../../config/config";
import { FaArrowLeft } from "react-icons/fa";
interface PropsI {
  class: string;
  idUser: string;
  click: any;
}
interface User {
  username: string;
}
const CurrentUserMobile = (props: PropsI) => {
  const [user, setUser] = useState<User>({ username: "" });
  const getUser = async (id: string) => {
    const res = await axios.get(`${config.API}/api/user/${id}`);
    setUser(res.data);
  };
  useEffect(() => {
    getUser(props.idUser);
    //eslint-disable-next-line
  }, []);
  return (
    <CurrentUser className={props.class}>
      <div>
        <FaArrowLeft
          onClick={props.click}
          color="#fff"
          fontSize={28}
          width={50}
        />
      </div>
      <span>{user.username}</span>
    </CurrentUser>
  );
};

export default CurrentUserMobile;
const CurrentUser = styled.div`
  display: none;
  position: relative;
  background-color: #252525;
  height: 30px;
  &.select-chat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }
  & span {
    color: #fff;
    height: min-content;
  }
`;
