import React, { useState } from 'react'
import { MainInput } from '../UI/MainInput'
import classes from './LoginForm.module.css'
import illustrations from '../../style/Group of doctors standing at hospital building.jpg'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'

export const LoginForm = () => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
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

    const loginApiSubmittionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredNameTouched(true);

        if (!enteredNameIsValid || !enteredPasswordIsValid) {
            return;
        }

        const info = {
            name: enteredName,
            password: enteredPassword
        }


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
            localStorage.setItem('token',token);
           
            const expiration = new Date(data.data.expire)
            const milliseconds = expiration.getTime();
            localStorage.setItem('expiration', milliseconds);
           
            const role = data.data.role
            if (role === "admin") {
                localStorage.setItem('role', "admin")
            }
            else if (role === "admin_assistant") {
                localStorage.setItem('role', "admin_assistant")
            } else {
                localStorage.setItem('role', '_')
            }

            if (role === "admin" && token) {
                nav('/dashboardSysAdmin',{replace:true})
            } else if (role === "admin_assistant"&&token) {
                nav('/dashboardAsst',{replace:true})
            } else {
                throw new Error('forbidden')
            }





        } catch (error) {

            if (error.message === 'Sequence contains no elements.') {
                toast.warn('!الاسم او كلمة المرور غير صحيحة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else if (error === "forbidden") {
                toast.error('!ممنوع الدخول  ', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                });
            } else {
                toast.error('!حدث خطأً ما', {
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
        // setEnteredName('');
        setEnteredNameTouched(false);

        // setEnteredPassword('');
        setEnteredPasswordTouched(false);
    };

    

    const nameConfiguration = {
        type: 'text',
        label: 'الأسم'
    }
    const passwordConfiguration = {
        type: 'password',
        label: 'كلمة المرور'
    }
    return (
        <div className={classes.container}>
            <div className={classes.right}>

                <form onSubmit={loginApiSubmittionHandler}>
                    <div className={classes.title}> <h2> تسجيل الدخول</h2></div>
                    <div>
                        <div>
                            <MainInput
                                configuration={nameConfiguration}
                                onChange={nameInputChangeHandler}
                                onBlur={nameInputBlurHandler}
                                value={enteredName}
                                isInvalid={nameInputIsInvalid}
                            />
                            {nameInputIsInvalid && <p className='error-text'>الأسم فارغ.</p>}
                        </div>
                        <div>
                            <MainInput
                                configuration={passwordConfiguration}
                                onChange={PasswordInputChangeHandler}
                                onBlur={PasswordInputBlurHandler}
                                value={enteredPassword}
                                isInvalid={PasswordInputIsInvalid}
                            />
                            {PasswordInputIsInvalid && <p className='error-text'>  كلمة المرور  أقل من 6 أحرف  .</p>}
                        </div>
                    </div>
                    <button disabled={!formIsValid}> تسجيل الدخول</button>
                </form>

            </div>
            <div className={classes.left}>
                <img src={illustrations} alt='error'></img>
            </div>
            <ToastContainer style={window.innerWidth <=425 ? {display:'flex',alignItems:'center',justifyContent:'center'} :{}}/>
            {
                isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </div>
    )
}
