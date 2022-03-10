import styled from "styled-components";
const { div, button } = styled;
export const HeaderContainer = div`
    display: block;
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #000;
    width: 100%;
    height: 50px;`;
export const HeaderDiv = div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;`;
export const LogOut = button`
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    cursor: pointer;
    color: #fff;
    background: #808;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: auto 10px;

&  * {
    font-size: 40px;
    color: #fff;
}

  ;`;
