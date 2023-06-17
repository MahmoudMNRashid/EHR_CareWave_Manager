import React, { useState } from 'react'
import classes from './Login.module.css'
import { MainInput } from './MainInput'
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { getRole } from '../../Util/Auth';
export const Login = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [progress, setProgress] = useState(0)
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const nav = useNavigate()
  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredPasswordIsValid = enteredPassword !== '' && enteredPassword.length > 6;
  const PasswordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const PasswordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const PasswordInputBlurHandler = (event) => {
    setEnteredPasswordTouched(true);
  };



  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // setError(null);
    setEnteredNameTouched(true);
    setProgress(progress + 10)
    if (!enteredNameIsValid || !enteredPasswordIsValid) {
      return;
    }

    const info = {
      name: enteredName,
      password: enteredPassword
    }

    // console.log(enteredPassword)
    try {
      const response = await fetch('http://localhost:8000/v1/User/login/admin', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',


        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      const data = await response.json()
      const token = data.data.token;
      console.log(data)
      localStorage.setItem('token', token);

      const expiration = new Date(data.data.expire);
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem('expiration', expiration.toISOString());

      const role = data.data.role
      if (role === "admin") {
        localStorage.setItem('role', "5")
      }
      else if (role === "admin_assistant") {
        localStorage.setItem('role', "6")
      } else {
        localStorage.setItem('role', '_')
      }

    if(getRole()==="5"){
      nav('/dashboardSysAdmin')
    } else if(getRole()==="6"){
      nav('/dashboardAsst')
    }else{
      throw new Error('forbidden')
    }





    } catch (error) {

      if (error.message === 'Sequence contains no elements.') {
        toast.warn('!خطأ في الاسم او كلمة المرور', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    
      }else if(error==="forbidden"){
        toast.error('!ممنوع الدخول  ', {
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
    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredPassword('');
    setEnteredPasswordTouched(false);
  };


  const configurationNameLogin = {
    type: 'text',
    label: 'الأسم'

  }

  const configurationPasswordLogin = {
    type: 'password',
    label: 'كلمة المرور'

  }

  return (
    <>    <form className={classes.form_} onSubmit={formSubmissionHandler}>

      <div>
        <MainInput
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
          configuration={configurationNameLogin}
          isInvalid={nameInputIsInvalid}


        />
        {nameInputIsInvalid && (
          <p className='error-text'>الأسم يجب أن لا يكون فارغ.</p>
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
          <p className='error-text'>  كلمة المرور أصغر من 6 أحرف أو فارغة.</p>
        )}
      </div>

      <button disabled={!formIsValid} variant="primary" type="submit" className={classes.button} >
        تسجيل الدخول
      </button>
      {isLoading && <LoadingBar color="#f11946" progress={progress}
        onLoaderFinished={() => setProgress(0)} />}
    </form>
      <ToastContainer />


    </>

  )
}
