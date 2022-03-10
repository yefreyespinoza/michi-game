import styled from "styled-components";

//styles for the game
export interface PropsStyle {
  border?: boolean;
  bgColor?: string;
  xy?: string;
}

//colors container

export const ColorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 10px;
  width: 300px;
  margin: auto;
  margin-top: 5px;
  padding: 3px;
`;
export const ItemDiv = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContainerDiv = styled.div`
  padding: 30px;
  border: 4px solid #000;
  border-radius: 5px;
  width: 360px;
  margin: auto;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Piece = styled.div`
  color: #00f;
  background-color: ${(p: PropsStyle) => p.bgColor};
  width: ${(p: PropsStyle) => p.xy || "80px"};
  height: ${(p: PropsStyle) => p.xy || "80px"};
  cursor: pointer;
  border: ${(props: PropsStyle) =>
    props.border ? "4px solid #7ff" : "1px solid #000"};
  border-radius: 50%;
`;

//div alert

export const DivAlert = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #0005;
  display: flex;
`;
