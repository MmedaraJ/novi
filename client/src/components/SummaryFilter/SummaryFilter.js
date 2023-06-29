import React, { useEffect, useRef, useState } from 'react';
import { 
    BP,
    Container,
    DropdownContainer, DropdownHeader, DropdownListContainer,
    DropdownListItem,
    P,
    SP,
    StickyContainer
} from './SummaryFilterStyles';
import { 
  IoIosOptions, IoMdArrowBack
} from 'react-icons/io';
import { COLORS } from '../../constants/colors';


const SummaryFilter = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        'Summary',
        'Responsibilities',
        'Qualifications',
        'Benefits',
        'Experience',
        'Certification',
        'Language',
        'Schedule'
    ];
    const dropdownRef = useRef(null); 
    const [color, setColor] = useState('black');

    const handleFocus = () => {
        setColor(`${COLORS.ORANGE}`);
    }

    const handleBlur = () => {
      if(props.selectedOptions.length > 0){
        if(props.selectedOptions.length == 1 && props.selectedOptions.includes("Summary")){
          setColor('black');
        }else{
          setColor(`${COLORS.ORANGE}`);
        }
      }else{
        setColor('black');
      }
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  
    return (
      <Container 
        ref={dropdownRef} 
        onClick={() => {
          setIsOpen(!isOpen);
          handleFocus();
        }}
        tabIndex="0"
        onBlur={handleBlur} 
      >
        <DropdownContainer>
          <DropdownHeader color={color}>
              <IoIosOptions/>
          </DropdownHeader>
          {isOpen && (
            <DropdownListContainer>
              {options.map((option, index) => (
                <DropdownListItem
                  key={index}
                  onClick={() => props.handleSelect(option)}
                  style={{
                    backgroundColor: props.selectedOptions.includes(option)
                      ? `${COLORS.LIGHT_ORANGE}`
                      : '',
                  }}
                >
                  <BP>{option}</BP>
                </DropdownListItem>
              ))}
            </DropdownListContainer>
          )}
        </DropdownContainer>
        <SP><b>&nbsp;<IoMdArrowBack/> Filter job card details</b></SP>
      </Container>
    );
  };
  
  export default SummaryFilter;