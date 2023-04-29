import styled from "styled-components";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const MainDiv = styled.div`
    background-color: #FFFFFF;
    height: max;
    width: max;
    padding: 2%;
    padding-left: 16%;
    padding-right: 16%;
    justify-content: center;
    align-items: center;
`;

export const FirstNameDiv = styled.div`
    flex: 1;
    order: 0;
    margin-right: 30px;
    height: 60px;

    @media screen and (max-width: 768px) {
        display: block;
        margin-right: 0px;
    }
`;

export const LastNameDiv = styled.div`
    flex: 1;
    order: 1;
    height: 60px;

    @media screen and (max-width: 768px) {
        display: block;
        margin-top: 16px;
    }

    @media screen and (max-width: 425px) {
        margin-top: 12px;
    }
`;

export const NamesDiv = styled.div`
    display: flex;
    margin-bottom: 16px;

    @media screen and (max-width: 768px) {
        display: block;
        margin-top: 12px;
        margin-bottom: 12px;
    }
`;

export const RandTextDiv = styled.div`
    justify-content: start;
    align-items: start;
    display: flex;

    @media screen and (max-width: 768px) {
        justify-content: center;
        align-items: center;
        padding: 0px;
    }
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
    padding 10px 10px;
    color: black;
    border: none;
    flex: 1;
    width: 100%;

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
    font-size: 14px;
    padding-left: 8px;
`;

export const UploadButton = styled.label`
  display: inline-block;
  padding-bottom: 6px;
  padding-left: 8px;
  padding-right: 8px;
  border-right: ${props => props.borderColor} solid 1px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  height: 100%;

  &:hover {
    background-color: none;
  }
`;

export const SearchButtonDiv = styled.div`
    width: 100%;
    height: 45px;
    align-items: center;
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
