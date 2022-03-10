import { useContext, useEffect, useState } from "react";
//config
import styled from "styled-components";
import Friend from "../chat/friend";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import { NotificationsContext } from "../../../context/notifications/NotificationsContext";

const Conversations = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addCurrentChat, socketTable, currentChatUser, addCurrentChatUser } =
    useContext(NotificationsContext);
  const [conversations, setConversations] = useState<string[] | null>(null);

  //get conversations
  useEffect(() => {
    socketTable.emit("get-conversations", user.id);
    socketTable.on("my-conversations", (dt: string[] | null) => {
      setConversations(dt);
    });
    return () => {
      setConversations(null);
      socketTable.off("get-conversations");
    };
  }, [user, socketTable]);

  //send messages

  return (
    <MyContainer>
      <Friends>
        {conversations && (
          <>
            {conversations.length > 0 ? (
              <>
                {conversations.map((c: string, i: any) => {
                  return (
                    <Friend
                      key={i}
                      chatNow={c === currentChatUser}
                      conversation={c}
                      currentUser={user.id}
                      click={() => {
                        addCurrentChat(user.id, c);
                        addCurrentChatUser(c);
                        navigate(`/chat/${user.id}${c}`);
                      }}
                    />
                  );
                })}
              </>
            ) : (
              <h1>go friends</h1>
            )}
          </>
        )}
      </Friends>
      <OpenChat>open a chat or go to friends</OpenChat>
    </MyContainer>
  );
};

export default Conversations;
const MyContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
`;

const OpenChat = styled.h1`
  position: relative;
  margin: auto;
`;

const Friends = styled.div`
  position: relative;
  padding: 5px;
  width: 30%;
  height: calc(100vh - 50px);
  overflow: auto;
  border-right: 2px solid #000;
`;
