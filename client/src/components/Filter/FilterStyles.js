import styled from "styled-components";

export const MainSelect = styled.select`
    background-color: #FFFFFF;
    padding: ${({selectedOption}) => (selectedOption? '8px': '10px')};
    padding-left: 10px
    padding-right: 20px;
    height: 40px;
    border-radius: .5rem;
    border: black solid ${({selectedOption}) => (selectedOption? '3px': '1px')};
    margin-right: 7px;
    margin-bottom: 6px;
    color: black;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: ${({selectedOption}) => (selectedOption? `none`: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7 10l5 5 5-5z"/></svg>')`)};
    background-repeat: no-repeat;
    background-position: calc(100% - 8px) center;
    background-size: 12px;
    padding-right: 24px;
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
`;

export const Option = styled.option`
    padding: 8px;
    font-size: 16px;
`;

export const P = styled.p`
  text-align: center;
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 15px;
  top: 47%;
  transform: translateY(-50%);
  size: 2px;
  cursor: pointer;
  margin-left: 4px;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: fit-content;
  display: inline-block;
`;