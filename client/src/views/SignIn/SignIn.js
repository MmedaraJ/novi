import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {generateRandomNumbersString, getRandomLetters} from '../../utils';
import {FcGoogle} from 'react-icons/fc';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate,
  useLocation
} from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar';
import { 
    ButtonDiv,
    Error,
    FirstNameDiv, Footer, InputDiv, LabelDiv, LastNameDiv, MainDiv, NamesDiv, 
    P, RandTextDiv, SearchButtonDiv, TextInput, UP
 } from './SignInStyles';
import MyButton from '../../components/Buttons/MyButton';
import { COLORS } from '../../constants/colors';

const SignIn = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        googleSignUp: ""
    });
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState([]);
    const [user, setUser] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        getGoogleSignedInUser(res.data);
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const getGoogleSignedInUser = (prof) => {
        axios.post(
            "http://localhost:8000/api/user/getGoogleUser", 
            { googleSignInId: prof.id },
            { withCredentials: true },
        ).then(res => {
            console.log(res);
            localStorage.removeItem('userId');
            localStorage.removeItem('usertoken');
            localStorage.removeItem('googleId');
            localStorage.setItem('userId', JSON.stringify(res.data.user._id));
            localStorage.setItem('googleId', JSON.stringify(prof.id));
            navToHome();
        }).catch(err => {
            console.log(err);
            registerGoogleSignUpUser(prof);
        });
    }

    const registerGoogleSignUpUser = (prof) => {
        axios.post(
            "http://localhost:8000/api/user/create", 
            {
                firstName: prof.given_name,
                lastName: prof.family_name,
                email: prof.email,
                phoneNumber: `+1${generateRandomNumbersString()}`,
                phoneNumberVerified: false,
                password: 'password',
                confirmPassword: 'password',
                googleSignInId: prof.id
            },
            { withCredentials: true },
        ).then(res => {
            console.log(res);
            setState({
                email: "",
                password: "",
            });
            setSuccess(res.data.msg);
            localStorage.removeItem('userId');
            localStorage.removeItem('usertoken');
            localStorage.removeItem('googleId');
            localStorage.removeItem('phoneNumber');
            localStorage.setItem('userId', JSON.stringify(res.data.user._id));
            localStorage.setItem('googleId', JSON.stringify(prof.id));
            navToHome();
        }).catch(err => {
            console.log(err);
            const errorArr = {};
            let errMess = "Problem with Google sign in";
            const errorResponse = err.response.data.errors;

            if(errorResponse){
                for(const key of Object.keys(errorResponse)){
                    if(key === 'email' && errorResponse[key].kind === 'unique'){
                        errMess = "You already have an account. Go to the sign in page instead";
                    }
                }
            }
            setErrors({
                email: "",
                password: "",
                googleSignUp: errMess
            });
        });
    }

    const onInputChanged = (e) => {
        let email = state.email;
        let password = state.password;

        const name = e.target.name;
        const value = e.target.value;

        switch(name){
            case "email":
                email = value;
                break;
            case "password":
                password = value;
                break;
            default:
        }

        if(success.length > 0){setSuccess("");}
        setErrors({});

        setState({
            email: email,
            password: password,
        });
    }

    const navToSignUp = () => {
        navigate('/signup');
    }

    const navToHome = () => {
        navigate('/');
    } 

    const navToPrivacyPolicy = () => {
      navigate("/privacypolicy");
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(
            "http://localhost:8000/api/user/login", 
            {
                email: state.email,
                password: state.password,
            },
            { withCredentials: true },
        ).then(res => {
            console.log(res);
            if(res.data.email){
                setErrors({
                    email: res.data.email
                });
            }else if(res.data.password){
                setErrors({
                    password: res.data.password
                });
            }else{
                setState({
                    email: "",
                    password: ""
                });
                setSuccess(res.data.msg);
                localStorage.removeItem('userId');
                localStorage.removeItem('usertoken');
                localStorage.removeItem('googleId');
                localStorage.setItem('userId', JSON.stringify(res.data.user._id));
                navToHome();
            }
        }).catch(err => {
            console.log(err);
            const errorArr = {};
            const errorResponse = err.response.data.errors;

            if(errorResponse){
                for(const key of Object.keys(errorResponse)){
                    errorArr[key] = errorResponse[key].message;
                }
            }
            setErrors(errorArr);
        });
    }

    return(
        <div>
            <NavBar/>
            <br></br>
            <br></br>
            <MainDiv>
                <RandTextDiv>
                    <P>Sign in or <u onClick={navToSignUp}><b style={{cursor: "pointer"}}>create an account</b></u></P>
                </RandTextDiv>
                <RandTextDiv>
                    {errors.googleSignUp && <P style={{color: "red"}}>{errors.googleSignUp}</P>}
                </RandTextDiv>
                <form onSubmit={onSubmitHandler}>
                    <NamesDiv>
                        <FirstNameDiv>
                            <InputDiv
                                borderColor={errors.email? 'red': '#000000'}
                            >
                                <TextInput
                                    required
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    value={state.email}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.email && <Error>{errors.email}</Error>}
                            </LabelDiv>
                        </FirstNameDiv>
                        <LastNameDiv>
                            <InputDiv
                                borderColor={errors.password? 'red': '#000000'}
                            >
                                <TextInput
                                    required
                                    name='password'
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='Password'
                                    minLength={5}
                                    value={state.password}
                                    onChange={onInputChanged}
                                />
                                <div style={{marginRight: '4px'}} onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </InputDiv>
                            <LabelDiv>
                                {errors.password && <Error>{errors.password}</Error>}
                            </LabelDiv>
                        </LastNameDiv>
                    </NamesDiv>
                    <ButtonDiv>
                        <SearchButtonDiv>
                            <MyButton
                                backgroundColor={`${COLORS.ORANGE}`}
                                color="#FFFFFF"
                                text="Sign In"
                                width="100%"
                                height="100%"
                                type="submit"
                            />
                        </SearchButtonDiv>
                    </ButtonDiv>
                    <P>or</P>
                    <ButtonDiv>
                        <SearchButtonDiv>
                            <MyButton
                                backgroundColor="#000000"
                                color="#FFFFFF"
                                text="Sign in with Google"
                                width="100%"
                                height="100%"
                                type="button"
                                onClick={login}
                                icon={<FcGoogle/>}
                            />
                        </SearchButtonDiv>
                    </ButtonDiv>
                </form>
            </MainDiv>
            <Footer>
                <UP onClick={navToPrivacyPolicy}>Privacy policy & Terms of use</UP>
            </Footer>
        </div>
    )
}

export default SignIn;