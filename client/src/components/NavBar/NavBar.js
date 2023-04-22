import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { 
    EmployerDiv, H1, Hamburger, ItemsDiv, LogoDiv, MainDiv, Menu, MenuItem, 
    P, SignInDiv, VolunteerDiv
} from './NavBarStyles';
import { FaBars } from 'react-icons/fa';

const NavBar = (props) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

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
        <Hamburger onClick={toggleMenu}>
            <FaBars/>
        </Hamburger>
        <Menu style={{ display: showMenu ? 'flex' : 'none' }}>
            <MenuItem>Find Volunteer Work</MenuItem>
            <MenuItem>Sign In</MenuItem>
            <MenuItem>Employers / Post Job</MenuItem>
        </Menu>
    </MainDiv>
  )
}

export default NavBar;
