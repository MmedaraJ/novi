import styled from "styled-components";

export const MainDiv = styled.div`
    background-color: #FFFFFF;
    height: max;
    width: max;
    padding: 2%;
    padding-left: 16%;
    padding-right: 16%;
    justify-content: center;
    align-items: center;
`;

export const FirstNameDiv = styled.div`
    flex: 1;
    order: 0;
    margin-right: 30px;
    height: 60px;

    @media screen and (max-width: 768px) {
        display: block;
        margin-right: 0px;
    }
`;

export const LastNameDiv = styled.div`
    flex: 1;
    order: 1;
    height: 60px;

    @media screen and (max-width: 768px) {
        display: block;
        margin-top: 16px;
    }

    @media screen and (max-width: 425px) {
        margin-top: 12px;
    }
`;

export const NamesDiv = styled.div`
    display: flex;
    margin-bottom: 16px;

    @media screen and (max-width: 768px) {
        display: block;
        margin-top: 12px;
        margin-bottom: 12px;
    }
`;

export const RandTextDiv = styled.div`
    justify-content: start;
    align-items: start;
    display: flex;

    @media screen and (max-width: 768px) {
        justify-content: center;
        align-items: center;
        padding: 0px;
    }
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
    padding 10px 10px;
    color: black;
    border: none;
    flex: 1;
    width: 100%;

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
    justify-content: center;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;
