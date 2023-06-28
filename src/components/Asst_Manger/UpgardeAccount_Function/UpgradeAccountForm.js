import React, { useState } from 'react'
import { MainInput } from '../../UI/MainInput';
import classes from './UpgradeAccountForm.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { getToken } from '../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar';
import upgrade from '../../../style/growth.png'

export const UpgradeAccountForm = () => {
    const [enteredidSyr, setEnteredidSyr] = useState('');
    const [enteredidSyrTouched, setEnteredidSyrTouched] = useState(false);
    const [enteredidMedical, setEnteredidMedical] = useState('');
    const [enteredidMedicalTouched, setEnteredidMedicalTouched] = useState(false);
    const [enteredspecialization, setEnteredspecialization] = useState('');
    const [enteredspecializationTouched, setEnteredspecializationTouched] = useState(false);
    const [enteredSelectedType, setSelectedType] = useState('اختر الفئة الطبية');
    const [enteredSelectedTypeTouched, setEnteredelectedTypeTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const enteredidSyrIsValid = enteredidSyr.length === 11;
    const idSyrInputIsInvalid = !enteredidSyrIsValid && enteredidSyrTouched;
    const enteredSelectedTypelIsValid = enteredSelectedType !== 'اختر الفئة الطبية';
    const SelectedTypeInputIsInvalid = !enteredSelectedTypelIsValid && enteredSelectedTypeTouched;
    const enteredspecializationIsValid = (enteredSelectedType === 'doctor' && enteredspecialization !== '') || ((enteredSelectedType === 'radiographer' || enteredSelectedType === 'analyzer' || enteredSelectedType === 'pharmaceutical') && enteredspecialization === '');
    const specializationlInputIsInvalid = !enteredspecializationIsValid && enteredspecializationTouched;
    const enteredidMedicalIsValid = enteredidMedical.length === 11;
    const idMedicalInputIsInvalid = !enteredidMedicalIsValid && enteredidMedicalTouched;
    let formIsValid = false;
    if (enteredidSyrIsValid && enteredidMedicalIsValid && enteredSelectedTypelIsValid && enteredspecializationIsValid) {
        formIsValid = true;
    }
    const idSyrInputChangeHandler = (event) => {
        setEnteredidSyr(event.target.value);
    };
    const idMedicalInputChangeHandler = (event) => {
        setEnteredidMedical(event.target.value);
    };
    const specializationInputChangeHandler = (event) => {
        setEnteredspecialization(event.target.value);
    };
    const SelectedTypeInputChangeHandler = (event) => {
        setSelectedType(event.target.value);
    };
    const idSyrInputBlurHandler = (event) => {
        setEnteredidSyrTouched(true);
    };
    const idMedicalInputBlurHandler = (event) => {
        setEnteredidMedicalTouched(true);
    };
    const specializationInputBlurHandler = (event) => {
        setEnteredspecializationTouched(true);
    };
    const SelectedTypeInputBlurHandler = (event) => {
        setEnteredelectedTypeTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        // setError(null);
        setEnteredidSyrTouched(true);

        if (!enteredidSyrIsValid || !enteredSelectedTypelIsValid || !enteredidSyrIsValid) {
            return;
        }

        const specializ = enteredSelectedType === "doctor" ? enteredspecialization : "_"
        const info = {
            syrid: enteredidSyr,
            medicalId: enteredidMedical,
            type: enteredSelectedType,
            specialization: specializ
        }

        // console.log(enteredPassword)
        try {
            const response = await fetch('http://localhost:8000/v1/User/developaccount', {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()}`

                },
            });
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                throw data;
            }
            toast.success('تم تطوير الحساب بنجاح ', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });


        } catch (error) {

            if (error.message === 'Sequence contains no elements.') {
                toast.warn('الرقم الوطني غير موجود', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }else if(error.message==='Medical Id must be 11'){
                
                toast.warn('الرقم الطبي أقل من 11 خانة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else {
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

        }

        setIsLoading(false);
        setEnteredidSyr('');
        setEnteredidSyrTouched(false);

        setEnteredidMedical('');
        setEnteredidMedicalTouched(false);

        setEnteredspecialization('');
        setEnteredspecializationTouched(false);

        setSelectedType('اختر الفئة الطبية')
        setEnteredelectedTypeTouched(false)
    };




    const configurationidSyr = {
        type: 'number',
        label: 'الرقم الوطني  '

    }
    const configurationidMedical = {
        type: 'number',
        label: 'الرقم الطبي'

    }
    const configurationspecialization = {
        type: 'text',
        label: 'التخصص'

    }


    return (
        <>


            <form onSubmit={formSubmissionHandler} className={classes.container}>
                <div className={classes.details}>
                    <img src={upgrade} alt='error' />
                    <p>لترقية الحساب الرجاء تعبئة المعلومات التالية:</p>
                </div>

                <div>
                    <MainInput configuration={configurationidSyr}
                        onChange={idSyrInputChangeHandler}
                        onBlur={idSyrInputBlurHandler}
                        value={enteredidSyr}
                        isInvalid={idSyrInputIsInvalid}
                    />
                    {idSyrInputIsInvalid && (
                        <p className='error-text'>يجب ان يتألف الرقم الوطني من 11 خانة.</p>
                    )}
                </div>

                <div>
                    <MainInput
                        configuration={configurationidMedical}
                        onChange={idMedicalInputChangeHandler}
                        onBlur={idMedicalInputBlurHandler}
                        value={enteredidMedical}
                        isInvalid={idMedicalInputIsInvalid}
                    />
                    {idMedicalInputIsInvalid && (
                        <p className='error-text'>  يجب أن يتألف الرقم الطبي من 11 خانة.</p>
                    )}
                </div>

                <div>

                    <select
                        className={`${classes.select} ${SelectedTypeInputIsInvalid ? classes.invalid : ''} `}
                        required
                        onChange={SelectedTypeInputChangeHandler}
                        onBlur={SelectedTypeInputBlurHandler}
                        value={enteredSelectedType}
                    >
                        <option className={classes.option} value='اختر الفئة الطبية' >اختر الفئة  الطبية </option>
                        <option className={classes.option} value="doctor">طبيب</option>
                        <option className={classes.option} value="radiographer">مصور أشعة</option>
                        <option className={classes.option} value="analyzer">مخبري</option>
                        <option className={classes.option} value="pharmaceutical">صيدلي</option>

                    </select>
                    {SelectedTypeInputIsInvalid && (
                        <p className='error-text'>الرجاء اختيار الفئة الطبية .</p>
                    )}
                </div>

                <div>
                    {enteredSelectedType === "doctor" && <MainInput
                        configuration={configurationspecialization}
                        onChange={specializationInputChangeHandler}
                        onBlur={specializationInputBlurHandler}
                        value={enteredspecialization}
                        isInvalid={specializationlInputIsInvalid}
                    />}
                    {specializationlInputIsInvalid && enteredSelectedType === "0" && (
                        <p className='error-text'>  الرجاء اختر التخصص.</p>
                    )}
                </div>

                <div>
                    <button disabled={!formIsValid} className={classes.button}> تأكيد</button>
                </div>
            </form>
            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
            <ToastContainer />
        </>
    )
}
