import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { 
    FilterDiv, IconDiv, InputDiv, MainDiv, P, 
    SearchButtonDiv, TextInput, LocationIconDiv,
    TitleInputDiv, LocationInputDiv 
} from './SearchBarStyles';
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
                    <TitleInputDiv>
                        <IconDiv><FaSearch/></IconDiv>
                        <TextInput
                            name='jobType'
                            type='text'
                            placeholder='Keywords'
                            value={state.jobType}
                            onChange={onInputChanged}
                        />
                    </TitleInputDiv>
                    <LocationInputDiv>
                        <LocationIconDiv><FaLocationArrow/></LocationIconDiv>
                        <TextInput
                            name='jobLocation'
                            type='text'
                            placeholder='Location'
                            value={state.jobLocation}
                            onChange={onInputChanged}
                        />
                    </LocationInputDiv>
                </InputDiv>
                <SearchButtonDiv>
                    <MyButton
                        backgroundColor="#000000"
                        color="#FFFFFF"
                        text="Search"
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
