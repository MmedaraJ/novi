import styled from "styled-components";

export const MainDiv = styled.div`
    display: flex;
    border-bottom: 1px solid gray;
    padding-left: 10%;
    padding-right: 10%;
    justify-content: space-between;
    align-items: center;
    height: 180px;

    @media screen and (max-width: 768px) {
        display: block;
        padding-top: 50px;
        padding-bottom: 50px;
        height: fit-content;
    }
`;

export const TextInput = styled.input`
    border: 1px solid red;
    margin-right: 10px;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    padding: 5px;
    padding 3px 3px;

    &::before {
        content: ${props => props.beforeText};
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }

    &::after {
        content: ${props => props.afterIcon};
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
`;

export const InputDiv = styled.div`
    flex: 4;
    width: 100%;
    margin-right: 50px;

    @media screen and (max-width: 768px) {
        display: block;
        margin-bottom: 20px;
    }
`;

export const SearchButtonDiv = styled.div`
    flex: 1;
    width: 100%;
`;