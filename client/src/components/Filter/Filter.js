import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { FaCaretDown } from 'react-icons/fa';
import { MainSelect, Option } from './FilterStyles';

const Filter = (props) => {
  return (
    <MainSelect>
      <Option value="">{props.title}</Option>
      <Option value="option1">Option 1</Option>
      <Option value="option2">Option 2</Option>
      <Option value="option3">Option 3</Option>
    </MainSelect>
  )
}

export default Filter;
