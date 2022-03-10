import Logo from "./Logo";
import { Link } from "react-router-dom";
import * as styles from "./styleBit";
import RightBar from "./RightBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Notifications } from "@material-ui/icons";
import Notification from "./Notifications";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/auth/AuthContext";
import { typeButton } from "./functions";

//sockets
import { NotificationsContext } from "../../context/notifications/NotificationsContext";
import Loading from "../loading";
//interface
interface NotiType {
  type: string;
  context: string;
}
interface NotificationIn {
  _id: string;
  content: string;
  sender: string;
  reciver: string;
  idGenerateUnique: string;
  typeNotification: NotiType;
}
const { HeaderContainer, HeaderDiv } = styles;

const Header = () => {
  const navigate = useNavigate();
  const navBarRef = React.createRef<any>();
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  const notiIconRef = React.createRef<any>();
  const usernameActionRef = React.createRef<any>();

  const { user } = useContext(AuthContext);
  const {
    socket,
    socketTable,
    notifications,
    getNotifications,
    acceptInvitation,
    deleteNotification,
    clearCurrentChatUser,
    clearCurrentChat,
  } = useContext(NotificationsContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [gameUri, setGameUri] = useState("");

  let countNotifications =
    notifications && notifications.filter((item: any) => item);
  //socket add user and get notifications;
  useEffect(() => {
    socket.emit("add-user", user.id);
    socket.emit("get-notifications", user.id);
    socket.off("get-notifications");
    socket.off("add-user");
  }, [socket, user]);

  //get notifications
  useEffect(() => {
    getNotifications("notifications");
  }, [getNotifications]);

  const handleClick = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const openNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  // render section
  let notiRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    socketTable.on("invitation-accepted", (dt: any) => {
      navigate("/game/" + gameUri);
      setLoadingRedirect(false);
    });
  }, [socketTable, navigate, gameUri]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (notiRef && notiIconRef) {
        !notiRef.current?.contains(e.target) &&
          !notiIconRef.current?.contains(e.target) &&
          setIsNotificationOpen(false);
      }
    };
    const handleClickOutsideRightBar = (e: any) => {
      if (navBarRef) {
        !navBarRef.current?.contains(e.target) &&
          !usernameActionRef.current?.contains(e.target) &&
          setIsOpen(false);
      }
    };
    isNotificationOpen &&
      document.addEventListener("mousedown", handleClickOutside);
    isOpen &&
      document.addEventListener("mousedown", handleClickOutsideRightBar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideRightBar);
    };
  }, [
    isNotificationOpen,
    isOpen,
    navBarRef,
    notiIconRef,
    notiRef,
    usernameActionRef,
  ]);
  return (
    <HeaderContainer>
      {isNotificationOpen && (
        <NotificationsContainer ref={notiRef}>
          {}
          {notifications.length > 0 && !loadingRedirect ? (
            <>
              {notifications.map((notification: NotificationIn, i: any) => {
                return (
                  <div key={i}>
                    {notification ? (
                      <Notification
                        content={notification.content}
                        sender={notification.sender}
                        buttonContent={typeButton(
                          notification.typeNotification.type
                        )}
                        accept={() => {
                          switch (notification.typeNotification.type) {
                            case "invitation":
                              setLoadingRedirect(true);

                              setGameUri(notification.typeNotification.context);
                              acceptInvitation(
                                notification.typeNotification.context,
                                user.id,
                                notification.sender,
                                i
                              );

                              deleteNotification(
                                notification.idGenerateUnique,
                                i
                              );

                              return "invitation";
                            case "request":
                              const acceptRequest = () => {
                                socketTable.emit("accept-request", {
                                  myId: user.id,
                                  friendId: notification.sender,
                                });
                              };
                              acceptRequest();
                              deleteNotification(
                                notification.idGenerateUnique,
                                i
                              );
                              return "friend added";
                          }
                        }}
                        click={() =>
                          deleteNotification(notification.idGenerateUnique, i)
                        }
                      ></Notification>
                    ) : null}
                  </div>
                );
              })}
            </>
          ) : !loadingRedirect ? (
            <span style={{ background: "#000", color: "#fff", padding: 10 }}>
              aun no tienes notificacions
            </span>
          ) : (
            <div
              style={{
                background: "#000",
                width: "200px",
                height: "50px",
                position: "relative",
              }}
            >
              <Loading />
            </div>
          )}
        </NotificationsContainer>
      )}
      <ToastContainer />
      <HeaderDiv>
        <Logo link="/home"></Logo>
        <MyLinks>
          <MyLink
            to={"/chat"}
            onClick={() => {
              clearCurrentChatUser();
              clearCurrentChat();
            }}
          >
            chat
          </MyLink>
          <MyLink to={"/friends"}>friends</MyLink>
        </MyLinks>

        <NotificationIcon>
          <div onClick={openNotifications} ref={notiIconRef}>
            <Notifications htmlColor="#fff" />
          </div>
          <span>
            {countNotifications.length > 0 ? countNotifications.length : ""}
          </span>
        </NotificationIcon>
        <Username
          ref={usernameActionRef}
          onClick={() => {
            openMenu();
            isNotificationOpen && openNotifications();
          }}
        >
          <button>{user.username}</button>
        </Username>
      </HeaderDiv>
      <RightBar
        navBarRightRef={navBarRef}
        logout={handleClick}
        isOpen={isOpen}
      />
    </HeaderContainer>
  );
};
const index = () => {
  return (
    <>
      <Header />
    </>
  );
};
export default index;

const Username = styled.span`
  cursor: pointer;
  position: relative;
  display: flex;
  & button {
    outline: none;
    border: none;
    background: #000;
    color: #4bf;
    outline: none;
    margin: 0 5px;
    cursor: pointer;
  }
`;
const NotificationsContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50px;
  width: fit-content;
  max-width: 300px;
  margin: auto;
  max-height: 200px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const NotificationIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
  & > div {
    cursor: pointer;
  }
  & span {
    position: absolute;
    color: #f00;
    font-weight: 900;
    position: absolute;
    top: -10px;
    right: 17px;
  }
`;

const MyLink = styled(Link)`
  display: inline-block;
  color: red;
  border-bottom: 1px solid #808;
  text-decoration: none;
  margin: 0 5px;
`;
const MyLinks = styled.div`
  flex: 1;
  height: 48px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 5px;
`;
