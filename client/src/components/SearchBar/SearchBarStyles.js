import styled from "styled-components";

export const MainDiv = styled.div`
    display: flex;
    padding-left: 10%;
    padding-right: 10%;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    margin-top: .75rem;

    @media screen and (max-width: 768px) {
        display: block;
        padding-top: .5rem;
        padding-bottom: 1rem;
        height: fit-content;
        justify-content: center;
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
    border: 1px solid black;
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
        border-top: black solid 1px;
        margin-left: 2rem;
        margin-right: 2rem;
    }
`;

export const SearchButtonDiv = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    margin-left: 1rem;

    @media screen and (max-width: 768px) {
        margin: 0px;
        display: block;
        width: 100%;
        height: 40px;
        align-items: center;
        justify-content: center;
    }
`;

export const FilterDiv = styled.div`
    padding-bottom: 1.25rem;
    border-bottom: 1px solid black;
    padding-left: 10%;
    padding-right: 10%;
    margin-top: 1.25rem;
`;

export const IconDiv = styled.div`
    padding: .25rem;
    flex: 1;
`;

export const LocationIconDiv = styled.div`
    padding: .25rem;
    flex: 1;
    border-left: black solid 1px;

    @media screen and (max-width: 768px) {
        border-left: none;
    }
`;