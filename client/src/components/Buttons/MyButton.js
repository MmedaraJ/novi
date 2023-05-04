import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { AButton } from './MyButtonStyles';

const MyButton = (props) => {
  return (
    <AButton
      type={props.type}
      onClick={props.onClick}
      backgroundColor={props.backgroundColor}
      color={props.color}
      width={props.width}
      height={props.height}
      disabled={props.disabled}
    >
      {props.icon && (<span style={{marginRight:'8px'}}>{props.icon}</span>)}
      <span>{props.text}</span>
    </AButton>
  )
}

export default MyButton;
