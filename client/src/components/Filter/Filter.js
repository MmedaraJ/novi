import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { FiX } from 'react-icons/fi';
import { CloseButton, MainSelect, Option, SelectContainer } from './FilterStyles';

const Filter = (props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(props.name);
    console.log(event.target.value);
    props.onFilterChange(props.name, event.target.value);
  }

  const handleClearSelect = () => {
    setSelectedOption("");
    props.onFilterChange(props.name, "");
  }

  return (
    <SelectContainer>
      <MainSelect
        value={selectedOption}
        onChange={handleSelectChange}
        selectedOption={selectedOption}
      >
        {!selectedOption && <Option value="">{props.title}</Option>}
        {
          props.options && props.options.map((option, i) => {
            return (
              props.onSecondTab ?
              <Option key={i} value={option.tag}>{option.label}</Option> :
              <Option key={i} value={option.value}>{option.text}</Option>
            );
          })
        }
      </MainSelect>
      {
        selectedOption && 
        <CloseButton onClick={handleClearSelect}>
          &nbsp;&nbsp; <FiX/>
        </CloseButton>
      }
    </SelectContainer>
  )
}

export default Filter;
