import styled from "styled-components";
//container
export const Container = styled.div`
  position: relative;
  width: 95%;
  top: 10px;
  margin: auto;
  @media screen and (min-width: 700px) {
    width: 80%;
  }
  @media screen and (min-width: 900px) {
    width: 70%;
  }
  @media screen and (min-width: 1200px) {
    width: 50%;
  }
`;

//container table

export const ContainerTable = styled.div`
  position: relative;
  display: flex;
  width: 95%;
  border-left: 5px solid #7ff;
  box-shadow: 5px 5px 9px #000;
  border-radius: 10px;
  background: #000;
  padding: 20px 0;
  margin: 10px auto;
  & form {
    position: relative;
    border-bottom: 2px solid #515151;
    border-top: 2px solid #515151;
    border-radius: 10px;
    width: 90%;
    height: 90%;
    margin: auto;
    display: flex;
  }
`;
export const FormGroup = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  & label {
    width: 100%;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 10px;
  }
  & div {
    width: 100%;
    display: flex;
  }
  & div input {
    border-radius: 10px;
    border: none;
    margin: 0 auto;
    border: 3px solid #515151;
    outline: none;
    padding: 10px 5px;
  }
  & button {
    margin: 0 5px;
    border: 3px solid #515151;
    border-radius: 10px;
    outline: none;
    background: #333;
    box-shadow: 2px 2px 7px 2px #999 inset;
    color: #fdf;
    font-weight: bold;
    padding: 5px;
    cursor: pointer;
    margin: 5px 10px;
  }
`;

export const Button = styled.button`
  background: #414141;
  color: #fff;
  border: 3px solid #000;
  border-radius: 15px;
  padding: 15px 10px;
  font-weight: bold;
  cursor: pointer;
  margin: auto;
  display: flex;
`;
export const ContainerButtons = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: around;
`;
