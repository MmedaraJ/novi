import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import JobPost from '../JobPost/JobPost';

const GridContainer = styled.div`
    column-width: 250px;
    column-gap: 1rem;
    padding: 1rem;
    width: max;
`;

const SearchResultsView = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs/getAll')
        .then(res => {
            console.log(res);
            setJobs(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return(
        <GridContainer>
            {jobs.map((job, i) => (
                <JobPost
                    job={job}
                    index={i}
                    key={i}
                />
            ))}
        </GridContainer>
    );
}

export default SearchResultsView;