import styled from "styled-components";
import { FaCaretDown } from 'react-icons/fa';

export const MainSelect = styled.select`
    background-color: #EBECF0;
    padding: 12px;
    padding-left: 10px
    padding-right: 20px;
    height: 40px;
    border-radius: .5rem;
    border: none;
    margin-right: 7px;
    margin-bottom: 6px;
    color: black;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: calc(100% - 8px) center;
    background-size: 12px;
    padding-right: 24px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
`;

export const Option = styled.option`
    padding: 8px;
    font-size: 16px;
`;

export const P = styled.p`
  text-align: center;
`;