import React, { useEffect, useRef, useState } from 'react';
import { 
    BP,
    DropdownContainer, DropdownHeader, DropdownListContainer,
    DropdownListItem,
    P
} from './SummaryFilterStyles';
import { IoIosOptions } from 'react-icons/io';

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
      <DropdownContainer ref={dropdownRef}>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
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
                    ? '#ddd'
                    : '',
                }}
              >
                <BP>{option}</BP>
              </DropdownListItem>
            ))}
          </DropdownListContainer>
        )}
      </DropdownContainer>
    );
  };
  
  export default SummaryFilter;