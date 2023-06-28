import React, { useState } from 'react'
import classes from './DeleteAccountDoctorForm.module.css'
import { MainInput } from '../../UI/MainInput';
import { ModalForDeleteDoctorAccount } from './ModalForDeleteDoctorAccount';
export const DeleteAccountDoctorForm = (props) => {

    const [modalDeleteDoctorAccountIsOpen, setmodalDeleteDoctorAccountIsOpen] = useState(false)

    const handleClosemodalDeleteDoctorAccount = () => {
        setmodalDeleteDoctorAccountIsOpen(false)
    }

    const handleOpenmodalDeleteDoctorAccount = () => {

        setmodalDeleteDoctorAccountIsOpen(true)
    }

    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const enteredNameIsValid = enteredName.trim().length === 11;
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
    const idSyrConfiguration = { type: 'number', label: 'الرقم الوطني' }
    return (
        <div className={classes.container}>
            <div><h4>لحذف حساب فئة طبية ادخل الرقم الوطني </h4></div>
            <div className={classes.form_}>

                <div>
                    <MainInput
                        configuration={idSyrConfiguration}

                        onChange={nameInputChangeHandler}
                        onBlur={nameInputBlurHandler}
                        value={enteredName}
                        isInvalid={nameInputIsInvalid}
                    />


                </div>
                <button onClick={handleOpenmodalDeleteDoctorAccount} disabled={!formIsValid} className={classes.button}>
                    حذف
                </button>

            </div>
            {nameInputIsInvalid && <p className='error-text'>الرقم الوطني أقل أو أكثر من 11 خانة</p>}


            {modalDeleteDoctorAccountIsOpen && <ModalForDeleteDoctorAccount idSyr={enteredName} close={handleClosemodalDeleteDoctorAccount} />}
        </div>
    )
}
