import React, { useState } from 'react'
import { MainInput } from '../../UI/MainInput';
import classes from './ChangePasswordForm.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { getToken } from '../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar';
import Change from '../../../style/reset-password.png'
export const ChangePaswordForm = () => {
    const pattern = /^09[3-9]\d{7}$/;   //for phone
    const [enteredidSyr, setEnteredidSyr] = useState('');
    const [enteredidSyrTouched, setEnteredidSyrTouched] = useState(false);
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredPhoneTouched, setEnteredPhoneTouched] = useState(false);
    const [enteredNewPassword, setEnteredNewPassword] = useState('');
    const [enteredNewPasswordTouched, setEnteredNewPasswordTouched] = useState(false);
 
    const [isLoading, setIsLoading] = useState(false);
    const enteredidSyrIsValid = enteredidSyr.length === 11;
    const idSyrInputIsInvalid = !enteredidSyrIsValid && enteredidSyrTouched;
    const enteredNewPasswordIsValid = enteredNewPassword.length>6;
    const NewPasswordlInputIsInvalid = !enteredNewPasswordIsValid && enteredNewPasswordTouched;
    const enteredPhoneIsValid = pattern.test(enteredPhone);
    const PhoneInputIsInvalid = !enteredPhoneIsValid && enteredPhoneTouched;
    let formIsValid = false;
    if (enteredidSyrIsValid  && enteredPhoneIsValid && enteredNewPasswordIsValid) {
        formIsValid = true;
    }
    const idSyrInputChangeHandler = (event) => {
        setEnteredidSyr(event.target.value);
    };
    const PhoneInputChangeHandler = (event) => {
        setEnteredPhone(event.target.value);
    };
    const NewPasswordInputChangeHandler = (event) => {
        setEnteredNewPassword(event.target.value);
    };
   
    const idSyrInputBlurHandler = (event) => {
        setEnteredidSyrTouched(true);
    };
    const PhoneInputBlurHandler = (event) => {
        setEnteredPhoneTouched(true);
    };
    const NewPasswordInputBlurHandler = (event) => {
        setEnteredNewPasswordTouched(true);
    };
  

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        // setError(null);
        setEnteredidSyrTouched(true);

        if (!enteredidSyrIsValid || !enteredPhone || !enteredNewPassword) {
            return;
        }

     
        const info = {
            idSyr: enteredidSyr,
            phone: enteredPhone,
            newPassword: enteredNewPassword
        }

        // console.log(enteredPassword)
        try {
            const response = await fetch('http://localhost:8000/v1/User/forgetPassword', {
              method: 'POST',
              body: JSON.stringify(info),
              headers: {
                'Content-Type': 'application/json',
                 'Authorization':`bearer ${getToken()}`
      
      
              },
            });
            if (!response.ok) {
              const data = await response.json()
              throw data;
            }
            toast.success('تم التغيير بنجاح ', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              
            });
           
      
      
          } catch (error) {
      
            if (error.message === 'cannot found data match with this info.') {
              toast.warn('تحقق من المعلومات ', {
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
      
          } finally{
            setIsLoading(false);
            setEnteredidSyr('');
            setEnteredidSyrTouched(false);
    
            setEnteredPhone('');
            setEnteredPhoneTouched(false);
    
            setEnteredNewPassword('');
            setEnteredNewPasswordTouched(false);
          }

       

  
    };




    const configurationidSyr = {
        type: 'number',
        label: 'الرقم الوطني  '

    }
    const configurationPhone = {
        type: 'number',
        label: ' رقم الموبايل'

    }
    const configurationNewPassowrd = {
        type: 'text',
        label: ' كلمة المرور الجديدة'

    }
  


    return (
        <>
       
            <form onSubmit={formSubmissionHandler} className={classes.container}>
          <div className={classes.details}>
         <img src={Change} alt='error'/>
          <p>لتغيير كلمة المرور الرجاء تعبئة المعلومات التالية:</p>
          </div>
                <div>
                    <MainInput configuration={configurationidSyr}
                        onChange={idSyrInputChangeHandler}
                        onBlur={idSyrInputBlurHandler}
                        value={enteredidSyr}
                        isInvalid={idSyrInputIsInvalid}
                    />
                    {idSyrInputIsInvalid && (
                        <p className='error-text'>يجب أن يتألف الرقم الوطني من 11 خانة    .</p>
                    )}
                </div>

                <div>
                    <MainInput
                        configuration={configurationPhone}
                        onChange={PhoneInputChangeHandler}
                        onBlur={PhoneInputBlurHandler}
                        value={enteredPhone}
                        isInvalid={PhoneInputIsInvalid}
                    />
                    {PhoneInputIsInvalid && (
                        <p className='error-text'> يجب أن يتألف رقم الموبايل من 10 خانات ويبدأ ب 09.</p>
                    )}
                </div>
                <div>
                    <MainInput
                        configuration={configurationNewPassowrd}
                        onChange={NewPasswordInputChangeHandler}
                        onBlur={NewPasswordInputBlurHandler}
                        value={enteredNewPassword}
                        isInvalid={NewPasswordlInputIsInvalid}
                    />
                    {PhoneInputIsInvalid && (
                        <p className='error-text'>كلمة المرور أقل من 6 خانات.</p>
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
