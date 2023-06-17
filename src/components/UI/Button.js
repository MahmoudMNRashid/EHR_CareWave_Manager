import React from 'react'
import classes from './Button.module.css'

export const Button = (props) => {

 
    return (
        <button onClick={props.onClick} className={classes.Btn}>

            <div className={classes.sign}>
           {props.icon}
            </div>

            <div style={props.style} className={classes.text}>{props.title}</div>
        </button>



    )
}
