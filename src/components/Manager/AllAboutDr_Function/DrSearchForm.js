import React, { useState } from 'react'
import classes from './DrSearchForm.module.css'
import { MainInput } from '../../UI/MainInput'
import LoadingBar from 'react-top-loading-bar';
import { useLocation } from 'react-router-dom';
export const DrSearchForm = (props) => {
    const {state} = useLocation();
    const check= state!==null && props.fromIdSyr
// const { idSyr } = state;
console.log(state)
    const [enteredName, setEnteredName] = useState(`${check?state.idSyr:''}`);
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    function containsSpecialCharacters(str) {
        var pattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        return pattern.test(str);
      }
    
    const enteredNameIsValid = props.fromIdSyr?enteredName.trim().length===11 : enteredName.trim() !== '' &&!containsSpecialCharacters(enteredName);
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

    const nameConfiguration = { type: props.fromIdSyr?'number':'text', label: props.name}
    return (

        <div className={classes.container}>
            <div>
                <MainInput
                    configuration={nameConfiguration}
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                    isInvalid={nameInputIsInvalid}
                    in="yes"
                    la="yes"

                />
                {nameInputIsInvalid && (
                    <p className={`error-text ${classes.a}`}>{props.fromIdSyr?'الرقم أقل أو أكثر من 11 خانة.':'الأسم لا يجب ان يكون فارغ.'}</p>
                )}
            </div>
            <button disabled={!formIsValid} onClick={handleClickSendToAction}> ابحث</button>
            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>


    )
}
