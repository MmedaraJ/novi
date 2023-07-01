import styled from "styled-components";
import { COLORS } from "../../../constants/colors";

export const MainDiv = styled.div`
    background-color: ${COLORS.BACK};

    @media screen and (max-width: 768px) {
        display: block;
    }
`;

export const Footer = styled.div`
    background-color: ${COLORS.BACK};
    height: 60px;
    justify-content: center;
    align-items: center;
`;

export const P = styled.p`
    font-size: small;
    color: black;
`;

export const UP = styled.p`
  font-size: small;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;