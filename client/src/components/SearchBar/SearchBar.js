import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { InputDiv, MainDiv, SearchButtonDiv, TextInput } from './SearchBarStyles';
import MyButton from '../Buttons/MyButton';

const SearchBar = (props) => {
    const [state, setState] = useState({
        jobType: "",
        jobLocation: ""
    });

    const onInputChanged = (e) => {
        let jobType = state.jobType;
        let jobLocation = state.jobLocation;

        const name = e.target.name;
        const value = e.target.value;

        switch(name){
            case "jobType":
                jobType = value;
                break;
            case "jobLocation":
                jobLocation = value;
                break;
            default:
        }

        setState({
            jobType: jobType,
            jobLocation: jobLocation,
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

  return (
    <div>
        <form onSubmit={onSubmitHandler}>
            <MainDiv>
                <InputDiv>
                    <TextInput
                        name='jobType'
                        type='text'
                        placeholder='Job title, keywords, or company'
                        beforeText="What"
                        afterIcon="🔍"
                        value={state.jobType}
                        onChange={onInputChanged}
                    />
                </InputDiv>
                <InputDiv>
                    <TextInput
                        name='jobLocation'
                        type='text'
                        placeholder='City, province, or "remote"'
                        beforeText="Where"
                        afterIcon="🔍"
                        value={state.jobLocation}
                        onChange={onInputChanged}
                    />
                </InputDiv>
                <SearchButtonDiv>
                    <MyButton
                        backgroundColor="#AA4A44"
                        color="#FFFFFF"
                        text="Find Volunteer Work"
                        width="200px"
                        height="62px"
                        type="submit"
                    />
                </SearchButtonDiv>
            </MainDiv>
        </form>
    </div>
  )
}

export default SearchBar;
