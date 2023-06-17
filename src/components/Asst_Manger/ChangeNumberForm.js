import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import classes from './ChangeNumberForm.module.css'
import { MainInput } from '../UI/MainInput'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getToken } from '../../Util/Auth';
export const ChangeNumberForm = () => {
  const [enteredidSyr, setEnteredidSyr] = useState('');
  const [enteredidSyrTouched, setEnteredidSyrTouched] = useState(false);

  const [enteredphone, setEnteredphone] = useState('');
  const [enteredphoneTouched, setEnteredphoneTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate()
  const enteredidSyrIsValid = enteredidSyr.trim().length === 11;
  const idSyrInputIsInvalid = !enteredidSyrIsValid && enteredidSyrTouched;

  const enteredphoneIsValid = enteredphone !== '' && enteredphone.length === 10;
  const phoneInputIsInvalid = !enteredphoneIsValid && enteredphoneTouched;
  const enteredPasswordIsValid = enteredPassword !== '' && enteredPassword.length > 6;
  const PasswordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;

  if (enteredidSyrIsValid && enteredPasswordIsValid && enteredphoneIsValid) {
    formIsValid = true;
  }
  const idSyrInputChangeHandler = (event) => {
    setEnteredidSyr(event.target.value);
  };

  const PhoneInputChangeHandler = (event) => {
    setEnteredphone(event.target.value);
  };
  const PasswordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const idSyrInputBlurHandler = (event) => {
    setEnteredidSyrTouched(true);
  };

  const PhoneInputBlurHandler = (event) => {
    setEnteredphoneTouched(true);
  };
  const PasswordInputBlurHandler = (event) => {
    setEnteredPasswordTouched(true);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // setError(null);
    setEnteredidSyrTouched(true);

    if (!enteredidSyrIsValid || !enteredPasswordIsValid || !enteredidSyrIsValid) {
      return;
    }

    const info = {
      idSyr: enteredidSyr,
      phone: enteredphone,
      newPassword: enteredPassword
    }

    // console.log(enteredPassword)
    try {
      const response = await fetch('http://localhost:8000/v1/User/forgetPassword', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization':`bearer ${getToken()}`


        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      toast.success('تم التغيير بنجاح ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
     


    } catch (error) {

      if (error.message === 'cannot found data match with this info.') {
        toast.warn('تحقق من المعلومات ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error('!حدث خطأ ما', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    }

    setIsLoading(false);
    setEnteredidSyr('');
    setEnteredidSyrTouched(false);

    setEnteredphone('');
    setEnteredphoneTouched(false);

    setEnteredPassword('');
    setEnteredPasswordTouched(false);
  };


  const configurationidSyrLogin = {
    type: 'text',
    label: 'الرقم الوطني'

  }
  const configurationNewPhoneLogin = {
    type: 'text',
    label: ' رقم الجوال'

  }
  const configurationPasswordLogin = {
    type: 'password',
    label: 'كلمة المرور'

  }
  return (
    <>
      <form className={classes.form_} onSubmit={formSubmissionHandler}>
        <div>
          <MainInput
            configuration={configurationidSyrLogin}
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
            configuration={configurationNewPhoneLogin}
            onChange={PhoneInputChangeHandler}
            onBlur={PhoneInputBlurHandler}
            value={enteredphone}
            isInvalid={phoneInputIsInvalid}
          />
          {phoneInputIsInvalid && (
            <p className='error-text'>يجب ان يتألف رقم  الجوال من 10 خانات.</p>
          )}
        </div>
        <div>
          <MainInput
            configuration={configurationPasswordLogin}
            onChange={PasswordInputChangeHandler}
            onBlur={PasswordInputBlurHandler}
            value={enteredPassword}
            isInvalid={PasswordInputIsInvalid}
          />
          {PasswordInputIsInvalid && (
            <p className='error-text'>      كلمة المرور أصغر من 6 أحرف  .</p>
          )}
        </div>
        <button disabled={!formIsValid} variant="primary" type="submit" className={classes.button}  >  تغيير </button>
      </form>
      <ToastContainer />
      {isLoading && <LoadingBar color='#f11946' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
    </>
  )
}
