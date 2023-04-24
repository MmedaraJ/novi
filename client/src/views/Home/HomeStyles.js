import styled from "styled-components";

export const H1 = styled.h1`
    color: red;
`;

export const RandDiv = styled.div`
    width: 100%;
`;

export const ScrollToTopButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

export const ApplyButton = styled.button`
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: #000000;
    color: #FFFFFF;
    padding: 5px;
    border: none;
    border-radius: .5rem;
`;
