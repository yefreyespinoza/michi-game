import React from "react";
import styled from "styled-components";
const RightBar = ({
  isOpen,
  logout,
  navBarRightRef,
}: {
  isOpen: boolean;
  navBarRightRef: any;
  logout: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <Container ref={navBarRightRef} className={isOpen ? "active" : ""}>
      <Bar>
        <span onClick={logout}>logout</span>
      </Bar>
    </Container>
  );
};

export default RightBar;

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: #000;
  width: 0;
  height: calc(100vh - 50px);
  overflow: hidden;
  transition: all 0.5s ease;
  &.active {
    overflow: hidden;
    width: 30%;
  }
`;
const Bar = styled.ul`
  border-top: 1px solid #333;
  padding-right: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  & span {
    color: #8ff;
    margin: 5px;
    word-wrap: no-wrap;
    cursor: pointer;
  }
`;
