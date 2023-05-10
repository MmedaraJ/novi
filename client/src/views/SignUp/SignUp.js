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
  useNavigate
} from "react-router-dom";
import { 
    ButtonDiv,
    Error, FileInput, FirstNameDiv, GoogleButtonDiv, InputDiv, LabelDiv, LastNameDiv, 
    MainDiv, MainSelect, MyPhoneInput, NamesDiv, Option, P, RandTextDiv, ResumeLabel, ResumeNameText, ResumeText, SearchButtonDiv, 
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
        resumeName: ""
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profile, setProfile] = useState([]);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        resumeName: "",
        googleSignUp: ""
    });
    const [success, setSuccess] = useState("");
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(phoneNumber != "") localStorage.setItem('phoneNumber', JSON.stringify(phoneNumber));
    }, [phoneNumber]);

    useEffect(() => {
        if(confirmationCodeSent) navToPhoneNumberVerification();
    }, [confirmationCodeSent]);

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
                        registerGoogleSignUpUser(res.data);
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

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

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
        let resumeName = state.resumeName;

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
            resumeName: resumeName,
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
        setSelectedFileName(fileName);
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
                const originalname = response.data.file.originalname;
                console.log(`File uploaded with ORIGINAL NAME ${originalname}`);
                if(originalname){
                    setState({
                        firstName: state.firstName,
                        lastName: state.lastName,
                        email: state.email,
                        password: state.password,
                        confirmPassword: state.confirmPassword,
                        resumeName: originalname,
                    });
                }
                onSubmitHandler(originalname);
            }).catch(err => console.log(err));
        }else{
            onSubmitHandler();
        }
    };

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
                resumeName: getRandomLetters(1),
                googleSignInId: prof.id
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
                resumeName: "",
            });
            setPhoneNumber("");
            setSuccess(res.data.msg);
            localStorage.removeItem('userId');
            localStorage.removeItem('usertoken');
            localStorage.removeItem('googleId');
            localStorage.setItem('userId', JSON.stringify(res.data.user._id));
            localStorage.setItem('googleId', JSON.stringify(prof.id));
            navToHome();
        }).catch(err => {
            console.log(err);
            getGoogleSignedInUser(prof);
            setErrors({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                resumeName: "",
                googleSignUp: ""
            });
        });
    }

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

    const onSubmitHandler = (originalname) => {
        axios.post(
            "http://localhost:8000/api/user/create", 
            {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                phoneNumber: phoneNumber,
                phoneNumberVerified: false,
                password: state.password,
                confirmPassword: state.confirmPassword,
                resumeName: originalname
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
                resumeName: "",
            });
            setPhoneNumber("");
            setSuccess(res.data.msg);
            localStorage.removeItem('userId');
            localStorage.removeItem('usertoken');
            localStorage.removeItem('googleId');
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
            <NavBar/>
            <br></br>
            <br></br>
            <MainDiv>
                <RandTextDiv>
                    <P>Create an account or <u onClick={navToSignIn}><b>sign in</b></u></P>
                </RandTextDiv>
                <RandTextDiv>
                    {errors.googleSignUp && <P style={{color: "red"}}>{errors.googleSignUp}</P>}
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
                        </FirstNameDiv>
                        <LastNameDiv>
                            <InputDiv
                                borderColor={errors.confirmPassword? 'red': '#000000'}
                            >
                                <TextInput
                                    required
                                    name='confirmPassword'
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    minLength={5}
                                    value={state.confirmPassword}
                                    onChange={onInputChanged}
                                />
                                <div style={{marginRight: '4px'}} onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </InputDiv>
                            <LabelDiv>
                                {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
                            </LabelDiv>
                        </LastNameDiv>
                    </NamesDiv>
                    <NamesDiv>
                        <FirstNameDiv>
                            <ResumeLabel htmlFor="file-upload">
                                <InputDiv
                                    borderColor={errors.resumeName? 'red': '#000000'}
                                >
                                    <UploadButton 
                                        htmlFor="file-upload"
                                        borderColor={errors.resumeName? 'red': '#000000'}
                                    >
                                        <ResumeText>Resume</ResumeText>
                                    </UploadButton>
                                    <SelectedFile>
                                        {
                                            selectedFileName?
                                            <ResumeNameText>{selectedFileName.substring(0, 58)}</ResumeNameText>:
                                            (<P><span style={{color: "gray"}}>Optional</span></P>)
                                        }
                                    </SelectedFile>
                                    <FileInput
                                        id="file-upload"
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handleFileUpload}
                                    />
                                </InputDiv>
                            </ResumeLabel>
                            <LabelDiv>
                                {errors.resumeName && <Error>{errors.resumeName}</Error>}
                            </LabelDiv>
                        </FirstNameDiv>
                    </NamesDiv>
                    <ButtonDiv>
                        <GoogleButtonDiv>
                            <MyButton
                                backgroundColor="#000000"
                                color="#FFFFFF"
                                text="Sign Up"
                                width="100%"
                                height="100%"
                                type="submit"
                            />
                        </GoogleButtonDiv>
                    </ButtonDiv>
                    <P>or</P>
                    <ButtonDiv>
                        <GoogleButtonDiv>
                            <MyButton
                                backgroundColor="#000000"
                                color="#FFFFFF"
                                text="Sign up with Google"
                                width="100%"
                                height="100%"
                                type="button"
                                onClick={login}
                                icon={<FcGoogle/>}
                            />
                        </GoogleButtonDiv>
                    </ButtonDiv>
                </form>
            </MainDiv>
        </div>
    )
}

export default SignUp;