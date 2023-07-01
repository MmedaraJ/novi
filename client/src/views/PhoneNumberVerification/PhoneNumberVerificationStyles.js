import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const MainDiv = styled.div`
    background-color: ${COLORS.BACK};
    height: max;
    width: max;
    padding: 2%;
    padding-left: 40%;
    padding-right: 40%;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1090px) {
        padding-left: 38%;
        padding-right: 38%;
    }

    @media screen and (max-width: 910px) {
        padding-left: 35%;
        padding-right: 35%;
    }

    @media screen and (max-width: 730px) {
        padding-left: 32%;
        padding-right: 32%;
    }

    @media screen and (max-width: 610px) {
        padding-left: 30%;
        padding-right: 30%;
    }

    @media screen and (max-width: 550px) {
        padding-left: 27%;
        padding-right: 27%;
    }

    @media screen and (max-width: 473px) {
        padding-left: 25%;
        padding-right: 25%;
    }

    @media screen and (max-width: 435px) {
        padding-left: 22%;
        padding-right: 22%;
    }

    @media screen and (max-width: 390px) {
        padding-left: 18%;
        padding-right: 18%;
    }

    @media screen and (max-width: 350px) {
        padding-left: 15%;
        padding-right: 15%;
    }

    @media screen and (max-width: 319px) {
        padding-left: 10%;
        padding-right: 10%;
    }
`;

export const Footer = styled.div`
    background-color: ${COLORS.BACK};
    height: 60px;
    justify-content: center;
    align-items: center;
`;

export const FirstNameDiv = styled.div`
    height: 60px;
    display: block;
    margin-right: 0px;
`;

export const LastNameDiv = styled.div`
    height: 60px;
    display: block;
    margin-top: 16px;

    @media screen and (max-width: 425px) {
        margin-top: 12px;
    }
`;

export const NamesDiv = styled.div`
    display: block;
    margin-top: 12px;
    margin-bottom: 12px;
`;

export const RandTextDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;

export const InputDiv = styled.div`
    display: flex;
    order: 1;
    height: 35px;
    border: 1px solid;
    border-color: ${props => props.borderColor};
    border-radius: .5rem;
    padding: 0.25rem;
    align-items: center;
`;

export const TextInput = styled.input`
    padding: 5px;
    color: black;
    border: none;
    flex: 1;
    width: 100%;
    background-color: ${COLORS.BACK};

    &:focus {
        outline: none;
        border: none;
    }
`;

export const LabelDiv = styled.div`
    height: fit-content;
    text-align: start;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 0px;
    height: fit-content;
`;

export const P = styled.p`
  font-size: small;
  color: #000000;
`;

export const UP = styled.p`
  font-size: small;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;

export const Error = styled.p`
    color: red;
    font-size: xx-small;
    text-align: start;
    margin-top: 4px;
    margin-bottom: 0px;
`;

export const Success = styled.p`
    color: green;
    font-size: xx-small;
    text-align: center;
`;

export const ButtonDiv = styled.div`
    display: flex;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: center;
`;

export const SearchButtonDiv = styled.div`
    width: 100%;
    height: 45px;
    align-items: center;
`;
