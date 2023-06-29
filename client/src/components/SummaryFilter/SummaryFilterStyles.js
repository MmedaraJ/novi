import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  position: sticky;
  top: 20px;
  z-index: 9997;
  margin-left: 20px;
  background-color: white;
  width: fit-content;
  padding-right: 10px;
  border-radius: .5rem;
  cursor: pointer;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;

export const DropdownContainer = styled.div`
  background-color: white;
  border-radius: .5rem;
  cursor: pointer;
  width: fit-content;
`;

export const DropdownHeader = styled.div`
  padding: 5px;
  border: 1px solid ${props => props.color};
  border-radius: .5rem;
  width: 25px;
`;

export const DropdownListContainer = styled.div`
  position: absolute;
  background-color: ${COLORS.BACK};
  width: 161px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;

export const DropdownListItem = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;

  &:hover{
    background-color: ${COLORS.LIGHT_ORANGE};
    color: ${COLORS.ORANGE};
  }

  &:active{
    background-color: ${COLORS.LIGHT_ORANGE};
    color: ${COLORS.ORANGE};
  }
`;

export const P = styled.p`
  font-size: x-small;
  &:hover {
    cursor: pointer;
  }
`;

export const BP = styled.h4`
  text-align: center;
  color: black;

  &:hover {
    color: ${COLORS.ORANGE};
  }

  &:active{
    color: b${COLORS.ORANGE}lack;
  }
`;

export const SP = styled.p`
  text-align: left;
  font-size: xx-small;
`;