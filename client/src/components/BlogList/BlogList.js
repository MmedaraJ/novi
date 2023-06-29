import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Outlet, 
    useRoutes,
    useNavigate
} from "react-router-dom";
import { BlogDiv, Hamburger, MainDiv, Menu, MenuItem, P, PP } from './BlogListStyles';
import { FaBars, FaList } from 'react-icons/fa';
import { useEffect } from 'react';
import { useRef } from 'react';

const BlogList = (props) => {
    const navigate = useNavigate();
    const menuRef = useRef(null);  
    const [boldItems, setBoldItems] = useState([0]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideForMenu);
        return () => {
          document.removeEventListener('mousedown', handleClickOutsideForMenu);
        };
    }, []);

    const handleClickOutsideForMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
    };

    const navToBlog = (i) => {
        navigate(`/blog/${i}`);
    }

    const handleClick = (item) => {
        setBoldItems([item]);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        console.log(showMenu);
    };
  
    return (
        <MainDiv>
            <Hamburger onClick={toggleMenu}>
                <FaList/>
            </Hamburger>
            <Menu style={{ display: showMenu ? 'flex' : 'none' }} ref={menuRef}>
                {
                    props.blogs.length > 0 &&
                    props.blogs.map((blog, i) => {
                        return(
                            <MenuItem 
                                key={i}
                                bold={boldItems.includes(i)}
                                onClick={() => {
                                    handleClick(i);
                                    navToBlog(i);
                                }}
                            >
                                <P>{blog}</P>
                            </MenuItem>
                        );
                    })
                }
            </Menu>
            {
                props.blogs.length > 0 &&
                props.blogs.map((blog, i) => {
                    return(
                        <BlogDiv 
                            key={i}
                            bold={boldItems.includes(i)}
                            onClick={() => {
                                handleClick(i);
                                navToBlog(i);
                            }}
                        >
                            <P>{blog}</P>
                        </BlogDiv>
                    );
                })
            }
        </MainDiv>
    )
}
  
export default BlogList;