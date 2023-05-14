import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import JobPost from '../JobPost/JobPost';
import { P } from './SearchResultsViewStyles';

const GridContainer = styled.div`
    column-width: 250px;
    column-gap: 1rem;
    padding: 1rem;
    width: max;
`;

const SearchResultsView = (props) => {
    return(
        <>
            {
                props.jobs.length > 0?
                <GridContainer>
                    {
                        props.jobs.map((job, i) => (
                            <JobPost
                                job={job._source? job._source: job}
                                selectedOptions={props.selectedOptions}
                                handleJobDivClick={props.handleJobDivClick}
                                index={i}
                                key={i}
                            />
                        ))
                    }
                </GridContainer>:
                <P style={{padding: "1rem"}}>Nothing to show here yet</P>
            }
        </>
    );
}

export default SearchResultsView;