import styled from "styled-components";

export const H1 = styled.h1`
    color: red;
`;

export const P = styled.p`
  text-align: center;
  font-size: small;
`;

export const ScrollToTopDiv = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 5px;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: .5rem;
    width: 20px;
    cursor: pointer;
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

export const ApplyDiv = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: #000000;
    color: #FFFFFF;
    border: none;
    border-radius: .5rem;
    width: fit-content;
    cursor: pointer;
`;
