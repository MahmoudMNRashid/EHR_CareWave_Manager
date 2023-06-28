import React from 'react'
import classes from './ButtonDelete.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const ButtonDelete = (props) => {

 
    return (
        <button onClick={props.onClick} className={classes.Btn}>

            <div className={classes.sign}>
           <FontAwesomeIcon style={{color:'#ff3333'}} icon={faTrashCan}/>
            </div>

            <div  className={classes.text}>حذف الكل</div>
        </button>



    )
}
