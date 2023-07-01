import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const MainDiv = styled.div`
    background-color: ${COLORS.BACK};
    padding: 2%;

    @media screen and (max-width: 768px) {
        display: block;
    }
`;

export const Title = styled.div`
    justify-content: center;
    align-items: center;
`;

export const PrivacyPolicyDiv = styled.div`
    text-align: left;
`;

export const P = styled.p`
    font-size: small;
    color: black;
`;

export const A = styled.a`
    font-size: small;
    color: black;
    cursor: pointer;
`;

export const BP = styled.p`
    font-size: medium;
    color: black;
    font-weight: bold;
`;

export const UP = styled.p`
  font-size: small;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;