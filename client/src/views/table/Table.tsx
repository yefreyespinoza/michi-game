import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  name: string;
  to: string;
  oponents: [string, string];
  game_link: string;
}
const Table = (props: Props) => {
  return (
    <Container>
      <h2>{props.name}</h2>
      <div>
        <span>{props.oponents[0]}</span>
        <b>vs</b>
        {props.oponents[1] ? (
          <span>{props.oponents[1]}</span>
        ) : (
          <span>Esperando oponente.... </span>
        )}
      </div>
      {props.oponents[1] ? (
        <Link to={props.to}>start game</Link>
      ) : (
        <span>{props.game_link}</span>
      )}
    </Container>
  );
};

export default Table;

const Container = styled.div`
  position: relative;
  background: #515151;
  box-shadow: 1px 0px 10px 5px #333 inset;
  border: 2px solid #000;
  width: 95%;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
  @media screen and (min-width: 700px) {
    width: 80%;
  }
  @media screen and (min-width: 900px) {
    width: 70%;
  }
  @media screen and (min-width: 1200px) {
    width: 50%;
  }
  & h2 {
    text-align: center;
    color: #7ff;
  }
  & div {
    display: flex;
    padding: 10px;
    justify-content: center;
    & > span {
      margin: auto;
      padding: 5px 10px;
      color: #fff;
      background: #444;
      border-radius: 5px;
    }
    & > b {
      color: #fff;
    }
  }

  & a {
    border: 1px solid #7ff;
    text-decoration: none;
    background: #5ac;
    color: #fff;
    font-weight: bold;
    padding: 5px;
    border-radius: 5px;
    display: block;
    margin: 10px auto;
    width: fit-content;
  }
  & > span {
    text-decoration: none;
    background: #444;
    color: #fff;
    font-weight: bold;
    padding: 5px;
    border-radius: 5px;
    margin: 10px auto;
    display: block;
    width: fit-content;
    user-select: text;
    max-width: 95%;
    overflow-wrap: break-word;
  }
`;
