import styled from "styled-components";

export const H1 = styled.h1`
    color: red;
`;

export const MainDiv = styled.div`
    display: flex;
    border-bottom: 1px solid gray;
    padding-left: 1%;
    padding-right: 1%;
    justify-content: center;
    align-items: center;
    height: 70px;
`;

export const LogoDiv = styled.div`
    flex: 1;
    height: max;
`;

export const ItemsDiv = styled.div`
    flex: 5;
    display: flex;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
    height: 100%;
    align-items: center;
`;

export const EmployerDiv = styled.div`
    flex: 1;
    border-left: 1px solid gray;
    height: max;
`;

export const VolunteerDiv = styled.div`
    order: 0;
    height: max;

    &:hover{
        border-bottom: red 2px solid;
        padding: 1%;
    }

    &:active{
        border-bottom: red 2px solid;
        padding: 1%;
    }
`;

export const SignInDiv = styled.div`
    order: 1;
    height: max;

    &:hover{
        border-bottom: red 2px solid;
        padding: 1%;
    }

    &:active{
        border-bottom: red 2px solid;
        padding: 1%;
    }
`;

export const P = styled.p`
  text-align: center;
`;