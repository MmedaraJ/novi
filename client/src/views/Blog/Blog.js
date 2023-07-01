import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Outlet, 
    useRoutes,
    useNavigate,
    Route,
    Switch,
    Routes,
    useParams,
    Navigate
} from "react-router-dom";
import { BlogListDiv, BlogText, Footer, MainDiv, P, UP } from './BlogStyles';
import BlogList from '../../components/BlogList/BlogList';
import NavBar from '../../components/NavBar/NavBar';
import BlogPost from '../../components/BlogPost/BlogPost';
import { COLORS } from '../../constants/colors';

const Blog = (props) => {
    const [blogs, setBlogs] = useState([
        "How to get a job",
        "Where should you study?",
        "Are universities free now?",
        "Wow. What a job market!",
        "We are the champions",
    ]);
    const navigate = useNavigate();

    const navToPrivacyPolicy = () => {
      navigate("/privacypolicy");
    }

    return(
        <div>
            <NavBar/>
            <br/>
            <br/>
            <MainDiv>
                <BlogListDiv>
                    <BlogList
                        blogs={blogs}
                    />
                </BlogListDiv>
                <BlogText>
                    <Routes>
                        <Route index element={<Navigate to="0" />} />
                        <Route 
                            path=":postId"
                            element={
                                <BlogPost />
                            }
                        />
                    </Routes>
                </BlogText>
            </MainDiv>
            <Footer>
        <UP onClick={navToPrivacyPolicy}>Privacy policy & Terms of use</UP>
            </Footer>
        </div>
    )
}
  
export default Blog;