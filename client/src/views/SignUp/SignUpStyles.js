import styled from "styled-components";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { COLORS } from "../../constants/colors";

export const MainDiv = styled.div`
    background-color: ${COLORS.BACK};
    height: max;
    width: max;
    padding: 2%;
    padding-left: 40%;
    padding-right: 40%;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1090px) {
        padding-left: 38%;
        padding-right: 38%;
    }

    @media screen and (max-width: 910px) {
        padding-left: 35%;
        padding-right: 35%;
    }

    @media screen and (max-width: 730px) {
        padding-left: 32%;
        padding-right: 32%;
    }

    @media screen and (max-width: 610px) {
        padding-left: 30%;
        padding-right: 30%;
    }

    @media screen and (max-width: 550px) {
        padding-left: 27%;
        padding-right: 27%;
    }

    @media screen and (max-width: 473px) {
        padding-left: 25%;
        padding-right: 25%;
    }

    @media screen and (max-width: 435px) {
        padding-left: 22%;
        padding-right: 22%;
    }

    @media screen and (max-width: 390px) {
        padding-left: 18%;
        padding-right: 18%;
    }

    @media screen and (max-width: 350px) {
        padding-left: 15%;
        padding-right: 15%;
    }

    @media screen and (max-width: 319px) {
        padding-left: 10%;
        padding-right: 10%;
    }
`;

export const Footer = styled.div`
    background-color: ${COLORS.BACK};
    height: 60px;
    justify-content: center;
    align-items: center;
`;

export const FirstNameDiv = styled.div`
    height: 60px;
    display: block;
    margin-right: 0px;
`;

export const LastNameDiv = styled.div`
    height: 60px;
    display: block;
    margin-top: 12px;

    @media screen and (max-width: 425px) {
        margin-top: 12px;
    }
`;

export const NamesDiv = styled.div`
    display: block;
    margin-top: 12px;
    margin-bottom: 12px;
`;

export const RandTextDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;

export const InputDiv = styled.div`
    display: flex;
    order: 1;
    height: 35px;
    border: 1px solid;
    border-color: ${props => props.borderColor};
    border-radius: .5rem;
    padding: 0.25rem;
    align-items: center;
`;

export const TextInput = styled.input`
    padding: 5px;
    color: black;
    border: none;
    flex: 1;
    width: 100%;
    background-color: ${COLORS.BACK};

    &:focus {
        outline: none;
        border: none;
    }
`;

export const LabelDiv = styled.div`
    height: fit-content;
    text-align: start;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 0px;
    height: fit-content;
`;

export const P = styled.p`
  font-size: small;
  color: #000000;
`;

export const UP = styled.p`
  font-size: small;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;

export const Error = styled.p`
    color: red;
    font-size: xx-small;
    text-align: start;
    margin-top: 4px;
    margin-bottom: 0px;
`;

export const Success = styled.p`
    color: green;
    font-size: xx-small;
    text-align: center;
`;

export const ResumeText = styled.p`
    color: #000000;
    font-size: small;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 7px;
    padding-right: 8px;
    padding-left: 4px;
`;

export const ResumeNameText = styled.p`
    color: #000000;
    font-size: xx-small;
    text-align: center;
    padding: 0px;
    margin: 0px;
`;

export const MainSelect = styled.select`
    background-color: #FFFFFF;
    padding-left: 8px;
    //height: 35px;
    width: fit-content;
    border: none;
    border-right: ${props => props.borderColor} solid 1px;
    border-radius: 0px;
    color: black;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: calc(100% - 8px) center;
    background-size: 12px;
    padding-right: 8px;
    -moz-appearance: none;
    -webkit-appearance: none;
    height: 100%;

    &:focus {
      outline: none;
    }
`;

export const Option = styled.option`
    padding: 8px;
    font-size: small;
`;

export const FileInput = styled.input`
    display: none;
`;

export const SelectedFile = styled.div`
    padding-left: 8px;
    padding: 8px
`;

export const UploadButton = styled.label`
  display: inline-block;
  border-right: ${props => props.borderColor} solid 1px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  height: 30px;

  &:hover {
    background-color: none;
  }
`;

export const SearchButtonDiv = styled.div`
    width: 100%;
    height: 45px;
    align-items: center;
`;

export const ResumeLabel = styled.label`
    align-items: center;
    justify-content: center;
`;

export const GoogleButtonDiv = styled.div`
    height: 45px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 0px;
`;

export const ButtonDiv = styled.div`
    display: flex;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: center;
    margin-top: 0px;
`;

export const MyPhoneInput = styled(PhoneInput)`
    padding: 5px;
    padding: 10px 10px;
    color: black;
    border: none;
    flex: 1;
    width: 100%;

    &:focus {
        outline: none;
        border: white;
    }

    & *{
        &:focus {
            outline: none;
            border: white;
        }
    }
`;
