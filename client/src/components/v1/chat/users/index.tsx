import styled from "styled-components";
import Friends from "./Friend";
const ChatUser = () => {
  return (
    <Container>
        <Friends></Friends>
      <ContainerChat>
        <h1>open a chat</h1>
      </ContainerChat>
    </Container>
  );
};

export default ChatUser;
const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
`;


const ContainerChat = styled.div`
  position: relative;
  width: 70%;
  display: flex;
  margin: auto;
  & h1 {
    text-align: center;
    width: 100%;
  }
`;
