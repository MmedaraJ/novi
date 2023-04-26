import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate,
  useLocation
} from "react-router-dom";
import { 
    EmployerDiv, H1, Hamburger, ItemsDiv, LogoDiv, MainDiv, Menu, MenuItem, 
    P, SignInDiv, VolunteerDiv
} from './NavBarStyles';
import { FaBars } from 'react-icons/fa';

const NavBar = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('userId');
        if (storedLoginStatus === 'true') {
          setIsLoggedIn(true);
        }
    }, []);

  return (
    <MainDiv style={{backgroundColor: "#FFFFFF"}}>
        <LogoDiv onClick={props.navToHome}>
            <H1>LOGO</H1>
        </LogoDiv>
        <ItemsDiv>
            <VolunteerDiv onClick={props.navToHome}><P>Find Volunteer Work</P></VolunteerDiv>
            {
                !isLoggedIn &&
                location.pathname=="/signin"?
                (<SignInDiv onClick={props.navToSignUp}><P>Sign Up</P></SignInDiv>):
                (<SignInDiv onClick={props.navToSignIn}><P>Sign In</P></SignInDiv>)
            }
        </ItemsDiv>
        <EmployerDiv>
            <P>Employers / Post Job</P>
        </EmployerDiv>
        <Hamburger onClick={toggleMenu}>
            <FaBars/>
        </Hamburger>
        <Menu style={{ display: showMenu ? 'flex' : 'none' }}>
            <MenuItem onClick={props.navToHome}><P>Find Volunteer Work</P></MenuItem>
            {
                !isLoggedIn &&
                location.pathname=="/signin"?
                (<MenuItem onClick={props.navToSignUp}><P>Sign Up</P></MenuItem>):
                (<MenuItem onClick={props.navToSignIn}><P>Sign In</P></MenuItem>)
            }
            <MenuItem><P>Employers / Post Job</P></MenuItem>
            <MenuItem><P>Sign Out</P></MenuItem>
        </Menu>
    </MainDiv>
  )
}

export default NavBar;
