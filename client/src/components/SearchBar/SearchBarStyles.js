import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const MainDiv = styled.div`
    position: relative;
    display: flex;
    margin-left: 10rem;
    margin-right: 10rem;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    margin-top: 1.5rem;
    background-color: ${COLORS.BACK};

    @media screen and (max-width: 1024px) {
        margin-left: 8rem;
        margin-right: 8rem;
    }

    @media screen and (max-width: 768px) {
        margin-left: 5rem;
        margin-right: 5rem;
        display: block;
        padding-top: .5rem;
        padding-bottom: 0rem;
        height: fit-content;
        justify-content: center;
        margin-top: 0rem;
        margin-bottom: 16px;
    }

    @media screen and (max-width: 560px) {
        margin-left: 4rem;
        margin-right: 4rem;
    }

    @media screen and (max-width: 425px) {
        margin-left: 4rem;
        margin-right: 4rem;
    }

    @media screen and (max-width: 375px) {
        margin-left: 2rem;
        margin-right: 2rem;
    }
`;

export const LabelDiv = styled.div`
    flex: 1.5;
    order: 0;
    justify-content: center;
    align-items: center;
`;

export const P = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const TextInput = styled.input`
    flex: 5;
    //order: 1;
    height: 50%;
    padding: 5px;
    padding 10px 10px;
    color: black;
    background-color: ${COLORS.BACK};
    border: none;
    margin-left: .2rem;
    margin-right: .2rem;

    &:focus {
        outline: none;
        border: none;
    }
`;

export const InputDiv = styled.div`
    flex: 4;
    display: flex;
    width: 100%;
    height: 35px;
    border: 1px solid ${props => props.color};
    border-radius: .5rem;
    padding: 0.25rem;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin: 0px;
        margin-bottom: 20px;
        width: 98.35%;
        display: block;
        height: fit-content;
    }

    @media screen and (max-width: 425px) {
        width: 97%;
    }

    @media screen and (max-width: 375px) {
        width: 96.85%;
    }

    @media screen and (max-width: 320px) {
        width: 96%;
    }
`;

export const TitleInputDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin-left: 2rem;
        margin-right: 2rem;
    }
`;

export const LocationInputDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        border: none;
        border-top: ${props => props.color} solid 1px;
        margin-left: 2rem;
        margin-right: 2rem;
    }
`;

export const SearchButtonDiv = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    margin-left: 1rem;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        display: block;
        margin-left: 0px;
        height: 35px;
    }
`;

export const MiniSearchDiv = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: flex;
        position: absolute;
        background-color: ${COLORS.ORANGE}; 
        border-radius: .5rem;
        margin-top: 0px;
        right: 0.3rem;
        top: 47px;
        transform: translateY(-50%);
        padding: 4.8px;
    }
`;

export const FilterDiv = styled.div`
    padding-bottom: 1.25rem;
    border-bottom: 1px solid black;
    padding-left: 10%;
    padding-right: 10%;
    margin-top: 1.25rem;
    overflow-x: auto;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
        margin-top: 1rem;
    }
`;

export const BFilterDiv = styled.div`
    padding-bottom: 1.25rem;
    border-bottom: 1px solid black;
    padding-left: 10%;
    padding-right: 10%;
    margin-top: 1.25rem;
    overflow-x: auto;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const IconDiv = styled.div`
    padding: .25rem;
    flex: 1;
`;

export const LocationIconDiv = styled.div`
    padding: .25rem;
    flex: 1;
    border-left: ${props => props.color} solid 1px;

    @media screen and (max-width: 768px) {
        border-left: none;
    }
`;