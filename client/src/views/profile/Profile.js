import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import { 
    BlankDiv,
    ButtonDiv,
    Error, FileInput, FirstNameDiv, GoogleButtonDiv, InputDiv, LabelDiv, LastNameDiv, 
    LastNameDivWithButtons, 
    MainDiv, MainSelect, MyPhoneInput, NamesDiv, Option, P, RandTextDiv, ResumeLabel, ResumeNameText, ResumeText, SearchButtonDiv, 
    SelectedFile, Success, TextInput, UploadButton 
} from './ProfileStyles';
import NavBar from '../../components/NavBar/NavBar';
import MyButton from '../../components/Buttons/MyButton';

const Profile = (props) => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        phoneNumberVerificationCode: "",
        resumeName: "",
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        phoneNumber,
        phoneNumberVerificationCode: "",
        resumeName: "",
    });
    const [success, setSuccess] = useState({
        general: "",
        phoneNumberVerification: ""
    });
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
    const [fileSrc, setFileSrc] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('userId')){
            navigate('/signin');
        }else{
            axios.post(
                'http://localhost:8000/api/user/get',
                {
                    userId: localStorage.getItem('userId').replace(/^"+|"+$/g, '')
                },
                {withCredentials: true}
            ).then(res => {
                console.log('logged in user');
                console.log(res.data.user.firstName);
                setLoggedInUser(res.data.user);
                setState({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email,
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                    phoneNumberVerificationCode: "",
                    resumeName: res.data.user.resumeName,
                });
                if(!localStorage.getItem('googleId')){
                    setPhoneNumber(res.data.user.phoneNumber);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, []);

    useEffect(() => {
        if(state.resumeName.length > 0){
            axios.get(`http://localhost:8000/api/download/${state.resumeName}`)
                .then(res => {
                    console.log(res);
                    setFileSrc(res.request.responseURL);
                    setSelectedFileName(state.resumeName);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [state.resumeName]);

    useEffect(() => {
        if(phoneNumberVerified){
            setSuccess({
                phoneNumberVerification: "Successful verification"
            });
            updatePhoneNumber();
        }
    }, [phoneNumberVerified]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handlePhoneChange = (value) => {
        setPhoneNumber(value);
        setIsSaveButtonDisabled(false);
    };

    const checkSendConfirmationCode = () => {
        if(!loggedInUser.phoneNumberVerified){
            sendConfirmationCode();
        }else{
            if(phoneNumber !== loggedInUser.phoneNumber){
                sendConfirmationCode();
            }else{
                setSuccess({
                    phoneNumberVerification: `Phone number already verified`
                });
            }
        }
    }

    const sendConfirmationCode = async () => {
        setErrors({});
        try {
            await axios.post('http://localhost:8000/api/send-code', { phoneNumber });
            setConfirmationCodeSent(true);
            setSuccess({
                phoneNumberVerification: `Verification code sent to ${phoneNumber}`
            });
        } catch (error) {
            console.log(error);
            const e = error.response.data.error;
            setErrors({phoneNumber: e});
        }
    };

    const verifyConfirmationCode = () => {
        setErrors({});
        axios.post(
            'http://localhost:8000/api/verify-code', 
            { 
                phoneNumber: phoneNumber,
                confirmationCode: state.phoneNumberVerificationCode 
            }
        ).then(res => {
            if(res.data.success){
                setPhoneNumberVerified(true);
            }else{
                setErrors({phoneNumberVerificationCode: 'Invalid verification code'});
            }
        }).catch(error => {
            console.log(error);
            const e = error.response.data.error;
            setErrors({phoneNumberVerificationCode: e});
        });
    };

    const updatePhoneNumber = () => {
        axios.post(
            'http://localhost:8000/api/user/updatePhoneNumber',
            {
                userId: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
                phoneNumber: phoneNumber
            },
            {withCredentials: true}
        ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    const verifyPassword = () => {
        axios.post(
            'http://localhost:8000/api/user/verifyPassword',
            {
                userId: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
                password: state.oldPassword
            },
            {withCredentials: true}
        ).then(res => {
            console.log(res);
            if(res.data.success){
                updateNewPassword();
            }
        }).catch(err => {
            console.log(err);
            setErrors({
                oldPassword: "Incorrect Password"
            });
        });
    }

    const updateNewPassword = () => {
        axios.post(
            'http://localhost:8000/api/user/updatePassword',
            {
                userId: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
                password: state.newPassword,
                confirmPassword: state.confirmNewPassword
            },
            {withCredentials: true}
        ).then(res => {
            console.log(res);
            if(state.email){
                updateEmail();
            }else{
                updateNames();
            }
        }).catch(err => {
            console.log(err);
            if(err.response.data.confirmNewPassword){
                setErrors({
                    confirmNewPassword: err.response.data.confirmNewPassword
                });
            }else{
                const errorArr = {};
                const errorResponse = err.response.data.errors;
    
                if(errorResponse){
                    for(const key of Object.keys(errorResponse)){
                        errorArr[key] = errorResponse[key].message;
                    }
                }
                setErrors(errorArr);
            }
        });
    }

    const updateEmail = () => {
        if(state.email !== loggedInUser.email) {
            axios.post(
                'http://localhost:8000/api/user/updateEmail',
                {
                    userId: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
                    email: state.email
                },
                {withCredentials: true}
            ).then(res => {
                console.log(res);
                updateNames();
            }).catch(err => {
                console.log(err);
                if(err.response.data.email){
                    setErrors({
                        email: err.response.data.email
                    });
                }else{
                    const errorArr = {};
                    const errorResponse = err.response.data.errors;
        
                    if(errorResponse){
                        for(const key of Object.keys(errorResponse)){
                            errorArr[key] = errorResponse[key].message;
                        }
                    }
                    setErrors(errorArr);
                }
            });
        }else{
            updateNames();
        }
    }

    const updateNames = () => {
        if(state.firstName !== loggedInUser.firstName || state.lastName !== loggedInUser.lastName) {
            axios.post(
                'http://localhost:8000/api/user/updateNames',
                {
                    userId: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
                    firstName: state.firstName,
                    lastName: state.lastName
                },
                {withCredentials: true}
            ).then(res => {
                console.log(res);
                if(state.resumeName){
                    updateResumeName();
                }else{
                    setSuccess({
                        general: "Successfully updated"
                    });
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
        }else{
            if(state.resumeName){
                updateResumeName();
            }else{
                setSuccess({
                    general: "Successfully updated"
                });
                navToHome();
            }
        }
    }

    const updateResumeName = () => {
        if(state.resumeName !== loggedInUser.resumeName) {
            axios.post(
                'http://localhost:8000/api/user/updateResumeName',
                {
                    userId: localStorage.getItem('userId').replace(/^"+|"+$/g, ''),
                    resumeName: state.resumeName
                },
                {withCredentials: true}
            ).then(res => {
                console.log(res);
                setSuccess({
                    general: "Successfully updated"
                });
                navToHome();
            }).catch(err => {
                console.log(err);const errorArr = {};
                const errorResponse = err.response.data.errors;

                if(errorResponse){
                    for(const key of Object.keys(errorResponse)){
                        errorArr[key] = errorResponse[key].message;
                    }
                }
                setErrors(errorArr);
            });
        }else{
            setSuccess({
                general: "Successfully updated"
            });
            navToHome();
        }
    }

    const onInputChanged = (e) => {
        let firstName = state.firstName;
        let lastName = state.lastName;
        let email = state.email;
        let oldPassword = state.oldPassword;
        let newPassword = state.newPassword;
        let confirmNewPassword = state.confirmNewPassword;
        let resumeName = state.resumeName;
        let phoneNumberVerificationCode = state.phoneNumberVerificationCode;

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
            case "oldPassword":
                oldPassword = value;
                break;
            case "newPassword":
                newPassword = value;
                break;
            case "confirmNewPassword":
                confirmNewPassword = value;
                break;
            case "phoneNumberVerificationCode":
                phoneNumberVerificationCode = value;
                break;
            default:
        }

        setSuccess({});
        setErrors({});

        setState({
            firstName: firstName,
            lastName: lastName,
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
            resumeName: resumeName,
            phoneNumberVerificationCode: phoneNumberVerificationCode,
        });

        setIsSaveButtonDisabled(false);
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
        console.log(file);
        let fileName = file? file.name: null;
        setSelectedFileName(fileName);
        uploadFileToGridFs(file? file: null);
        setIsSaveButtonDisabled(false);
    }

    const uploadFileToGridFs = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log(`selectedFile:::::___ ${file}`);

        if(file){
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
                        oldPassword: state.oldPassword,
                        newPassword: state.newPassword,
                        confirmNewPassword: state.confirmNewPassword,
                        phoneNumberVerificationCode: state.phoneNumberVerificationCode,
                        resumeName: originalname,
                    });
                }
            }).catch(err => console.log(err));
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!localStorage.getItem('googleId')){
            if(state.oldPassword && state.newPassword && state.confirmNewPassword){
                verifyPassword();
            }else if(state.oldPassword || state.newPassword || state.confirmNewPassword){
                setErrors({
                    password: "Incomplete password information"
                });
            }else{
                if(state.email){
                    updateEmail();
                }else{
                    updateNames();
                }
            }
        }else{
            if(state.email){
                updateEmail();
            }else{
                updateNames();
            }
        }
    }

    return(
        <div>
            <NavBar/>
            <br></br>
            <br></br>
            <MainDiv>
                <RandTextDiv>
                    <P>Hi <b>{
                        loggedInUser?
                        loggedInUser.firstName:
                        state.firstName
                    }</b>, edit your profile</P>
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
                    {!localStorage.getItem('googleId') && 
                        <div>
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
                                <BlankDiv>
                                </BlankDiv>
                            </NamesDiv>
                            <RandTextDiv>
                                <P>Password</P>
                            </RandTextDiv>
                            <RandTextDiv>
                                {errors.password && <Error>{errors.password}</Error>}
                            </RandTextDiv>
                            <RandTextDiv>
                                {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
                            </RandTextDiv>
                            <NamesDiv>
                                <FirstNameDiv>
                                    <InputDiv
                                        borderColor={errors.oldPassword? 'red': '#000000'}
                                    >
                                        <TextInput
                                            name='oldPassword'
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder='Old Password'
                                            value={state.oldPassword}
                                            onChange={onInputChanged}
                                        />
                                        <div style={{marginRight: '4px'}} onClick={togglePasswordVisibility}>
                                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </InputDiv>
                                    <LabelDiv>
                                        {errors.oldPassword && <Error>{errors.oldPassword}</Error>}
                                    </LabelDiv>
                                </FirstNameDiv>
                                <LastNameDiv>
                                    <InputDiv
                                        borderColor={errors.newPassword? 'red': '#000000'}
                                    >
                                        <TextInput
                                            name='newPassword'
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder='New Password'
                                            value={state.newPassword}
                                            onChange={onInputChanged}
                                        />
                                        <div style={{marginRight: '4px'}} onClick={togglePasswordVisibility}>
                                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </InputDiv>
                                    <LabelDiv>
                                        {errors.newPassword && <Error>{errors.newPassword}</Error>}
                                    </LabelDiv>
                                </LastNameDiv>
                            </NamesDiv>
                            <NamesDiv>
                                <FirstNameDiv>
                                    <InputDiv
                                        borderColor={errors.confirmNewPassword? 'red': '#000000'}
                                    >
                                        <TextInput
                                            name='confirmNewPassword'
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder='Confirm New Password'
                                            value={state.confirmNewPassword}
                                            onChange={onInputChanged}
                                        />
                                        <div style={{marginRight: '4px'}} onClick={togglePasswordVisibility}>
                                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </InputDiv>
                                    <LabelDiv>
                                        {errors.confirmNewPassword && <Error>{errors.confirmNewPassword}</Error>}
                                    </LabelDiv>
                                </FirstNameDiv>
                                <BlankDiv>
                                </BlankDiv>
                            </NamesDiv>
                        </div>
                    }
                    <RandTextDiv>
                        <P>Phone Number</P>
                    </RandTextDiv>
                    <NamesDiv>
                        <FirstNameDiv>
                            <InputDiv
                                borderColor={errors.phoneNumber? 'red': '#000000'}
                            >
                                <MyPhoneInput
                                    placeholder='Phone Number'
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.phoneNumber && <Error>{errors.phoneNumber}</Error>}
                            </LabelDiv>
                        </FirstNameDiv>
                        <LastNameDivWithButtons>
                            <SearchButtonDiv>
                                <MyButton
                                    backgroundColor="#000000"
                                    color="#FFFFFF"
                                    text="Send Verification Code"
                                    width="100%"
                                    height="100%"
                                    type="button"
                                    onClick={checkSendConfirmationCode}
                                    disabled={
                                        phoneNumber && 
                                        phoneNumber.length>0? 
                                            loggedInUser.phoneNumberVerified?
                                                phoneNumber===loggedInUser.phoneNumber? true: false:
                                            false:
                                        true
                                    }
                                />
                            </SearchButtonDiv>
                        </LastNameDivWithButtons>
                    </NamesDiv>
                    <br></br>
                    <NamesDiv>
                        <FirstNameDiv>
                            <InputDiv
                                borderColor={errors.phoneNumberVerificationCode? 'red': '#000000'}
                            >
                                <TextInput
                                    name='phoneNumberVerificationCode'
                                    type='text'
                                    placeholder='Verification Code'
                                    value={state.phoneNumberVerificationCode}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.phoneNumberVerificationCode && <Error>{errors.phoneNumberVerificationCode}</Error>}
                            </LabelDiv>
                        </FirstNameDiv>
                        <LastNameDivWithButtons>
                            <SearchButtonDiv>
                                <MyButton
                                    backgroundColor="#000000"
                                    color="#FFFFFF"
                                    text="Verify"
                                    width="100%"
                                    height="100%"
                                    type="button"
                                    onClick={verifyConfirmationCode}
                                    disabled={
                                        state.phoneNumberVerificationCode && 
                                        state.phoneNumberVerificationCode.length > 0? false: true
                                    }
                                />
                            </SearchButtonDiv>
                        </LastNameDivWithButtons>
                    </NamesDiv>
                    {success.phoneNumberVerification && <Success>{success.phoneNumberVerification}</Success>}
                    <br></br>
                    <br></br>
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
                                            (<P><span style={{color: "gray"}}>Upload Resume</span></P>)
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
                        <LastNameDivWithButtons>
                            <SearchButtonDiv>
                                {
                                    fileSrc &&
                                    <a href={fileSrc} download>
                                        <MyButton
                                            backgroundColor="#000000"
                                            color="#FFFFFF"
                                            text="Download Resume"
                                            width="100%"
                                            height="100%"
                                            type="button"
                                        />
                                    </a>
                                }
                            </SearchButtonDiv>
                        </LastNameDivWithButtons>
                    </NamesDiv>
                    <br></br>
                    <br></br>
                    <ButtonDiv>
                        <GoogleButtonDiv>
                            <MyButton
                                backgroundColor="#000000"
                                color="#FFFFFF"
                                text="Save"
                                width="100%"
                                height="100%"
                                type="submit"
                                disabled={isSaveButtonDisabled}
                            />
                        </GoogleButtonDiv>
                    </ButtonDiv>
                    {success.general && <Success>{success.general}</Success>}
                </form>
            </MainDiv>
        </div>
    )
}

export default Profile;