import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MainDiv = styled.div`
  // Add styles for your post container
`;

const BlogPost1 = () => {

  return (
    <MainDiv>
        <p>This is Blog 1</p>
    </MainDiv>
  )
};

export default BlogPost1;
