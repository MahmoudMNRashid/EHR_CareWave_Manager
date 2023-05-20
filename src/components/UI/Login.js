import React from 'react'
import classes from './Login.module.css'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const nav= useNavigate();

    const buttonclickchangehandler = (e)=>{
        // e.preventdefault()
        nav('/dashboardSysAdmin')


    }
    const navA= useNavigate();

    const buttonclickchangehandlerAsst = (e)=>{
        // e.preventdefault()
        navA('/dashboardAsst')


    }
    return (
        <Form className={classes.form_}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={classes.label_}>الأسم</Form.Label>
          <Form.Control  className={classes.input_} type="email" placeholder="Enter email"  />
          
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={classes.label_}>كلمة المرور</Form.Label>
          <Form.Control className={classes.input_} type="password" placeholder="Password" />
        </Form.Group>
       
        <button variant="primary" type="submit" className={classes.button}  onClick={buttonclickchangehandler}>
          Manger
        </button>
        <button variant="primary" type="submit" className={classes.button}  onClick={buttonclickchangehandlerAsst}>
        Asst_Manager  
        </button>
      </Form>
    )
}
