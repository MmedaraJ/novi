import styled from "styled-components";

export const AButton = styled.button`
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 5px;
    border: none;
    border-radius: .5rem;

    &:disabled {
        background-color: #9e9e9e;
        cursor: not-allowed;
    
        &:hover {
          background-color: #9e9e9e;
        }
    }
`;