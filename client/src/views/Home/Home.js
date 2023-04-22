import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { 
  H1
} from './HomeStyles';
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = (props) => {
  return (
    <div>
      <NavBar></NavBar>
      <SearchBar></SearchBar>
    </div>
  )
}

export default Home;
