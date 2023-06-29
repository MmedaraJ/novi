import React, { useEffect, useState } from 'react';
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
    TitleInputDiv, LocationInputDiv, MiniSearchDiv, BFilterDiv 
} from './SearchBarStyles';
import MyButton from '../Buttons/MyButton';
import Filter from '../Filter/Filter';
import { FaSearch, FaRegKeyboard } from 'react-icons/fa';
import { 
    MdPlace, MdKeyboardReturn
 } from 'react-icons/md';
import { JobCategoriesMapList } from '../../JobCategoriesData';
import { COLORS } from '../../constants/colors';
import axios from 'axios';

const SearchBar = (props) => {
    const [color, setColor] = useState('black');
    const [categories, setCategories] = useState([]);
    const adzunaApiKey = process.env.REACT_APP_ADZUNA_API_KEY;
    const adzunaAppId = process.env.REACT_APP_ADZUNA_APP_ID;

    useEffect(() => {
      getThirdPartyCategories();
    }, []);

    const handleFocus = () => {
        setColor(`${COLORS.ORANGE}`);
    }

    const handleBlur = () => {
        setColor('black');
    }

    const getThirdPartyCategories = () => {
        axios.get(
            `https://api.adzuna.com/v1/api/jobs/ca/categories?app_id=${adzunaAppId}&app_key=${adzunaApiKey}`
        ).then(res => {
            console.log(res);
            setCategories(res.data.results);
        }).catch(err => {
            console.log(err);
        });
    }

  return (
    <div style={{backgroundColor: `${COLORS.BACK}`}}>
        <form onSubmit={props.onSubmitHandler}>
            <MainDiv>
                <InputDiv color={color}>
                    <TitleInputDiv>
                        <IconDiv><FaSearch/></IconDiv>
                        <TextInput
                            name='keyword'
                            type='text'
                            placeholder='Keywords'
                            value={props.state.keyword}
                            onChange={props.onInputChanged}
                            tabIndex="0"
                            onClick={handleFocus} 
                            onBlur={handleBlur}        
                        />
                    </TitleInputDiv>
                    <LocationInputDiv color={color}>
                        <LocationIconDiv color={color}><MdPlace/></LocationIconDiv>
                        <TextInput
                            name='location'
                            type='text'
                            placeholder='Location'
                            value={props.state.location}
                            onChange={props.onInputChanged}
                            tabIndex="0"
                            onClick={handleFocus} 
                            onBlur={handleBlur}        
                        />
                        {/* <MiniSearchDiv onClick={props.onSubmitHandler}>
                            <MdKeyboardReturn 
                                color="#FFFFFF"
                                size="16px"
                            />
                        </MiniSearchDiv> */}
                    </LocationInputDiv>
                </InputDiv>
                <SearchButtonDiv>
                    <MyButton
                        backgroundColor={`${COLORS.ORANGE}`}
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
                    {
                        props.onFirstTab &&
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
                    }
                    {
                        props.onFirstTab && 
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
                    }
                    {
                        props.onFirstTab ?
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
                        /> : 
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
                                    value: "Contract",
                                    text: "Contract"
                                },
                            ]}
                        />
                    }
                    {
                        props.onFirstTab && 
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
                    }
                    {
                        props.onFirstTab ?
                        <Filter
                            title="Industry"
                            name="industry"
                            onFilterChange={props.handleFilterChange}
                            options={JobCategoriesMapList}
                        /> :
                        <Filter
                            title="Category"
                            name="category"
                            onFilterChange={props.handleFilterChange}
                            options={categories}
                            onSecondTab={true}
                        />
                    }
                    {
                        props.onFirstTab &&
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
                    }
                </FilterDiv>:
                <BFilterDiv>
                    <P>Find your next job</P>
                </BFilterDiv>
            }
        </form>
    </div>
  )
}

export default SearchBar;
