import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { COLORS } from "../../constants/colors";

export const JobDiv = styled.div`
    position: relative; 
    background-color: ${({ isVisible }) => isVisible ? `${COLORS.LIGHT_ORANGE}` : `${COLORS.OFF_WHITE}`};
    padding: 1.2rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: .5rem;
    border: 1px solid ${({ isVisible }) => isVisible ? `${COLORS.ORANGE}` : 'black'};
    break-inside: avoid;
    margin-bottom: 1rem;
    box-sizing: border-box;
    cursor: pointer;

    &:hover{
      border: 1px solid ${COLORS.ORANGE};
      background-color: ${COLORS.LIGHT_ORANGE};
    }
  
    &:active{
      border: 1px solid ${COLORS.ORANGE};
      background-color: ${COLORS.LIGHT_ORANGE};
    }
`;

export const TitleDiv = styled.div`
    position: relative;
    padding-top: 4px;
    ::after {
        content: "";
        position: absolute;
        left: 40px; 
        right: 40px;
        bottom: 0;
        border-bottom: 1px solid black;
    }
`;

export const CheckIcon = styled(FaCheck)`
  position: absolute;
  top: 10px;  // adjust this for the desired margin from the top
  right: 10px;  // adjust this for the desired margin from the right
  cursor: pointer;
`;

export const CompanyNameDiv = styled.div`
    margin-top: 4px;
`;

export const LocationDiv = styled.div`

`;

export const DescriptionSummaryDiv = styled.div`
    text-align: left;
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const BottomLeftDiv = styled.div`
    position: absolute;
    bottom: 2px;  
    left: 6px;
`;

export const BottomRightDiv = styled.div`
    position: absolute;
    bottom: 2px;  
    right: 6px;
`;

export const TopLeftDiv = styled.div`
  position: absolute;
  top: 6px;  
  left: 6px;
  display: flex;
  align-items: flex-start;
`;

export const P = styled.p`
  font-size: small;
  color: #000000;
  margin: 0px;
`;

export const LP = styled.p`
  font-size: small;
  color: #000000;
  margin: 0px;
  text-align: left;
`;

export const SP = styled.p`
  font-size: xx-small;
  color: #000000;
  margin: 0px;
`;

export const NSP = styled.p`
  font-size: xx-small;
  color: #000000;
  margin: 0px;
  margin-top: 3px;
`;

export const NNSP = styled.p`
  font-size: xx-small;
  color: #000000;
  margin: 0px;
  margin-top: 2px;
`;

export const GraySP = styled.p`
  font-size: xx-small;
  color: black;
  margin: 0px;
`;

export const PayDiv = styled.div`
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
`;

export const PopUp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: white;
  border-radius: .5rem;
  cursor: auto;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center; /* align the items vertically */
  margin-bottom: 4px;
`;

export const IconDiv = styled.div`
  margin-right: 10px; /* add some spacing between the icon div and the <p> tag */
  cursor: pointer;
`;