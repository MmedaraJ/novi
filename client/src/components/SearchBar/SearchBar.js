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
import { MdPlace } from 'react-icons/md';
import { JobCategoriesMapList } from '../../JobCategoriesData';

const SearchBar = (props) => {
  return (
    <div style={{backgroundColor: "#FFFFFF"}}>
        <form onSubmit={props.onSubmitHandler}>
            <MainDiv>
                <InputDiv>
                    <TitleInputDiv>
                        <IconDiv><FaSearch/></IconDiv>
                        <TextInput
                            name='keyword'
                            type='text'
                            placeholder='Keywords'
                            value={props.state.keyword}
                            onChange={props.onInputChanged}
                        />
                    </TitleInputDiv>
                    <LocationInputDiv>
                        <LocationIconDiv><MdPlace/></LocationIconDiv>
                        <TextInput
                            name='location'
                            type='text'
                            placeholder='Location'
                            value={props.state.location}
                            onChange={props.onInputChanged}
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
            {
                (props.state.keyword || props.state.location)?
                <FilterDiv>
                    <Filter
                        title="Date posted"
                        name="date_posted"
                        onFilterChange={props.handleFilterChange}
                        options={[
                            {
                                value: "hour",
                                text: "Last 1 hour"
                            },
                            {
                                value: "day",
                                text: "Last 24 hours"
                            },
                            {
                                value: "three-days",
                                text: "Last 3 days"
                            },
                            {
                                value: "week",
                                text: "Last 7 days"
                            },
                            {
                                value: "fourteen-days",
                                text: "Last 14 days"
                            },
                            {
                                value: "month",
                                text: "Last 30 days"
                            },
                        ]}
                    />
                    <Filter
                        title="Location type"
                        name="location_type"
                        onFilterChange={props.handleFilterChange}
                        options={[
                            {
                                value: "On Site",
                                text: "On Site"
                            },
                            {
                                value: "Remote",
                                text: "Remote"
                            },
                            {
                                value: "Hybrid",
                                text: "Hybrid"
                            }
                        ]}
                    />
                    <Filter
                        title="Job type"
                        name="job_type"
                        onFilterChange={props.handleFilterChange}
                        options={[
                            {
                                value: "Full-time",
                                text: "Full-time"
                            },
                            {
                                value: "Part-time",
                                text: "Part-time"
                            },
                            {
                                value: "Casual",
                                text: "Casual"
                            },
                            {
                                value: "Contract",
                                text: "Contract"
                            },
                            {
                                value: "Apprenticeship",
                                text: "Apprenticeship"
                            },
                            {
                                value: "Internship",
                                text: "Internship"
                            },
                            {
                                value: "Practicum",
                                text: "Practicum"
                            },
                            {
                                value: "Volunteering",
                                text: "Volunteering"
                            }
                        ]}
                    />
                    <Filter
                        title="Salary estimate"
                        name="salary_estimate"
                        onFilterChange={props.handleFilterChange}
                        options={[
                            {
                                value: "15",
                                text: "$15.00+/hour"
                            },
                            {
                                value: "25",
                                text: "$25.00+/hour"
                            },
                            {
                                value: "35",
                                text: "$35.00+/hour"
                            },
                            {
                                value: "45",
                                text: "$45.00+/hour"
                            },
                            {
                                value: "55",
                                text: "$55.00+/hour"
                            }
                        ]}
                    />
                    <Filter
                        title="Industry"
                        name="category"
                        onFilterChange={props.handleFilterChange}
                        options={JobCategoriesMapList}
                    />
                    <Filter
                        title="Job Language"
                        name="job_language"
                        onFilterChange={props.handleFilterChange}
                        options={[
                            {
                                value: "English",
                                text: "English"
                            },
                            {
                                value: "French",
                                text: "French"
                            },
                            {
                                value: "Chinese",
                                text: "中国人"
                            },
                            {
                                value: "Spanish",
                                text: "español"
                            }
                        ]}
                    />
                </FilterDiv>:
                <FilterDiv>
                    <P>Find your next job</P>
                </FilterDiv>
            }
        </form>
    </div>
  )
}

export default SearchBar;
