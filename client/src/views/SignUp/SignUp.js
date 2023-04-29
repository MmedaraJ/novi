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
    MainDiv, MainSelect, MyPhoneInput, NamesDiv, Option, P, RandTextDiv, SearchButtonDiv, 
    SelectedFile, TextInput, UploadButton 
} from './SignUpStyles';
import NavBar from '../../components/NavBar/NavBar';
import MyButton from '../../components/Buttons/MyButton';

const SignUp = (props) => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        resumeId: ""
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        resumeId: ""
    });
    const [success, setSuccess] = useState("");
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        handleFileNameLengthOnWindowSizeChange();
    }, [windowWidth]);

    useEffect(() => {
        if(phoneNumber != "") localStorage.setItem('phoneNumber', JSON.stringify(phoneNumber));
    }, [phoneNumber]);

    useEffect(() => {
        if(confirmationCodeSent) navToPhoneNumberVerification();
    }, [confirmationCodeSent]);

    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
    };

    const sendConfirmationCode = async () => {
        try {
          await axios.post('http://localhost:8000/api/send-code', { phoneNumber });
          setConfirmationCodeSent(true);
        } catch (error) {
          console.log(error);
        }
    };

    const onInputChanged = (e) => {
        let firstName = state.firstName;
        let lastName = state.lastName;
        let email = state.email;
        let password = state.password;
        let confirmPassword = state.confirmPassword;
        let resumeId = state.resumeId;

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
            case "password":
                password = value;
                break;
            case "confirmPassword":
                confirmPassword = value;
                break;
            default:
        }

        if(success.length > 0){setSuccess("");}
        setErrors({});

        setState({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            resumeId: resumeId,
        });
    }

    const navToPhoneNumberVerification = () => {
        navigate('/phoneNumberVerification');
    } 

    const navToSignIn = () => {
        navigate('/signin');
    } 

    const navToHome = () => {
        navigate('/');
    } 

    function handleFileUpload(event) {
        const file = event.target.files[0];
        setSelectedFile(file? file: null);
        console.log(selectedFile);
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
        setSelectedFileName(fileName);
    }

    function handleFileNameLengthOnWindowSizeChange(){
        if(windowWidth >= 2560) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 251): null);
        else if(windowWidth >= 1440) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 120): null);
        else if(windowWidth >= 1024) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 80): null);
        else if(windowWidth > 768 && windowWidth < 909) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 50): null);
        else if(windowWidth > 431) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 60): null);
        else if(windowWidth >= 375) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 50): null);
        else if(windowWidth >= 320) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 40): null);
        else if(windowWidth < 320) setSelectedFileName(selectedFileName? selectedFileName.substring(0, 20): null);
    }

    const uploadFileToGridFs = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log(`selectedFile:::::___ ${selectedFile}`);

        if(selectedFile){
            axios.post(
                "http://localhost:8000/api/upload", 
                formData
            ).then((response) => {
                console.log(response.data);
                const fileId = response.data.file.id;
                console.log(`File uploaded with ID ${fileId}`);
                if(fileId){
                    setState({
                        firstName: state.firstName,
                        lastName: state.lastName,
                        email: state.email,
                        password: state.password,
                        confirmPassword: state.confirmPassword,
                        resumeId: fileId,
                    });
                }
                onSubmitHandler(fileId);
            }).catch(err => console.log(err));
        }else{
            onSubmitHandler();
        }
    };

    const onSubmitHandler = (fileId) => {
        axios.post(
            "http://localhost:8000/api/user/create", 
            {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                phoneNumber: phoneNumber,
                password: state.password,
                confirmPassword: state.confirmPassword,
                resumeId: fileId,
            },
            { withCredentials: true },
        ).then(res => {
            console.log(res);
            setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                resumeId: "",
            });
            setPhoneNumber("");
            setSuccess(res.data.msg);
            localStorage.setItem('usertoken', JSON.stringify(res.data.token));
            localStorage.setItem('userId', JSON.stringify(res.data.user._id));
            sendConfirmationCode();
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
                <form onSubmit={uploadFileToGridFs}>
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
                                <MyPhoneInput
                                    required
                                    placeholder='Phone Number'
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
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
                                    borderColor={errors.resumeId? 'red': '#000000'}
                                >
                                    <UploadButton 
                                        htmlFor="file-upload"
                                        borderColor={errors.resumeId? 'red': '#000000'}
                                    >
                                        <P>Resume</P>
                                    </UploadButton>
                                    <SelectedFile>
                                        <P>
                                            {
                                                selectedFileName?
                                                selectedFileName:
                                                (<span style={{color: "gray"}}>Optional</span>)
                                            }
                                        </P>
                                    </SelectedFile>
                                    <FileInput
                                        id="file-upload"
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handleFileUpload}
                                    />
                                </InputDiv>
                            </label>
                            <LabelDiv>
                                {errors.resumeId && <Error>{errors.resumeId}</Error>}
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