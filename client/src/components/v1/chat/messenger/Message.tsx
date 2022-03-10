import { useEffect } from "react";
import styled from "styled-components";

const Message = ({
  userId,
  chatRef,
  sender,
  text,
}: {
  userId: string;
  chatRef: HTMLDivElement | null;
  sender: string;
  text: string;
}) => {
  useEffect(() => {
    chatRef && chatRef.scrollTo(0, chatRef.scrollHeight);
  }, [chatRef]);
  return (
    <Container className={userId === sender ? "own" : ""}>
      <Text>{text}</Text>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  position: relative;
  border: 1px solid black;
  padding: 0 10px 10px 10px;
  background-color: #fafafa;
  border-radius: 10px;
  margin: 10px 0;
  width: fit-content;
  max-width: 80%;
  &.own {
    background-color: #faf;
    left: 100%;
    transform: translateX(-100%);
  }
`;
const Text = styled.div`
  position: relative;
  font-size: 15px;
  width: 100%;
  height: auto;
  overflow-wrap: break-word;
`;
