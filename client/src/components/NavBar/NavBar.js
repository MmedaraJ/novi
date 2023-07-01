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
    BlogDiv,
    DropdownButton,
    DropdownContainer,
    DropdownContent,
    DropdownItem,
    EmployerDiv, H1, Hamburger, ItemsDiv, JobsDiv, LeftDiv, LogoDiv, MainDiv, Menu, MenuItem, 
    P, PP, ProfileIconDiv, SignInDiv, VolunteerDiv
} from './NavBarStyles';
import { FaBars, FaUser } from 'react-icons/fa';
import { COLORS } from '../../constants/colors';

const NavBar = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeDiv, setActiveDiv] = useState(null);
    let loggedOut = false;
    const dropdownRef = useRef(null); 
    const menuRef = useRef(null);  
    const [jobColor, setJobColor] = useState('black');
    const [blogColor, setBlogColor] = useState('black');

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

    const handleJobClick = () => {
        setJobColor(`${COLORS.ORANGE}`);
    };

    const handleBlogClick = () => {
        setBlogColor(`${COLORS.ORANGE}`);
    };

    const handleJobBlur = () => {
        setJobColor("black");
    };

    const handleBlogBlur = () => {
        setBlogColor("black");
    };

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

    const navToProfile = (index) => {
        setActiveDiv(prevIndex => index);
        navigate('/profile');
    }

    const navToSignIn = (index) => {
        setActiveDiv(prevIndex => index);
        navigate('/signin');
    }

    const navToSignUp = (index) => {
        setActiveDiv(prevIndex => index);
        navigate('/signup');
    }

    const navToBlog = (index) => {
        setActiveDiv(prevIndex => index);
        navigate('/blog');
    }

    const navToHome = (index) => {
        setActiveDiv(prevIndex => index);
        navigate('/');
    }

  return (
    <MainDiv>
        <LogoDiv onClick={navToHome}>
            <H1>LOGO</H1>
        </LogoDiv>
        <ItemsDiv>
            <VolunteerDiv>
                <JobsDiv 
                    onClick={() => {
                        navToHome(0);
                        handleJobClick();
                    }}
                    tabIndex="0"
                    onBlur={handleJobBlur} 
                    color={jobColor}
                >
                    <P>JOBS</P>
                </JobsDiv>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <BlogDiv 
                    onClick={() => {
                        navToBlog(1);
                        handleBlogClick();
                    }}
                    tabIndex="1"
                    onBlur={handleBlogBlur}
                    color={blogColor}
                >
                    <P>BLOG</P>
                </BlogDiv>
            </VolunteerDiv>
            {
                !isLoggedIn ?
                    location.pathname=="/signin"?
                    (<SignInDiv onClick={navToSignUp}><P>SIGN UP</P></SignInDiv>):
                    (<SignInDiv onClick={navToSignIn}><P>SIGN IN</P></SignInDiv>):
                (
                    <DropdownContainer ref={dropdownRef}>
                        <ProfileIconDiv onClick={toggleDropdown}>
                            <FaUser/>
                        </ProfileIconDiv>
                        <DropdownContent show={showDropdown}>
                            <DropdownItem onClick={navToProfile}><PP>PROFILE</PP></DropdownItem>
                            <DropdownItem onClick={logUserOut}><PP>SIGN OUT</PP></DropdownItem>
                        </DropdownContent>
                    </DropdownContainer>
                )
            }
        </ItemsDiv>
        <EmployerDiv>
            <P>EMPLOYER</P>
        </EmployerDiv>
        <Hamburger onClick={toggleMenu}>
            <FaBars/>
        </Hamburger>
        <Menu style={{ display: showMenu ? 'flex' : 'none' }} ref={menuRef}>
            <MenuItem onClick={navToHome}><PP>JOBS</PP></MenuItem>
            <MenuItem onClick={navToBlog}><PP>BLOG</PP></MenuItem>
            {
                !isLoggedIn?
                location.pathname=="/signin"?
                (<MenuItem onClick={navToSignUp}><PP>SIGN UP</PP></MenuItem>):
                (<MenuItem onClick={navToSignIn}><PP>SIGN IN</PP></MenuItem>):
                (<MenuItem onClick={navToProfile}><PP>PROFILE</PP></MenuItem>)
            }
            <MenuItem><PP>EMPLOYER</PP></MenuItem>
            {isLoggedIn && <MenuItem onClick={logUserOut}><PP>SIGN OUT</PP></MenuItem>}
        </Menu>
    </MainDiv>
  )
}

export default NavBar;
