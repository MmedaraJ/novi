import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useNavigate
} from "react-router-dom";
import { 
    ApplyDiv,
    CloseDiv, CompanyNameDiv, CompanyNameLink, CompanyNameText, 
    DescDiv, IconDiv, ItemsDiv, JDDiv, JDText, JobDescDiv, 
    LocationDiv, MainDiv, SP, TitleDiv, TitleText, Wrapper 
} from './PopUpJobPostStyles';
import { 
    FaTimes,
    FaMoneyBill,
    FaBriefcase,
    FaClock
} from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import { GiHourglass } from 'react-icons/gi';
import { 
    IoIosArrowForward,
    IoMdTime
} from 'react-icons/io';
import { BiBuilding } from 'react-icons/bi';
import MyButton from '../Buttons/MyButton';
import { COLORS } from '../../constants/colors';

const PopUpJobPost = (props) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const [applyText, setApplyText] = useState("Apply");
    const navigate = useNavigate();

    useEffect(() => {
      props.onFirstTab ?
      setApplyText("Apply"):
      setApplyText("Apply on company site")
    }, []);

    const handleClick = (e) => {
        e.stopPropagation();
    }

    const submitApplication = () => {
        if(props.userId){
            if(props.resumeName){
                props.onFirstTab ?
                (
                    axios.post(
                        'http://localhost:8000/api/application/create',
                        {
                            user_id: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
                            job_id: props.job._id
                        },
                        {withCredentials: true}
                    ).then(res => {
                        console.log(res);
                        setApplyText("Submitted");
                    }).catch(err => {
                        console.log(err);
                        setApplyText("Not Submitted");
                    })
                ):
                window.open(props.job.redirect_url, "_blank");
            }else{
                navigate('/profile', {state: { message: "Upload resume"}});
            }
        }else{
            navigate('/signin');
        }
    }

    return(
        <MainDiv onClick={handleClick}>
            <CloseDiv onClick={props.onClick}>
                <FaTimes/>
            </CloseDiv>
            <TitleDiv>
                <TitleText>{props.job.title}</TitleText>
            </TitleDiv>
            <CompanyNameDiv>
                {
                    props.onFirstTab?
                    (
                        props.job.company_url?
                        <CompanyNameLink 
                            href={props.job.company_url}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            {props.job.company_name}
                        </CompanyNameLink>:
                        <CompanyNameText>
                            {props.job.company_name}
                        </CompanyNameText>
                    ):
                    (
                        props.job.redirect_url?
                        <CompanyNameLink 
                            href={props.job.redirect_url}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            {props.job.company.display_name}
                        </CompanyNameLink>:
                        <CompanyNameText>
                            {props.job.company.display_name}
                        </CompanyNameText>
                    )
                }
            </CompanyNameDiv>
            {
                props.onFirstTab?
                (
                    props.job.complete_location &&
                    <ItemsDiv>
                        <SP><MdPlace style={{color: "black"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{props.job.complete_location}</SP>
                    </ItemsDiv>
                ):
                (
                    props.job.location &&
                    <ItemsDiv>
                        <SP><MdPlace style={{color: "black"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{props.job.location.display_name}</SP>
                    </ItemsDiv>
                )
            }
            {
                props.onFirstTab?
                (
                    props.job.show_compensation &&
                    props.job.hourly_compensation?
                    <ItemsDiv>
                        <SP><FaMoneyBill style={{color: "black"}}/> 
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {(props.job.hourly_compensation/100).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                            {
                                props.job.range && 
                                props.job.hourly_compensation < props.job.max_hourly_compensation && 
                                (
                                    " - " +
                                    (props.job.max_hourly_compensation/100).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })
                                )
                            }
                            &nbsp;/hr
                        </SP>
                    </ItemsDiv>:
                    props.job.yearly_compensation &&
                    <ItemsDiv>
                        <SP><FaMoneyBill style={{color: "black"}}/> 
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {(props.job.yearly_compensation/100).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                            {
                                props.job.range && 
                                props.job.yearly_compensation < props.job.max_yearly_compensation && 
                                (
                                    " - " +
                                    (props.job.max_yearly_compensation/100).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })
                                )
                            }
                            &nbsp;/yr
                        </SP>
                    </ItemsDiv>
                ):
                (
                    props.job.salary_min &&
                    (
                        <ItemsDiv>
                            <SP><FaMoneyBill style={{color: "black"}}/> 
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {props.job.salary_min.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                                {
                                    props.job.salary_max && 
                                    props.job.salary_max > props.job.salary_min &&
                                    ( 
                                        " - " +
                                        props.job.salary_max.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })
                                    )
                                }
                                &nbsp;/yr
                            </SP>
                        </ItemsDiv>
                    )
                )
            }
            {
                props.onFirstTab?
                (
                    props.job.types &&
                    <ItemsDiv>
                        <SP><FaBriefcase style={{color: "black"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{
                            props.job.types.map((type, i) => (
                                <span key={i}>
                                    {
                                        i===props.job.types.length-1? 
                                        type:
                                        type + ", "
                                    }
                                </span>
                            ))
                        }</SP>
                    </ItemsDiv>
                ):
                (
                    props.job.contract_time &&
                    <ItemsDiv>
                        <SP><FaBriefcase style={{color: "black"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{
                            props.job.contract_time + (
                                props.job.contract_type &&
                                ", " + props.job.contract_type
                            )
                        }</SP>
                    </ItemsDiv>
                )
            }
            {
                props.onFirstTab &&
                (
                    props.job.location_type &&
                    <ItemsDiv>
                        <SP>
                            <BiBuilding style={{color: "black"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{props.job.location_type}
                        </SP>
                    </ItemsDiv>
                )
            }
            {
                props.onFirstTab &&
                (
                    props.job.urgently_hiring === true?
                    <ItemsDiv>
                        <SP><FaClock/>&nbsp;&nbsp;&nbsp;&nbsp;Urgently hiring</SP>
                    </ItemsDiv>:
                    props.job.start_immediately?
                    <ItemsDiv>
                        <SP><GiHourglass/>&nbsp;&nbsp;&nbsp;&nbsp;Starts immediately</SP>
                    </ItemsDiv>:
                    <ItemsDiv>
                        <SP><IoMdTime/>&nbsp;&nbsp;&nbsp;&nbsp;{new Date(props.job.start_date).toLocaleDateString("en-US", options)}</SP>
                    </ItemsDiv>
                )
            }
            <ApplyDiv onClick={submitApplication}>
                <MyButton
                    backgroundColor={`${COLORS.ORANGE}`}
                    color="#FFFFFF"
                    text={applyText}
                    width="100px"
                    height="40px"
                />
            </ApplyDiv>
            <JobDescDiv>
                <JDDiv>
                    <JDText>Job Description</JDText>
                </JDDiv>
                {
                    props.onFirstTab &&
                    (
                        props.job.intro &&
                        <DescDiv>
                            <SP>
                                {props.job.intro}
                            </SP>
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.responsibilities &&
                        <DescDiv>
                            <JDText>Responsibilities</JDText>
                            {props.job.responsibilities.map((text, i) => (
                                <Wrapper key={i}>
                                    <IconDiv>
                                        <IoIosArrowForward/>
                                    </IconDiv>
                                    <SP>{text}</SP>
                                </Wrapper>
                            ))}
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.qualifications &&
                        <DescDiv>
                            <JDText>Qualifications</JDText>
                            {props.job.qualifications.map((text, i) => (
                                <Wrapper key={i}>
                                    <IconDiv>
                                        <IoIosArrowForward/>
                                    </IconDiv>
                                    <SP>{text}</SP>
                                </Wrapper>
                            ))}
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.extra_description &&
                        <DescDiv>
                            <SP>
                                {props.job.extra_description}
                            </SP>
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.benefits &&
                        <DescDiv>
                            <JDText>Benefits</JDText>
                                {props.job.benefits.map((text, i) => (
                                    <Wrapper key={i}>
                                        <IconDiv>
                                            <IoIosArrowForward/>
                                        </IconDiv>
                                        <SP>{text}</SP>
                                    </Wrapper>
                                ))}
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.schedule &&
                        <DescDiv>
                            <JDText>Schedule</JDText>
                                {props.job.schedule.map((text, i) => (
                                    <Wrapper key={i}>
                                        <IconDiv>
                                            <IoIosArrowForward/>
                                        </IconDiv>
                                        <SP>{text}</SP>
                                    </Wrapper>
                                ))}
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.experience &&
                        <DescDiv>
                            <JDText>Experience</JDText>
                                {props.job.experience.map((text, i) => (
                                    <Wrapper key={i}>
                                        <IconDiv>
                                            <IoIosArrowForward/>
                                        </IconDiv>
                                        <SP>{text}</SP>
                                    </Wrapper>
                                ))}
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.language_requirement &&
                        <DescDiv>
                            <JDText>Language Requirement</JDText>
                                {props.job.language_requirement.map((text, i) => (
                                    <Wrapper key={i}>
                                        <IconDiv>
                                            <IoIosArrowForward/>
                                        </IconDiv>
                                        <SP>{text}</SP>
                                    </Wrapper>
                                ))}
                        </DescDiv>
                    )
                }
                {
                    props.onFirstTab &&
                    (
                        props.job.certification &&
                        <DescDiv>
                            <JDText>Certification</JDText>
                                {props.job.certification.map((text, i) => (
                                    <Wrapper key={i}>
                                        <IconDiv>
                                            <IoIosArrowForward/>
                                        </IconDiv>
                                        <SP>{text}</SP>
                                    </Wrapper>
                                ))}
                        </DescDiv>
                    )
                }
                {
                    !props.onFirstTab && 
                    <DescDiv>
                        <SP>
                            {props.job.description}
                        </SP>
                    </DescDiv>
                }
            </JobDescDiv>
        </MainDiv>
    );
}

export default PopUpJobPost;