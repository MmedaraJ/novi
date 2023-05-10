import styled from 'styled-components';

export const MainDiv = styled.div`
    position: relative;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: black solid 1px;
    break-inside: avoid;
    width: 80vw;
    text-align: left;
    max-height: 80vh;
    overflow-y: auto;
`;

export const TitleDiv = styled.div`
    justify-content: left;
    align-items: left;
`;

export const TitleText = styled.h2`
    
`;

export const CloseDiv = styled.div`
    top: 6px;  
    right: 6px;
    position: absolute;
    cursor: pointer;
`;

export const CompanyNameDiv = styled.div`
    justify-content: left;
    align-items: left;
    margin-bottom: 16px;
`;

export const CompanyNameLink = styled.a`
    color: black;
`;

export const CompanyNameText = styled.p`
    text-align: left;
`;

export const ItemsDiv = styled.div`
    margin-top: 8px;
`;

export const SP = styled.p`
  font-size: small;
  color: black;
  margin: 0px;
`;

export const JobDescDiv = styled.div`
  border-top: black solid 1px;
  margin-top: 24px;
`;

export const JDDiv = styled.div`
    margin-top: 6px;
`;

export const JDText = styled.h4`
    
`;

export const DescDiv = styled.div`
  margin-top: 24px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center; /* align the items vertically */
  margin-bottom: 4px;
`;

export const IconDiv = styled.div`
  margin-right: 10px; /* add some spacing between the icon div and the <p> tag */
`;
