import React, { useState } from 'react'
import classes from './DoctorSearchInput.module.css'

import LoadingBar from 'react-top-loading-bar';
export const DoctorSearchInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
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
  const handleClickSendToAction = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

props.api(enteredName)
setIsLoading(false);
setEnteredName('');
setEnteredNameTouched(false);



  }

  return (
    <div className={classes['input-group']}>
      <div>
        <input
          type="email"
          className={`${classes['input']} ${nameInputIsInvalid ? classes.invalid : ''} `}
          id="Email"
          name="Email"
          placeholder={props.name}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        <button disabled={!formIsValid} onClick={handleClickSendToAction} className={classes['button--submit']} type="submit" >ابحث</button>


      </div>
      {nameInputIsInvalid && (
        <p className={`error-text ${classes.a}`}>الأسم لا يجب ان يكون فارغ    .</p>
      )}
         {
       isLoading &&  <LoadingBar color='#f11946'  progress={100} height={5}  loaderSpeed={15000} transitionTime={15000} />
      }
    </div>

  )
}
