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
    flex: 4;
    order: 1;
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
    margin-right: 1.8rem;
    border: 1px solid red;
    border-radius: .5rem;
    margin-right: 10px;
    padding: 0.25rem;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
        margin-right: 1rem;
    }
`;

export const SearchButtonDiv = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 768px) {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export const FilterDiv = styled.div`
    padding-bottom: 1.25rem;
    border-bottom: 1px solid gray;
    padding-left: 10%;
    padding-right: 10%;
    margin-top: 1.25rem;
`;

export const IconDiv = styled.div`
    padding: .25rem;
    flex: 1;
    order: 2;
`;