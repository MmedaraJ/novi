import React, { useEffect, useState, useRef } from 'react';
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
    const dropdownRef = useRef(null); 
    const menuRef = useRef(null);  

    useEffect(() => {
        if (localStorage.getItem('userId')) {
          setIsLoggedIn(true);
        }
    }, [loggedOut]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideForDropdown);
        return () => {
          document.removeEventListener('mousedown', handleClickOutsideForDropdown);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideForMenu);
        return () => {
          document.removeEventListener('mousedown', handleClickOutsideForMenu);
        };
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    const handleClickOutsideForDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
    };

    const handleClickOutsideForMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
    };

    const logUserOut = () => {
        localStorage.getItem('googleId')? googleLogOut(): regularLogOut();
    }

    const googleLogOut = () => {
        googleLogout();
        localStorage.removeItem('userId');
        localStorage.removeItem('usertoken');
        localStorage.removeItem('googleId');
        localStorage.removeItem('phoneNumber');
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
            localStorage.removeItem('phoneNumber');
            loggedOut = true;
            navigate('/signin');
        }).catch(err => {
            console.log(err);
        })
    }

    const navToProfile = () => {
        navigate('/profile');
    }

    const navToSignIn = () => {
        navigate('/signin');
    }

    const navToSignUp = () => {
        navigate('/signup');
    }

    const navToHome = () => {
        navigate('/');
    }

  return (
    <MainDiv style={{backgroundColor: "#FFFFFF"}}>
        <LogoDiv onClick={navToHome}>
            <H1>LOGO</H1>
        </LogoDiv>
        <ItemsDiv>
            <VolunteerDiv onClick={navToHome}><P>Find Volunteer Work</P></VolunteerDiv>
            {
                !isLoggedIn ?
                    location.pathname=="/signin"?
                    (<SignInDiv onClick={navToSignUp}><P>Sign Up</P></SignInDiv>):
                    (<SignInDiv onClick={navToSignIn}><P>Sign In</P></SignInDiv>):
                (
                    <DropdownContainer ref={dropdownRef}>
                        <div onClick={toggleDropdown}><FaUser/></div>
                        <DropdownContent show={showDropdown}>
                            <DropdownItem onClick={navToProfile}><P>Profile</P></DropdownItem>
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
        <Menu style={{ display: showMenu ? 'flex' : 'none' }} ref={menuRef}>
            <MenuItem onClick={navToHome}><P>Find Volunteer Work</P></MenuItem>
            <MenuItem><P>Employers / Post Job</P></MenuItem>
            {
                !isLoggedIn?
                location.pathname=="/signin"?
                (<MenuItem onClick={navToSignUp}><P>Sign Up</P></MenuItem>):
                (<MenuItem onClick={navToSignIn}><P>Sign In</P></MenuItem>):
                (<MenuItem onClick={navToProfile}><P>Profile</P></MenuItem>)
            }
            {isLoggedIn && <MenuItem onClick={logUserOut}><P>Sign Out</P></MenuItem>}
        </Menu>
    </MainDiv>
  )
}

export default NavBar;
