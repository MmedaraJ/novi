import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { 
    EmployerDiv, H1, ItemsDiv, LogoDiv, MainDiv, P, SignInDiv, VolunteerDiv
} from './NavBarStyles';

const NavBar = (props) => {
  return (
    <MainDiv>
        <LogoDiv>
            <H1>LOGO</H1>
        </LogoDiv>
        <ItemsDiv>
            <VolunteerDiv><P>Find Volunteer Work</P></VolunteerDiv>
            <SignInDiv><P>Sign In</P></SignInDiv>
        </ItemsDiv>
        <EmployerDiv>
            <P>Employers / Post Job</P>
        </EmployerDiv>
    </MainDiv>
  )
}

export default NavBar;
