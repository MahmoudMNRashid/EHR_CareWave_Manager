import React from 'react'
import classes from './Button.module.css'
import { useNavigate } from 'react-router-dom'
export const Button = (props) => {
 const nav= useNavigate()
 
    return (
        <button class={classes.Btn} onClick={()=>{
            nav('AddTips')
        }}>

            <div class={classes.sign}>
           {props.icon}
            </div>

            <div style={props.style} class={classes.text}>{props.title}</div>
        </button>



    )
}
