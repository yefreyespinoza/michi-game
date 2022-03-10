import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import {} from "@material-ui/icons";

function Loading() {
  return (
    <Container>
      <CircularProgress color="secondary" />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  display: flex;
  background: #0004;
  width: 100%;
  height: 100%;
  & > * {
    color: #000;
    margin: auto;
  }
`;

export default Loading;
