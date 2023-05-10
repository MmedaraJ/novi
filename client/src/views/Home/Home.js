import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { 
  ApplyButton,
  H1, RandDiv, ScrollToTopButton
} from './HomeStyles';
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import RichTextEditor from '../RichTextEditor';
import SearchResultsView from '../../components/SearchResultsView/SearchResultsView';

const Home = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
  };

  const handleScrollToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navToSignIn = () => {
      navigate('/signin');
  } 

  const navToHome = () => {
      navigate('/');
  } 

  const st = () => {
    axios.post(
      "http://localhost:8000/api/job/create", 
      {
        title: "Software Engineer Associate 2",
        location_type: "On Site",
        country: "Canada",
        province: "ON",
        city: "Ottawa",
        complete_location: "Ottawa, ON, Canada",
        types: [
          "Full-time",
          "Part-time",
          "Casual",
        ],
        category: "Agriculture",
        intro: "JOIN OUR TEAM TODAY! We are looking for a fun and enthusiastic instructor/coach who shares the same love for the water as we do! We offer a competitive salary of $20-25/hour. Flexible part-time hours to help you manage other responsibilities you have.\n\nAt Paddle to Stroke, we provide high quality children and adult lessons aimed to teach water safety skills and improve swimming abilities. We would like to invite your experties to join our fast growing team.",
        responsibilities: [
          "Providing administrative coordination of all key deliverables within Sales Department",
          "Assisting with all inquiries received from the field and providing resources requested by Director of Sales and Marketing and members of the sales team",
          "Processing and ensuring accuracy of all residential and commercial agreements of purchase and sale as well as leases",
          "Completing daily, weekly and monthly reports and metrics in a timely manner with accuracy and attention to detail",
          "Compiling, organizing and maintaining files",
          "Demonstrating timely responsiveness via emails, phone calls etc.",
          "Adapting to new role requirements as necessary",
        ],
        qualifications: [
          "We are seeking a motivated, high-energy, proactive, positive sales professional with a solid understanding of the sales cycle and lead conversion",
          "Exceptional organization and time-management skills with emphasis on prioritizing and goal-setting",
          "Ability to research and analyze customer data",
          "An interest and passion for working with seniors",
          "Proficiency in Microsoft Office Suite and willingness to learn new software, experience with CRM software is an asset",
          "Ability to multi-task and work under pressure to meet deadlines and targets",
          "Bachelor's Degree preferred",
        ],
        extra_description: "Duties and hours of work shall be determined by the Employer and may vary from time to time. There may be occasions during events when attendance will be required weekends and holidays.\n\nAlavida Lifestyles is an equal opportunity employer that values diversity and inclusion. We are committed to providing barrier-free and accessible employment practices. Alavida Lifestyles will provide accommodation to people with disabilities upon request throughout our recruitment process.",
        benefits: [
          "Employee assistance program"
        ],
        schedule: [
          "8 hour shift",
          "Day shift",
          "Weekend availability",
        ],
        experience: [
          "Customer service: 2 years (preferred)",
          "Working with seniors: 1 year (preferred)",
          "Administrative: 2 years (preferred)",
        ],
        language_requirement: [
          "French not required"
        ],
        certification: [
          "National Lifeguarding Certification (required)",
          "First Aid Certification and CPR Certification (required)",
          "Red Cross Water Safety Instructor Certification (preferred)",
        ],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        currency: "CAD",
        compensation_frequency: "hourly",
        compensation: 62500,
        range: true,
        max_compensation: 70000,
        compensation_info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        show_compensation: true,
        company_name: "Emujoice",
        company_url: "http://www.emujoice.com",
        company_logo_url: "http://www.emujoice.com",
        company_email: "emujoice@gmail.com",
        application_instruction: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        upgrade: "2",
        description_summary: [
          "We offer private and low ratio classes for kids and adults",
          "We offer flexible schedule and a competitive hourly wage",
          "We provide training of our curriculum derived from competitive swimming",
          "We offer flexible schedule and a competitive hourly wage",
          "We offer flexible schedule and a competitive hourly wage",
          "We provide training of our curriculum derived from competitive swimming",
          "We offer flexible schedule and a competitive hourly wage",
          "We offer flexible schedule and a competitive hourly wage",
        ],
        urgently_hiring: false,
        start_date: Date.now()
      },
      { withCredentials: true },
  ).then(res => {
      console.log(res);
  }).catch(err => {
      console.log(err);
  });
  }

  return (
    <div>
      <NavBar/>
      <SearchBar></SearchBar>
      <br></br>
      <br></br>
      <SearchResultsView/>
      <p onClick={st}>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>sdsdsdsds</p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <RichTextEditor/>
      <ScrollToTopButton isVisible={isVisible} onClick={handleScrollToTopClick}>
        Scroll to Top
      </ScrollToTopButton>
      <ApplyButton>
        Apply
      </ApplyButton>
    </div>
  )
}

export default Home;
