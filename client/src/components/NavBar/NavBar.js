import React, { useEffect, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useHistory,
  useNavigate,
  useLocation
} from "react-router-dom";
import { 
    DropdownButton,
    DropdownContainer,
    DropdownContent,
    DropdownItem,
    EmployerDiv, H1, Hamburger, ItemsDiv, LogoDiv, MainDiv, Menu, MenuItem, 
    P, SignInDiv, VolunteerDiv
} from './NavBarStyles';
import { FaBars, FaUser } from 'react-icons/fa';

const NavBar = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    let loggedOut = false;

    useEffect(() => {
        if (localStorage.getItem('userId')) {
          setIsLoggedIn(true);
        }
    }, [loggedOut]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    const logUserOut = () => {
        localStorage.getItem('googleId')? googleLogOut(): regularLogOut();
    }

    const googleLogOut = () => {
        googleLogout();
        localStorage.removeItem('userId');
        localStorage.removeItem('usertoken');
        localStorage.removeItem('googleId');
        loggedOut = true;
        navigate('/signin');
    };

    const regularLogOut = () => {
        axios.post(
            'http://localhost:8000/api/user/logout',
            {withCredentials: true}
        ).then(res => {
            console.log('logout done');
            console.log(res);
            localStorage.removeItem('userId');
            localStorage.removeItem('usertoken');
            localStorage.removeItem('googleId');
            loggedOut = true;
            navigate('/signin');
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <MainDiv style={{backgroundColor: "#FFFFFF"}}>
        <LogoDiv onClick={props.navToHome}>
            <H1>LOGO</H1>
        </LogoDiv>
        <ItemsDiv>
            <VolunteerDiv onClick={props.navToHome}><P>Find Volunteer Work</P></VolunteerDiv>
            {
                !isLoggedIn ?
                    location.pathname=="/signin"?
                    (<SignInDiv onClick={props.navToSignUp}><P>Sign Up</P></SignInDiv>):
                    (<SignInDiv onClick={props.navToSignIn}><P>Sign In</P></SignInDiv>):
                (
                    <DropdownContainer>
                        <div onClick={toggleDropdown}><FaUser/></div>
                        <DropdownContent show={showDropdown}>
                            <DropdownItem><P>Profile</P></DropdownItem>
                            <DropdownItem onClick={logUserOut}><P>Sign Out</P></DropdownItem>
                        </DropdownContent>
                    </DropdownContainer>
                )
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
            <MenuItem><P>Employers / Post Job</P></MenuItem>
            {
                !isLoggedIn?
                location.pathname=="/signin"?
                (<MenuItem onClick={props.navToSignUp}><P>Sign Up</P></MenuItem>):
                (<MenuItem onClick={props.navToSignIn}><P>Sign In</P></MenuItem>):
                (<MenuItem onClick={props.navToSignIn}><P>Profile</P></MenuItem>)
            }
            {isLoggedIn && <MenuItem onClick={logUserOut}><P>Sign Out</P></MenuItem>}
        </Menu>
    </MainDiv>
  )
}

export default NavBar;
