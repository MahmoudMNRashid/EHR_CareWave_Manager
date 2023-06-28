import React from 'react'
import classes from './ButtonAdd.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

export const ButtonAdd = (props) => {

 
    return (
        <button onClick={props.onClick} className={classes.Btn}>

            <div className={classes.sign}>
           <FontAwesomeIcon style={{color:'#77ffab'}} icon={faAdd}/>
            </div>

            <div  className={classes.text}> إضافة نصيحة</div>
        </button>



    )
}
