import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: sticky;
  top: 1rem;
  width: 35px;
  z-index: 9997;
  background-color: #ffffff;
  border-radius: .5rem;
  margin-left: 1rem;
  //padding-top: 1rem;
  cursor: pointer;
`;

export const DropdownHeader = styled.div`
  padding: 5px;
  border: 1px solid #000000;
  border-radius: .5rem;
`;

export const DropdownListContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;

export const DropdownListItem = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
`;

export const P = styled.p`
  font-size: x-small;
  &:hover {
    cursor: pointer;
  }
`;

export const BP = styled.p`
  text-align: center;
  font-size: small;
`;