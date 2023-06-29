import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BlogPost1 from '../AllBlogPosts/BlogPost1/BlogPost1';

const PostContainer = styled.div`
  // Add styles for your post container
`;

const BlogPost = () => {
  const { postId } = useParams();

  return (
    <PostContainer>
        {
            postId &&
            postId === "0"?
            <BlogPost1/>:
            `We are bloggers. Yes we are ${postId}`
        }
    </PostContainer>
  )
};

export default BlogPost;
