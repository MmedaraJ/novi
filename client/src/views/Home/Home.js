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
  ApplyDiv,
  H1, OurJobsDiv, P, RandDiv, SP, ScrollToTopDiv, TabDiv, TheirJobsDiv
} from './HomeStyles';
import { FaArrowUp } from 'react-icons/fa';
import { MdSort } from "react-icons/md";
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import RichTextEditor from '../RichTextEditor';
import SearchResultsView from '../../components/SearchResultsView/SearchResultsView';
import SummaryFilter from '../../components/SummaryFilter/SummaryFilter';
import MyButton from '../../components/Buttons/MyButton';
import { COLORS } from '../../constants/colors';

const Home = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dateSort, setDateSort] = useState(false);
  const [applyText, setApplyText] = useState("Apply");
  const [ourJobs, setOurJobs] = useState([]);
  const [theirJobs, setTheirJobs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(['Summary']);
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [onFirstTab, setOnFirstTab] = useState(true);
  const navigate = useNavigate();
  const PAGE_SIZE = 50;
  const [state, setState] = useState({
    keyword: "",
    location: ""
  });
  const [optionStates, setOptionStates] = useState({
    date_posted: "",
    location_type: "",
    job_type: "",
    salary_estimate: "",
    industry: "",
    category: "",
    company: "",
    job_language: "",
  });
  const adzunaApiKey = process.env.REACT_APP_ADZUNA_API_KEY;
  const adzunaAppId = process.env.REACT_APP_ADZUNA_APP_ID;

  useEffect(() => {
    if(localStorage.getItem('userId')){
        axios.post(
            'http://localhost:8000/api/user/get',
            {
                userId: localStorage.getItem('userId').replace(/^"+|"+$/g, '')
            },
            {withCredentials: true}
        ).then(res => {
            setLoggedInUser(res.data.user);
        }).catch(err => {
            console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getAllJobs();
  }, []);

  useEffect(() => {
    getTheirJobs();
  }, []);

  useEffect(() => {
    setApplyText(`Apply (${selectedJobIds.length})`);
  }, [selectedJobIds]);

  useEffect(() => {
    if(state.keyword || state.location){
      setOurJobs([]);
      setTheirJobs([]);
      setPageNumber(1);
      getJobsBasedOnSearch();
      getThirdPartyJobsBasedOnSearch();
    }else{
      getAllJobs();
    }
  }, [optionStates]);

  useEffect(() => {
    if(state.keyword || state.location){
      getJobsBasedOnSearch();
    }else{
      getAllJobs();
    }
  }, [pageNumber]);

  const getAllJobs = () => {
    setSelectedJobIds([]);
    axios.get('http://localhost:8000/api/jobs/getAll')
    .then(res => {
      console.log(res);
      setOurJobs(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  const getTheirJobs = () => {
    axios.get(
      `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${adzunaAppId}&app_key=${adzunaApiKey}&results_per_page=1000`
    ).then(res => {
      console.log(res);
      setTheirJobs(res.data.results);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleScroll = () => {
    //used for scroll to top button
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);

    //used for pagination
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPageNumber(prevPageNum => prevPageNum + 1);
  };

  const handleScrollToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onInputChanged = (e) => {
    if(e.target.name == "keyword" || e.target.name == "location"){
      setState(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  }

  /**
   * Search for the next (PAGE_SIZE) jobs.
   */
  async function getJobsBasedOnSearch() {
    setSelectedJobIds([]);
    setApplyText("");
    axios.get('http://localhost:8000/api/jobs/search', {
      params: {
        keyword: state.keyword,
        location: state.location,
        location_type: optionStates.location_type,
        job_type: optionStates.job_type,
        category: optionStates.industry,
        job_language: optionStates.job_language,
        salary_estimate: optionStates.salary_estimate,
        date_posted: optionStates.date_posted,
        pageSize: PAGE_SIZE,
        pageNumber: pageNumber
      }}).then(response => {
        console.log(response.data);
        setOurJobs(prevJobs => [...prevJobs, ...response.data.jobs.hits.hits]);
      }).catch(err => {
        console.log(err);
      });
  }

  /**
   * Search for the next (PAGE_SIZE) third party jobs.
   */
  async function getThirdPartyJobsBasedOnSearch() {
    let params = {}

    if (state.keyword || optionStates.category){
      params["what_or"] = `${state.keyword}${optionStates.category ? " " + optionStates.category : ""}`
    }
    if (state.location){
      //params["location1"] = state.location
      params["where"] = state.location
    }
    if (optionStates.job_type === "Full-time"){
      params["full_time"] = 1
    } else if (optionStates.job_type === "Part-time"){
      params["part_time"] = 1
    } else if (optionStates.job_type === "Contract"){
      params["contract"] = 1
    }

    axios.get(
      `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${adzunaAppId}&app_key=${adzunaApiKey}&results_per_page=1000`, 
      {
        params: params
      }).then(response => {
        console.log(response.data);
        setTheirJobs(prevJobs => [...prevJobs, ...response.data.results]);
      }).catch(err => {
        console.log(err);
      });
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    if(state.keyword || state.location){
      setOurJobs([]);
      setTheirJobs([]);
      setPageNumber(1);
      await Promise.all([
        getJobsBasedOnSearch(),
        getThirdPartyJobsBasedOnSearch()
      ])
    }else{
      getAllJobs();
    }
  }

  const st = () => {
    axios.post(
      "http://localhost:8000/api/job/create", 
      {
        title: "Head Chef",
        location_type: "Remote",
        country: "Canada",
        province: "AB",
        city: "Edmonton",
        complete_location: "Edmonton, AB, Canada",
        types: [
          "Full-time",
          "Part-time",
          "Casual",
          "Internship"
        ],
        category: "Restaurants & Food Service",
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
          "English",
          "Spanish"
        ],
        certification: [
          "Software",
          "National Lifeguarding Certification (required)",
          "First Aid Certification and CPR Certification (required)",
          "Red Cross Water Safety Instructor Certification (preferred)",
        ],
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        currency: "CAD",
        compensation_frequency: "hourly",
        yearly_compensation: 2000000,
        hourly_compensation: 1550,
        max_hourly_compensation: 2000,
        max_yearly_compensation: 3000000,
        range: false,
        compensation_info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        show_compensation: true,
        company_name: "Tarabat",
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
        urgently_hiring: true,
        start_date: Date.now()
      },
      { withCredentials: true },
    ).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
  }

  const handleFilterChange = (filterName, newValue) => {
    setOptionStates(prevState => ({
      ...prevState,
      [filterName]: newValue
    }));
  }

  const sortJobsByRelevance = () => {
    const sortedJobs = [...ourJobs].sort((a, b) => b._score - a._score);
    setOurJobs(sortedJobs);
    setDateSort(false);
  }

  const sortJobsByDate = () => {
    const sortedJobs = [...ourJobs].sort((a, b) => new Date(b._source.createdAt) - new Date(a._source.createdAt) );
    setOurJobs(sortedJobs);
    setDateSort(true);
  }
  
  const handleSelect = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((prevOption) => prevOption !== option)
        : [...prev, option]
    );
  };
  
  const handleJobDivClick = (jobId) => {
    setSelectedJobIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((prevJob) => prevJob !== jobId)
        : [...prev, jobId]
    );
  };

  const handleOurJobsDivClick = () => {
    setOnFirstTab(true);
  }

  const handleTheirJobsDivClick = () => {
    setOnFirstTab(false);
  }

  const submitApplications = () => {
    if(loggedInUser._id){
      if(loggedInUser.resumeName){
        selectedJobIds.map((jobId, i) => {
          axios.post(
            'http://localhost:8000/api/application/create',
            {
              user_id: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
              job_id: jobId
            }
          ).then(res => {
            console.log(res);
            setSelectedJobIds([]);
            setApplyText("Submitted");
          }).catch(err => {
            console.log(err);
            setApplyText("Not Submitted");
          });
        });
      }else{
        navigate('/profile', {state: { message: "Upload resume"}});
      }
    }else{
      navigate('/signin');
    }
  }

  return (
    <div style={{backgroundColor: `${COLORS.BACK}`}}>
      <NavBar/>
      {
        onFirstTab ?
        <SearchBar
          handleFilterChange={handleFilterChange}
          onSubmitHandler={onSubmitHandler}
          onInputChanged={onInputChanged}
          state={state}
          onFirstTab={true}
        /> :
        <SearchBar
          handleFilterChange={handleFilterChange}
          onSubmitHandler={onSubmitHandler}
          onInputChanged={onInputChanged}
          state={state}
          onFirstTab={false}
        />
      }
      <TabDiv>
        <OurJobsDiv 
          onClick={handleOurJobsDivClick}
          onFirstTab={onFirstTab}
        >
          <SP>Our Jobs</SP>
        </OurJobsDiv>
        <TheirJobsDiv 
          onClick={handleTheirJobsDivClick}
          onFirstTab={onFirstTab}
        >
          <SP>Third Party Jobs</SP>
        </TheirJobsDiv>
      </TabDiv>
      <br></br>
      {
        onFirstTab &&
        ourJobs.length > 0 && 
        <SummaryFilter
          handleSelect={handleSelect}
          selectedOptions={selectedOptions}
        />
      }
      {
        onFirstTab &&
        ourJobs.length > 0 && ourJobs[0]._source && 
        <div>
          <SP>
            <MdSort/>&nbsp;
            Sort&nbsp;by&nbsp;
            <span>
              {
                dateSort?
                <u onClick={sortJobsByRelevance} style={{cursor: "pointer"}}>relevance</u>:
                <b>relevance</b>
              }
            </span>
            &nbsp;or&nbsp;
            <span>
              {
                dateSort?
                <b>date</b>:
                <u onClick={sortJobsByDate} style={{cursor: "pointer"}}>date</u>
              }
            </span>
          </SP>
        </div>
      }
      {
        onFirstTab &&
        ourJobs.length > 0 &&
        <SP>Click <b>one or many</b> job cards to select them. Click <b>apply</b> to submit your application.</SP>
      }
      {
        onFirstTab?
        <SearchResultsView
          jobs={ourJobs}
          onFirstTab={true}
          selectedOptions={selectedOptions}
          handleJobDivClick={handleJobDivClick}
          selectedJobIds={selectedJobIds}
          resumeName={loggedInUser? loggedInUser.resumeName: null}
          userId={loggedInUser? loggedInUser._id: null}
        />:
        <SearchResultsView
          jobs={theirJobs}
          onFirstTab={false}
          resumeName={loggedInUser? loggedInUser.resumeName: null}
          userId={loggedInUser? loggedInUser._id: null}
        />
      }
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
      <ScrollToTopDiv isVisible={isVisible} onClick={handleScrollToTopClick}>
        <FaArrowUp/>
      </ScrollToTopDiv>
      {
        onFirstTab &&
        ourJobs.length > 0 && 
        (selectedJobIds.length > 0 || applyText === 'Submitted') &&
        <ApplyDiv onClick={submitApplications}>
          <MyButton
            backgroundColor={`${COLORS.ORANGE}`}
            color="#FFFFFF"
            text={applyText}
            width="max"
            height="30px"
          />
        </ApplyDiv>
      }
    </div>
  )
}

export default Home;
