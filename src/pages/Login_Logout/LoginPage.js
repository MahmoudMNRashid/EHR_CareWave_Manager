import React from 'react'
import classes from './LoginPage.module.css'
import { LoginForm } from '../../components/Login/LoginForm'
import { Helmet } from 'react-helmet'

export const LoginPage = () => {
 
    return (

        <div className={`${classes.w_h} ${classes.center}`}>
                   <Helmet><title>تسجيل الدخول</title></Helmet>

            <LoginForm/>
       
        </div>
    )
}
