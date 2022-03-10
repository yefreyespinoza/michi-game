import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import config from "../../config/config";
import { NotificationsContext } from "../../context/notifications/NotificationsContext";
interface User {
  user1: string;
  user2: string;
}
interface Props {
  tableId: string;
  firstUserId: string;
  secondUserId: string;
  click?: any;
}
interface TableIn {
  name: string;
  _id: string;
}
/*

 */
const Table = (p: Props) => {
  const { selectTable } = useContext(NotificationsContext);
  const navigate = useNavigate();
  const [table, setTable] = useState<TableIn | null>(null);
  const [user, setUser] = useState<User>({ user1: "", user2: "" });

  useEffect(() => {
    const getTable = () => {
      axios
        .get(config.API + "/api/table/" + p.tableId)
        .then((res) => {
          setTable(res.data);
        })
        .catch((err) => console.log(err));
    };
    const getFirstUser = async () => {
      await axios
        .get(`${config.API}/api/user/${p.firstUserId}`)
        .then((res) => {
          setUser((u) => ({ ...u, user1: res.data.username }));
        })
        .catch((e) => console.log(e));
    };
    const getSecondUser = async () => {
      await axios
        .get(`${config.API}/api/user/${p.secondUserId}`)
        .then((res) => {
          setUser((u) => ({ ...u, user2: res.data.username }));
        })
        .catch((e) => console.log(e));
    };
    getTable();
    getFirstUser();
    p.secondUserId && getSecondUser();
  }, [p]);
  return (
    <Container>
      <Item>
        <TableName>{table && table.name}</TableName>
        <span style={{ fontWeight: "bold" }}>win</span>
      </Item>
      <Item>
        <UserStyle>{user.user1}</UserStyle>
        <span>vs</span>
        <UserStyle>{user.user2 ? user.user2 : "wait ..."}</UserStyle>
      </Item>
      <Item>
        <Button buttonBorder="#f3f" buttonColor={"#b15"} onClick={p.click}>
          delete table
        </Button>
        <Button
          onClick={() => {
            if (!user.user2) {
              selectTable(table?._id);
              navigate("/table/" + table?._id);
            } else {
              navigate("/game/" + p.tableId);
            }
          }}
          buttonBorder="#7ff"
          buttonColor={"#377"}
        >
          {user && user.user2 ? "go game" : "invitar"}
        </Button>
      </Item>
    </Container>
  );
};

export default Table;
interface PropsStyle {
  buttonColor: string;
  buttonBorder: string;
}
const Container = styled.div`
  display: flex;
  padding: 10px 10px;
  margin: 10px 0;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 2px solid #799;
  position: relative;
  align-items: center;
  border-radius: 10px;
  width: 97%;
  height: fit-content;
  box-shadow: 5px 5px 5px #999;
`;

const Item = styled.div`
  padding: 4px 0;
  display: flex;
  &:nth-child(2),
  &:nth-child(1) {
    flex: 1;
  }
  justify-content: space-around;
  &:last-child {
    width: 100%;
  }
`;
let boxShadow = "box-shadow: 3px 3px 9px #fff inset;";
const Button = styled.button`
  border: none;
  ${boxShadow}
  border-radius: 10px;
  background: ${(p: PropsStyle) => p.buttonColor};
  color: #fff;
  font-weight: bold;
  height: fit-content;
  padding: 8px 10px;
  cursor: pointer;
`;

const UserStyle = styled.span`
  color: #378;
  border-bottom: 1px solid #378;
`;
const TableName = styled(UserStyle)`
  font-weight: bold;
  border: none;
`;
