import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { AButton } from './MyButtonStyles';

const Filter = (props) => {
  return (
    <AButton
      type={props.type}
      onClick={props.onClick}
      backgroundColor={props.backgroundColor}
      color={props.color}
      width={props.width}
      height={props.height}
    >
      {props.text}
    </AButton>
  )
}

export default Filter;
