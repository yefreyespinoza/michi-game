import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AlertContent = ({
  title,
  handleClick,
  btnContent,
}: {
  title?: string;
  handleClick?: () => void;
  btnContent: string;
}) => {
  let navigate = useNavigate();
  return (
    <Container>
      <h2>{title || "Title alert"}</h2>
      <button onClick={() => navigate("/home")}>go to home</button>
      <button onClick={handleClick}>{btnContent}</button>
    </Container>
  );
};

export default AlertContent;

const Container = styled.div`
  position: relative;
  border: 1px solid #000;
  box-shadow: 0px 0px 5px #5fc;
  margin: 30px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #fdf;
  border-radius: 10px;
  width: fit-content;
  max-width: 95%;
  flex-wrap: wrap;
  & h2 {
    width: 100%;
    text-align: center;
    color: #27a;
  }
  & button {
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    margin: 10px auto;
    background: #5fc;
    border: 2px solid #498;
    font-weight: bold;
    cursor: pointer;
  }
`;
