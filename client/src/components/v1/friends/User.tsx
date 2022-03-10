import axios from "axios";
import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../../config/config";
interface IUser {
  username: string;
  id: string;
}

const User = ({
  id,
  click,
}: {
  id: string;
  click: MouseEventHandler<HTMLButtonElement>;
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(`${config.API}/api/user/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    };
    getUsers();
    return () => {
      setUser(null);
    };
  }, [id]);
  return (
    <>
      {user && (
        <Container>
          <Username>{user.username}</Username>
          <Button onClick={click}>chat</Button>
        </Container>
      )}
    </>
  );
};
export default User;

const { div, span, button } = styled;

const Container = div`
    padding: 30px 10px;
    border: 2px solid #799;
    box-shadow: 5px 5px 5px #999;
    width: 95%;
    height: 40px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
    @media screen and (min-width: 900px) {
      width: 70%;
    }
     @media screen and (min-width: 600px) {
      width: 80%;
    }
     @media screen and (min-width: 1200px) {
      width: 50%;
    }
`;
const Username = span`
    color: #000;
    font-weight: bold;
    font-size: 30;
    font-weight: bold;
    box-shadow: 5px 5px 5px #999;
`;
const Button = button`
    padding: 5px 30px;
    border: 1px solid #fff;
    box-shadow: 2px 2px 7px 2px #999 inset;
    border-radius: 10px;
    color: #fff;
    background: #313131;
    outline: none;
    cursor: pointer;
`;
