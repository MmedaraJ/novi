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
    Error, FileInput, FirstNameDiv, InputDiv, LabelDiv, LastNameDiv, 
    MainDiv, MainSelect, NamesDiv, Option, P, RandTextDiv, SearchButtonDiv, SelectedFile, TextInput, UploadButton 
} from './SignUpStyles';
import { Input } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import NavBar from '../../components/NavBar/NavBar';
import MyButton from '../../components/Buttons/MyButton';

const SignUp = (props) => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        resume: ""
    });
    const [success, setSuccess] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        handleFileNameLengthOnWindowSizeChange();
    }, [windowWidth]);

    const onInputChanged = (e) => {
        let firstName = state.firstName;
        let lastName = state.lastName;
        let email = state.email;
        let phoneNumber = state.phoneNumber;
        let password = state.password;
        let confirmPassword = state.confirmPassword;

        const name = e.target.name;
        const value = e.target.value;

        switch(name){
            case "firstName":
                firstName = value;
                break;
            case "lastName":
                lastName = value;
                break;
            case "email":
                email = value;
                break;
            case "phoneNumber":
                phoneNumber = value;
                break;
            case "password":
                password = value;
                break;
            case "confirmPassword":
                confirmPassword = value;
                break;
            default:
        }

        if(success.length > 0){setSuccess("");}
        if(errors.length > 0){setErrors([]);}

        setState({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            confirmPassword: confirmPassword,
        });
    }

    const navToSignIn = () => {
        navigate('/signin');
    } 

    const navToHome = () => {
        navigate('/');
    } 

    function handleFileUpload(event) {
        const file = event.target.files[0];
        let fileName = file? file.name: null;
        if(fileName){
            if(windowWidth >= 2560) fileName = fileName.substring(0, 251);
            else if(windowWidth >= 1440) fileName = fileName.substring(0, 120);
            else if(windowWidth >= 1024) fileName = fileName.substring(0, 80);
            else if(windowWidth > 768 && windowWidth < 909) fileName = fileName.substring(0, 50);
            else if(windowWidth > 431) fileName = fileName.substring(0, 60);
            else if(windowWidth >= 375) fileName = fileName.substring(0, 50);
            else if(windowWidth >= 320) fileName = fileName.substring(0, 40);
            else if(windowWidth < 320) fileName = fileName.substring(0, 20);
        }
        setSelectedFile(fileName);
    }

    function handleFileNameLengthOnWindowSizeChange(){
        if(windowWidth >= 2560) setSelectedFile(selectedFile? selectedFile.substring(0, 251): null);
        else if(windowWidth >= 1440) setSelectedFile(selectedFile? selectedFile.substring(0, 120): null);
        else if(windowWidth >= 1024) setSelectedFile(selectedFile? selectedFile.substring(0, 80): null);
        else if(windowWidth > 768 && windowWidth < 909) setSelectedFile(selectedFile? selectedFile.substring(0, 50): null);
        else if(windowWidth > 431) setSelectedFile(selectedFile? selectedFile.substring(0, 60): null);
        else if(windowWidth >= 375) setSelectedFile(selectedFile? selectedFile.substring(0, 50): null);
        else if(windowWidth >= 320) setSelectedFile(selectedFile? selectedFile.substring(0, 40): null);
        else if(windowWidth < 320) setSelectedFile(selectedFile? selectedFile.substring(0, 20): null);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("enter pressed");
    }

    return(
        <div>
            <NavBar
                navToSignIn={navToSignIn}
                navToHome={navToHome}
            ></NavBar>
            <br></br>
            <br></br>
            <MainDiv>
                <RandTextDiv>
                    <P>Create an account or <u onClick={navToSignIn}><b>sign in</b></u></P>
                </RandTextDiv>
                <form onSubmit={onSubmitHandler}>
                    <NamesDiv>
                        <FirstNameDiv>
                            <InputDiv
                                borderColor={errors.firstName? 'red': '#000000'}
                            >
                                <TextInput
                                    required
                                    name='firstName'
                                    type='text'
                                    placeholder='First Name'
                                    value={state.firstName}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.firstName && <Error>{errors.firstName}</Error>}
                            </LabelDiv>
                        </FirstNameDiv>
                        <LastNameDiv>
                            <InputDiv
                                borderColor={errors.lastName? 'red': '#000000'}
                            >
                                <TextInput
                                    required
                                    name='lastName'
                                    type='text'
                                    placeholder='Last Name'
                                    value={state.lastName}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.lastName && <Error>{errors.lastName}</Error>}
                            </LabelDiv>
                        </LastNameDiv>
                    </NamesDiv>
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
                                borderColor={errors.phoneNumber? 'red': '#000000'}
                            >
                                <MainSelect
                                    borderColor={errors.phoneNumber? 'red': '#000000'}
                                >
                                    <Option value="">Code</Option>
                                    <Option value="option1">+1</Option>
                                    <Option value="option2">+234</Option>
                                    <Option value="option3">+23455</Option>
                                </MainSelect>
                                <TextInput
                                    required
                                    name='phoneNumber'
                                    type='phoneNumber'
                                    placeholder='Phone Number'
                                    value={state.phoneNumber}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.phoneNumber && <Error>{errors.phoneNumber}</Error>}
                            </LabelDiv>
                        </LastNameDiv>
                    </NamesDiv>
                    <NamesDiv>
                        <FirstNameDiv>
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
                        </FirstNameDiv>
                        <LastNameDiv>
                            <InputDiv
                                borderColor={errors.confirmPassword? 'red': '#000000'}
                            >
                                <TextInput
                                    required
                                    name='confirmPassword'
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={state.confirmPassword}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
                            </LabelDiv>
                        </LastNameDiv>
                    </NamesDiv>
                    <NamesDiv>
                        <FirstNameDiv>
                            <label htmlFor="file-upload">
                                <InputDiv
                                    borderColor={errors.resume? 'red': '#000000'}
                                >
                                    <UploadButton 
                                        htmlFor="file-upload"
                                        borderColor={errors.resume? 'red': '#000000'}
                                    >
                                        <P>Resume</P>
                                    </UploadButton>
                                    <SelectedFile><P>{selectedFile}</P></SelectedFile>
                                    <FileInput
                                        id="file-upload"
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handleFileUpload}
                                    />
                                </InputDiv>
                            </label>
                            <LabelDiv>
                                {errors.resume && <Error>{errors.resume}</Error>}
                            </LabelDiv>
                        </FirstNameDiv>
                        <LastNameDiv>
                            <SearchButtonDiv>
                                <MyButton
                                    backgroundColor="#000000"
                                    color="#FFFFFF"
                                    text="Sign Up"
                                    width="100%"
                                    height="100%"
                                    type="submit"
                                />
                            </SearchButtonDiv>
                        </LastNameDiv>
                    </NamesDiv>
                </form>
            </MainDiv>
        </div>
    )
}

export default SignUp;