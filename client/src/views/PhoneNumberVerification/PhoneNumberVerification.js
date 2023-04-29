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
    P, RandTextDiv, SearchButtonDiv, Success, TextInput
 } from './PhoneNumberVerificationStyles';
import MyButton from '../../components/Buttons/MyButton';

const PhoneNumberVerification = (props) => {
    const [state, setState] = useState({
        code: "",
    });
    const [errors, setErrors] = useState({
        code: "",
    });
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
    const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);

    useEffect(() => {
        if(phoneNumberVerified){
            setSuccess("Successful verification");
            navToHome();
        }
    }, [phoneNumberVerified]);

    const onInputChanged = (e) => {
        let code = state.code;

        const name = e.target.name;
        const value = e.target.value;

        switch(name){
            case "code":
                code = value;
                break;
            default:
        }

        if(success.length > 0){setSuccess("");}
        setErrors({});

        setState({
            code: code,
        });
    }

    const navToSignUp = () => {
        navigate('/signup');
    }

    const navToHome = () => {
        navigate('/');
    } 

    const verifyConfirmationCode = async () => {
        try {
          await axios.post(
            'http://localhost:8000/api/verify-code', 
            { confirmationCode: state.code }
        );
          setPhoneNumberVerified(true);
        } catch (error) {
            console.log(error);
            const e = error.response.data.error;
            setErrors({code: e});
        }
    };

    const sendConfirmationCode = async () => {
        const phoneNumber = localStorage.getItem('phoneNumber');
        if(phoneNumber){
            try {
              await axios.post('http://localhost:8000/api/send-code', { phoneNumber });
              setConfirmationCodeSent(true);
            } catch (error) {
              console.log(error);
              //TODO navigate to profile page
              navToHome();
            }
        }else{
            //TODO navigate to profile page
            navToHome();
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        verifyConfirmationCode();
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
                    <P>Enter the code that was sent to your phone number</P>
                </RandTextDiv>
                <form onSubmit={onSubmitHandler}>
                    <NamesDiv>
                        <FirstNameDiv>
                            <InputDiv
                                borderColor={errors.email? 'red': '#000000'}
                            >
                                <TextInput
                                    required
                                    name='code'
                                    type='text'
                                    placeholder='Code'
                                    value={state.code}
                                    onChange={onInputChanged}
                                />
                            </InputDiv>
                            <LabelDiv>
                                {errors.code && <Error>{errors.code}</Error>}
                            </LabelDiv>
                        </FirstNameDiv>
                        <LastNameDiv>
                            <SearchButtonDiv>
                                <MyButton
                                    backgroundColor="#000000"
                                    color="#FFFFFF"
                                    text="Verify"
                                    width="100%"
                                    height="100%"
                                    type="submit"
                                />
                            </SearchButtonDiv>
                        </LastNameDiv>
                    </NamesDiv>
                </form>
                <P><u onClick={sendConfirmationCode}>Resend code</u></P>
                {/* Nav to profile page */}
                <P onClick={navToHome}><u>Change phone number</u></P>
                {success && <Success>{success}</Success>}
            </MainDiv>
        </div>
    )
}

export default PhoneNumberVerification;