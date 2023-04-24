import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { FilterDiv, IconDiv, InputDiv, LabelDiv, MainDiv, P, SearchButtonDiv, TextInput } from './SearchBarStyles';
import MyButton from '../Buttons/MyButton';
import Filter from '../Filter/Filter';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';

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
                    <LabelDiv><P>What</P></LabelDiv>
                    <TextInput
                        name='jobType'
                        type='text'
                        placeholder='Job title, keywords, or company'
                        beforeText="What"
                        afterIcon="🔍"
                        value={state.jobType}
                        onChange={onInputChanged}
                    />
                    <IconDiv><FaSearch/></IconDiv>
                </InputDiv>
                <InputDiv>
                    <LabelDiv><P>Where</P></LabelDiv>
                    <TextInput
                        name='jobLocation'
                        type='text'
                        placeholder='City, province, or "remote"'
                        beforeText="Where"
                        afterIcon="🔍"
                        value={state.jobLocation}
                        onChange={onInputChanged}
                    />
                    <IconDiv><FaLocationArrow/></IconDiv>
                </InputDiv>
                <SearchButtonDiv>
                    <MyButton
                        backgroundColor="#AA4A44"
                        color="#FFFFFF"
                        text="Find Work"
                        width="100%"
                        height="100%"
                        type="submit"
                    />
                </SearchButtonDiv>
            </MainDiv>
            <FilterDiv>
                <Filter
                    title="Date Posted"
                />
                <Filter
                    title="Remote"
                />
                <Filter
                    title="Date Posted"
                />
                <Filter
                    title="Remote"
                />
                <Filter
                    title="Date Posted"
                />
                <Filter
                    title="Remote"
                />
                <Filter
                    title="Date Posted"
                />
                <Filter
                    title="Remote"
                />
                <Filter
                    title="Date Posted"
                />
                <Filter
                    title="Remote"
                />
            </FilterDiv>
        </form>
    </div>
  )
}

export default SearchBar;
