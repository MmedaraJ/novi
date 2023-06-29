import React, { useState } from 'react';
import RadioButtonComponent from '../../components/Radio/Radio';


const RadioButtonGroup = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <RadioButtonComponent name="option" value="option1" onChange={handleChange}>
        Option 1
      </RadioButtonComponent>
      <RadioButtonComponent name="option" value="option2" onChange={handleChange}>
        Option 2
      </RadioButtonComponent>
      <RadioButtonComponent name="option" value="option3" onChange={handleChange}>
        Option 3
      </RadioButtonComponent>
    </div>
  );
};

export default RadioButtonGroup;
