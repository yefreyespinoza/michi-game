import styled from "styled-components";
interface IProps {
  bgColor: string;
}
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
`;
export const UserStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props: IProps) => props.bgColor};
  border-radius: 10px;
  border: 1px solid #e3e3e3;
  justify-content: center;
  padding: 10px;
  margin: 10px;
`;
export const PlayersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: auto;
  padding: 10px;
`;

export const TableName = styled.span`
  padding: 10px;
  font-weight: bold;
`;

export const TurnContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;
