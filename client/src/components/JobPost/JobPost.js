import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    BottomLeftDiv, BottomRightDiv, CheckIcon, CompanyNameDiv, 
    DescriptionSummaryDiv, GraySP, IconDiv, JobDiv, LP, LocationDiv, NNSP, NSP, Overlay, P, PayDiv, 
    PopUp,SP, TitleDiv, TopLeftDiv, Wrapper 
} from './JobPostStyles';
import { MdPlace } from 'react-icons/md';
import { 
    FaClock,
    FaMoneyBill,
    FaCircle
} from 'react-icons/fa';
import { FaExpand } from 'react-icons/fa';
import { GiHourglass } from 'react-icons/gi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { 
    IoIosArrowForward,
    IoMdArrowBack
} from 'react-icons/io';
import { formatDistanceToNow, parseISO } from 'date-fns';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import PopUpJobPost from '../PopUpJobPost/PopUpJobPost';
import { COLORS } from '../../constants/colors';

const JobPost = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const options = { month: "long", day: "numeric", year: "numeric" };

    useEffect(() => {
        if (isExpanded) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'visible';
        }
    
        return () => {
          document.body.style.overflow = 'visible';
        };
    }, [isExpanded]);

    const handleDivClick = (event) => {
        props.onFirstTab?
        props.handleJobDivClick(props.job._id):
        setIsExpanded(true);
    };

    const handleExpandClick = (event) => {
        event.stopPropagation();
        setIsExpanded(true);
    };

    const handlePopUpClose = (event) => {
        event.stopPropagation();
        setIsExpanded(false);
    };

    const handleOverlayClick = (event) => {
        event.stopPropagation();
        setIsExpanded(false);
    };

    return(
        <JobDiv 
            onClick={handleDivClick}
            isVisible={
                props.onFirstTab &&
                props.selectedJobIds.includes(props.job._id)
            }
        >
            {
                props.onFirstTab && 
                (props.selectedJobIds.includes(props.job._id) && 
                <CheckIcon color={`${COLORS.ORANGE}`} />)
            }
            <TopLeftDiv onClick={handleExpandClick}>
                <FaExpand/>
                {/* &nbsp;<NSP><IoMdArrowBack/></NSP>&nbsp;<NNSP><b>Full job description</b></NNSP> */}
            </TopLeftDiv>
            <TitleDiv>
                <b>{
                    props.job.title
                }</b>
            </TitleDiv>
            <CompanyNameDiv>
                <P>{
                    props.onFirstTab?
                    props.job.company_name:
                    props.job.company.display_name !== 'Unknown]' && props.job.company.display_name
                }</P>
            </CompanyNameDiv>
            <LocationDiv>
                <SP><MdPlace style={{color: "black"}}/> {
                    props.onFirstTab?
                    props.job.complete_location:
                    props.job.location.display_name
                }</SP>
            </LocationDiv>
            {
                props.onFirstTab ?
                (
                    props.selectedOptions.length === 0?
                    <DescriptionSummaryDiv>
                        {
                            props.job.description_summary.map((desc, i) => (
                                <Wrapper key={i}>
                                    <IconDiv>
                                        <IoIosArrowForward/>
                                    </IconDiv>
                                    <LP>{desc}</LP>
                                </Wrapper>
                            ))
                        }
                    </DescriptionSummaryDiv>:
                    <>
                        {
                            props.selectedOptions.includes('Summary') &&
                            <DescriptionSummaryDiv>
                                {
                                    props.selectedOptions.length > 1 &&
                                    <h5>Summary</h5>
                                }
                                {
                                    props.job.description_summary.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                        {
                            props.selectedOptions.includes('Responsibilities') &&
                            <DescriptionSummaryDiv>
                                <h5>Responsibilities</h5>
                                {
                                    props.job.responsibilities.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                        {
                            props.selectedOptions.includes('Qualifications') &&
                            <DescriptionSummaryDiv>
                                <h5>Qualifications</h5>
                                {
                                    props.job.qualifications.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                        {
                            props.selectedOptions.includes('Benefits') &&
                            <DescriptionSummaryDiv>
                                <h5>Benefits</h5>
                                {
                                    props.job.benefits.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                        {
                            props.selectedOptions.includes('Schedule') &&
                            <DescriptionSummaryDiv>
                                <h5>Schedule</h5>
                                {
                                    props.job.schedule.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                        {
                            props.selectedOptions.includes('Experience') &&
                            <DescriptionSummaryDiv>
                                <h5>Experience</h5>
                                {
                                    props.job.experience.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                        {
                            props.selectedOptions.includes('Language') &&
                            <DescriptionSummaryDiv>
                                <h5>Language</h5>
                                {
                                    props.job.language_requirement.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                        {
                            props.selectedOptions.includes('Certification') &&
                            <DescriptionSummaryDiv>
                                <h5>Certification</h5>
                                {
                                    props.job.certification.map((desc, i) => (
                                        <Wrapper key={i}>
                                            <IconDiv>
                                                <IoIosArrowForward/>
                                            </IconDiv>
                                            <LP>{desc}</LP>
                                        </Wrapper>
                                    ))
                                }
                            </DescriptionSummaryDiv>
                        }
                    </>
                ):
                (
                    <DescriptionSummaryDiv>
                        {
                            props.job.description.split(".").map((desc, i) => (
                                <Wrapper key={i}>
                                    <IconDiv>
                                        <IoIosArrowForward/>
                                    </IconDiv>
                                    <LP>{desc.trim()}</LP>
                                </Wrapper>
                            ))
                        }
                    </DescriptionSummaryDiv>
                )
            }
            {
                props.onFirstTab &&
                (props.job.urgently_hiring?
                <BottomLeftDiv>
                    <GraySP><FaClock/> Urgently hiring</GraySP>
                </BottomLeftDiv>:
                props.job.start_immediately?
                <BottomLeftDiv>
                    <GraySP><GiHourglass/> Starts immediately</GraySP>
                </BottomLeftDiv>:
                <BottomLeftDiv>
                    <GraySP><AiOutlineClockCircle/> {new Date(props.job.start_date).toLocaleDateString("en-US", options)}</GraySP>
                </BottomLeftDiv>)
            }
            <BottomRightDiv>
                <GraySP>{
                    props.onFirstTab === true?
                    formatDistanceToNow(parseISO(props.job.createdAt)):
                    formatDistanceToNow(parseISO(props.job.created))
                }</GraySP>
            </BottomRightDiv>
            {isExpanded && (
                <>
                    <Overlay onClick={handleOverlayClick}/>
                    <PopUp>
                        <PopUpJobPost
                            job={props.job}
                            onFirstTab={props.onFirstTab}
                            resumeName={props.resumeName}
                            userId={props.userId}
                            onClick={handlePopUpClose}
                        />
                    </PopUp>
                </>
            )}
        </JobDiv>
    );
}

export default JobPost;