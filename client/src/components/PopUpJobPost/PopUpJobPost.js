import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
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

const PopUpJobPost = (props) => {
    const options = { month: "long", day: "numeric", year: "numeric" };

    const handleClick = (e) => {
        e.stopPropagation();
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
                }
            </CompanyNameDiv>
            {
                props.job.complete_location &&
                <ItemsDiv>
                    <SP><MdPlace style={{color: "black"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{props.job.complete_location}</SP>
                </ItemsDiv>
            }
            {
                props.job.show_compensation &&
                props.job.compensation && 
                <ItemsDiv>
                    <SP><FaMoneyBill style={{color: "black"}}/> 
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {(props.job.compensation/100).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                        {
                            props.job.range && 
                            (props.job.max_compensation*-1/100).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })
                        }
                        &nbsp;
                        {props.job.compensation_frequency}
                    </SP>
                </ItemsDiv>
            }
            {
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
            }
            {
                props.job.location_type &&
                <ItemsDiv>
                    <SP>
                        <BiBuilding style={{color: "black"}}/>&nbsp;&nbsp;&nbsp;&nbsp;{props.job.location_type}
                    </SP>
                </ItemsDiv>
            }
            {
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
            }
            <JobDescDiv>
                <JDDiv>
                    <JDText>Job Description</JDText>
                </JDDiv>
                {
                    props.job.intro &&
                    <DescDiv>
                        <SP>
                            {props.job.intro}
                        </SP>
                    </DescDiv>
                }
                {
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
                }
                {
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
                }
                {
                    props.job.extra_description &&
                    <DescDiv>
                        <SP>
                            {props.job.extra_description}
                        </SP>
                    </DescDiv>
                }
                {
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
                }
                {
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
                }
                {
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
                }
                {
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
                }
                {
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
                }
            </JobDescDiv>
        </MainDiv>
    );
}

export default PopUpJobPost;