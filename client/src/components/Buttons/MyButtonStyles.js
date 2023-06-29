import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const AButton = styled.button`
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 5px;
    border: none;
    border-radius: .5rem;
    cursor: pointer;

    &:disabled {
        background-color: ${COLORS.LIGHT_ORANGE};
        cursor: not-allowed;
        color: black;
    
        // &:hover {
        //   background-color: ${COLORS.LIGHT_ORANGE};
        //   cursor: pointer;
        // }
    }
`;