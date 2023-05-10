import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    BottomLeftDiv, BottomRightDiv, CheckIcon, CompanyNameDiv, 
    DescriptionSummaryDiv, GraySP, IconDiv, JobDiv, LP, LocationDiv, Overlay, P, PayDiv, 
    PopUp, 
    SP, TitleDiv, TopLeftDiv, Wrapper 
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
    IoMdCheckmarkCircleOutline
} from 'react-icons/io';
import { formatDistanceToNow, parseISO } from 'date-fns';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import PopUpJobPost from '../PopUpJobPost/PopUpJobPost';

const JobPost = (props) => {
    const [isVisible, setVisible] = useState(false);
    const locale = navigator.language;
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

    const handleDivClick = () => {
        setVisible(!isVisible);
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
            isVisible={isVisible}
        >
            {isVisible && <CheckIcon />}
            <TopLeftDiv onClick={handleExpandClick}>
                <FaExpand/>
            </TopLeftDiv>
            <TitleDiv>
                <b>{props.job.title}</b>
            </TitleDiv>
            <CompanyNameDiv>
                <P>{props.job.company_name}</P>
            </CompanyNameDiv>
            <LocationDiv>
                <SP><MdPlace style={{color: "black"}}/> {props.job.complete_location}</SP>
            </LocationDiv>
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
            </DescriptionSummaryDiv>
            {
                props.job.urgently_hiring?
                <BottomLeftDiv>
                    <GraySP><FaClock/> Urgently hiring</GraySP>
                </BottomLeftDiv>:
                props.job.start_immediately?
                <BottomLeftDiv>
                    <GraySP><GiHourglass/> Starts immediately</GraySP>
                </BottomLeftDiv>:
                <BottomLeftDiv>
                    <GraySP><AiOutlineClockCircle/> {new Date(props.job.start_date).toLocaleDateString("en-US", options)}</GraySP>
                </BottomLeftDiv>
            }
            {
                props.job.show_compensation &&
                props.job.compensation && 
                <PayDiv>
                    <SP>
                        <FaMoneyBill style={{color: "black"}}/>&nbsp;
                        {(props.job.compensation/100).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                        {
                            props.job.compensation_frequency &&
                            props.job.compensation_frequency === "yearly"?
                            "/yr":
                            props.job.compensation_frequency === "monthly"?
                            "/mon":
                            props.job.compensation_frequency === "bi-weekly"?
                            "/bi-wk":
                            props.job.compensation_frequency === "weekly"?
                            "/wk":
                            props.job.compensation_frequency === "daily"?
                            "/day":
                            props.job.compensation_frequency === "hourly" &&
                            "/hr"
                        }
                    </SP>
                </PayDiv>
            }
            <BottomRightDiv>
                <GraySP>{formatDistanceToNow(parseISO(props.job.createdAt))}</GraySP>
            </BottomRightDiv>
            {isExpanded && (
                <>
                    <Overlay onClick={handleOverlayClick}/>
                    <PopUp>
                        <PopUpJobPost
                            job={props.job}
                            onClick={handlePopUpClose}
                        />
                    </PopUp>
                </>
            )}
        </JobDiv>
    );
}

export default JobPost;