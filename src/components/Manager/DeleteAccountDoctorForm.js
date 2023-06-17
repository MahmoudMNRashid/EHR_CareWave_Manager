import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import classes from './DeleteAccountDoctorForm.module.css'
export const DeleteAccountDoctorForm = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
 console.log(props.a)
  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };


 
 
 
  return (
    <div className={classes.form_}>
    <Form.Group className="mb-3" controlId="formBasicText">
     
      <Form.Control
        className={classes.input_}
         type="text"
          placeholder="ادخل الرقم الوطني"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
          isInvalid={nameInputIsInvalid}
            />      
    </Form.Group>

    <button onClick={()=>{
      props.a(enteredName)
      props.onClick()
    }} disabled={!formIsValid} variant="primary"  className={classes.button}   >
     حذف
    </button>
    
  </div>
  )
}
