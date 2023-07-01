import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { Footer, MainDiv, UP } from './EmployerHomeStyles';
import NavBar from '../../../components/NavBar/NavBar';

const EmployerHome = (props) => {
    const navigate = useNavigate();
    const navToPrivacyPolicy = () => {
      navigate("/privacypolicy");
    }

    useEffect(() => {
        if(!localStorage.getItem('employerId')){
            navigate('/employersignin');
        }else{
            // axios.post(
            //     'http://localhost:8000/api/user/get',
            //     {
            //         userId: localStorage.getItem('userId').replace(/^"+|"+$/g, '')
            //     },
            //     {withCredentials: true}
            // ).then(res => {
            //     console.log('logged in user');
            //     console.log(res.data.user.firstName);
            //     setLoggedInUser(res.data.user);
            //     setState({
            //         firstName: res.data.user.firstName,
            //         lastName: res.data.user.lastName,
            //         email: res.data.user.email,
            //         oldPassword: "",
            //         newPassword: "",
            //         confirmNewPassword: "",
            //         phoneNumberVerificationCode: "",
            //         resumeName: res.data.user.resumeName,
            //     });
            //     if(!localStorage.getItem('googleId')){
            //         setPhoneNumber(res.data.user.phoneNumber);
            //     }
            // }).catch(err => {
            //     console.log(err);
            // });
        }
    }, []);

    return(
        <div>
            <NavBar/>
            <br/>
            <br/>
            <MainDiv>
                sdfsfsf
            </MainDiv>
            <Footer>
                <UP onClick={navToPrivacyPolicy}>Privacy policy & Terms of use</UP>
            </Footer>
        </div>
    )
}
  
export default EmployerHome;