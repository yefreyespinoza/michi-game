import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CircularProgress } from "@material-ui/core";

import { LoadingContainer } from "../../../components";
//config
import config from "../../../../config/config";
import styled from "styled-components";
import Message from "./Message";
import InputMessage from "./InputMessage";
import Friend from "../friend";
import io, { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/auth/AuthContext";
import { NotificationsContext } from "../../../../context/notifications/NotificationsContext";
import CurrentUserMobile from "./CurrentUserMobile";
interface MessageInteface {
  users?: [string, string];
  sender: string;
  reciverId?: string;
  text: string;
}
const Chat = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    addCurrentChat,
    currentChatUser,
    addCurrentChatUser,
    clearCurrentChat,
    clearCurrentChatUser,
  } = useContext(NotificationsContext);
  let navigate = useNavigate();
  let chatRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageInteface[]>([]);
  const [conversations, setConversations] = useState<string[] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  let socket = useRef<Socket>();
  // exit from currentchat
  useEffect(() => {
    let windowWidth = window.innerWidth;
    if (windowWidth < 500) {
      setIsMobile(true);
    }
  }, []);
  useEffect(() => {
    if (currentChat.length < 1) {
      navigate("/chat");
    }
  }, [currentChat, navigate]);

  //add socket and user
  useEffect(() => {
    socket.current = io(`${config.API}`, {
      path: "/chat/",
    });
    socket.current.emit("addUser", user.id);
    return () => {
      socket.current && socket.current.close();
    };
  }, [user]);

  //get messages
  useEffect(() => {
    socket.current &&
      socket.current.emit("getMessages", {
        firstUserId: currentChat[0],
        secondUserId: currentChat[1],
      });
    return () => {
      socket.current && socket.current.off("getMessages");
    };
  }, [currentChat]);
  useEffect(() => {
    socket.current &&
      socket.current.on("messages", (dt) => {
        setMessages(dt);
      });
    return () => {};
  }, []);
  //get message
  useEffect(() => {
    const getMessage = () => {
      if (socket.current) {
        socket.current.on("getMessage", (dt: MessageInteface) => {
          let includeCurrentChat =
            currentChat.includes(dt.users?.[0]) &&
            currentChat.includes(dt.users?.[1]);
          includeCurrentChat && setMessages((m) => [...m, dt]);
        });
      }
    };
    getMessage();
    return () => {
      if (socket.current) {
        socket.current.off("getMessage");
      }
    };
  }, [currentChat]);

  // get conversations
  useEffect(() => {
    if (socket.current) {
      socket.current.emit("get-conversations", user.id);
      socket.current.on("my-conversations", (dt) => {
        setConversations(dt);
      });
    }
    return () => {
      setConversations(null);
      clearCurrentChatUser();
      clearCurrentChat();
      if (socket.current) {
        socket.current.off("get-conversations");
      }
    };
    //eslint-disable-next-line
  }, [user]);

  //add new user to conversations
  useEffect(() => {
    if (conversations) {
      let findNewUser = conversations.find((u) => u === currentChatUser);
      if (!findNewUser && currentChatUser) {
        setConversations([...conversations, currentChatUser]);
      }
    }
  }, [conversations, currentChatUser]);

  //send messages
  const sendMessage = (m: MessageInteface) => {
    if (socket.current) {
      socket.current.emit("sendMessage", m);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let message = e.currentTarget.value;
    setMessage(message);
  };
  const handleClick = (e: FormEvent<HTMLFormElement | undefined>) => {
    e.preventDefault();
    sendMessage({
      users: currentChat,
      sender: user.id,
      reciverId: currentChat.find((u: string) => u !== user.id) || user.id,
      text: message,
    });
    setMessage("");
  };
  const mobileClass = (isMobile: boolean, isSelect: boolean): string => {
    if (isMobile && isSelect) {
      return "select-chat";
    } else if (isMobile && !isSelect) {
      return "mobile";
    } else {
      return "";
    }
  };
  return (
    <MyContainer>
      <Friends className={mobileClass(isMobile, currentChatUser)}>
        {conversations ? (
          conversations.map((c: string, i: any) => {
            return (
              <Friend
                key={i}
                chatNow={c === currentChatUser}
                conversation={c}
                currentUser={user.id}
                click={() => {
                  setMessage("");
                  addCurrentChat(user.id, c);
                  addCurrentChatUser(c);
                }}
              />
            );
          })
        ) : (
          <LoadingContainer element={<CircularProgress />} />
        )}
      </Friends>
      {currentChat.length > 1 && currentChatUser ? (
        <ContainerChat className={mobileClass(isMobile, currentChatUser)}>
          <CurrentUserMobile
            click={() => {
              clearCurrentChat();
              clearCurrentChatUser();
            }}
            class={mobileClass(isMobile, currentChatUser)}
            idUser={currentChatUser}
          />
          <Container ref={chatRef} heightS={isMobile ? "130" : "100"}>
            {messages &&
              messages.map((m, index) => {
                chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
                return (
                  <Message
                    key={index}
                    userId={user.id}
                    sender={m.sender}
                    text={m.text}
                    chatRef={chatRef && chatRef.current}
                  />
                );
              })}
          </Container>
          <InputMessage
            value={message}
            click={handleClick}
            onchange={handleChange}
          />
        </ContainerChat>
      ) : (
        <OpenChat className={mobileClass(isMobile, currentChatUser)}>
          open a chat
        </OpenChat>
      )}
    </MyContainer>
  );
};

export default Chat;
interface PropsStyle {
  heightS: string;
}
const MyContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
`;

const Container = styled.div`
  padding: 0 10px;
  display: block;
  position: relative;
  height: calc(100vh - ${(p: PropsStyle) => p.heightS}px);
  overflow: auto;
  padding-bottom: 50px;
`;

const ContainerChat = styled.div`
  display: block;
  position: relative;
  width: 70%;
  &.mobile: {
    display: none;
  }
  &.select-chat {
    width: 100%;
  }
`;
const OpenChat = styled.h1`
  position: relative;
  margin: auto;
  &.mobile {
    display: none;
  }
`;

const Friends = styled.div`
  position: relative;
  padding: 5px;
  width: 30%;
  height: calc(100vh - 50px);
  overflow: auto;
  border-right: 2px solid #000;
  &.mobile {
    width: 100%;
  }
  &.select-chat {
    display: none;
  }
`;
