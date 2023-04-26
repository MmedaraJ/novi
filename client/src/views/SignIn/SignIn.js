import React, { useEffect, useState } from 'react';
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
    FirstNameDiv, InputDiv, LabelDiv, LastNameDiv, MainDiv, NamesDiv, 
    P, RandTextDiv, SearchButtonDiv, TextInput
 } from './SignInStyles';
import MyButton from '../../components/Buttons/MyButton';

const SignIn = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

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
        if(errors.length > 0){setErrors([]);}

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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("enter pressed");
    }

    return(
        <div>
            <NavBar
                navToSignUp={navToSignUp}
                navToHome={navToHome}
            ></NavBar>
            <br></br>
            <br></br>
            <MainDiv>
                <RandTextDiv>
                    <P>Sign in or <u onClick={navToSignUp}><b>create an account</b></u></P>
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
                                    type='password'
                                    placeholder='Password'
                                    value={state.password}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.password && <Error>{errors.password}</Error>}
                            </LabelDiv>
                        </LastNameDiv>
                    </NamesDiv>
                    <ButtonDiv>
                        <SearchButtonDiv>
                            <MyButton
                                backgroundColor="#000000"
                                color="#FFFFFF"
                                text="Sign In"
                                width="100%"
                                height="100%"
                                type="submit"
                            />
                        </SearchButtonDiv>
                    </ButtonDiv>
                </form>
            </MainDiv>
        </div>
    )
}

export default SignIn;