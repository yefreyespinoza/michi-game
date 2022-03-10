import { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AuthContext } from "../../context/auth/AuthContext";
import { NotificationsContext } from "../../context/notifications/NotificationsContext";
interface UserIn {
  username: string;
  id: string;
  tableId: string;
  tableName: string;
}
interface NotiType {
  type: string;
  context: string; //context || id
}
interface NotificationIn {
  content: string;
  sender: string;
  reciver: string;
  idGenerateUnique: string;
  typeNotification: NotiType;
}
const User = (u: UserIn) => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(NotificationsContext);
  let id = user.id;
  const sendInvitation = (noti: NotificationIn) => {
    socket.emit("new-notification", noti);
    socket.off("new-notification");
    toast.success("invitacion enviada");
  };
  return (
    <Container>
      <Username>{u.username}</Username>
      <Invite
        onClick={() => {
          sendInvitation({
            content: `te invita para jugar en  "${u.tableName}"`,
            sender: id,
            reciver: u.id,
            idGenerateUnique: u.tableId + u.id,
            typeNotification: {
              type: "invitation",
              context: u.tableId,
            },
          });
        }}
      >
        invitar
      </Invite>
    </Container>
  );
};
//61d3307a7f164e0b456b605661d0f4accfd976ce53cf249e
//61d3307a7f164e0b456b605661d0f4accfd976ce53cf249e
export default User;
const Container = styled.li`
  border-radius: 5px;
  margin: 5px;
  padding: 15px 2px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #f5f5f5;
  }
`;
const Username = styled.span`
  margin: 0 5px;
  color: #367;
`;
const Invite = styled.button`
  margin: 0 5px;
  background: #59a;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 5px;
  outline: none;
  cursor: pointer;
`;
