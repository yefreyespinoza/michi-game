import { ReactNode } from "react";
import styled from "styled-components";

const SearchContainer = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};
export default SearchContainer;

const Container = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 10px;
  @media screen and (min-width: 600px) {
    width: 80%;
  }
  @media screen and (min-width: 900px) {
    width: 70%;
  }
  @media screen and (min-width: 1200px) {
    width: 50%;
  }
`;
