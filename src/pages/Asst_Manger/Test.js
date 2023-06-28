import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export const Test = () => {
  library.add(fas);
  const icons = Object.keys(fas).map((iconName, index) => (
    <div key={index}>
      <FontAwesomeIcon icon={fas[iconName]} /> {iconName}
    </div>
  ));
  const [inputs, setInputs] = useState(['']);
  const [touchedInputs, setTouchedInputs] = useState([]);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const handleInputBlur = (index) => {
    if (!touchedInputs.includes(index)) {
      setTouchedInputs([...touchedInputs, index]);
    }
  };

  const handleAddInput = () => {
    const newInputs = [...inputs, ''];
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation: Check for empty inputs
    const isEmpty = inputs.some((input) => input.trim() === '');
    if (isEmpty) {
      // Handle validation error, e.g., display an error message
      return;
    }

    // Process the submitted data
    console.log(inputs);
  };
  return (
    <div style={{ backgroundColor: 'white' }}>{icons}</div>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     {inputs.map((input, index) => (
    //       <div key={index}>
    //         <input
    //           type="text"
    //           value={input}
    //           onChange={(event) => handleInputChange(index, event)}
    //           onBlur={() => handleInputBlur(index)}
    //           style={
    //             touchedInputs.includes(index) && input.trim() === ''
    //               ? { backgroundColor: 'red' }
    //               : {}
    //           }
    //         />
    //       </div>
    //     ))}
    //     <button type="button" onClick={handleAddInput}>
    //       Add
    //     </button>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>

  )
}
