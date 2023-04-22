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

export const TextInput = styled.input`
    border: 1px solid red;
    margin-right: 10px;
    height: 50%;
    width: 100%;
    border-radius: .5rem;
    padding: 5px;
    padding 10px 10px;
    color: black;
`;

export const InputDiv = styled.div`
    flex: 4;
    width: max;
    height: 45px;
    margin-right: 1.8rem;

    @media screen and (max-width: 768px) {
        display: block;
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