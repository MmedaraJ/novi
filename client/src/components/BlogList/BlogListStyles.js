import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const MainDiv = styled.div`
    padding: 1rem;
    border-right: 1px solid black;

    @media screen and (max-width: 768px) {
        border: none;
    }
`;

export const BlogDiv = styled.div`
    cursor: pointer;
    padding: .4rem;
    font-weight: ${props => (props.bold ? "bold" : "normal")};
    background-color: ${props => (props.bold ? `${COLORS.LIGHT_ORANGE}` : `${COLORS.BACK}`)};
    justify-content: left;

    &:hover{
        background-color: ${COLORS.LIGHT_ORANGE};
    }
    &:active{
        background-color: ${COLORS.LIGHT_ORANGE};
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const P = styled.p`
    font-size: small;
    color: black;
    text-align: left;
`;

export const Hamburger = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
    width: 20px;
    margin-right: 5px;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  position: absolute;
  left: 50;
  z-index: 1;
  background-color: ${COLORS.BACK};
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const MenuItem = styled.div`
    cursor: pointer;
    padding: 1rem;
    font-weight: ${props => (props.bold ? "bold" : "normal")};
    justify-content: left;
    
    @media screen and (min-width: 769px) {
        display: none;
    }

    &:hover{
        background-color: ${COLORS.LIGHT_ORANGE};
    }
    &:active{
        background-color: ${COLORS.LIGHT_ORANGE};
    }
`;

export const PP = styled.h4`
  text-align: center;
  color: gray;

  &:hover{
    color: black;
  }

  &:active{
    color: black;
  }
`;