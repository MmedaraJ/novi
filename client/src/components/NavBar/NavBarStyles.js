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

    @media screen and (max-width: 768px) {
      display: none;
    }
`;

export const EmployerDiv = styled.div`
    flex: 1;
    border-left: 1px solid gray;
    height: max;

    @media screen and (max-width: 768px) {
      display: none;
    }
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

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 70px;
    right: 0;
    z-index: 1;
    background-color: white;
    width: 200px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    transform: ${({ showMenu }) => (showMenu ? 'translateX(0)' : `translateX(100%)`)};
    right: ${({ showMenu }) => (showMenu ? '0' : '220px')};

    @media screen and (min-width: 768px) {
        display: ${({ showMenu }) => (showMenu ? 'flex' : 'none')};
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        position: static;
        background-color: transparent;
        box-shadow: none;
        width: auto;
        padding: 0;
        transform: translateX(0);
        right: 0;
    }
`;

export const MenuItem = styled.div`
  margin: 10px;
  cursor: pointer;
  
  @media screen and (min-width: 768px) {
    display: none;
  }
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