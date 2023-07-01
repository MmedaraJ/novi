import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const H1 = styled.h1`
    color: red;
`;

export const Footer = styled.div`
    background-color: ${COLORS.BACK};
    height: 60px;
    justify-content: center;
    align-items: center;
`;

export const P = styled.p`
  text-align: center;
  font-size: x-small;
  margin-top: 12px;
`;

export const UP = styled.p`
  font-size: small;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;

export const SP = styled.p`
  text-align: center;
  font-size: small;
  margin-top: 12px;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const ScrollToTopDiv = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 5px;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border: 1px solid #000000;
    border-radius: .5rem;
    width: 20px;
    cursor: pointer;
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};

    &:hover{
      border: 1px solid ${COLORS.ORANGE};
    }
`;

export const ApplyDiv = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: ${COLORS.LIGHT_ORANGE};
    color: #FFFFFF;
    border: none;
    border-radius: .5rem;
    width: fit-content;
    cursor: pointer;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;

export const TabDiv = styled.div`
    display: flex;
    @media screen and (max-width: 768px) {
      //margin-top: 30px;
    }
`;

export const OurJobsDiv = styled.div`
    flex: 1;
    order: 0;
    cursor: pointer;
    background-color: ${({onFirstTab}) => (onFirstTab ? `${COLORS.ORANGE}` : `${COLORS.LIGHT_ORANGE}`)}; 
    font-weight: ${({onFirstTab}) => (onFirstTab ? "bold" : "normal")}; 
`;

export const TheirJobsDiv = styled.div`
    flex: 1;
    order: 1;
    cursor: pointer;
    background-color: ${({onFirstTab}) => (onFirstTab ? `${COLORS.LIGHT_ORANGE}` : `${COLORS.ORANGE}`)};
    font-weight: ${({onFirstTab}) => (onFirstTab ? "normal" : "bold")}; 
`;
