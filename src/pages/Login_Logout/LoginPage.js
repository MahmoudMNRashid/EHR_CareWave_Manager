import React from 'react'
import classes from './LoginPage.module.css'
import { LoginForm } from '../../components/Login/LoginForm'

export const LoginPage = () => {
 
    return (

        <div className={`${classes.w_h} ${classes.center}`}>
            {/* <Login /> */}
            <LoginForm/>
       
        </div>
    )
}
