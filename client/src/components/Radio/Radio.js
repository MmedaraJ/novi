import React from 'react';
import styled from 'styled-components';

const RadioButton = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  &:hover input ~ span {
    background-color: #ccc;
  }
  input:checked ~ span {
    background-color: #2196F3;
  }
  span:after {
    content: "";
    position: absolute;
    display: none;
  }
  input:checked ~ span:after {
    display: block;
  }
`;

const Mark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  &:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ span:after {
    display: block;
  }
`;

const RadioButtonComponent = ({name, value, onChange, children}) => (
  <RadioButton>
    <RadioInput type="radio" name={name} value={value} onChange={onChange} />
    <Mark />
    {children}
  </RadioButton>
);

export default RadioButtonComponent;
