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
        <GridContainer>
            {
                props.jobs.length > 0?
                props.jobs.map((job, i) => (
                    <JobPost
                        job={job._source? job._source: job}
                        index={i}
                        key={i}
                    />
                )):
                <P>Nothing to show here yet</P>
            }
        </GridContainer>
    );
}

export default SearchResultsView;