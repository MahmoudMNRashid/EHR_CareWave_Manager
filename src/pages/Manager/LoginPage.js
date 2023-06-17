import React from 'react'
import classes from './LoginPage.module.css'
import { Login } from '../../components/UI/Login'

export const LoginPage = () => {
    return (

        <div className={`${classes.w_h} ${classes.center}`}>
            <Login />
            

        </div>
    )
}
