import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForUpdateOrAddTip.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAdd, faRefresh } from '@fortawesome/free-solid-svg-icons';

import LoadingBar from 'react-top-loading-bar';
import { MainInput } from '../../UI/MainInput'
import { MainTextArea } from '../../UI/MainTextArea';
import { toast } from 'react-toastify';
import { getToken } from '../../../Util/Auth';

const UpdateOrAddTip = (props) => {
    console.log(props)
    const [enteredName, setEnteredName] = useState(props.data ? props.data.titile : '');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    const [enteredDesc, setEnteredDesc] = useState(props.data ? props.data.post : '');
    const [enteredDescTouched, setEnteredDescTouched] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const enteredNameIsValid = enteredName.trim() !== '' && enteredName.length !== '';
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

    const enteredDescIsValid = enteredDesc !== '' && enteredDesc.length !== '';
    const DescInputIsInvalid = !enteredDescIsValid && enteredDescTouched;

    let formIsValid = false;

    if (enteredNameIsValid && enteredDescIsValid) {
        formIsValid = true;
    }

    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const DescInputChangeHandler = (event) => {
        setEnteredDesc(event.target.value);
    };

    const nameInputBlurHandler = (event) => {
        setEnteredNameTouched(true);
    };

    const DescInputBlurHandler = (event) => {
        setEnteredDescTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredNameTouched(true);
        if (!enteredNameIsValid || !enteredDescIsValid) {
            return;
        }
        if (props.edit === true) {
            const info = {
                id: props.data.id,
                title: enteredName,
                post: enteredDesc
            }

            try {
                const response = await fetch('http://localhost:8000/v1/Tips/updateTips', {
                    method: 'PUT',
                    body: JSON.stringify(info),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${getToken()} `


                    },
                });



                if (!response.ok) {
                    const data = await response.json()
                    throw data;
                }

                toast.success('تم تعديل النصيحة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                props.refreash()

            } catch (error) {
                toast.error('!حدث خطأ ما', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });


            }


            setIsLoading(false);
            setEnteredName('');
            setEnteredNameTouched(false);

            setEnteredDesc('');
            setEnteredDescTouched(false);








        }

        if (props.edit === false) {

            const info = {
                title: enteredName,
                post: enteredDesc
            }
            console.log(info)

            // console.log(enteredDesc)
            try {
                const response = await fetch('http://localhost:8000/v1/Tips/addTips', {
                    method: 'POST',
                    body: JSON.stringify(info),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${getToken()} `


                    },
                });
                if (!response.ok) {
                    const data = await response.json()
                    throw data;
                }

                toast.success('تم إضافة النصيحة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });


                props.refreash()



            } catch (error) {


                toast.error('!حدث خطأ ما', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                props.close()


            }

            setIsLoading(false);
            setEnteredName('');
            setEnteredNameTouched(false);

            setEnteredDesc('');
            setEnteredDescTouched(false);
            props.close()


        }

    };



    const titleConfiguration = { type: 'text', label: 'العنوان' }
    return (
        <div className={classes.container}>


            <h4 className={classes.ps}>    {props.edit === true ? 'تعديل نصيحة' : 'إضافة نصيحة'}  </h4>

            <div>

                <form className={classes.form} >

                    <div className={classes.wrapper}>
                        <MainInput
                            configuration={titleConfiguration}
                            onChange={nameInputChangeHandler}
                            onBlur={nameInputBlurHandler}
                            value={enteredName}
                            isInvalid={nameInputIsInvalid}
                        />
                        {nameInputIsInvalid && (
                            <p className='error-text'>العنوان فارغ.</p>
                        )}
                    </div>
                    <div className={classes.wrapper}>
                        <MainTextArea
                            onChange={DescInputChangeHandler}
                            onBlur={DescInputBlurHandler}
                            value={enteredDesc}
                            isInvalid={enteredDescIsValid}
                            label={'نص النصيحة'}
                        >
                        </MainTextArea>
                        {DescInputIsInvalid && (
                            <p className='error-text'>الوصف فارغ.</p>
                        )}
                    </div>

                </form>
                {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}


            </div>
            <div className={classes.buttons}>
                <button disabled={!formIsValid} onClick={formSubmissionHandler} ><FontAwesomeIcon style={{ color: 'lightslategray  ' }} icon={props.edit === true ? faRefresh : faAdd} /></button>
                <button onClick={() => { props.close() }}><FontAwesomeIcon style={{ color: 'lightslategray  ' }} icon={faXmark} /></button>
            </div>
        </div>
    )

}


export const ModalForUpdateOrAddTip = (props) => {

    return (
        <React.Fragment>
            {/* {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))} */}
            {ReactDOM.createPortal(<UpdateOrAddTip refreash={props.refreash} edit={props.edit} data={props.data} close={props.close} />, document.getElementById('modal'))}
        </React.Fragment>
    );

};
